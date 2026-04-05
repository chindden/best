#!/usr/bin/env node

/**
 * 百度网盘活动领取脚本
 *
 * 必填环境变量：
 * - BAIDU_COOKIE
 *
 * 可选环境变量：
 * - BAIDU_ACTIVITY_URL
 * - BAIDU_DEBUG=1
 */

const BAIDU_COOKIE = process.env.BAIDU_COOKIE || "";
const BAIDU_DEBUG = process.env.BAIDU_DEBUG === "1";
const ACTIVITY_URL =
  process.env.BAIDU_ACTIVITY_URL ||
  "https://pan.baidu.com/comps/view/MV84NTZfMTAzMF8yODU2X29ubGluZQ==?channel=iPhone_26.4_iPhone17ProMax_chunlei_1099a_wifi&version=13.21.6&clienttype=1&devuid=c501314effd444412defc76d0150d9556268497c&logid=MjAyNjA0MDUxMDQ1Mjg2OTksMGY2MDcyNjRmYzYzMThhOTJiOWUxM2M2NWRiN2NkM2MsMjUwOA%3D%3D&vip=2&theme=white&topNavHeight=98.000000";

const USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/16C50 Quark/604.1 T7/10.3 SearchCraft/2.6.3 (Baidu; P1 8.0.0)";

const LOGIN_STATUS_URL =
  "https://pan.baidu.com/api/loginstatus?clienttype=1&version=13.21.6&channel=iPhone_26.4_iPhone17ProMax_chunlei_1099a_wifi&idfa=00000000-0000-0000-0000-000000000000&rand=a3d79ec36caa20b81f4a378e2127d8b039964682&time=1775357130&z=SCq5cb1IzUJUBduH6fQ1ML36BG6Z0fff__fx-TVOyu0DfrkyBdoI6qapnKMgdB3qL06n4-m8scNlrnz_9LxnhhA&rand2=59855465285f2069df3de0a0f81c04e88a29ffc0&cuid=B79287C1FBFCCA315705B8386F4FCF3AE2994058AFLMTTHGCKP&devuid=c501314effd444412defc76d0150d9556268497c&app=ios&caller=4012&idfv=1EDA5A91-2C28-4531-BA8B-0742982853AE&offlinepackage=%7B%222005%22:%7B%22version%22:93,%22packageName%22:%2220210201_1612161898763_93_online_pmall.zip%22%7D,%228003%22:%7B%22version%22:9,%22packageName%22:%2220241105_1730774793544.17307747.zip%22%7D,%228103%22:%7B%22version%22:46,%22packageName%22:%2220250415_1744710828098_online_30_graphic-main.zip%22%7D,%2210952%22:%7B%22version%22:16,%22packageName%22:%2220231228_1703751808696_3.4.0-local.12_pdfview-reader.zip%22%7D,%22123400%22:%7B%22version%22:266,%22packageName%22:%2220260318_1773832511895_online_125_search-h5-main.zip%22%7D,%22123401%22:%7B%22version%22:23,%22packageName%22:%2220250810_1754808576274_online_10_agent-h5-main.zip%22%7D,%22123409%22:%7B%22version%22:12,%22packageName%22:%22nd-aisearch-app%40113-prod-20250911-1h2k8t.zip%22%7D,%22123420%22:%7B%22version%22:60,%22packageName%22:%22starry-wap%40112-release-20260323.8928kb2lfgd.zip%22%7D,%22123433%22:%7B%22version%22:18,%22packageName%22:%22nd-ainote-homepage-app%40226-prod-20260310-y4af25.zip%22%7D,%22123434%22:%7B%22version%22:15,%22packageName%22:%22nd-ainote-notedetail-app%40226-prod-20260310-60kjbw.zip%22%7D,%22123438%22:%7B%22version%22:5,%22packageName%22:%22nd-ainote-search-app%40122-prod-20260310-xd8kgi.zip%22%7D,%22123466%22:%7B%22version%22:5,%22packageName%22:%2220210427_1619488678163_24_online_user.zip%22%7D,%22123833%22:%7B%22version%22:59,%22packageName%22:%2220260402_1775097320651_online_77_pdfview-main.zip%22%7D,%22400001%22:%7B%22version%22:28,%22packageName%22:%22nd-aijob-app%4058-prod-20260311-dptjgl.zip%22%7D,%22500001%22:%7B%22version%22:117,%22packageName%22:%22nd-aichat-app%40282-prod-20260325-lb17u3.zip%22%7D,%22500002%22:%7B%22version%22:35,%22packageName%22:%22nd-aichat-history%40149-prod-20260325-6engj1.zip%22%7D,%22700002%22:%7B%22version%22:7,%22packageName%22:%22nd-aichat-time-task%40120-prod-20260325-l26hjc.zip%22%7D,%22700021%22:%7B%22version%22:4,%22packageName%22:%22nd-ai-highlights-app%40142-prod-20260310-peu17h.zip%22%7D,%2220240709%22:%7B%22version%22:31,%22packageName%22:%2220250925_1758786315941_online_27_points-center-main.zip%22%7D,%2220241212%22:%7B%22version%22:4,%22packageName%22:%2220250121_1737456799984_user.zip%22%7D,%2220250827%22:%7B%22version%22:18,%22packageName%22:%2220260108_1767868142157_nsr.zip%22%7D,%2220250910%22:%7B%22version%22:30,%22packageName%22:%2220260402_1775097434471_user.zip%22%7D,%2220251118%22:%7B%22version%22:16,%22packageName%22:%2220260402_1775097467068_nsr.zip%22%7D,%2220260102%22:%7B%22version%22:10,%22packageName%22:%2220260213_1770971351283_user.zip%22%7D,%2220260317%22:%7B%22version%22:2,%22packageName%22:%2220260330_1774864364032_nsr.zip%22%7D%7D&aid=1002&themeinfo=0";

