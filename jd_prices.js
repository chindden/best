#!/usr/bin/env node
"use strict";

/*
京东保价 Node / GitHub Actions 版

环境变量：
1. JD_COOKIE：必填。多个账号用换行、& 或 || 分隔。
2. JD_USER_AGENT：可选。默认使用内置京东 App UA。
3. JD_PRICE_SKIP_RAC：可选。设置为 1 时跳过 RAC 扩展签名脚本。

GitHub Actions 依赖：
  npm install --no-save jsdom@22.1.0
*/

const crypto = require("crypto");

const JD_API_HOST = "https://api.m.jd.com";
const PRICE_REFERER = "https://h5.m.jd.com/pb/016454810/2RePMzTqg6UoffvMwtwVeMcnPGeg/index.html?defaultViewTab=0&appId=null&type=25";
const DEFAULT_UA = "jdapp;iPhone;12.4.0;;;M/5.0;appBuild/168841;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
const USER_AGENT = process.env.JD_USER_AGENT || DEFAULT_UA;
const APPLY_FUNCTION_ID = "mlproprice_skuOnceApply_jsf";
const APPLY_SIGN_APP_ID = "6f46e";
const SIGN_ENV_TIMEOUT_MS = Number(process.env.JD_PRICE_SIGN_ENV_TIMEOUT_MS || 45000);

let signEnv = null;

async function main() {
    console.log("🔔京东保价, 开始!");
    console.log(`Node 版本：${process.version}`);
    await logRunnerIp();

    const cookies = collectCookies(process.env.JD_COOKIE || "");
    if (!cookies.length) {
        console.log("未检测到 JD_COOKIE。请在 GitHub Secrets 中配置 JD_COOKIE。");
        return;
    }

    console.log(`检测到 Cookie 数量：${cookies.length}`);
    signEnv = await withTimeout(initSignEnv(process.env.JD_PRICE_SKIP_RAC === "1"), SIGN_ENV_TIMEOUT_MS, "签名环境初始化超时");
    if (process.env.JD_PRICE_SIGN_ENV_ONLY === "1") {
        console.log("JD_PRICE_SIGN_ENV_ONLY=1，仅验证签名环境初始化，不提交保价接口。");
        return;
    }

    const summaries = [];
    for (let index = 0; index < cookies.length; index++) {
        const cookie = cookies[index];
        const username = decodeURIComponent((cookie.match(/pt_pin=([^; ]+)/) || [])[1] || `账号${index + 1}`);
        console.log(`\n******开始【京东账号${index + 1}】${username}*********`);

        const result = await runPriceProtection({ index: index + 1, username, cookie });
        summaries.push(result);

        if (index < cookies.length - 1) {
            await wait(randomInt(2500, 5000));
        }
    }

    console.log("\n==============执行汇总==============");
    for (const item of summaries) {
        console.log(`【京东账号${item.index}】${item.username}`);
        console.log(item.message.trim() || "无结果");
    }
    console.log("\n🔔京东保价, 结束!");
}

