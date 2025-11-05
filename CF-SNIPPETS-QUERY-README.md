# Cloudflare Snippets 域名查询工具

查询 Cloudflare 账号所有已开通 Snippets 权限的域名。

## 功能特性

- ✅ 查询账号下所有 Zone（域名）
- ✅ 检查每个域名的 Snippets 权限状态
- ✅ 显示 Snippets 配额信息
- ✅ 分类统计（已开通/未开通/异常）
- ✅ 导出结果供后续处理
- ✅ 友好的彩色日志输出

## 使用方法

### 方法一：直接复制脚本到控制台（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 打开浏览器开发者工具（按 `F12` 或 `Cmd+Option+I`）
3. 进入 **Console** 标签页
4. 打开文件 `cf-snippets-domains.js`，复制全部内容
5. 粘贴到控制台，按 `Enter` 执行

### 方法二：浏览器书签（最方便）

**第一次设置：**

1. 打开浏览器书签管理（Ctrl+Shift+B）
2. 点击"添加新书签"
3. 名称填写：`CF Snippets Query` 或任意名称
4. URL 字段粘贴 `cf-snippets-domains-bookmarklet.js` 文件中的代码
5. 保存书签

**后续使用：**

1. 登录 Cloudflare Dashboard
2. 点击书签即可一键执行查询

### 方法三：在页面加载脚本

在 Cloudflare Dashboard 打开时，在控制台执行：

```javascript
fetch('https://your-domain/cf-snippets-domains.js')
  .then(r => r.text())
  .then(code => eval(code));
```

## 输出结果说明

### 控制台输出

查询完成后，控制台会显示：

1. **进度日志** - 实时显示查询进度
2. **统计信息** - 已开通/未开通/异常域名统计
3. **详细表格** - 各类域名的详细信息

### 结果数据结构

结果保存在全局变量 `cfSnippetsResult`：

```javascript
cfSnippetsResult = {
  timestamp: "2024-01-01T12:00:00.000Z",
  summary: {
    total: 10,                      // 总域名数
    snippetsEnabled: 5,             // 已开通Snippets的数量
    snippetsDisabled: 4,            // 未开通Snippets的数量
    errors: 1                       // 检查失败的数量
  },
  snippetsEnabledZones: [           // 已开通的域名列表
    {
      name: "example.com",
      zoneId: "zone123456",
      snippets: 5,                  // Snippets配额
      status: "active",
      plan: "Pro"
    }
  ],
  snippetsDisabledZones: [          // 未开通的域名列表
    {
      name: "example2.com",
      zoneId: "zone789012",
      plan: "Free"
    }
  ],
  errorZones: []                    // 检查失败的域名列表
}
```

## 数据提取示例

### 获取所有已开通 Snippets 的域名列表

```javascript
cfSnippetsResult.snippetsEnabledZones.map(z => z.name)
// 输出: ["example.com", "test.com", ...]
```

### 获取指定域名的详细信息

```javascript
cfSnippetsResult.snippetsEnabledZones.find(z => z.name === 'example.com')
```

### 导出为 JSON

```javascript
JSON.stringify(cfSnippetsResult, null, 2)
```

### 复制域名列表到剪贴板

```javascript
copy(cfSnippetsResult.snippetsEnabledZones.map(z => z.name).join('\n'))
```

## 常见问题

### Q：脚本执行很慢
**A：** 这是正常的，因为脚本对每个 Zone 进行 API 查询，并在请求间添加 100ms 延迟以避免限流。如果有 50 个 Zone，大约需要 5 秒。

### Q：提示"API 请求失败"
**A：** 
- 检查是否已登录 Cloudflare Dashboard
- 检查网络连接
- 尝试刷新页面后重新执行

### Q：某些 Zone 显示"检查失败"
**A：** 
- 可能是权限问题
- 可能是该 Zone 被暂停
- 查看 `errorZones` 中的错误信息了解详细原因

### Q：能否自动导出结果
**A：** 可以，在控制台执行：

```javascript
// 下载为 JSON 文件
const blob = new Blob([JSON.stringify(cfSnippetsResult, null, 2)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `cf-snippets-${new Date().toISOString().split('T')[0]}.json`;
a.click();
```

## 隐私和安全

- ✅ 脚本仅读取你的 Zone 信息，不修改任何数据
- ✅ 脚本仅使用已登录的 Session，不需要 API Token
- ✅ 所有数据都在浏览器本地处理，不上传任何服务器
- ✅ 脚本代码完全开源，可自行审计

## 技术细节

- 使用 Cloudflare 内部 API 端点
- 自动处理分页（每页 50 个 Zone）
- 实现了速率限制保护（100ms 延迟）
- 完整的错误处理机制
- 彩色日志增强用户体验

## 相关资源

- [Cloudflare Snippets 文档](https://developers.cloudflare.com/rules/snippets/)
- [Cloudflare API 文档](https://developers.cloudflare.com/api/)
- [Zone 订阅 API](https://developers.cloudflare.com/api/operations/zone-subscription-details)

## 许可证

MIT License
