

hostname = *.pglstatp-toutiao.com,*.pangolin-sdk-toutiao.com,*.ctobsnssdk.com,*.snssdk.com,adim.pinduoduo.com,*.pstatp.com,*.umengcloud,ulogs.umeng.com,googleads.g.doubleclick.net

^http[s]?:\/\/.+\.pglstatp-toutiao\.com url reject-200
^http[s]?:\/\/.+\.pangolin-sdk-toutiao\.com url reject-200
^http[s]?:\/\/.+\.ctobsnssdk\.com url reject-200
^http[s]?:\/\/.+\.snssdk\.com url reject-200
^http[s]?:\/\/adim\.pinduoduo\.com url reject-200
^http[s]?:\/\/.+\.pstatp\.com url reject-200
^http[s]?:\/\/.+\.umengcloud\.com url reject-200
^http[s]?:\/\/ulogs\.umeng\.com url reject-200
^http[s]?:\/\/googleads\.g\.doubleclick\.net url reject-200

^http[s]?:\/\/(.+)\/init\?v=(.+) url 302 $1 bdfgg$2 ksksq
