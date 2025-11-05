# 🚀 Cloudflare Snippets 域名查询工具

> 快速查询您的 Cloudflare 账号所有已开通 Snippets 权限的域名

## ⚡ 30秒快速开始

### 第1步：打开 Cloudflare
访问 [Cloudflare Dashboard](https://dash.cloudflare.com/) 并登录

### 第2步：打开浏览器控制台
按 **F12** 或 **Cmd+Option+I**，选择 **Console** 标签

### 第3步：复制并运行
复制下面的代码到控制台，按 **Enter**：

```javascript
(async()=>{let a=[],b=1;while(true){const c=await fetch('/api/v1/zones?per_page=50&page='+b,{credentials:'include'}),d=await c.json();if(!d.success||!d.result)break;a=a.concat(d.result);if(d.result_info.page>=d.result_info.total_pages)break;b++}let e=[];for(const f of a){try{const g=await fetch('/api/v1/zones/'+f.id+'/subscription',{credentials:'include'}),h=await g.json();if(h.success&&h.result&&h.result.component_values&&h.result.component_values.snippets>0){e.push({domain:f.name,snippets:h.result.component_values.snippets,plan:f.plan?f.plan.name:'Unknown'})}}catch(i){}await new Promise(j=>setTimeout(j,100))}console.log('='.repeat(50));console.log('Found '+e.length+' domains with Snippets:');console.table(e);window.cfSnippets=e;})();
```

✅ **完成！** 结果以表格形式显示

---

## 📁 我应该使用哪个文件？

### 👨‍💻 首次使用 / 遇到错误（推荐）
**使用：`cf-snippets-simple.js`**
- 最稳定的版本
- 移除了所有特殊格式
- 如果其他版本出错，用这个 ⭐

### 👨‍💻 技术用户 / 深入了解
**使用：`cf-snippets-domains.js`**
- 功能最完整
- 详细的进度日志
- 复杂场景使用

### 📌 高频用户 / 浏览器书签
**使用：`cf-snippets-domains-bookmarklet.js`**
- 保存为浏览器书签
- 一键执行
- 最便捷

### 🖥️ 普通用户 / 可视化界面
**使用：`cf-snippets-domains-tool.html`**
- 打开 HTML 文件即可
- 友好的图形界面
- 支持导出

---

## 📖 文档导航

| 文档 | 说明 |
|------|------|
| **INDEX-CF-SNIPPETS.md** | 📍 完整导航索引，快速定位 |
| **CF-SNIPPETS-QUICK-START.md** | ⚡ 30秒快速上手 |
| **CF-SNIPPETS-QUERY-README.md** | 📚 详细使用文档 |
| **SNIPPETS-TOOL-SUMMARY.md** | 📊 完整项目总结 |
| **README-CF-SNIPPETS.txt** | 📄 纯文本说明书 |

---

## 💾 查询后的操作

查询完成后，结果保存在 `cfSnippets` 或 `cfSnippetsResult` 变量中，可以在控制台执行：

```javascript
// 查看所有已开通Snippets的域名
cfSnippets  // 或 cfSnippetsResult.snippetsEnabledZones

// 获取域名列表
cfSnippets.map(x => x.domain)

// 复制到剪贴板
copy(cfSnippets.map(x => x.domain).join('\n'))
```

---

## ✨ 功能特性

✅ **一键查询** - 查询所有已开通Snippets的域名
✅ **详细统计** - 显示配额、套餐、状态等信息
✅ **分类展示** - 自动分类（已开通/未开通/失败）
✅ **数据导出** - 支持多种导出格式
✅ **本地化** - 100% 本地运行，无数据上传
✅ **完全免费** - 开源项目，永久免费

---

## 🔒 隐私保证

- ✅ 完全本地运行 - 无任何数据上传
- ✅ 代码完全开源 - 可自行审计
- ✅ 只读操作 - 不修改任何数据
- ✅ 使用现有Session - 无需提供API Token

---

## ❓ 常见问题

**Q: 需要多长时间？**
A: 5-10秒（取决于域名数量）

**Q: 需要API Token吗？**
A: 不需要，使用浏览器Session

**Q: 会修改我的数据吗？**
A: 不会，只读操作

**Q: 支持离线吗？**
A: 不支持，需要网络连接

---

## 🎯 选择合适的方式

```
┌─ 我想最快上手
│  └─ 使用 cf-snippets-domains.js
│     复制代码到控制台运行
│
├─ 我想经常使用
│  └─ 使用 cf-snippets-domains-bookmarklet.js
│     保存为浏览器书签
│
└─ 我想要图形界面
   └─ 使用 cf-snippets-domains-tool.html
      在浏览器中打开即可
```

---

## 📚 进阶使用

想了解更多详情？查看相关文档：
- 详细功能说明 → `CF-SNIPPETS-QUERY-README.md`
- 完整项目说明 → `SNIPPETS-TOOL-SUMMARY.md`
- 快速参考 → `CF-SNIPPETS-QUICK-START.md`
- 完整导航 → `INDEX-CF-SNIPPETS.md`

---

## 🚀 立即开始

选择上面任一种方式，30秒内即可查询您的Snippets域名！

**需要帮助？** → 查看 `INDEX-CF-SNIPPETS.md` 获取完整导航

---

**版本：** 1.0 | **更新：** 2024-01-15 | **许可：** MIT License