async function runPriceProtection(account) {
    const body = {
        onceBatchId: "",
        couponConfirmFlag: null,
        appId: "",
        uniformBizInfo: {
            data: {
                language: "zh_CN",
                buId: 301,
                tenantId: 1024
            }
        },
        type: "25"
    };
    const time = Date.now();
    const summary = {
        index: account.index,
        username: account.username,
        message: ""
    };

    console.log(`用户名：${account.username}`);
    console.log(`请求接口：${APPLY_FUNCTION_ID}`);

    const h5st = await generateH5st({
        appid: "price_protection",
        client: "apple",
        clientVersion: "",
        functionId: APPLY_FUNCTION_ID,
        t: time,
        body,
        preRequest: true
    });

    console.log(`h5st：${h5st ? `已生成，长度=${h5st.length}` : "未生成"}`);
    if (!h5st) {
        summary.message = "保价失败：未生成 h5st\n";
        return summary;
    }

    const response = await postJdApi(APPLY_FUNCTION_ID, body, h5st, time, account.cookie);
    console.log(`HTTP 状态：${response.status}`);
    if (response.status !== 200) {
        console.log(`HTTP 响应片段：${response.text.slice(0, 800) || "空"}`);
        summary.message = `保价失败：接口 HTTP ${response.status}\n`;
        return summary;
    }

    const data = parseJson(response.text);
    if (!data) {
        console.log(`接口返回非 JSON：${response.text.slice(0, 1000) || "空"}`);
        summary.message = "保价失败：接口返回非 JSON\n";
        return summary;
    }

    const result = data.data || {};
    console.log(`接口返回：code=${formatValue(data.code)}${result.responseCode ? `，responseCode=${result.responseCode}` : ""}`);
    logBusinessResult(data, result);

    if (String(data.code) === "0" && result.flag) {
        const succAmount = Number(result.succAmount || 0);
        const succNum = Number(result.succNum || 0);
        const batchId = result.onceBatchId || "";
        console.log(`保价申请成功：succNum=${succNum}，succAmount=${succAmount}，onceBatchId=${batchId || "无"}`);
        summary.message = succAmount > 0
            ? `保价成功：返还${succAmount}元\n`
            : `保价申请成功：${result.onceApplyNoSuccessTips || "当前无差价"}${batchId ? `，批次号：${batchId}` : ""}\n`;
    } else if (String(data.code) === "401") {
        summary.message = "保价失败：Cookie 已失效或当前接口未识别登录态\n";
    } else {
        const failMsg = result.responseMessage || result.errorMessage || data.message || data.msg || "未知原因";
        summary.message = `保价失败：${failMsg}\n`;
    }

    console.log(summary.message.trim());
    return summary;
}

async function generateH5st(signRequest) {
    let h5st = await tryGenerateH5st(signRequest, signEnv, 3);
    if (h5st || signEnv.skipRac || process.env.JD_PRICE_DISABLE_SIGN_FALLBACK === "1") return h5st;

    console.log("完整签名环境未生成 h5st，切换为跳过 RAC 扩展后重试...");
    closeSignEnv(signEnv);
    signEnv = null;
    signEnv = await withTimeout(initSignEnv(true), SIGN_ENV_TIMEOUT_MS, "备用签名环境初始化超时");
    h5st = await tryGenerateH5st(signRequest, signEnv, 2);
    return h5st;
}

async function tryGenerateH5st(signRequest, env, maxRetry) {
    for (let attempt = 1; attempt <= maxRetry; attempt++) {
        console.log(`h5st 生成尝试：${attempt}/${maxRetry}${env.skipRac ? "（跳过 RAC）" : ""}`);
        try {
            const h5st = await env.signWaap(APPLY_SIGN_APP_ID, signRequest);
            if (h5st) return String(h5st);
            console.log("h5st 本次返回为空");
        } catch (err) {
            console.log(`h5st 本次生成异常：${formatError(err)}`);
        }
        if (attempt < maxRetry) await wait(1500 * attempt);
    }
    return "";
}

async function initSignEnv(skipRac) {
    console.log(`准备初始化签名环境：${skipRac ? "跳过 RAC 扩展" : "完整加载"}`);
    const env = createBrowserEnv({ skipRac });
    const scripts = [
        {
            name: "map",
            url: "https://static.360buyimg.com/siteppStatic/script/mescroll/map.js",
            check: code => /function\s+Map|Map\.prototype/.test(code)
        },
        {
            name: "js_security",
            url: "https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.4.js",
            check: code => /ParamsSign/.test(code)
        }
    ];

    for (const script of scripts) {
        console.log(`下载风控脚本：${script.name}`);
        const code = await fetchScript(script);
        console.log(`执行风控脚本：${script.name}，长度=${code.length}`);
        env.run(code, script.name);
        await waitForPendingScripts(env);
        console.log(`加载风控脚本完成：${script.name}`);
    }

    await waitForPendingScripts(env);
    await wait(500);

    if (typeof env.window.ParamsSign !== "function") {
        throw new Error("ParamsSign 初始化失败");
    }
    if (typeof env.window.SHA256 !== "function") {
        env.window.SHA256 = sha256Hex;
    }

    console.log(`签名环境初始化完成：ParamsSign=${typeof env.window.ParamsSign}，SHA256=${typeof env.window.SHA256}`);
    return {
        skipRac,
        window: env.window,
        signWaap: createSignWaap(env.window)
    };
}