const SEND_FREE_URL_TEMPLATE =
  "https://pan.baidu.com/act/v2/component/sendfree/home?clienttype=1&version=13.21.6&channel=iPhone_26.4_iPhone17ProMax_chunlei_1099a_wifi&idfa=00000000-0000-0000-0000-000000000000&rand=a3d79ec36caa20b81f4a378e2127d8b039964682&time=1775357130&z=SCq5cb1IzUJUBduH6fQ1ML36BG6Z0fff__fx-TVOyu0DfrkyBdoI6qapnKMgdB3qL06n4-m8scNlrnz_9LxnhhA&rand2=59855465285f2069df3de0a0f81c04e88a29ffc0&cuid=B79287C1FBFCCA315705B8386F4FCF3AE2994058AFLMTTHGCKP&devuid=c501314effd444412defc76d0150d9556268497c&app=ios&caller=4012&idfv=1EDA5A91-2C28-4531-BA8B-0742982853AE&offlinepackage=%7B%222005%22:%7B%22version%22:93,%22packageName%22:%2220210201_1612161898763_93_online_pmall.zip%22%7D,%228003%22:%7B%22version%22:9,%22packageName%22:%2220241105_1730774793544.17307747.zip%22%7D,%228103%22:%7B%22version%22:46,%22packageName%22:%2220250415_1744710828098_online_30_graphic-main.zip%22%7D,%2210952%22:%7B%22version%22:16,%22packageName%22:%2220231228_1703751808696_3.4.0-local.12_pdfview-reader.zip%22%7D,%22123400%22:%7B%22version%22:266,%22packageName%22:%2220260318_1773832511895_online_125_search-h5-main.zip%22%7D,%22123401%22:%7B%22version%22:23,%22packageName%22:%2220250810_1754808576274_online_10_agent-h5-main.zip%22%7D,%22123409%22:%7B%22version%22:12,%22packageName%22:%22nd-aisearch-app@113-prod-20250911-1h2k8t.zip%22%7D,%22123420%22:%7B%22version%22:60,%22packageName%22:%22starry-wap@112-release-20260323.8928kb2lfgd.zip%22%7D,%22123433%22:%7B%22version%22:18,%22packageName%22:%22nd-ainote-homepage-app@226-prod-20260310-y4af25.zip%22%7D,%22123434%22:%7B%22version%22:15,%22packageName%22:%22nd-ainote-notedetail-app@226-prod-20260310-60kjbw.zip%22%7D,%22123438%22:%7B%22version%22:5,%22packageName%22:%22nd-ainote-search-app@122-prod-20260310-xd8kgi.zip%22%7D,%22123466%22:%7B%22version%22:5,%22packageName%22:%2220210427_1619488678163_24_online_user.zip%22%7D,%22123833%22:%7B%22version%22:59,%22packageName%22:%2220260402_1775097320651_online_77_pdfview-main.zip%22%7D,%22400001%22:%7B%22version%22:28,%22packageName%22:%22nd-aijob-app@58-prod-20260311-dptjgl.zip%22%7D,%22500001%22:%7B%22version%22:117,%22packageName%22:%22nd-aichat-app@282-prod-20260325-lb17u3.zip%22%7D,%22500002%22:%7B%22version%22:35,%22packageName%22:%22nd-aichat-history@149-prod-20260325-6engj1.zip%22%7D,%22700002%22:%7B%22version%22:7,%22packageName%22:%22nd-aichat-time-task@120-prod-20260325-l26hjc.zip%22%7D,%22700021%22:%7B%22version%22:4,%22packageName%22:%22nd-ai-highlights-app@142-prod-20260310-peu17h.zip%22%7D,%2220240709%22:%7B%22version%22:31,%22packageName%22:%2220250925_1758786315941_online_27_points-center-main.zip%22%7D,%2220241212%22:%7B%22version%22:4,%22packageName%22:%2220250121_1737456799984_user.zip%22%7D,%2220250827%22:%7B%22version%22:18,%22packageName%22:%2220260108_1767868142157_nsr.zip%22%7D,%2220250910%22:%7B%22version%22:30,%22packageName%22:%2220260402_1775097434471_user.zip%22%7D,%2220251118%22:%7B%22version%22:16,%22packageName%22:%2220260402_1775097467068_nsr.zip%22%7D,%2220260102%22:%7B%22version%22:10,%22packageName%22:%2220260213_1770971351283_user.zip%22%7D,%2220260317%22:%7B%22version%22:2,%22packageName%22:%2220260330_1774864364032_nsr.zip%22%7D%7D&aid=1002&themeinfo=0&tid=791651720424&ptid=548971720424&comp_ver=2&action=send_prod_info&jsToken=__JSTOKEN__";

