"use strict";

const fs = require("fs");
const https = require("https");
const path = require("path");
const { spawnSync } = require("child_process");

const SOURCE_URL =
  process.env.JD_AUTOEVAL_SOURCE_URL ||
  "https://raw.githubusercontent.com/shufflewzc/faker2/refs/heads/main/jd_AutoEval.js";

main().catch((error) => {
  console.error("带图评价晒单执行失败：" + (error && error.stack ? error.stack : error));
  process.exitCode = 1;
});

async function main() {
  prepareJdCookie();
  process.env.ONEVAL = "true";
  console.log("已内置 ONEVAL=true，允许执行评价流程");

  if (process.env.JD_AUTOEVAL_SELF_TEST === "1") {
    console.log("JD AutoEval Action 自检通过");
    return;
  }

  console.log("准备下载上游 jd_AutoEval.js");
  const source = await downloadText(SOURCE_URL);
  console.log("上游脚本下载完成，长度：" + source.length);

  const upstreamPath = path.join(__dirname, "jd_AutoEval.upstream.js");
  const instrumentPath = path.join(__dirname, "jd_AutoEval.instrument.js");
  fs.writeFileSync(upstreamPath, source);
  fs.writeFileSync(instrumentPath, buildInstrumentSource());
  console.log("已写入上游脚本：" + upstreamPath);

  const childEnv = buildChildEnvironment();
  const child = spawnSync(process.execPath, ["--require", instrumentPath, upstreamPath], {
    cwd: __dirname,
    env: childEnv,
    stdio: "inherit",
  });

  if (child.error) {
    throw child.error;
  }
  if (child.status !== 0) {
    process.exitCode = child.status || 1;
  }
}

function buildInstrumentSource() {
  return String.raw`
"use strict";

const Module = require("module");
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  const loaded = originalLoad.apply(this, arguments);
  if (request !== "got" || loaded.__jdAutoEvalInstrumented) {
    return loaded;
  }
  return instrumentGot(loaded);
};

function instrumentGot(got) {
  const wrapped = wrapRequest(got, "REQUEST");
  Object.setPrototypeOf(wrapped, Object.getPrototypeOf(got));

  for (const key of Reflect.ownKeys(got)) {
    const descriptor = Object.getOwnPropertyDescriptor(got, key);
    if (!descriptor) continue;
    if (typeof descriptor.value === "function" && ["get", "post", "put", "patch", "delete", "head"].includes(String(key))) {
      descriptor.value = wrapRequest(descriptor.value, String(key).toUpperCase());
    }
    try {
      Object.defineProperty(wrapped, key, descriptor);
    } catch (_) {}
  }

  Object.defineProperty(wrapped, "__jdAutoEvalInstrumented", { value: true });
  return wrapped;
}

function wrapRequest(fn, method) {
  return function wrappedRequest(input, options) {
    const args = Array.from(arguments);
    args[0] = rewriteApiUrl(args[0]);
    const requestUrl = extractUrl(args[0], options);
    const promise = fn.apply(this, args);
    observePromise(promise, method, requestUrl);
    return promise;
  };
}

function rewriteApiUrl(input) {
  if (typeof input === "string") {
    return input.replace(/^http:\/\/api\.m\.jd\.com\//, "https://api.m.jd.com/");
  }

  if (input && typeof input === "object") {
    if (typeof input.href === "string" && input.href.startsWith("http://api.m.jd.com/")) {
      return new URL(input.href.replace(/^http:\/\/api\.m\.jd\.com\//, "https://api.m.jd.com/"));
    }

    if (typeof input.url === "string" && input.url.startsWith("http://api.m.jd.com/")) {
      return Object.assign({}, input, {
        url: input.url.replace(/^http:\/\/api\.m\.jd\.com\//, "https://api.m.jd.com/"),
      });
    }
  }

  return input;
}

function observePromise(promise, method, requestUrl) {
  if (!promise || typeof promise.then !== "function" || !shouldLog(requestUrl)) {
    return;
  }

  promise.then(
    (response) => {
      const statusCode = response && response.statusCode ? response.statusCode : "NO_STATUS";
      console.log("[HTTP " + statusCode + "] " + method + " " + formatUrl(requestUrl));
      console.log("[HTTP BODY] " + summarizeBody(response && response.body));
    },
    (error) => {
      const response = error && error.response;
      const statusCode = response && response.statusCode ? response.statusCode : "NO_RESPONSE";
      const message = error && error.message ? error.message : String(error);
      const code = error && error.code ? " code=" + error.code : "";
      const name = error && error.name ? " name=" + error.name : "";
      console.log("[HTTP ERROR " + statusCode + "] " + method + " " + formatUrl(requestUrl) + " message=" + message + code + name);
      console.log("[HTTP BODY] " + summarizeBody(response && response.body));
    }
  );
}

function extractUrl(input, options) {
  if (typeof input === "string") return input;
  if (input && typeof input.href === "string") return input.href;
  if (input && input.url) return String(input.url);
  if (options && options.url) return String(options.url);
  return "";
}

function shouldLog(requestUrl) {
  return /api\.m\.jd\.com|plogin\.m\.jd\.com|6dy\.oss-cn-hangzhou\.aliyuncs\.com/.test(requestUrl || "");
}

function formatUrl(requestUrl) {
  try {
    const url = new URL(requestUrl);
    const functionId = url.searchParams.get("functionId");
    return url.origin + url.pathname + (functionId ? "?functionId=" + functionId : "");
  } catch (_) {
    return requestUrl || "UNKNOWN_URL";
  }
}

function summarizeBody(body) {
  if (body === undefined) return "undefined";
  if (body === null) return "null";

  const text = Buffer.isBuffer(body) ? body.toString("utf8") : String(body);
  try {
    const data = JSON.parse(text);
    const info = {
      code: data.code,
      errCode: data.errCode,
      message: data.message || data.errMsg || data.msg,
      hasCommentWareListInfo: Boolean(data.commentWareListInfo),
      commentWareListCount: Array.isArray(data.commentWareListInfo && data.commentWareListInfo.commentWareList)
        ? data.commentWareListInfo.commentWareList.length
        : undefined,
      keys: Object.keys(data).slice(0, 12),
    };
    return JSON.stringify(info);
  } catch (_) {
    return text.replace(/\s+/g, " ").slice(0, 500);
  }
}
`;
}