function createBrowserEnv(options) {
    let JSDOM;
    try {
        ({ JSDOM } = require("jsdom"));
    } catch (err) {
        throw new Error("缺少依赖 jsdom，请先执行：npm install --no-save jsdom@22.1.0");
    }

    const pendingScripts = [];
    const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
        url: PRICE_REFERER,
        referrer: PRICE_REFERER,
        pretendToBeVisual: true,
        runScripts: "outside-only",
        storageQuota: 10 * 1024 * 1024
    });
    const { window } = dom;

    patchWindow(window);
    installScriptLoader(window, pendingScripts, options);

    return {
        window,
        pendingScripts,
        run(code, sourceName) {
            const patched = patchJdSecurityCode(String(code || ""), sourceName);
            window.eval(`${patched}\n//# sourceURL=${sourceName}`);
        }
    };
}

function patchWindow(window) {
    defineGetter(window.navigator, "userAgent", USER_AGENT);
    defineGetter(window.navigator, "appVersion", USER_AGENT);
    defineGetter(window.navigator, "language", "zh-CN");
    defineGetter(window.navigator, "languages", ["zh-CN", "zh-Hans", "en"]);
    defineGetter(window.navigator, "platform", "iPhone");
    defineGetter(window.navigator, "vendor", "Apple Computer, Inc.");
    defineGetter(window.navigator, "webdriver", false);
    defineGetter(window.navigator, "hardwareConcurrency", 4);
    defineGetter(window.navigator, "cookieEnabled", true);

    window.screen = { width: 390, height: 844, availWidth: 390, availHeight: 844, colorDepth: 24, pixelDepth: 24 };
    window.outerWidth = 390;
    window.outerHeight = 844;
    window.innerWidth = 390;
    window.innerHeight = 844;
    window.devicePixelRatio = 3;
    window.chrome = {};
    window.SHA256 = sha256Hex;
    window.XMLHttpRequest = NodeXMLHttpRequest;
    window.fetch = (url, options = {}) => fetch(normalizeUrl(url), normalizeFetchOptions(options));
    window.crypto = window.crypto || {};
    window.crypto.getRandomValues = typedArray => crypto.randomFillSync(typedArray);
    window.crypto.randomUUID = window.crypto.randomUUID || (() => crypto.randomUUID());
    window.atob = window.atob || (value => Buffer.from(String(value), "base64").toString("binary"));
    window.btoa = window.btoa || (value => Buffer.from(String(value), "binary").toString("base64"));
    window.HTMLCanvasElement.prototype.getContext = function getContext(type) {
        return createCanvasContext(type, this);
    };
    window.HTMLCanvasElement.prototype.toDataURL = function toDataURL() {
        return "data:image/png;base64," + Buffer.from("jd-price-canvas").toString("base64");
    };
}

function installScriptLoader(window, pendingScripts, options) {
    const nativeAppendChild = window.Node.prototype.appendChild;
    window.Node.prototype.appendChild = function appendChild(child) {
        const result = nativeAppendChild.call(this, child);
        if (!child || String(child.tagName || "").toUpperCase() !== "SCRIPT" || !child.src) {
            return result;
        }

        const src = normalizeUrl(child.src);
        const task = (async () => {
            if (options.skipRac && /js-security-v3-rac\.js/i.test(src)) {
                console.log(`跳过 RAC 扩展脚本：${src}`);
                finishScript(child);
                return;
            }

            console.log(`动态加载风控脚本：${src}`);
            const code = await downloadUrl(src);
            window.eval(`${patchJdSecurityCode(code, src)}\n//# sourceURL=${src}`);
            finishScript(child);
        })().catch(err => {
            console.log(`动态风控脚本加载失败：${src}，${formatError(err)}`);
            if (typeof child.onerror === "function") child.onerror(err);
        });

        pendingScripts.push(task);
        return result;
    };
}

function finishScript(script) {
    script.readyState = "complete";
    if (typeof script.onreadystatechange === "function") script.onreadystatechange();
    if (typeof script.onload === "function") script.onload();
}

async function waitForPendingScripts(env) {
    let seen = 0;
    while (env.pendingScripts.length > seen) {
        const tasks = env.pendingScripts.slice(seen);
        seen = env.pendingScripts.length;
        await Promise.allSettled(tasks);
    }
}