const SEND_GIFT_URL_TEMPLATE =
  "https://pan.baidu.com/act/celebrationday/sendgift?clienttype=1&version=13.21.6&channel=iPhone_26.4_iPhone17ProMax_chunlei_1099a_wifi&idfa=00000000-0000-0000-0000-000000000000&rand=a3d79ec36caa20b81f4a378e2127d8b039964682&time=1775357130&z=SCq5cb1IzUJUBduH6fQ1ML36BG6Z0fff__fx-TVOyu0DfrkyBdoI6qapnKMgdB3qL06n4-m8scNlrnz_9LxnhhA&rand2=59855465285f2069df3de0a0f81c04e88a29ffc0&cuid=B79287C1FBFCCA315705B8386F4FCF3AE2994058AFLMTTHGCKP&devuid=c501314effd444412defc76d0150d9556268497c&app=ios&caller=4012&idfv=1EDA5A91-2C28-4531-BA8B-0742982853AE&offlinepackage=%7B%222005%22:%7B%22version%22:93,%22packageName%22:%2220210201_1612161898763_93_online_pmall.zip%22%7D,%228003%22:%7B%22version%22:9,%22packageName%22:%2220241105_1730774793544.17307747.zip%22%7D,%228103%22:%7B%22version%22:46,%22packageName%22:%2220250415_1744710828098_online_30_graphic-main.zip%22%7D,%2210952%22:%7B%22version%22:16,%22packageName%22:%2220231228_1703751808696_3.4.0-local.12_pdfview-reader.zip%22%7D,%22123400%22:%7B%22version%22:266,%22packageName%22:%2220260318_1773832511895_online_125_search-h5-main.zip%22%7D,%22123401%22:%7B%22version%22:23,%22packageName%22:%2220250810_1754808576274_online_10_agent-h5-main.zip%22%7D,%22123409%22:%7B%22version%22:12,%22packageName%22:%22nd-aisearch-app@113-prod-20250911-1h2k8t.zip%22%7D,%22123420%22:%7B%22version%22:60,%22packageName%22:%22starry-wap@112-release-20260323.8928kb2lfgd.zip%22%7D,%22123433%22:%7B%22version%22:18,%22packageName%22:%22nd-ainote-homepage-app@226-prod-20260310-y4af25.zip%22%7D,%22123434%22:%7B%22version%22:15,%22packageName%22:%22nd-ainote-notedetail-app@226-prod-20260310-60kjbw.zip%22%7D,%22123438%22:%7B%22version%22:5,%22packageName%22:%22nd-ainote-search-app@122-prod-20260310-xd8kgi.zip%22%7D,%22123466%22:%7B%22version%22:5,%22packageName%22:%2220210427_1619488678163_24_online_user.zip%22%7D,%22123833%22:%7B%22version%22:59,%22packageName%22:%2220260402_1775097320651_online_77_pdfview-main.zip%22%7D,%22400001%22:%7B%22version%22:28,%22packageName%22:%22nd-aijob-app@58-prod-20260311-dptjgl.zip%22%7D,%22500001%22:%7B%22version%22:117,%22packageName%22:%22nd-aichat-app@282-prod-20260325-lb17u3.zip%22%7D,%22500002%22:%7B%22version%22:35,%22packageName%22:%22nd-aichat-history@149-prod-20260325-6engj1.zip%22%7D,%22700002%22:%7B%22version%22:7,%22packageName%22:%22nd-aichat-time-task@120-prod-20260325-l26hjc.zip%22%7D,%22700021%22:%7B%22version%22:4,%22packageName%22:%22nd-ai-highlights-app@142-prod-20260310-peu17h.zip%22%7D,%2220240709%22:%7B%22version%22:31,%22packageName%22:%2220250925_1758786315941_online_27_points-center-main.zip%22%7D,%2220241212%22:%7B%22version%22:4,%22packageName%22:%2220250121_1737456799984_user.zip%22%7D,%2220250827%22:%7B%22version%22:18,%22packageName%22:%2220260108_1767868142157_nsr.zip%22%7D,%2220250910%22:%7B%22version%22:30,%22packageName%22:%2220260402_1775097434471_user.zip%22%7D,%2220251118%22:%7B%22version%22:16,%22packageName%22:%2220260402_1775097467068_nsr.zip%22%7D,%2220260102%22:%7B%22version%22:10,%22packageName%22:%2220260213_1770971351283_user.zip%22%7D,%2220260317%22:%7B%22version%22:2,%22packageName%22:%2220260330_1774864364032_nsr.zip%22%7D%7D&aid=13469&themeinfo=0&comp_ver=2&tid=791651720424&ptid=548971720424&c=B79287C1FBFCCA315705B8386F4FCF3AE2994058AFLMTTHGCKP&ver=13.21.6&ev=red_envelope&hjs=1&jsToken=__JSTOKEN__&jt=31$eyJrIj4iNyI0Iix5IkciQEdIR0ZJTEdKSlJMSyJJIkFqIjwiNTw9PDs%2BQTw%2FP0dBQCI%2BIjYzIlEiSlFSUVBTVjE0Mjk4NyIzIit5IkYiQz9AQSI%2FIjkiUSJMSFBKTk8iLCJsIj4iTFYtTSljMVFbQ1opd0haRWEyXVJBOWNVdGJPcGtTeDQpWktubltCMC52eTR0VlteLF5lZWg9MGpsOFozKlB1c3BYYlF3YWQ0dWlSNHVnYjNJX0tQQXVQTEN2RWpDXHlXODsvX0BaeWctQmI4Wz5FM2VoOGplaDBfaDA1NE1sV3ZgOzBxLVZWYnVUO2QqWXpuPjVbaT1cVTUxZ0xOZipeUjo8cGtZeUV4K2M7RC1KYW15XkkycWoxQ2E4eXNkTCtKTnNNPXlCcXFydFwzQXdXbi9HSDtcZ0s7NWpMZ0lSUlhLSG52UU9PY3lDRUVWXXgqODVZaGw9aT5iU0huWG5mdF45anRsY1BkYTdSNUNWbW9tLGY%2FMm51T0RqMUxKbXNvNTt2MUJ0YWcsMUBCQVYqSmAxWkpPU1Qxbj40eEZYPFlNLVlZXi9jcERHYEpYd0pWOE07M29OYmxWNytUWTRGZy1eOF9VNnBkNENqdndhRHltXSkrSk8wdElPTFJKKWZVb1BAPj94KSlHY2hZOFpuM041SF1mcU9rZVRVM1FbclFJVjBeUXoxc3NAXkIzKWBKX2pfUmg6OFBvT3d5emxwVHxPWy08XFFucEBBLXl5OlpBSzJEMzhlLm1HME1DZFNWXXlaOVZxZWdFRjB4T3xFRXxKTU4tTyxUMlFiMzloZjdnOz9qP0NyRT9DQ3NDTEZ3SiJ9";

