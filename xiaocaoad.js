#榛戠鎶€鎵撻€犵鍒╁悎闆�
#寰俊鍏紬鍙凤細ios榛戠鎶€
#瀹樻柟缃戠珯锛歴7aa.cn

hostname = *.pglstatp-toutiao.com,*.pangolin-sdk-toutiao.com,*.ctobsnssdk.com,*.snssdk.com,adim.pinduoduo.com,*.pstatp.com,*.umengcloud,ulogs.umeng.com,googleads.g.doubleclick.net


#閫氱敤鍘诲箍鍛�

^http[s]?:\/\/.+\.pglstatp-toutiao\.com url reject-200
^http[s]?:\/\/.+\.pangolin-sdk-toutiao\.com url reject-200
^http[s]?:\/\/.+\.ctobsnssdk\.com url reject-200
^http[s]?:\/\/.+\.snssdk\.com url reject-200
^http[s]?:\/\/adim\.pinduoduo\.com url reject-200
^http[s]?:\/\/.+\.pstatp\.com url reject-200
^http[s]?:\/\/.+\.umengcloud\.com url reject-200
^http[s]?:\/\/ulogs\.umeng\.com url reject-200
^http[s]?:\/\/googleads\.g\.doubleclick\.net url reject-200


#灏忓皬褰辫
^http[s]?:\/\/(.+)\/init\?v=(.+) url 302 $1 bdfgg$2 ksksq