async function fetchScript(script) {
    let code = await downloadUrl(script.url);
    if (!script.check(code)) {
        console.log(`首次校验失败，改用 identity 编码重试：${script.name}`);
        code = await downloadUrl(script.url, true);
    }
    if (!script.check(code)) {
        throw new Error(`风控脚本加载异常：${script.name}`);
    }
    return code;
}

async function downloadUrl(url, identityEncoding = false) {
    const response = await fetch(normalizeUrl(url), {
        headers: {
            Accept: "*/*",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": identityEncoding ? "identity" : "gzip, deflate, br",
            "User-Agent": USER_AGENT,
            Referer: PRICE_REFERER
        }
    });
    if (!response.ok) {
        throw new Error(`下载失败：${response.status} ${response.statusText}，url=${url}`);
    }
    return response.text();
}

function createSignWaap(window) {
    const cache = new Map();
    return async function signWaapCompat(businessid, req) {
        let signer = cache.get(businessid);
        if (!signer) {
            console.log(`创建 ParamsSign 实例：appId=${businessid}，preRequest=${req.preRequest ? "true" : "false"}`);
            signer = new window.ParamsSign({
                appId: businessid,
                preRequest: !!req.preRequest,
                debug: !!req.debug,
                onSign(event) {
                    event = event || {};
                    console.log(`ParamsSign.onSign：code=${safeText(event.code)}，message=${safeText(event.message)}`);
                },
                onRequestTokenRemotely(event) {
                    event = event || {};
                    console.log(`ParamsSign.onRequestTokenRemotely：code=${safeText(event.code)}，message=${safeText(event.message)}`);
                },
                onRequestToken(event) {
                    event = event || {};
                    console.log(`ParamsSign.onRequestToken：code=${safeText(event.code)}，message=${safeText(event.message)}`);
                }
            });
            cache.set(businessid, signer);
        }

        const params = buildWaapSignParams(req, window);
        console.log(`签名入参摘要：appid=${params.appid}，functionId=${params.functionId}，bodySha256=${params.body ? params.body.slice(0, 12) : "无"}`);
        const signedParams = await signer.sign(params);
        const type = signedParams === null ? "null" : typeof signedParams;
        const keys = signedParams && typeof signedParams === "object" ? Object.keys(signedParams).join(",") : "";
        console.log(`签名返回摘要：type=${type}${keys ? `，keys=${keys}` : ""}`);

        if (typeof signedParams === "string") return signedParams;
        if (signedParams && signedParams.h5st) return signedParams.h5st;
        return "";
    };
}

function buildWaapSignParams(req, window) {
    const params = {
        appid: req.appid,
        functionId: req.functionId,
        t: req.t
    };
    if (req.client) params.client = req.client;
    if (req.clientVersion) params.clientVersion = req.clientVersion;
    if (req.sign) params.sign = req.sign;
    if (req.jsonp) params.jsonp = req.jsonp;
    if (req.body) params.body = window.SHA256(JSON.stringify(req.body)).toString();
    return params;
}

async function postJdApi(functionId, body, h5st, time, cookie) {
    const params = new URLSearchParams();
    params.set("functionId", functionId);
    params.set("appid", "price_protection");
    params.set("loginType", "");
    params.set("body", JSON.stringify(body));
    params.set("client", "apple");
    params.set("clientVersion", "");
    params.set("x-api-eid-token", "");
    params.set("h5st", h5st);
    params.set("t", String(time));
    params.set("xAPIClientLanguage", "zh_CN");

    const response = await fetch(JD_API_HOST, {
        method: "POST",
        headers: {
            Host: "api.m.jd.com",
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://h5.m.jd.com",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "User-Agent": USER_AGENT,
            Referer: PRICE_REFERER,
            Cookie: cookie
        },
        body: params.toString()
    });

    return {
        status: response.status,
        headers: response.headers,
        text: await response.text()
    };
}

class NodeXMLHttpRequest {
    constructor() {
        this.headers = {};
        this.responseHeaders = {};
        this.readyState = 0;
        this.status = 0;
        this.statusText = "";
        this.response = "";
        this.responseText = "";
        this.responseType = "";
        this.timeout = 0;
        this.withCredentials = false;
    }

