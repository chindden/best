# Cloudflare Snippets 域名查询工具 - 项目总结

## 📌 项目概述

为Cloudflare账号添加了一套完整的Snippets权限域名查询解决方案。用户可以快速查询账号下所有已开通Snippets功能的域名，支持三种使用方式。

## 📁 文件结构

```
cf-snippets-domains/
├── cf-snippets-domains.js              # 完整版脚本（推荐）
├── cf-snippets-domains-bookmarklet.js  # 浏览器书签版本
├── cf-snippets-domains-tool.html       # Web界面版本
├── CF-SNIPPETS-QUERY-README.md         # 详细文档
├── CF-SNIPPETS-QUICK-START.md          # 快速开始
└── SNIPPETS-TOOL-SUMMARY.md            # 本文件
```

## 🎯 功能特性

### 核心功能
- ✅ **Zone列表查询** - 自动获取账号下所有域名
- ✅ **权限检查** - 逐一检查每个域名的Snippets状态
- ✅ **数据分类** - 自动分类已开通/未开通/检查失败
- ✅ **统计汇总** - 快速了解Snippets使用情况
- ✅ **数据导出** - 支持多种导出格式

### 用户体验
- 🎨 彩色进度日志 - 实时显示查询进度
- 📊 详细表格展示 - 清晰展示所有数据
- 🚀 三种使用方式 - 满足不同用户需求
- 🔒 完全本地化 - 所有数据都在浏览器处理
- ⚡ 防流量限制 - 内置100ms延迟防止API限流

## 🚀 使用方式

### 方式一：控制台脚本（推荐新手）

```bash
1. 登录 Cloudflare Dashboard
2. F12打开开发者工具 → Console标签
3. 复制 cf-snippets-domains.js 全部内容
4. 粘贴到控制台，按Enter执行
```

**输出示例：**
```
🔍 开始查询Cloudflare Snippets域名...

📋 第一步: 获取账号下的所有Zone...
  └─ 已获取 25 个Zone
✓ 共找到 25 个Zone

🔎 第二步: 检查每个Zone的Snippets权限...
  ✓ [1/25] example.com
    └─ Snippets配额: 5, Plan: Pro
  ✓ [2/25] test.com
    └─ Snippets配额: 5, Plan: Business
  ...

========================================================
📊 查询结果统计
========================================================
✓ 已开通Snippets的域名: 8
✗ 未开通Snippets的域名: 15
⚠ 检查失败的域名: 2
========================================================
```

### 方式二：浏览器书签（推荐高频用户）

```bash
1. 新建浏览器书签
2. 名称: CF Snippets Query
3. URL: 粘贴 cf-snippets-domains-bookmarklet.js 内容
4. 登录CF后直接点击书签
```

### 方式三：Web界面（推荐图形化用户）

```bash
1. 在浏览器中打开 cf-snippets-domains-tool.html
2. 点击"开始查询"按钮
3. 等待查询完成
4. 可导出数据为TXT或JSON文件
```

## 💾 数据结构

查询结果保存在全局变量 `cfSnippetsResult`：

```javascript
{
  timestamp: "2024-01-15T10:30:00.000Z",
  summary: {
    total: 25,                    // 总域名数
    snippetsEnabled: 8,           // 已开通
    snippetsDisabled: 15,         // 未开通
    errors: 2                     // 异常
  },
  snippetsEnabledZones: [
    {
      name: "example.com",
      zoneId: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      snippets: 5,                // 配额
      status: "active",
      plan: "Pro"
    },
    ...
  ],
  snippetsDisabledZones: [...],   // 未开通的域名
  errorZones: [...]               // 检查失败的域名
}
```

## 📋 常用操作

### 查看已开通Snippets的所有域名
```javascript
cfSnippetsResult.snippetsEnabledZones.map(z => z.name)
// 输出: ["example.com", "test.com", ...]
```

### 获取特定域名信息
```javascript
cfSnippetsResult.snippetsEnabledZones.find(z => z.name === 'example.com')
// 输出: { name: "example.com", snippets: 5, ... }
```

### 计算总Snippets配额
```javascript
cfSnippetsResult.snippetsEnabledZones.reduce((sum, z) => sum + z.snippets, 0)
// 输出: 40
```

### 导出域名列表
```javascript
copy(cfSnippetsResult.snippetsEnabledZones.map(z => z.name).join('\n'))
```

### 下载为JSON
```javascript
const data = JSON.stringify(cfSnippetsResult, null, 2);
const blob = new Blob([data], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `cf-snippets-${new Date().toISOString().split('T')[0]}.json`;
a.click();
```

## ⚙️ 技术细节

### API调用
```
GET /api/v1/zones?per_page=50&page={page}
  └─ 获取用户所有Zone（分页）

GET /api/v1/zones/{zoneId}/subscription
  └─ 获取Zone的subscription信息（包含Snippets配额）
```

### 性能优化
- 分页查询防止超时（每页50条）
- 请求间100ms延迟防止API限流
- 50个Zone约需5秒查询
- 自动错误恢复机制

### 浏览器兼容性
- Chrome/Edge/Firefox ✅
- Safari ✅
- IE (不支持)

## 🔐 隐私和安全

✅ **100% 本地运行** - 无数据上传
✅ **只读操作** - 不修改任何数据
✅ **开源代码** - 完全可审计
✅ **现有Session** - 不需要API Token
✅ **无第三方依赖** - 纯原生JavaScript

## ❓ 常见问题

### Q: 需要多长时间？
A: 取决于域名数量，约100ms/个Zone。50个域名约5秒。

### Q: 提示API错误怎么办？
A: 
- 确保已登录Cloudflare Dashboard
- 检查网络连接
- 刷新页面后重试

### Q: 某个Zone显示检查失败？
A: 
- 可能权限不足或该Zone被暂停
- 查看errorZones中的错误信息

### Q: 可以修改代码吗？
A: 当然可以！代码完全开源，随意修改和扩展。

### Q: 会修改我的数据吗？
A: 不会！脚本只执行读操作，不做任何修改。

### Q: 离线可以用吗？
A: 不可以，需要访问CF的API，必须有网络连接。

## 📞 技术支持

查看以下文档获取更多帮助：
- `CF-SNIPPETS-QUICK-START.md` - 快速开始指南
- `CF-SNIPPETS-QUERY-README.md` - 完整文档

## 📝 版本历史

### v1.0 (2024-01-15)
- ✨ 初始版本发布
- ✨ 完整版脚本 (cf-snippets-domains.js)
- ✨ 书签脚本 (cf-snippets-domains-bookmarklet.js)
- ✨ Web界面工具 (cf-snippets-domains-tool.html)
- ✨ 完整使用文档

## 🎓 学习资源

- [Cloudflare Snippets官方文档](https://developers.cloudflare.com/rules/snippets/)
- [Cloudflare API文档](https://developers.cloudflare.com/api/)
- [Zone Subscription API](https://developers.cloudflare.com/api/operations/zone-subscription-details)

---

**最后更新：** 2024-01-15
**作者：** Cloudflare Automation Team
**许可证：** MIT License
