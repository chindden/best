# Cloudflare Snippets 查询工具 - 文件索引

快速查询您的Cloudflare账号所有已开通Snippets权限的域名。

## 🎯 快速选择

根据您的需求选择相应的工具：

### 👨‍💻 我想在控制台快速查询
→ **推荐使用：`cf-snippets-domains.js`**
- 完整功能版本
- 详细的进度日志和错误提示
- 复制粘贴到浏览器F12控制台即可运行
- 📖 查看 `CF-SNIPPETS-QUICK-START.md` 了解使用方法

### 📌 我想要浏览器书签一键查询
→ **推荐使用：`cf-snippets-domains-bookmarklet.js`**
- 浏览器书签脚本版本
- 压缩优化，支持直接作为书签使用
- 登录CF后点击书签即可执行
- 📖 查看 `CF-SNIPPETS-QUERY-README.md` 的书签部分

### 🖥️ 我想要可视化界面
→ **推荐使用：`cf-snippets-domains-tool.html`**
- 完整的Web用户界面
- 实时进度显示
- 支持数据导出（TXT/JSON格式）
- 用浏览器直接打开即可

## 📚 文件详解

| 文件 | 类型 | 大小 | 说明 |
|------|------|------|------|
| `cf-snippets-domains.js` | JavaScript | 6.5K | 完整功能脚本，推荐 ⭐⭐⭐ |
| `cf-snippets-domains-bookmarklet.js` | JavaScript | 3.8K | 浏览器书签版本 ⭐⭐⭐ |
| `cf-snippets-domains-tool.html` | HTML+CSS+JS | 19K | Web可视化界面 ⭐⭐⭐ |
| `CF-SNIPPETS-QUICK-START.md` | 文档 | 3.4K | 快速开始指南 📖 |
| `CF-SNIPPETS-QUERY-README.md` | 文档 | 4.6K | 详细使用文档 📖 |
| `SNIPPETS-TOOL-SUMMARY.md` | 文档 | 6.4K | 完整项目总结 📖 |

## ⚡ 最快 30 秒开始

### 步骤 1：打开 Cloudflare
1. 打开 https://dash.cloudflare.com/
2. 确保已登录账号

### 步骤 2：打开控制台
- Windows/Linux：`F12` 或 `Ctrl+Shift+I`
- Mac：`Cmd+Option+I`
- 或右键 → "检查" → "Console" 标签

### 步骤 3：复制并运行
复制以下超短代码到控制台，按 Enter：

```javascript
(async()=>{let a=[],b=1;for(;true;){const c=await fetch(`/api/v1/zones?per_page=50&page=${b}`,{credentials:'include'}),d=await c.json();if(!d.success)break;a=a.concat(d.result);if(d.result_info.page>=d.result_info.total_pages)break;b++}let e=[];for(const f of a){const g=await fetch(`/api/v1/zones/${f.id}/subscription`,{credentials:'include'}),h=await g.json();if(h.success&&h.result.component_values?.snippets>0){e.push({domain:f.name,snippets:h.result.component_values.snippets,zoneId:f.id})}await new Promise(i=>setTimeout(i,100))}console.log('%c✅ 查询完成！已开通Snippets的域名:','color:#00aa00;font-weight:bold;font-size:14px');console.table(e);window.cfSnippets=e;})();
```

✅ 完成！结果以表格形式显示

## 📖 文档导读

### 新手推荐阅读顺序：
1. **本文件** (INDEX-CF-SNIPPETS.md) - 您正在看的文件
2. **CF-SNIPPETS-QUICK-START.md** - 30秒快速上手
3. **CF-SNIPPETS-QUERY-README.md** - 深入了解详情

### 高级用户查看：
- **SNIPPETS-TOOL-SUMMARY.md** - 完整项目总结
- 各脚本文件的源代码注释

## 🎓 学习路径

### 初级用户：
```
INDEX-CF-SNIPPETS.md 
    ↓
CF-SNIPPETS-QUICK-START.md (复制粘贴即用)
    ↓
cf-snippets-domains.js (在控制台运行)
```

### 中级用户：
```
CF-SNIPPETS-QUICK-START.md
    ↓
CF-SNIPPETS-QUERY-README.md (了解功能)
    ↓
cf-snippets-domains-tool.html (使用Web界面)
```

### 高级用户：
```
SNIPPETS-TOOL-SUMMARY.md
    ↓
阅读源代码
    ↓
自定义修改脚本
```

## 💡 使用场景

### 场景 1：快速检查有多少域名已开通Snippets
→ 使用 `cf-snippets-domains.js`，2分钟内获得答案

### 场景 2：导出所有已开通Snippets的域名列表
→ 使用 `cf-snippets-domains-tool.html`，可直接导出为TXT或JSON

### 场景 3：定期自动查询（需要进阶改造）
→ 修改 `cf-snippets-domains.js`，结合浏览器自动化工具

### 场景 4：分享查询工具给团队成员
→ 分享 `cf-snippets-domains-tool.html`，无需任何设置

## ❓ 常见问题快速查看

| 问题 | 答案 | 文档位置 |
|------|------|---------|
| 怎么使用？ | 打开控制台复制代码 | CF-SNIPPETS-QUICK-START.md |
| 需要多长时间？ | 约5-10秒（50个域名） | CF-SNIPPETS-QUERY-README.md |
| 需要API Token吗？ | 不需要，使用浏览器Session | CF-SNIPPETS-QUERY-README.md |
| 会修改我的数据吗？ | 不会，只读操作 | CF-SNIPPETS-QUERY-README.md |
| 支持离线吗？ | 不支持，需要网络连接 | CF-SNIPPETS-QUERY-README.md |
| 怎么导出结果？ | 使用HTML工具或JavaScript命令 | CF-SNIPPETS-QUERY-README.md |

## 🔒 隐私和安全

✅ 100% 本地运行 - 无任何数据上传
✅ 完全开源 - 可自行审计代码
✅ 只读操作 - 不修改任何数据
✅ 现有Session - 无需提供凭据

## 🚀 三种使用方式对比

| 方式 | 难度 | 速度 | 功能 | 最适合 |
|------|------|------|------|--------|
| 脚本文件 | ⭐ 简单 | ⚡ 最快 | 完整 | 技术用户 |
| 书签脚本 | ⭐ 简单 | ⚡ 最快 | 完整 | 高频用户 |
| Web界面 | ⭐ 非常简单 | ⚡ 快 | 完整 | 普通用户 |

## 📞 需要帮助？

1. **快速问题** → 查看本文件下方的Q&A
2. **使用问题** → 查看 `CF-SNIPPETS-QUICK-START.md`
3. **深入了解** → 查看 `CF-SNIPPETS-QUERY-README.md`
4. **技术细节** → 查看 `SNIPPETS-TOOL-SUMMARY.md`
5. **源代码问题** → 查看各JavaScript文件的注释

## 📝 文件检查清单

- ✅ `cf-snippets-domains.js` - 完整版脚本
- ✅ `cf-snippets-domains-bookmarklet.js` - 书签版本
- ✅ `cf-snippets-domains-tool.html` - Web界面
- ✅ `CF-SNIPPETS-QUICK-START.md` - 快速开始
- ✅ `CF-SNIPPETS-QUERY-README.md` - 详细文档
- ✅ `SNIPPETS-TOOL-SUMMARY.md` - 项目总结
- ✅ `INDEX-CF-SNIPPETS.md` - 本文件（导航）

---

**立即开始：** 选择一个工具，按照上面的步骤操作，30秒内即可查询您的Snippets域名！

**最后更新：** 2024-01-15
**当前版本：** 1.0