    open(method, url) {
        this.method = method || "GET";
        this.url = normalizeUrl(url);
        this.readyState = 1;
        this.callReadyStateChange();
    }

    setRequestHeader(key, value) {
        this.headers[key] = value;
    }

    getAllResponseHeaders() {
        return Object.entries(this.responseHeaders).map(([key, value]) => `${key}: ${value}`).join("\r\n");
    }

    getResponseHeader(key) {
        return this.responseHeaders[String(key).toLowerCase()] || null;
    }

    abort() {
        if (this.abortController) this.abortController.abort();
    }

    send(body) {
        this.abortController = new AbortController();
        let timer = null;
        if (this.timeout > 0) {
            timer = setTimeout(() => this.abortController.abort(), this.timeout);
        }

        fetch(this.url, {
            method: this.method,
            headers: normalizeHeaders(this.headers),
            body: String(this.method).toUpperCase() === "GET" ? undefined : body,
            signal: this.abortController.signal
        }).then(async response => {
            if (timer) clearTimeout(timer);
            this.status = response.status;
            this.statusText = response.statusText;
            this.responseHeaders = {};
            response.headers.forEach((value, key) => {
                this.responseHeaders[key.toLowerCase()] = value;
            });
            this.responseText = await response.text();
            this.response = this.responseType === "json" ? parseJson(this.responseText) : this.responseText;
            this.readyState = 4;
            this.callReadyStateChange();
            if (typeof this.onload === "function") this.onload();
        }).catch(err => {
            if (timer) clearTimeout(timer);
            this.status = 0;
            this.statusText = err && err.message ? err.message : String(err);
            this.responseText = this.statusText;
            this.response = this.responseText;
            this.readyState = 4;
            this.callReadyStateChange();
            if (err && err.name === "AbortError" && typeof this.ontimeout === "function") this.ontimeout();
            else if (typeof this.onerror === "function") this.onerror(err);
        });
    }

    callReadyStateChange() {
        if (typeof this.onreadystatechange === "function") this.onreadystatechange();
    }
}

function createCanvasContext(type, canvas) {
    if (String(type).toLowerCase().includes("webgl")) return createWebglContext(canvas);
    return {
        canvas,
        fillStyle: "",
        strokeStyle: "",
        lineWidth: 0,
        lineCap: "",
        font: "",
        textBaseline: "",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "",
        fillRect() {},
        fillText() {},
        arc() {},
        stroke() {},
        measureText(text) {
            return { width: String(text || "").length * 8 };
        },
        getImageData() {
            return { data: new Uint8ClampedArray(16) };
        }
    };
}