const PRIZE_LIST_URL_TEMPLATE =
  "https://pan.baidu.com/act/v2/component/prizelistv2?clienttype=1&version=13.21.6&channel=iPhone_26.4_iPhone17ProMax_chunlei_1099a_wifi&idfa=00000000-0000-0000-0000-000000000000&rand=a3d79ec36caa20b81f4a378e2127d8b039964682&time=1775357130&z=SCq5cb1IzUJUBduH6fQ1ML36BG6Z0fff__fx-TVOyu0DfrkyBdoI6qapnKMgdB3qL06n4-m8scNlrnz_9LxnhhA&rand2=59855465285f2069df3de0a0f81c04e88a29ffc0&cuid=B79287C1FBFCCA315705B8386F4FCF3AE2994058AFLMTTHGCKP&devuid=c501314effd444412defc76d0150d9556268497c&app=ios&caller=4012&idfv=1EDA5A91-2C28-4531-BA8B-0742982853AE&offlinepackage=%7B%222005%22:%7B%22version%22:93,%22packageName%22:%2220210201_1612161898763_93_online_pmall.zip%22%7D,%228003%22:%7B%22version%22:9,%22packageName%22:%2220241105_1730774793544.17307747.zip%22%7D,%228103%22:%7B%22version%22:46,%22packageName%22:%2220250415_1744710828098_online_30_graphic-main.zip%22%7D,%2210952%22:%7B%22version%22:16,%22packageName%22:%2220231228_1703751808696_3.4.0-local.12_pdfview-reader.zip%22%7D,%22123400%22:%7B%22version%22:266,%22packageName%22:%2220260318_1773832511895_online_125_search-h5-main.zip%22%7D,%22123401%22:%7B%22version%22:23,%22packageName%22:%2220250810_1754808576274_online_10_agent-h5-main.zip%22%7D,%22123409%22:%7B%22version%22:12,%22packageName%22:%22nd-aisearch-app@113-prod-20250911-1h2k8t.zip%22%7D,%22123420%22:%7B%22version%22:60,%22packageName%22:%22starry-wap@112-release-20260323.8928kb2lfgd.zip%22%7D,%22123433%22:%7B%22version%22:18,%22packageName%22:%22nd-ainote-homepage-app@226-prod-20260310-y4af25.zip%22%7D,%22123434%22:%7B%22version%22:15,%22packageName%22:%22nd-ainote-notedetail-app@226-prod-20260310-60kjbw.zip%22%7D,%22123438%22:%7B%22version%22:5,%22packageName%22:%22nd-ainote-search-app@122-prod-20260310-xd8kgi.zip%22%7D,%22123466%22:%7B%22version%22:5,%22packageName%22:%2220210427_1619488678163_24_online_user.zip%22%7D,%22123833%22:%7B%22version%22:59,%22packageName%22:%2220260402_1775097320651_online_77_pdfview-main.zip%22%7D,%22400001%22:%7B%22version%22:28,%22packageName%22:%22nd-aijob-app@58-prod-20260311-dptjgl.zip%22%7D,%22500001%22:%7B%22version%22:117,%22packageName%22:%22nd-aichat-app@282-prod-20260325-lb17u3.zip%22%7D,%22500002%22:%7B%22version%22:35,%22packageName%22:%22nd-aichat-history@149-prod-20260325-6engj1.zip%22%7D,%22700002%22:%7B%22version%22:7,%22packageName%22:%22nd-aichat-time-task@120-prod-20260325-l26hjc.zip%22%7D,%22700021%22:%7B%22version%22:4,%22packageName%22:%22nd-ai-highlights-app@142-prod-20260310-peu17h.zip%22%7D,%2220240709%22:%7B%22version%22:31,%22packageName%22:%2220250925_1758786315941_online_27_points-center-main.zip%22%7D,%2220241212%22:%7B%22version%22:4,%22packageName%22:%2220250121_1737456799984_user.zip%22%7D,%2220250827%22:%7B%22version%22:18,%22packageName%22:%2220260108_1767868142157_nsr.zip%22%7D,%2220250910%22:%7B%22version%22:30,%22packageName%22:%2220260402_1775097434471_user.zip%22%7D,%2220251118%22:%7B%22version%22:16,%22packageName%22:%2220260402_1775097467068_nsr.zip%22%7D,%2220260102%22:%7B%22version%22:10,%22packageName%22:%2220260213_1770971351283_user.zip%22%7D,%2220260317%22:%7B%22version%22:2,%22packageName%22:%2220260330_1774864364032_nsr.zip%22%7D%7D&aid=1002&themeinfo=0&page=1&limit=10&ptid=%5B965371710835,153691710836%5D&jsToken=__JSTOKEN__";

