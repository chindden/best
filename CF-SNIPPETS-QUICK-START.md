# 快速开始 - Cloudflare Snippets 域名查询

## 🚀 30秒快速开始

### 最简单的方法 - 复制粘贴（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 打开浏览器开发者工具：**F12** 或 **Cmd+Option+I**
3. 切换到 **Console** 标签
4. 复制下面的代码，粘贴到控制台，按 Enter：

```javascript
(async()=>{let a=[],b=1;for(;true;){const c=await fetch(`/api/v1/zones?per_page=50&page=${b}`,{credentials:'include'}),d=await c.json();if(!d.success)break;a=a.concat(d.result);if(d.result_info.page>=d.result_info.total_pages)break;b++}let e=[];for(const f of a){const g=await fetch(`/api/v1/zones/${f.id}/subscription`,{credentials:'include'}),h=await g.json();if(h.success&&h.result.component_values?.snippets>0){e.push({domain:f.name,snippets:h.result.component_values.snippets,zoneId:f.id})}await new Promise(i=>setTimeout(i,100))}console.log('%c✅ 查询完成！已开通Snippets的域名:','color:#00aa00;font-weight:bold;font-size:14px');console.table(e);window.cfSnippets=e;})();
```

5. 完成！结果会以表格形式显示

### 获取结果

查询完成后，可在控制台输入以下命令：

```javascript
// 查看完整结果
cfSnippets

// 获取所有域名列表
cfSnippets.map(x => x.domain)

// 获取某个域名信息
cfSnippets.find(x => x.domain === 'example.com')

// 复制所有域名到剪贴板
copy(cfSnippets.map(x => x.domain).join('\n'))

// 下载为 JSON 文件
copy(JSON.stringify(cfSnippets, null, 2))
```

## 📋 文件说明

本项目提供三种使用方式：

### 1. `cf-snippets-domains.js` - 完整版脚本
- 功能最全
- 详细的进度日志
- 详尽的错误处理
- **使用方法**：复制内容到控制台执行

### 2. `cf-snippets-domains-bookmarklet.js` - 书签脚本
- 压缩版本，可作为浏览器书签
- 一键执行
- **使用方法**：新建书签，粘贴到 URL 字段

### 3. `cf-snippets-domains-tool.html` - Web 界面
- 可视化界面
- 支持数据导出
- 更友好的用户体验
- **使用方法**：在浏览器中打开 HTML 文件

## 💡 常见用途

### 查看已开通 Snippets 的所有域名
```javascript
cfSnippets.map(x => x.domain)
```

### 检查特定域名是否有 Snippets
```javascript
cfSnippets.some(x => x.domain === 'your-domain.com')
```

### 查看 Snippets 配额
```javascript
cfSnippets.reduce((sum, x) => sum + x.snippets, 0)  // 总配额
cfSnippets.find(x => x.domain === 'example.com').snippets  // 某域名配额
```

### 导出为 CSV
```javascript
let csv = 'Domain,Snippets,ZoneID\n' + cfSnippets.map(x => `${x.domain},${x.snippets},${x.zoneId}`).join('\n');
copy(csv);
```

## ⚠️ 常见问题

**Q: 提示 API 错误？**
- A: 确保你已登录 Cloudflare Dashboard
- 刷新页面后重试

**Q: 需要很长时间？**
- A: 这是正常的，每个 Zone 需要查询，如果有 50 个域名需要约 5 秒

**Q: 能修改或扩展吗？**
- A: 可以！代码完全开源，随意修改

**Q: 会修改我的数据吗？**
- A: 不会！脚本只读取数据，不做任何修改

**Q: 在哪里可以找到更多帮助？**
- A: 查看 `CF-SNIPPETS-QUERY-README.md` 获取详细文档

## 🔐 隐私和安全

✅ 100% 本地运行 - 数据不上传任何服务器
✅ 完全开源 - 代码可审计
✅ 只读操作 - 不修改任何数据
✅ 使用现有 Session - 不需要 API Token

---

**需要帮助？** 查看完整文档 `CF-SNIPPETS-QUERY-README.md`