function createWebglContext(canvas) {
    const context = {
        canvas,
        DEPTH_TEST: 0x0b71,
        LEQUAL: 0x0203,
        COLOR_BUFFER_BIT: 0x4000,
        DEPTH_BUFFER_BIT: 0x0100,
        ARRAY_BUFFER: 0x8892,
        STATIC_DRAW: 0x88e4,
        VERTEX_SHADER: 0x8b31,
        FRAGMENT_SHADER: 0x8b30,
        FLOAT: 0x1406,
        TRIANGLE_STRIP: 0x0005,
        ALIASED_LINE_WIDTH_RANGE: 0x846e,
        ALIASED_POINT_SIZE_RANGE: 0x846d,
        ALPHA_BITS: 0x0d55,
        BLUE_BITS: 0x0d54,
        DEPTH_BITS: 0x0d56,
        GREEN_BITS: 0x0d53,
        RED_BITS: 0x0d52,
        STENCIL_BITS: 0x0d57,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8b4d,
        MAX_CUBE_MAP_TEXTURE_SIZE: 0x851c,
        MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd,
        MAX_RENDERBUFFER_SIZE: 0x84e8,
        MAX_TEXTURE_IMAGE_UNITS: 0x8872,
        MAX_TEXTURE_SIZE: 0x0d33,
        MAX_VARYING_VECTORS: 0x8dfc,
        MAX_VERTEX_ATTRIBS: 0x8869,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8b4c,
        MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb,
        MAX_VIEWPORT_DIMS: 0x0d3a,
        RENDERER: 0x1f01,
        SHADING_LANGUAGE_VERSION: 0x8b8c,
        VENDOR: 0x1f00,
        VERSION: 0x1f02,
        clearColor() {},
        enable() {},
        depthFunc() {},
        clear() {},
        createBuffer() { return {}; },
        bindBuffer() {},
        bufferData() {},
        createProgram() { return {}; },
        createShader() { return {}; },
        shaderSource() {},
        compileShader() {},
        attachShader() {},
        linkProgram() {},
        useProgram() {},
        getAttribLocation() { return 0; },
        getUniformLocation() { return {}; },
        enableVertexAttribArray() {},
        vertexAttribPointer() {},
        uniform2f() {},
        drawArrays() {},
        detachShader() {},
        deleteShader() {},
        deleteProgram() {},
        deleteBuffer() {},
        getSupportedExtensions() {
            return ["WEBGL_debug_renderer_info", "EXT_texture_filter_anisotropic", "WEBGL_lose_context"];
        },
        getContextAttributes() {
            return { antialias: true };
        },
        getExtension(name) {
            if (/anisotropic/i.test(name)) return { MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84ff };
            if (/debug_renderer_info/i.test(name)) return { UNMASKED_VENDOR_WEBGL: 0x9245, UNMASKED_RENDERER_WEBGL: 0x9246 };
            if (/lose_context/i.test(name)) return { loseContext() {} };
            return null;
        },
        getParameter(param) {
            if (param === this.ALIASED_LINE_WIDTH_RANGE) return [1, 1];
            if (param === this.ALIASED_POINT_SIZE_RANGE) return [1, 64];
            if (param === this.MAX_VIEWPORT_DIMS) return [390, 844];
            if (param === 0x9245) return "Apple Inc.";
            if (param === 0x9246) return "Apple GPU";
            if (param === this.RENDERER) return "WebKit WebGL";
            if (param === this.VENDOR) return "WebKit";
            if (param === this.VERSION) return "WebGL 1.0";
            if (param === this.SHADING_LANGUAGE_VERSION) return "WebGL GLSL ES 1.0";
            if (param === this.ALPHA_BITS || param === this.BLUE_BITS || param === this.GREEN_BITS || param === this.RED_BITS) return 8;
            if (param === this.DEPTH_BITS) return 24;
            if (param === this.STENCIL_BITS) return 8;
            return 16;
        }
    };
    return context;
}

function patchJdSecurityCode(code, sourceName) {
    const name = String(sourceName || "");
    const isSecurityScript = name === "js_security"
        || name.includes("js_security")
        || name.includes("js_security_v3")
        || name.includes("js-security-v3");
    if (!isSecurityScript) return code;

    const signSyncCatch = /catch\(_\$fo\)\{return this\._onSign\(\{'code':_\$YM,'message':MP\(0x1fc\)\}\),_\$fQ;\}\},_\$fP\.settings=/;
    const patched = code.replace(signSyncCatch, function () {
        return "catch(_$fo){var _$jdErr=_$fo&&((_$fo.name?_$fo.name+': ':'')+(_$fo.message||'')+(_$fo.stack?'\\n'+_$fo.stack:''))||_$fo;return this._onSign({'code':_$YM,'message':MP(0x1fc)+': '+_$jdErr}),_$fQ;}},_$fP.settings=";
    });
    if (patched !== code) console.log(`兼容修正：暴露 ${name} signSync 内部异常`);
    return patched;
}

function sha256Hex(value) {
    return crypto.createHash("sha256").update(String(value), "utf8").digest("hex");
}

function collectCookies(value) {
    return String(value || "")
        .split(/\n|&|\|\|/)
        .map(item => item.trim())
        .filter(item => item.includes("pt_key=") && item.includes("pt_pin="));
}

