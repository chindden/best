/*
app:图虫
功能:完成日常任务得金币，金币每天会自动兑换成现金
目前看视频广告任务没写、发布图文没写（以后加，或者有大佬没事的可以加一下）
每天运行1-2次即可，18 8,18 * * *
运行频繁会导致ip被黑，就无法正常登录了，切换一下网络重启一下路由即可
变量名:Tcck,手机登录软件后，去设置里修改登录密码，变量填手机号#密码
建议新人任务手动完成一下，也不少金币呢
*/
const _0x18338f=_0x3437;(function(_0x4813fb,_0x36d589){const _0x55577d=_0x3437,_0x260a3a=_0x4813fb();while(!![]){try{const _0x187197=-parseInt(_0x55577d(0x143))/0x1*(-parseInt(_0x55577d(0x171))/0x2)+parseInt(_0x55577d(0x167))/0x3+parseInt(_0x55577d(0x177))/0x4+parseInt(_0x55577d(0x123))/0x5*(parseInt(_0x55577d(0xf6))/0x6)+parseInt(_0x55577d(0x17f))/0x7+parseInt(_0x55577d(0x156))/0x8+parseInt(_0x55577d(0x103))/0x9*(-parseInt(_0x55577d(0x102))/0xa);if(_0x187197===_0x36d589)break;else _0x260a3a['push'](_0x260a3a['shift']());}catch(_0xb2434a){_0x260a3a['push'](_0x260a3a['shift']());}}}(_0x1b40,0x813d4));const $=new Env('图虫');let envSplitor=['@','\x0a'],result,resurq,resurp,userList=[],usid=0x0,userCount=0x0,OooOo=_0x18338f(0xf4),userCookie=($['isNode']()?process[_0x18338f(0x169)][OooOo]:$[_0x18338f(0x127)](OooOo))||'';class UserInfo{constructor(_0x43cd63){const _0x3a3533=_0x18338f;this['_']=++usid,this['f']=_0x3a3533(0xe9)+this['_']+']\x20',this['ck']=_0x43cd63[_0x3a3533(0x179)]('#'),this['i']=this['ck'][0x0],this['p']=this['ck'][0x1];}async['task'](){const _0x1ec749=_0x18338f;await this[_0x1ec749(0x159)](),await this[_0x1ec749(0x191)](),await this[_0x1ec749(0x136)](),await this[_0x1ec749(0x144)](),await this[_0x1ec749(0xf5)]();}async[_0x18338f(0x159)](){const _0x37dd44=_0x18338f;this['ts']=Math[_0x37dd44(0x18a)](new Date()[_0x37dd44(0x166)]())[_0x37dd44(0x131)](),this['h']={'version':_0x37dd44(0xe3),'channel':_0x37dd44(0x163),'accept-encoding':_0x37dd44(0x115),'Host':'api.tuchong.com','platform':_0x37dd44(0x181),'host-name':_0x37dd44(0x133),'content-type':_0x37dd44(0x146),'content-length':'40','user-agent':_0x37dd44(0xfb)},this[_0x37dd44(0x186)]=_0x37dd44(0x13b)+this['p']+_0x37dd44(0x15e)+this['i'],await httpRequest(_0x37dd44(0x109),popu(_0x37dd44(0x183)+this['ts']+_0x37dd44(0x17c),this['h'],this['data'])),this[_0x37dd44(0x161)]=result[_0x37dd44(0x161)],console['log'](this['f']+':'+result['message']);}async['signin'](){const _0x370792=_0x18338f;this['h']={'accept':_0x370792(0x13d),'token':''+this[_0x370792(0x161)],'accept-encoding':'gzip,\x20deflate','Host':'m.tuchong.com','platform':_0x370792(0x181),'cookie':_0x370792(0xe2)+this['token'],'referer':'https://m.tuchong.com/app-point?no_more=1&no_inset=1','content-type':_0x370792(0x146),'x-requested-with':'com.ss.android.tuchong','user-agent':_0x370792(0x155)},await httpRequest(_0x370792(0xea),popu(_0x370792(0xee),this['h'])),console[_0x370792(0x110)](this['f']+_0x370792(0x182)+result[_0x370792(0x12d)]);}async['box'](){const _0xe7912d=_0x18338f;this['h']={'accept':_0xe7912d(0x13d),'token':''+this[_0xe7912d(0x161)],'accept-encoding':'gzip,\x20deflate','Host':_0xe7912d(0x14c),'platform':_0xe7912d(0x181),'cookie':'token='+this['token'],'referer':_0xe7912d(0x11f),'content-type':_0xe7912d(0x146),'x-requested-with':_0xe7912d(0x152),'user-agent':'Mozilla/5.0\x20(Linux;\x20Android\x2011;\x20M2011K2C\x20Build/RKQ1.200928.002;\x20wv)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Version/4.0\x20Chrome/86.0.4240.185\x20Mobile\x20Safari/537.36\x20Tuchong/7.39.1(android)'},await httpRequest(_0xe7912d(0xea),popu(_0xe7912d(0xf3),this['h'])),console[_0xe7912d(0x110)](this['f']+_0xe7912d(0x13f)+result[_0xe7912d(0x18b)]);}async[_0x18338f(0x144)](){const _0x4ece0c=_0x18338f;this['sz']=rand(0x1,0xa),this['ts']=Math['round'](new Date()['getTime']())[_0x4ece0c(0x131)](),this['h']={'version':_0x4ece0c(0xe3),'channel':_0x4ece0c(0x163),'accept-encoding':'gzip','Host':_0x4ece0c(0x151),'platform':_0x4ece0c(0x181),'host-name':_0x4ece0c(0x151),'content-type':'application/x-www-form-urlencoded','content-length':'40','user-agent':'okhttp/3.12.2\x20com.ss.android.tuchong\x20(Tuchong:\x207391\x207.39.1)\x20(Android:\x2011\x2030)'},await httpRequest('get',popu(_0x4ece0c(0x121)+this['ts']+_0x4ece0c(0x17c),this['h'])),this['feedid']=result['feedList'][this['sz']]['data_id'],console[_0x4ece0c(0x110)](this['f']+_0x4ece0c(0x139)+this[_0x4ece0c(0x16e)]),await this[_0x4ece0c(0xed)](),await this['plun'](),await this[_0x4ece0c(0x16f)]();}async[_0x18338f(0xed)](){const _0x3ab261=_0x18338f;this['h']={'version':_0x3ab261(0xe3),'channel':'xiaomi','token':''+this['token'],'accept-encoding':_0x3ab261(0x115),'Host':'tuchong.com','platform':_0x3ab261(0x181),'host-name':_0x3ab261(0x151),'content-type':_0x3ab261(0x146),'content-length':'17','user-agent':_0x3ab261(0xfb)},this[_0x3ab261(0x186)]=_0x3ab261(0xf2)+this[_0x3ab261(0x16e)],await httpRequest(_0x3ab261(0x157),popu('https://tuchong.com/gapi/interactive/favorite?_rticket='+this['ts']+'&app_name=tuchong',this['h'],this[_0x3ab261(0x186)])),console[_0x3ab261(0x110)](this['f']+':'+result[_0x3ab261(0x12d)]);}async[_0x18338f(0x147)](){const _0x45d2d5=_0x18338f;this['t']=_0x45d2d5(0x11b),this['h']={'version':_0x45d2d5(0xe3),'channel':_0x45d2d5(0x163),'token':''+this[_0x45d2d5(0x161)],'accept-encoding':_0x45d2d5(0x115),'Host':_0x45d2d5(0x133),'platform':_0x45d2d5(0x181),'host-name':_0x45d2d5(0x133),'content-type':_0x45d2d5(0x146),'content-length':'89','user-agent':_0x45d2d5(0xfb)},this[_0x45d2d5(0x186)]=_0x45d2d5(0x15c)+this['t']+_0x45d2d5(0x178),await httpRequest(_0x45d2d5(0x109),popu(_0x45d2d5(0x176)+this[_0x45d2d5(0x16e)]+_0x45d2d5(0x122)+this['ts']+_0x45d2d5(0x17c),this['h'],this[_0x45d2d5(0x186)])),console[_0x45d2d5(0x110)](this['f']+':评论:'+result['result']);}async[_0x18338f(0x16f)](){const _0x2c88f5=_0x18338f;this['h']={'version':_0x2c88f5(0xe3),'channel':_0x2c88f5(0x163),'token':''+this['token'],'accept-encoding':_0x2c88f5(0x115),'Host':_0x2c88f5(0x151),'platform':_0x2c88f5(0x181),'host-name':_0x2c88f5(0x151),'content-type':_0x2c88f5(0x146),'content-length':'16','user-agent':'okhttp/3.12.2\x20com.ss.android.tuchong\x20(Tuchong:\x207391\x207.39.1)\x20(Android:\x2011\x2030)'},this[_0x2c88f5(0x186)]=_0x2c88f5(0x18f)+this['feedid'],await httpRequest(_0x2c88f5(0x157),popu(_0x2c88f5(0x135)+this['ts']+'&app_name=tuchong',this['h'],this[_0x2c88f5(0x186)])),console['log'](this['f']+':'+result[_0x2c88f5(0x12d)]);}async[_0x18338f(0xf5)](){const _0x57da90=_0x18338f;this['sz']=rand(0x1,0xa),this['ts']=Math[_0x57da90(0x18a)](new Date()[_0x57da90(0x166)]())['toString'](),this['h']={'version':'7391','channel':'xiaomi','accept-encoding':_0x57da90(0x115),'Host':'tuchong.com','platform':_0x57da90(0x181),'host-name':_0x57da90(0x151),'content-type':_0x57da90(0x146),'user-agent':_0x57da90(0xfb)},await httpRequest(_0x57da90(0xea),popu(_0x57da90(0x14f)+this['ts']+_0x57da90(0x17c),this['h'])),this[_0x57da90(0x17d)]=result[_0x57da90(0x174)][this['sz']][_0x57da90(0xf1)],this['auid']=result[_0x57da90(0x174)][this['sz']]['entry'][_0x57da90(0x189)][_0x57da90(0x14b)],console['log'](this['f']+_0x57da90(0x190)+this[_0x57da90(0x17d)]),await this[_0x57da90(0x154)]();}async[_0x18338f(0x154)](){const _0x2f6f73=_0x18338f;this['h']={'version':'7391','channel':_0x2f6f73(0x163),'token':''+this['token'],'accept-encoding':'gzip','Host':_0x2f6f73(0x133),'platform':'android','host-name':_0x2f6f73(0x133),'content-type':_0x2f6f73(0x146),'content-length':'89','user-agent':_0x2f6f73(0xfb)},this['data']=_0x2f6f73(0x137)+this[_0x2f6f73(0x17d)]+'&content_type=video&author_id='+this[_0x2f6f73(0x160)]+_0x2f6f73(0x15b),await httpRequest(_0x2f6f73(0x109),popu(_0x2f6f73(0x187)+this['ts']+_0x2f6f73(0x17c),this['h'],this[_0x2f6f73(0x186)])),console['log'](this['f']+_0x2f6f73(0x140)+result[_0x2f6f73(0x18b)]);}}!(async()=>{if(!await checkEnv())return;for(let _0x443c18 of userList)await _0x443c18['task']();})()[_0x18338f(0x16b)](_0x566439=>console[_0x18338f(0x110)](_0x566439))[_0x18338f(0x112)](()=>$[_0x18338f(0x119)]());function encrypt(_0x3106a2){const _0xc53a00=_0x18338f;return CryptoJS[_0xc53a00(0x175)][_0xc53a00(0x100)](_0x3106a2,CryptoJS['enc']['Utf8'][_0xc53a00(0x192)](key),{'iv':CryptoJS[_0xc53a00(0xfc)][_0xc53a00(0x15d)][_0xc53a00(0x192)](iv),'mode':CryptoJS['mode'][_0xc53a00(0x13e)],'padding':CryptoJS[_0xc53a00(0xfa)][_0xc53a00(0x170)]})[_0xc53a00(0x131)]();}function _0x3437(_0x5ea686,_0x53e48b){const _0x1b407a=_0x1b40();return _0x3437=function(_0x34376a,_0x2d7275){_0x34376a=_0x34376a-0xe1;let _0x5ae33d=_0x1b407a[_0x34376a];return _0x5ae33d;},_0x3437(_0x5ea686,_0x53e48b);}function decrypt(_0x534051){const _0x21c9e1=_0x18338f;return CryptoJS[_0x21c9e1(0x175)][_0x21c9e1(0xe8)](_0x534051,CryptoJS[_0x21c9e1(0xfc)][_0x21c9e1(0x15d)]['parse'](key),{'iv':CryptoJS[_0x21c9e1(0xfc)][_0x21c9e1(0x15d)][_0x21c9e1(0x192)](iv),'mode':CryptoJS[_0x21c9e1(0x149)][_0x21c9e1(0x13e)],'padding':CryptoJS[_0x21c9e1(0xfa)][_0x21c9e1(0x170)]})[_0x21c9e1(0x131)](CryptoJS[_0x21c9e1(0xfc)][_0x21c9e1(0x15d)]);}function rand(_0x34095c,_0x595feb){const _0x2e5cbc=_0x18338f;return parseInt(Math[_0x2e5cbc(0x114)]()*(_0x595feb-_0x34095c+0x1)+_0x34095c,0xa);}function MD5Encrypt(_0x9adec){function _0xbba9e7(_0x45ef67,_0x31c7af){return _0x45ef67<<_0x31c7af|_0x45ef67>>>0x20-_0x31c7af;}function _0xd236b1(_0x24f323,_0x3b12fe){var _0x2afd82,_0x4ca293,_0x5ae442,_0x1a915b,_0x3cf895;return _0x5ae442=0x80000000&_0x24f323,_0x1a915b=0x80000000&_0x3b12fe,_0x2afd82=0x40000000&_0x24f323,_0x4ca293=0x40000000&_0x3b12fe,_0x3cf895=(0x3fffffff&_0x24f323)+(0x3fffffff&_0x3b12fe),_0x2afd82&_0x4ca293?0x80000000^_0x3cf895^_0x5ae442^_0x1a915b:_0x2afd82|_0x4ca293?0x40000000&_0x3cf895?0xc0000000^_0x3cf895^_0x5ae442^_0x1a915b:0x40000000^_0x3cf895^_0x5ae442^_0x1a915b:_0x3cf895^_0x5ae442^_0x1a915b;}function _0x38ff01(_0x33a868,_0x471231,_0x4bfcc1,_0x7c05af,_0x31674a,_0x4024fc,_0x242831){var _0x5d0958,_0x433266;return _0x33a868=_0xd236b1(_0x33a868,_0xd236b1(_0xd236b1((_0x5d0958=_0x471231)&(_0x433266=_0x4bfcc1)|~_0x5d0958&_0x7c05af,_0x31674a),_0x242831)),_0xd236b1(_0xbba9e7(_0x33a868,_0x4024fc),_0x471231);}function _0x239618(_0x29170b,_0x343c40,_0x3d20c1,_0x433d96,_0x47de4e,_0xab53e6,_0x25f22d){var _0x2238e1,_0xf67576,_0x5f514e;return _0x29170b=_0xd236b1(_0x29170b,_0xd236b1(_0xd236b1((_0x2238e1=_0x343c40,_0xf67576=_0x3d20c1,_0x2238e1&(_0x5f514e=_0x433d96)|_0xf67576&~_0x5f514e),_0x47de4e),_0x25f22d)),_0xd236b1(_0xbba9e7(_0x29170b,_0xab53e6),_0x343c40);}function _0x2e217c(_0x2787e0,_0x45b643,_0x2e8cc1,_0x4e9a52,_0x1fdde8,_0x29b8e4,_0x5a2a79){var _0x8e3e36,_0x5280cb;return _0x2787e0=_0xd236b1(_0x2787e0,_0xd236b1(_0xd236b1((_0x8e3e36=_0x45b643)^(_0x5280cb=_0x2e8cc1)^_0x4e9a52,_0x1fdde8),_0x5a2a79)),_0xd236b1(_0xbba9e7(_0x2787e0,_0x29b8e4),_0x45b643);}function _0x61ce04(_0x484144,_0xece402,_0x39aa71,_0x29f27f,_0xc41697,_0x56cd20,_0x2304a1){var _0x4a427a,_0x34294c;return _0x484144=_0xd236b1(_0x484144,_0xd236b1(_0xd236b1((_0x4a427a=_0xece402,(_0x34294c=_0x39aa71)^(_0x4a427a|~_0x29f27f)),_0xc41697),_0x2304a1)),_0xd236b1(_0xbba9e7(_0x484144,_0x56cd20),_0xece402);}function _0x58f5a6(_0x5233c0){const _0x51ccd0=_0x3437;var _0x20e34e,_0x7e9132='',_0x25b82e='';for(_0x20e34e=0x0;0x3>=_0x20e34e;_0x20e34e++)_0x7e9132+=(_0x25b82e='0'+(_0x5233c0>>>0x8*_0x20e34e&0xff)[_0x51ccd0(0x131)](0x10))[_0x51ccd0(0xec)](_0x25b82e[_0x51ccd0(0x18c)]-0x2,0x2);return _0x7e9132;}var _0x2cf141,_0x1afbe4,_0x13cfd8,_0x3fa263,_0x36c4eb,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41=[];for(_0x2d7d41=function(_0x4e133){const _0x32f995=_0x3437;for(var _0x2d7031,_0x528e43=_0x4e133[_0x32f995(0x18c)],_0x4695c5=_0x528e43+0x8,_0x2733a2=0x10*((_0x4695c5-_0x4695c5%0x40)/0x40+0x1),_0x121d8d=Array(_0x2733a2-0x1),_0x1a54b9=0x0,_0x1f39b4=0x0;_0x528e43>_0x1f39b4;)_0x2d7031=(_0x1f39b4-_0x1f39b4%0x4)/0x4,_0x1a54b9=_0x1f39b4%0x4*0x8,_0x121d8d[_0x2d7031]=_0x121d8d[_0x2d7031]|_0x4e133['charCodeAt'](_0x1f39b4)<<_0x1a54b9,_0x1f39b4++;return _0x2d7031=(_0x1f39b4-_0x1f39b4%0x4)/0x4,_0x1a54b9=_0x1f39b4%0x4*0x8,_0x121d8d[_0x2d7031]=_0x121d8d[_0x2d7031]|0x80<<_0x1a54b9,_0x121d8d[_0x2733a2-0x2]=_0x528e43<<0x3,_0x121d8d[_0x2733a2-0x1]=_0x528e43>>>0x1d,_0x121d8d;}(_0x9adec=function(_0x18fb6){const _0x47e350=_0x3437;_0x18fb6=_0x18fb6[_0x47e350(0x113)](/\r\n/g,'\x0a');for(var _0x2e3152='',_0x1d2917=0x0;_0x1d2917<_0x18fb6[_0x47e350(0x18c)];_0x1d2917++){var _0xa58749=_0x18fb6[_0x47e350(0xf0)](_0x1d2917);0x80>_0xa58749?_0x2e3152+=String[_0x47e350(0x108)](_0xa58749):_0xa58749>0x7f&&0x800>_0xa58749?(_0x2e3152+=String[_0x47e350(0x108)](_0xa58749>>0x6|0xc0),_0x2e3152+=String[_0x47e350(0x108)](0x3f&_0xa58749|0x80)):(_0x2e3152+=String['fromCharCode'](_0xa58749>>0xc|0xe0),_0x2e3152+=String[_0x47e350(0x108)](_0xa58749>>0x6&0x3f|0x80),_0x2e3152+=String['fromCharCode'](0x3f&_0xa58749|0x80));}return _0x2e3152;}(_0x9adec)),_0x3d46d0=0x67452301,_0x1b7d32=0xefcdab89,_0x2aa0a9=0x98badcfe,_0x6368a1=0x10325476,_0x2cf141=0x0;_0x2cf141<_0x2d7d41['length'];_0x2cf141+=0x10)_0x1afbe4=_0x3d46d0,_0x13cfd8=_0x1b7d32,_0x3fa263=_0x2aa0a9,_0x36c4eb=_0x6368a1,_0x3d46d0=_0x38ff01(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x0],0x7,0xd76aa478),_0x6368a1=_0x38ff01(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x1],0xc,0xe8c7b756),_0x2aa0a9=_0x38ff01(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x2],0x11,0x242070db),_0x1b7d32=_0x38ff01(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x3],0x16,0xc1bdceee),_0x3d46d0=_0x38ff01(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x4],0x7,0xf57c0faf),_0x6368a1=_0x38ff01(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x5],0xc,0x4787c62a),_0x2aa0a9=_0x38ff01(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x6],0x11,0xa8304613),_0x1b7d32=_0x38ff01(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x7],0x16,0xfd469501),_0x3d46d0=_0x38ff01(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x8],0x7,0x698098d8),_0x6368a1=_0x38ff01(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x9],0xc,0x8b44f7af),_0x2aa0a9=_0x38ff01(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xa],0x11,0xffff5bb1),_0x1b7d32=_0x38ff01(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0xb],0x16,0x895cd7be),_0x3d46d0=_0x38ff01(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0xc],0x7,0x6b901122),_0x6368a1=_0x38ff01(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0xd],0xc,0xfd987193),_0x2aa0a9=_0x38ff01(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xe],0x11,0xa679438e),_0x1b7d32=_0x38ff01(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0xf],0x16,0x49b40821),_0x3d46d0=_0x239618(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x1],0x5,0xf61e2562),_0x6368a1=_0x239618(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x6],0x9,0xc040b340),_0x2aa0a9=_0x239618(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xb],0xe,0x265e5a51),_0x1b7d32=_0x239618(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x0],0x14,0xe9b6c7aa),_0x3d46d0=_0x239618(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x5],0x5,0xd62f105d),_0x6368a1=_0x239618(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0xa],0x9,0x2441453),_0x2aa0a9=_0x239618(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xf],0xe,0xd8a1e681),_0x1b7d32=_0x239618(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x4],0x14,0xe7d3fbc8),_0x3d46d0=_0x239618(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x9],0x5,0x21e1cde6),_0x6368a1=_0x239618(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0xe],0x9,0xc33707d6),_0x2aa0a9=_0x239618(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x3],0xe,0xf4d50d87),_0x1b7d32=_0x239618(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x8],0x14,0x455a14ed),_0x3d46d0=_0x239618(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0xd],0x5,0xa9e3e905),_0x6368a1=_0x239618(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x2],0x9,0xfcefa3f8),_0x2aa0a9=_0x239618(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x7],0xe,0x676f02d9),_0x1b7d32=_0x239618(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0xc],0x14,0x8d2a4c8a),_0x3d46d0=_0x2e217c(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x5],0x4,0xfffa3942),_0x6368a1=_0x2e217c(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x8],0xb,0x8771f681),_0x2aa0a9=_0x2e217c(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xb],0x10,0x6d9d6122),_0x1b7d32=_0x2e217c(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0xe],0x17,0xfde5380c),_0x3d46d0=_0x2e217c(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x1],0x4,0xa4beea44),_0x6368a1=_0x2e217c(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x4],0xb,0x4bdecfa9),_0x2aa0a9=_0x2e217c(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x7],0x10,0xf6bb4b60),_0x1b7d32=_0x2e217c(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0xa],0x17,0xbebfbc70),_0x3d46d0=_0x2e217c(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0xd],0x4,0x289b7ec6),_0x6368a1=_0x2e217c(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x0],0xb,0xeaa127fa),_0x2aa0a9=_0x2e217c(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x3],0x10,0xd4ef3085),_0x1b7d32=_0x2e217c(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x6],0x17,0x4881d05),_0x3d46d0=_0x2e217c(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x9],0x4,0xd9d4d039),_0x6368a1=_0x2e217c(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0xc],0xb,0xe6db99e5),_0x2aa0a9=_0x2e217c(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xf],0x10,0x1fa27cf8),_0x1b7d32=_0x2e217c(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x2],0x17,0xc4ac5665),_0x3d46d0=_0x61ce04(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x0],0x6,0xf4292244),_0x6368a1=_0x61ce04(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x7],0xa,0x432aff97),_0x2aa0a9=_0x61ce04(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xe],0xf,0xab9423a7),_0x1b7d32=_0x61ce04(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x5],0x15,0xfc93a039),_0x3d46d0=_0x61ce04(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0xc],0x6,0x655b59c3),_0x6368a1=_0x61ce04(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0x3],0xa,0x8f0ccc92),_0x2aa0a9=_0x61ce04(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0xa],0xf,0xffeff47d),_0x1b7d32=_0x61ce04(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x1],0x15,0x85845dd1),_0x3d46d0=_0x61ce04(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x8],0x6,0x6fa87e4f),_0x6368a1=_0x61ce04(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0xf],0xa,0xfe2ce6e0),_0x2aa0a9=_0x61ce04(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x6],0xf,0xa3014314),_0x1b7d32=_0x61ce04(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0xd],0x15,0x4e0811a1),_0x3d46d0=_0x61ce04(_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x2d7d41[_0x2cf141+0x4],0x6,0xf7537e82),_0x6368a1=_0x61ce04(_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2aa0a9,_0x2d7d41[_0x2cf141+0xb],0xa,0xbd3af235),_0x2aa0a9=_0x61ce04(_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x1b7d32,_0x2d7d41[_0x2cf141+0x2],0xf,0x2ad7d2bb),_0x1b7d32=_0x61ce04(_0x1b7d32,_0x2aa0a9,_0x6368a1,_0x3d46d0,_0x2d7d41[_0x2cf141+0x9],0x15,0xeb86d391),_0x3d46d0=_0xd236b1(_0x3d46d0,_0x1afbe4),_0x1b7d32=_0xd236b1(_0x1b7d32,_0x13cfd8),_0x2aa0a9=_0xd236b1(_0x2aa0a9,_0x3fa263),_0x6368a1=_0xd236b1(_0x6368a1,_0x36c4eb);return(_0x58f5a6(_0x3d46d0)+_0x58f5a6(_0x1b7d32)+_0x58f5a6(_0x2aa0a9)+_0x58f5a6(_0x6368a1))['toLowerCase']();}async function checkEnv(){const _0x126287=_0x18338f;if(userCookie){let _0x34f652=envSplitor[0x0];for(let _0x5be15e of envSplitor)if(userCookie[_0x126287(0x129)](_0x5be15e)>-0x1){_0x34f652=_0x5be15e;break;}for(let _0xbd7267 of userCookie['split'](_0x34f652))_0xbd7267&&userList[_0x126287(0x150)](new UserInfo(_0xbd7267));userCount=userList[_0x126287(0x18c)];}else console['log'](_0x126287(0x10c));return console[_0x126287(0x110)](_0x126287(0x104)+userCount+'个账号'),!0x0;}function popu(_0x4aaeef,_0x559a4a,_0x568309=''){const _0x19658f=_0x18338f;_0x4aaeef[_0x19658f(0x113)]('//','/')['split']('/')[0x1];let _0x472169={'url':_0x4aaeef,'headers':_0x559a4a,'timeout':0x2ee0};return _0x568309&&(_0x472169[_0x19658f(0xf8)]=_0x568309,_0x472169[_0x19658f(0x12c)][_0x19658f(0x185)]=_0x568309?.['length']||0x0),_0x472169;}async function httpRequest(_0x587f1d,_0x25c665){return result=null,resurq=null,resurp=null,new Promise(_0x309752=>{const _0x3d7522=_0x3437;$[_0x3d7522(0xe1)](_0x587f1d,_0x25c665,async(_0x2c9953,_0x2bf65b,_0x1b3a4a)=>{const _0x34e6a3=_0x3d7522;try{if(resurq=_0x2bf65b,resurp=_0x1b3a4a,_0x2c9953);else{if(_0x1b3a4a['body']){if(_0x34e6a3(0xe6)==typeof _0x1b3a4a['body'])result=_0x1b3a4a[_0x34e6a3(0xf8)];else try{result=JSON['parse'](_0x1b3a4a['body']);}catch(_0x57da83){result=_0x1b3a4a[_0x34e6a3(0xf8)];}}}}catch(_0x5a15b3){console['log'](_0x5a15b3);}finally{_0x309752();}});});}function _0x1b40(){const _0x56a926=['gzip','\x20开始运行：\x0a','test','notifyStr','done','utf8','大佬们，求个赞😘','instance','writedata','open-url','https://m.tuchong.com/app-point?no_more=1&no_inset=1','lodash_set','https://tuchong.com/gapi/feed/app?language=zh&device_platform=android&os_api=30&_rticket=','/comments?_rticket=','919795OjCYBZ','isQuanX','json2str','sort','getdata','string','indexOf','write','pkcs1','headers','message','charAt','keys','url','toString','isNode','api.tuchong.com','exit','https://tuchong.com/gapi/interactive/follow?_rticket=','box','share_id=','assign',':点赞列表获取成功,id:','qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890','password=','isLoon','application/json,\x20text/plain,\x20*/*','CBC',':开宝箱:',':分享:','setval','isMute','2476HIyyqc','feedlist','setValueForKey','application/x-www-form-urlencoded','plun','getMinutes','mode','setdata','author_id','m.tuchong.com','getSeconds','media-url','https://tuchong.com/gapi/feed/app/video?_rticket=','push','tuchong.com','com.ss.android.tuchong','getDate','share','Mozilla/5.0\x20(Linux;\x20Android\x2011;\x20M2011K2C\x20Build/RKQ1.200928.002;\x20wv)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Version/4.0\x20Chrome/86.0.4240.185\x20Mobile\x20Safari/537.36\x20Tuchong/7.39.1(android)','1670928mqgoRj','put','setOptions','login','getMin','&platform=WechatFriend','parent_note_id=0&content=','Utf8','&account=','msg','auid','token','Content-Type','xiaomi','isSurge','getMax','getTime','2618289UAjLrk','getMonth','env','\x20运行结束，共运行了\x20','catch','valueForKey','\x20秒！','feedid','foll','ZeroPadding','316HGsCbs','floor','openUrl','feedList','AES','https://api.tuchong.com/3/posts/','5996AVFABp','&reply_to_note_id=0','split','str2json','null','&app_name=tuchong','shareid','lodash_get','6500487PLiweD','getval','android',':签到:','https://api.tuchong.com/accounts/login?language=zh&device_platform=android&os_api=30&_rticket=','got','Content-Length','data','https://api.tuchong.com/share/recall?_rticket=','method','author','round','result','length','opts','padStr','site_id=',':分享列表获取成功,id:','signin','parse','abcdef0123456789','send','token=','7391','timeout','undefined','object','randomList','decrypt','账号\x20[','get','loaddata','substr','dzan','https://m.tuchong.com/tuchongrest/point/check-in','toUpperCase','charCodeAt','data_id','post_id=','https://m.tuchong.com/tuchonggapi/reward/point/box','Tcck','sharelist','30nMukqi','join','body','name','pad','okhttp/3.12.2\x20com.ss.android.tuchong\x20(Tuchong:\x207391\x207.39.1)\x20(Android:\x2011\x2030)','enc','\x0a-----END\x20PUBLIC\x20KEY-----','getHours','delete','encrypt','time','60EXFPhl','4190112vsVqOL','找到\x20','stringify','==============\x20系统通知\x20==============','mediaUrl','fromCharCode','post','./sendNotify','startTime','未找到任何账号','\x20运行通知\x0a\x0a','logAndNotify','extend','log','exec','finally','replace','random'];_0x1b40=function(){return _0x56a926;};return _0x1b40();}function randomszxx(_0x493015){const _0x3282ff=_0x18338f;_0x493015=_0x493015||0x20;var _0x11476b=_0x3282ff(0x13a),_0x472253=_0x11476b['length'],_0x444d26='';for(i=0x0;i<_0x493015;i++)_0x444d26+=_0x11476b[_0x3282ff(0x12e)](Math['floor'](Math[_0x3282ff(0x114)]()*_0x472253));return _0x444d26;}function encryptrsa(_0x20f67a,_0x237a24){const _0x24ae45=_0x18338f;let _0x338896=new NodeRSA('-----BEGIN\x20PUBLIC\x20KEY-----\x0a'+_0x237a24+_0x24ae45(0xfd));_0x338896[_0x24ae45(0x158)]({'encryptionScheme':_0x24ae45(0x12b)});let _0x295b12=_0x338896[_0x24ae45(0x100)](_0x20f67a,'base64',_0x24ae45(0x11a));return _0x295b12;}function Env(_0x448b8c,_0x2d3906){const _0x49d290=_0x18338f;return _0x49d290(0xe5)!=typeof process&&JSON['stringify'](process['env'])[_0x49d290(0x129)]('GITHUB')>-0x1&&process[_0x49d290(0x134)](0x0),new class{constructor(_0x4aa266,_0x5ecb78){const _0x3d892=_0x49d290;this[_0x3d892(0xf9)]=_0x4aa266,this[_0x3d892(0x118)]='',this[_0x3d892(0x10b)]=new Date()['getTime'](),Object[_0x3d892(0x138)](this,_0x5ecb78),console['log'](this['name']+_0x3d892(0x116));}[_0x49d290(0x132)](){const _0x3047f2=_0x49d290;return _0x3047f2(0xe5)!=typeof module&&!!module['exports'];}[_0x49d290(0x124)](){const _0x4350cc=_0x49d290;return _0x4350cc(0xe5)!=typeof $task;}[_0x49d290(0x164)](){const _0x76fdfd=_0x49d290;return _0x76fdfd(0xe5)!=typeof $httpClient&&_0x76fdfd(0xe5)==typeof $loon;}['isLoon'](){const _0x3b7f84=_0x49d290;return _0x3b7f84(0xe5)!=typeof $loon;}[_0x49d290(0x127)](_0x59962b){const _0x346f6a=_0x49d290;let _0x127667=this[_0x346f6a(0x180)](_0x59962b);if(/^@/['test'](_0x59962b)){let [,_0x3f85f4,_0xeece47]=/^@(.*?)\.(.*?)$/[_0x346f6a(0x111)](_0x59962b),_0x3e6aab=_0x3f85f4?this[_0x346f6a(0x180)](_0x3f85f4):'';if(_0x3e6aab)try{let _0x3786f7=JSON[_0x346f6a(0x192)](_0x3e6aab);_0x127667=_0x3786f7?this[_0x346f6a(0x17e)](_0x3786f7,_0xeece47,''):_0x127667;}catch(_0x1e5523){_0x127667='';}}return _0x127667;}[_0x49d290(0x14a)](_0x15f0ab,_0xb1e01d){const _0x3700db=_0x49d290;let _0x244ad1=!0x1;if(/^@/[_0x3700db(0x117)](_0xb1e01d)){let [,_0x3727ec,_0x4e7f7a]=/^@(.*?)\.(.*?)$/[_0x3700db(0x111)](_0xb1e01d),_0x33ecad=this[_0x3700db(0x180)](_0x3727ec);try{let _0x31db2f=JSON[_0x3700db(0x192)](_0x3727ec?_0x3700db(0x17b)===_0x33ecad?null:_0x33ecad||'{}':'{}');this[_0x3700db(0x120)](_0x31db2f,_0x4e7f7a,_0x15f0ab),_0x244ad1=this['setval'](JSON['stringify'](_0x31db2f),_0x3727ec);}catch(_0x1626c9){let _0x52efe5={};this[_0x3700db(0x120)](_0x52efe5,_0x4e7f7a,_0x15f0ab),_0x244ad1=this[_0x3700db(0x141)](JSON[_0x3700db(0x105)](_0x52efe5),_0x3727ec);}}else _0x244ad1=this['setval'](_0x15f0ab,_0xb1e01d);return _0x244ad1;}[_0x49d290(0x180)](_0x559e91){const _0x58b799=_0x49d290;return this[_0x58b799(0x164)]()||this[_0x58b799(0x13c)]()?$persistentStore['read'](_0x559e91):this[_0x58b799(0x124)]()?$prefs[_0x58b799(0x16c)](_0x559e91):this[_0x58b799(0x132)]()?(this['data']=this[_0x58b799(0xeb)](),this[_0x58b799(0x186)][_0x559e91]):this['data']&&this[_0x58b799(0x186)][_0x559e91]||null;}[_0x49d290(0x141)](_0x423e0e,_0x26bae5){const _0x578288=_0x49d290;return this[_0x578288(0x164)]()||this[_0x578288(0x13c)]()?$persistentStore[_0x578288(0x12a)](_0x423e0e,_0x26bae5):this[_0x578288(0x124)]()?$prefs[_0x578288(0x145)](_0x423e0e,_0x26bae5):this[_0x578288(0x132)]()?(this['data']=this[_0x578288(0xeb)](),this[_0x578288(0x186)][_0x26bae5]=_0x423e0e,this[_0x578288(0x11d)](),!0x0):this[_0x578288(0x186)]&&this['data'][_0x26bae5]||null;}[_0x49d290(0xe1)](_0x19a924,_0xa9ef7d,_0x5226af=()=>{}){const _0x37c5c9=_0x49d290;if(_0x37c5c9(0xea)!=_0x19a924&&_0x37c5c9(0x109)!=_0x19a924&&'put'!=_0x19a924&&_0x37c5c9(0xff)!=_0x19a924){console[_0x37c5c9(0x110)]('无效的http方法：'+_0x19a924);return;}if(_0x37c5c9(0xea)==_0x19a924&&_0xa9ef7d[_0x37c5c9(0x12c)]?(delete _0xa9ef7d[_0x37c5c9(0x12c)][_0x37c5c9(0x162)],delete _0xa9ef7d[_0x37c5c9(0x12c)][_0x37c5c9(0x185)]):_0xa9ef7d['body']&&_0xa9ef7d['headers']&&(_0xa9ef7d[_0x37c5c9(0x12c)][_0x37c5c9(0x162)]||(_0xa9ef7d[_0x37c5c9(0x12c)][_0x37c5c9(0x162)]=_0x37c5c9(0x146))),this['isSurge']()||this['isLoon']()){this['isSurge']()&&this['isNeedRewrite']&&(_0xa9ef7d[_0x37c5c9(0x12c)]=_0xa9ef7d[_0x37c5c9(0x12c)]||{},Object[_0x37c5c9(0x138)](_0xa9ef7d[_0x37c5c9(0x12c)],{'X-Surge-Skip-Scripting':!0x1}));let _0x3df300={'method':_0x19a924,'url':_0xa9ef7d[_0x37c5c9(0x130)],'headers':_0xa9ef7d['headers'],'timeout':_0xa9ef7d[_0x37c5c9(0xe4)],'data':_0xa9ef7d['body']};_0x37c5c9(0xea)==_0x19a924&&delete _0x3df300[_0x37c5c9(0x186)],$axios(_0x3df300)['then'](_0x462ba5=>{let {status:_0x531574,request:_0x298dff,headers:_0x57cd85,data:_0x543d9a}=_0x462ba5;_0x5226af(null,_0x298dff,{'statusCode':_0x531574,'headers':_0x57cd85,'body':_0x543d9a});})[_0x37c5c9(0x16b)](_0x45633d=>console['log'](_0x45633d));}else{if(this[_0x37c5c9(0x124)]())_0xa9ef7d[_0x37c5c9(0x188)]=_0x19a924[_0x37c5c9(0xef)](),this['isNeedRewrite']&&(_0xa9ef7d[_0x37c5c9(0x18d)]=_0xa9ef7d['opts']||{},Object['assign'](_0xa9ef7d[_0x37c5c9(0x18d)],{'hints':!0x1})),$task['fetch'](_0xa9ef7d)['then'](_0x5a7bd0=>{let {statusCode:_0x3bda92,request:_0x253ab0,headers:_0x9c64da,body:_0x2f7bc5}=_0x5a7bd0;_0x5226af(null,_0x253ab0,{'statusCode':_0x3bda92,'headers':_0x9c64da,'body':_0x2f7bc5});},_0x1b6105=>_0x5226af(_0x1b6105));else{if(this[_0x37c5c9(0x132)]()){this['got']=this[_0x37c5c9(0x184)]?this[_0x37c5c9(0x184)]:require(_0x37c5c9(0x184));let {url:_0x2c56d1,..._0x1362e1}=_0xa9ef7d;this[_0x37c5c9(0x11c)]=this[_0x37c5c9(0x184)][_0x37c5c9(0x10f)]({'followRedirect':!0x1}),this['instance'][_0x19a924](_0x2c56d1,_0x1362e1)['then'](_0x29a59f=>{let {statusCode:_0x1daeb1,request:_0x39a3ef,headers:_0x70e668,body:_0x187a37}=_0x29a59f;_0x5226af(null,_0x39a3ef,{'statusCode':_0x1daeb1,'headers':_0x70e668,'body':_0x187a37});},_0x519e04=>{const _0x51f796=_0x37c5c9;let {message:_0x551f95,response:_0x3fe540}=_0x519e04;_0x5226af(_0x551f95,_0x3fe540,_0x3fe540&&_0x3fe540[_0x51f796(0xf8)]);});}}}}[_0x49d290(0x101)](_0x20b511){const _0x1d806f=_0x49d290;let _0x80c6ed={'M+':new Date()['getMonth']()+0x1,'d+':new Date()[_0x1d806f(0x153)](),'h+':new Date()[_0x1d806f(0xfe)](),'m+':new Date()[_0x1d806f(0x148)](),'s+':new Date()[_0x1d806f(0x14d)](),'q+':Math['floor']((new Date()[_0x1d806f(0x168)]()+0x3)/0x3),'S':new Date()['getMilliseconds']()};for(let _0x1bd4a7 in(/(y+)/[_0x1d806f(0x117)](_0x20b511)&&(_0x20b511=_0x20b511[_0x1d806f(0x113)](RegExp['$1'],(new Date()['getFullYear']()+'')[_0x1d806f(0xec)](0x4-RegExp['$1'][_0x1d806f(0x18c)]))),_0x80c6ed))RegExp('('+_0x1bd4a7+')')[_0x1d806f(0x117)](_0x20b511)&&(_0x20b511=_0x20b511[_0x1d806f(0x113)](RegExp['$1'],0x1==RegExp['$1']['length']?_0x80c6ed[_0x1bd4a7]:('00'+_0x80c6ed[_0x1bd4a7])[_0x1d806f(0xec)]((''+_0x80c6ed[_0x1bd4a7])[_0x1d806f(0x18c)])));return _0x20b511;}async['showmsg'](){const _0x323b5c=_0x49d290;if(!this[_0x323b5c(0x118)])return;let _0x5add8e=this[_0x323b5c(0xf9)]+_0x323b5c(0x10d)+this[_0x323b5c(0x118)];if($['isNode']()){var _0x55f720=require(_0x323b5c(0x10a));console['log']('\x0a==============\x20推送\x20=============='),await _0x55f720['sendNotify'](this[_0x323b5c(0xf9)],_0x5add8e);}else this['msg'](_0x5add8e);}[_0x49d290(0x10e)](_0x64f328){const _0x4e1712=_0x49d290;console[_0x4e1712(0x110)](_0x64f328),this[_0x4e1712(0x118)]+=_0x64f328,this['notifyStr']+='\x0a';}[_0x49d290(0x15f)](_0x196563=t,_0x4ea3b5='',_0x95c16a='',_0x4037de){const _0x585fcd=_0x49d290;let _0x2c6abc=_0x14e78f=>{const _0x577bf0=_0x3437;if(!_0x14e78f)return _0x14e78f;if(_0x577bf0(0x128)==typeof _0x14e78f)return this[_0x577bf0(0x13c)]()?_0x14e78f:this[_0x577bf0(0x124)]()?{'open-url':_0x14e78f}:this[_0x577bf0(0x164)]()?{'url':_0x14e78f}:void 0x0;if(_0x577bf0(0xe6)==typeof _0x14e78f){if(this[_0x577bf0(0x13c)]()){let _0x3673c1;return{'openUrl':_0x14e78f[_0x577bf0(0x173)]||_0x14e78f[_0x577bf0(0x130)]||_0x14e78f[_0x577bf0(0x11e)],'mediaUrl':_0x14e78f['mediaUrl']||_0x14e78f[_0x577bf0(0x14e)]};}if(this[_0x577bf0(0x124)]()){let _0x42a7af;return{'open-url':_0x14e78f['open-url']||_0x14e78f[_0x577bf0(0x130)]||_0x14e78f[_0x577bf0(0x173)],'media-url':_0x14e78f[_0x577bf0(0x14e)]||_0x14e78f[_0x577bf0(0x107)]};}if(this['isSurge']())return{'url':_0x14e78f[_0x577bf0(0x130)]||_0x14e78f['openUrl']||_0x14e78f[_0x577bf0(0x11e)]};}};this[_0x585fcd(0x142)]||(this[_0x585fcd(0x164)]()||this[_0x585fcd(0x13c)]()?$notification[_0x585fcd(0x109)](_0x196563,_0x4ea3b5,_0x95c16a,_0x2c6abc(_0x4037de)):this['isQuanX']()&&$notify(_0x196563,_0x4ea3b5,_0x95c16a,_0x2c6abc(_0x4037de)));let _0x25a794=['',_0x585fcd(0x106)];_0x25a794['push'](_0x196563),_0x4ea3b5&&_0x25a794['push'](_0x4ea3b5),_0x95c16a&&_0x25a794['push'](_0x95c16a),console[_0x585fcd(0x110)](_0x25a794['join']('\x0a'));}[_0x49d290(0x15a)](_0x27de3e,_0x2902b0){return _0x27de3e<_0x2902b0?_0x27de3e:_0x2902b0;}[_0x49d290(0x165)](_0x57b8d3,_0x37f1b7){return _0x57b8d3<_0x37f1b7?_0x37f1b7:_0x57b8d3;}[_0x49d290(0x18e)](_0x4c134d,_0x330667,_0x8a3e26='0'){const _0x1df6ae=_0x49d290;let _0x4acd1c=String(_0x4c134d),_0x48be81=_0x330667>_0x4acd1c[_0x1df6ae(0x18c)]?_0x330667-_0x4acd1c[_0x1df6ae(0x18c)]:0x0,_0x1da2e8='';for(let _0x35942c=0x0;_0x35942c<_0x48be81;_0x35942c++)_0x1da2e8+=_0x8a3e26;return _0x1da2e8+_0x4acd1c;}[_0x49d290(0x125)](_0x74fb2a,_0x5c125a,_0x507988=!0x1){const _0x3c35d1=_0x49d290;let _0x465324=[];for(let _0x3511bf of Object[_0x3c35d1(0x12f)](_0x74fb2a)[_0x3c35d1(0x126)]()){let _0x104c6d=_0x74fb2a[_0x3511bf];_0x104c6d&&_0x507988&&(_0x104c6d=encodeURIComponent(_0x104c6d)),_0x465324[_0x3c35d1(0x150)](_0x3511bf+'='+_0x104c6d);}return _0x465324[_0x3c35d1(0xf7)](_0x5c125a);}[_0x49d290(0x17a)](_0x3a163a,_0x4331e8=!0x1){const _0x320379=_0x49d290;let _0x4e35e0={};for(let _0x5d3c1e of _0x3a163a['split']('#')){if(!_0x5d3c1e)continue;let _0x810614=_0x5d3c1e[_0x320379(0x129)]('=');if(-0x1==_0x810614)continue;let _0x4b25c2=_0x5d3c1e[_0x320379(0xec)](0x0,_0x810614),_0x792d82=_0x5d3c1e[_0x320379(0xec)](_0x810614+0x1);_0x4331e8&&(_0x792d82=decodeURIComponent(_0x792d82)),_0x4e35e0[_0x4b25c2]=_0x792d82;}return _0x4e35e0;}['randomString'](_0x3bfb36,_0x4c378f=_0x49d290(0x193)){const _0x1114e8=_0x49d290;let _0x17e316='';for(let _0x4bc9e9=0x0;_0x4bc9e9<_0x3bfb36;_0x4bc9e9++)_0x17e316+=_0x4c378f[_0x1114e8(0x12e)](Math[_0x1114e8(0x172)](Math['random']()*_0x4c378f[_0x1114e8(0x18c)]));return _0x17e316;}[_0x49d290(0xe7)](_0x436bd8){const _0x3ce658=_0x49d290;return _0x436bd8[Math[_0x3ce658(0x172)](Math[_0x3ce658(0x114)]()*_0x436bd8[_0x3ce658(0x18c)])];}['wait'](_0x4b41d3){return new Promise(_0x255a20=>setTimeout(_0x255a20,_0x4b41d3));}['done'](_0x4c3684={}){const _0x54d902=_0x49d290;let _0x31ec42=(new Date()[_0x54d902(0x166)]()-this['startTime'])/0x3e8;console[_0x54d902(0x110)]('\x0a'+this['name']+_0x54d902(0x16a)+_0x31ec42+_0x54d902(0x16d)),(this['isSurge']()||this['isQuanX']()||this[_0x54d902(0x13c)]())&&$done(_0x4c3684);}}(_0x448b8c,_0x2d3906);}