function debug(...args) {
  if (BAIDU_DEBUG) {
    console.log("[DEBUG]", ...args);
  }
}

function ensureCookie() {
  if (!BAIDU_COOKIE.trim()) {
    throw new Error("缺少 BAIDU_COOKIE 环境变量");
  }
}

function buildHeaders(extra = {}) {
  return {
    "user-agent": USER_AGENT,
    cookie: BAIDU_COOKIE,
    referer: ACTIVITY_URL,
    "x-requested-with": "XMLHttpRequest",
    accept: "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh-Hans;q=0.9",
    ...extra,
  };
}

async function requestText(url, extraHeaders = {}) {
  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(extraHeaders),
  });

  const text = await response.text();
  debug("GET", response.status, url);
  debug(text.slice(0, 500));

  if (!response.ok) {
    throw new Error(`请求失败 ${response.status}: ${url}`);
  }

  return text;
}

async function requestJson(url) {
  const text = await requestText(url);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`JSON 解析失败: ${text.slice(0, 300)}`);
  }
}

function extractJsToken(html) {
  const patterns = [
    /window\.jsToken\s*=\s*"([^"]+)"/,
    /fn%28%22([A-F0-9]{32,})%22%29/,
    /fn\("([A-F0-9]{32,})"\)/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return match[1];
    }
  }

  throw new Error("未能从活动页提取 jsToken");
}

