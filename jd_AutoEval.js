"use strict";

const fs = require("fs");
const https = require("https");
const path = require("path");
const vm = require("vm");

const SOURCE_URL =
  process.env.JD_AUTOEVAL_SOURCE_URL ||
  "https://raw.githubusercontent.com/shufflewzc/faker2/refs/heads/main/jd_AutoEval.js";

main().catch((error) => {
  console.error("带图评价晒单执行失败：" + (error && error.stack ? error.stack : error));
  process.exitCode = 1;
});

async function main() {
  prepareJdCookie();

  if (process.env.JD_AUTOEVAL_SELF_TEST === "1") {
    console.log("JD AutoEval Action 自检通过");
    return;
  }

  console.log("准备下载上游 jd_AutoEval.js");
  const source = await downloadText(SOURCE_URL);
  console.log("上游脚本下载完成，长度：" + source.length);

  const upstreamModule = { exports: {} };
  const runner = vm.runInThisContext(
    `(function(require, module, exports, __filename, __dirname) {\n${source}\n})`,
    { filename: "jd_AutoEval.upstream.js" }
  );
  runner(require, upstreamModule, upstreamModule.exports, path.join(__dirname, "jd_AutoEval.upstream.js"), __dirname);
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