function prepareJdCookie() {
  const rawCookie = process.env.JD_COOKIE || "";
  const cookies = rawCookie
    .split(/\n|&|\|\|/)
    .map((cookie) => cookie.trim())
    .filter((cookie) => cookie.includes("pt_key=") && cookie.includes("pt_pin="));

  if (!cookies.length) {
    console.log("未从 JD_COOKIE 读取到有效 Cookie，将继续交给原脚本处理本地 jdCookie.js");
    return;
  }

  const content = [
    '"use strict";',
    "const cookies = " + JSON.stringify(cookies) + ";",
    "cookies.forEach((cookie, index) => {",
    "  exports['CookieJD' + (index === 0 ? '' : index + 1)] = cookie;",
    "});",
    "exports.cookiesArr = cookies;",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(__dirname, "jdCookie.js"), content);
  console.log("已从 JD_COOKIE 生成 jdCookie.js，账号数量：" + cookies.length);
}

function buildChildEnvironment() {
  const prefixes = ["GITHUB_", "RUNNER_", "ACTIONS_"];
  const exactKeys = new Set(["CI"]);
  const childEnv = { ...process.env };

  for (const key of Object.keys(childEnv)) {
    if (exactKeys.has(key) || prefixes.some((prefix) => key.startsWith(prefix))) {
      delete childEnv[key];
    }
  }

  childEnv.ONEVAL = "true";
  console.log("已为子进程隐藏 GitHub Actions/CI 环境标识，避免上游脚本静默退出");
  return childEnv;
}

function downloadText(url, redirectCount = 0) {
  if (redirectCount > 5) {
    return Promise.reject(new Error("下载重定向次数过多：" + url));
  }

  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "jd-autoeval-action" } }, (response) => {
        const statusCode = response.statusCode || 0;
        const location = response.headers.location;

        if (statusCode >= 300 && statusCode < 400 && location) {
          response.resume();
          const nextUrl = new URL(location, url).toString();
          downloadText(nextUrl, redirectCount + 1).then(resolve, reject);
          return;
        }

        if (statusCode !== 200) {
          response.resume();
          reject(new Error("下载失败，HTTP 状态：" + statusCode));
          return;
        }

        response.setEncoding("utf8");
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}