function fillToken(url, jsToken) {
  return url.replace("__JSTOKEN__", encodeURIComponent(jsToken));
}

function getSendFreeInfo(data) {
  return data?.data?.send_prod_info || null;
}

function getLoginUsername(data) {
  return data?.login_info?.username || "未知用户";
}

function formatDateTimeInShanghai(date) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((item) => item.type === "year")?.value || "0000";
  const month = parts.find((item) => item.type === "month")?.value || "00";
  const day = parts.find((item) => item.type === "day")?.value || "00";
  const hour = parts.find((item) => item.type === "hour")?.value || "00";
  const minute = parts.find((item) => item.type === "minute")?.value || "00";
  const second = parts.find((item) => item.type === "second")?.value || "00";

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function findFirstEndTime(value) {
  if (value == null) {
    return null;
  }

  if (typeof value === "string") {
    const parsed = safeJsonParse(value);
    if (parsed) {
      return findFirstEndTime(parsed);
    }
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const result = findFirstEndTime(item);
      if (result) {
        return result;
      }
    }
    return null;
  }

  if (typeof value === "object") {
    if (typeof value.end_time === "number") {
      return value.end_time;
    }

    if (typeof value.end_time === "string" && /^\d+$/.test(value.end_time)) {
      return Number(value.end_time);
    }

    for (const child of Object.values(value)) {
      const result = findFirstEndTime(child);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

function getFallbackNextClaimDate(baseTimestamp) {
  const baseDate = new Date((baseTimestamp || Math.floor(Date.now() / 1000)) * 1000);
  const nextMonthDate = new Date(baseDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  return formatDateTimeInShanghai(nextMonthDate);
}

function resolveNextClaimDate({ sendGiftData, prizeListData, baseTimestamp }) {
  const sendGiftEndTime = findFirstEndTime(sendGiftData?.data?.goods_info);
  if (sendGiftEndTime) {
    return formatDateTimeInShanghai(new Date(sendGiftEndTime * 1000));
  }

  const prizeListEndTime = findFirstEndTime(prizeListData?.data?.list);
  if (prizeListEndTime) {
    return formatDateTimeInShanghai(new Date(prizeListEndTime * 1000));
  }

  return getFallbackNextClaimDate(baseTimestamp);
}

function printSummary({ username, currentStatus, resultText, nextClaimDate }) {
  console.log(`用户名：${username}`);
  console.log(`当前领取状态：${currentStatus}`);
  console.log(`领取结果：${resultText}，下次领取时间${nextClaimDate}`);
}

async function main() {
  ensureCookie();

  const html = await requestText(ACTIVITY_URL, {
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  });
  const jsToken = extractJsToken(html);
  debug("jsToken:", jsToken);
  const loginStatusData = await requestJson(LOGIN_STATUS_URL);
  const username = getLoginUsername(loginStatusData);

  const sendFreeUrl = fillToken(SEND_FREE_URL_TEMPLATE, jsToken);
  const sendFreeData = await requestJson(sendFreeUrl);
  const sendFreeInfo = getSendFreeInfo(sendFreeData);

  if (!sendFreeInfo) {
    throw new Error(`查询可领状态失败: ${JSON.stringify(sendFreeData)}`);
  }

  const currentStatus = sendFreeInfo.user_get_left === 0 ? "已领取" : "未领取";
  const prizeListUrl = fillToken(PRIZE_LIST_URL_TEMPLATE, jsToken);

  if (sendFreeInfo.user_get_left === 0) {
    const prizeListData = await requestJson(prizeListUrl).catch(() => null);
    printSummary({
      username,
      currentStatus,
      resultText: "无法重复领取",
      nextClaimDate: resolveNextClaimDate({
        prizeListData,
        baseTimestamp: sendFreeData.server_time,
      }),
    });
    return;
  }

  const sendGiftUrl = fillToken(SEND_GIFT_URL_TEMPLATE, jsToken);
  const sendGiftData = await requestJson(sendGiftUrl);

  if (sendGiftData.errno === 0) {
    printSummary({
      username,
      currentStatus,
      resultText: "成功领取",
      nextClaimDate: resolveNextClaimDate({
        sendGiftData,
        baseTimestamp: sendFreeData.server_time,
      }),
    });
    return;
  }

  if (/已领取|已经领取/.test(sendGiftData.errmsg || "")) {
    const prizeListData = await requestJson(prizeListUrl).catch(() => null);
    printSummary({
      username,
      currentStatus: "已领取",
      resultText: "无法重复领取",
      nextClaimDate: resolveNextClaimDate({
        sendGiftData,
        prizeListData,
        baseTimestamp: sendFreeData.server_time,
      }),
    });
    return;
  }

  throw new Error(`领取失败: ${JSON.stringify(sendGiftData)}`);
}

main().catch((error) => {
  console.error("运行失败:", error.message);
  process.exit(1);
});