async function logRunnerIp() {
    const endpoints = [
        {
            name: "ipify",
            url: "https://api.ipify.org?format=json",
            parse: text => (parseJson(text) || {}).ip
        },
        {
            name: "icanhazip",
            url: "https://icanhazip.com",
            parse: text => String(text || "").trim()
        },
        {
            name: "ifconfig.me",
            url: "https://ifconfig.me/ip",
            parse: text => String(text || "").trim()
        }
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await fetchWithTimeout(endpoint.url, {
                headers: {
                    Accept: "text/plain, application/json",
                    "User-Agent": USER_AGENT
                }
            }, 5000);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const ip = endpoint.parse(await response.text());
            if (ip) {
                console.log(`当前运行公网 IP：${ip}（来源：${endpoint.name}）`);
                return;
            }
        } catch (err) {
            console.log(`公网 IP 获取失败：${endpoint.name}，${err && err.message ? err.message : err}`);
        }
    }
    console.log("当前运行公网 IP：获取失败");
}

async function fetchWithTimeout(url, options, ms) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
        return await fetch(url, {
            ...options,
            signal: controller.signal
        });
    } finally {
        clearTimeout(timer);
    }
}

function logBusinessResult(data, result) {
    console.log("业务结果明细：");
    console.log(`code：${formatValue(data.code)}`);
    console.log(`message：${formatValue(data.message || data.msg)}`);
    console.log(`flag：${formatValue(result.flag)}`);
    console.log(`responseCode：${formatValue(result.responseCode)}`);
    console.log(`responseMessage：${formatValue(result.responseMessage || result.errorMessage)}`);
    console.log(`onceBatchId：${formatValue(result.onceBatchId)}`);
    console.log(`succNum：${formatValue(result.succNum)}`);
    console.log(`succAmount：${formatValue(result.succAmount)}`);
    console.log(`timeOutFlag：${formatValue(result.timeOutFlag)}`);
    console.log(`waitFetch：${formatValue(result.waitFetch)}`);
    console.log(`onceApplyNoSuccessTips：${formatValue(result.onceApplyNoSuccessTips)}`);
    console.log(`onceApplyTimeoutTips：${formatValue(result.onceApplyTimeoutTips)}`);
    console.log(`confirmCouponInfos数量：${Array.isArray(result.confirmCouponInfos) ? result.confirmCouponInfos.length : "无"}`);
    console.log(`needRedFlag：${formatValue(result.needRedFlag)}`);
}

function normalizeFetchOptions(options) {
    const next = { ...options };
    next.headers = normalizeHeaders(next.headers || {});
    return next;
}

function normalizeHeaders(headers) {
    const output = {};
    if (headers && typeof headers.forEach === "function") {
        headers.forEach((value, key) => {
            output[key] = value;
        });
    } else {
        Object.assign(output, headers || {});
    }
    if (!output["User-Agent"] && !output["user-agent"]) output["User-Agent"] = USER_AGENT;
    if (!output.Referer && !output.referer) output.Referer = PRICE_REFERER;
    return output;
}

function normalizeUrl(url) {
    if (!url) return "";
    let value = String(url);
    value = value.replace(/^https:\/{4}/, "https://").replace(/^http:\/{4}/, "http://");
    if (value.startsWith("//")) value = `https:${value}`;
    if (value.startsWith("/")) value = `https://msitepp-fm.jd.com${value}`;
    return value;
}

function parseJson(value) {
    try {
        return JSON.parse(value);
    } catch (_) {
        return null;
    }
}

function defineGetter(target, key, value) {
    try {
        Object.defineProperty(target, key, {
            get: () => value,
            configurable: true
        });
    } catch (_) {
        try {
            target[key] = value;
        } catch (__){ }
    }
}

function formatValue(value) {
    if (value === undefined || value === null || value === "") return "无";
    if (typeof value === "object") {
        try {
            return JSON.stringify(value);
        } catch (_) {
            return String(value);
        }
    }
    return String(value);
}

function safeText(value) {
    if (value === undefined || value === null || value === "") return "无";
    return String(value);
}

function formatError(err) {
    if (!err) return "未知错误";
    if (err.stack) return err.stack;
    if (err.message) return err.message;
    return String(err);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function withTimeout(promise, ms, message) {
    let timer = null;
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => {
        if (timer) clearTimeout(timer);
    });
}

function closeSignEnv(env) {
    if (!env || !env.window || typeof env.window.close !== "function") return;
    try {
        env.window.close();
    } catch (_) {}
}

main()
    .catch(err => {
        console.error(`\n❌ 京东保价执行失败：${formatError(err)}`);
        process.exitCode = 1;
    })
    .finally(() => {
        closeSignEnv(signEnv);
    });
