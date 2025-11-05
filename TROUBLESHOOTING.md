# 故障排除 - Cloudflare Snippets 查询工具

## 常见错误及解决方案

### 错误 1: "The string did not match the expected pattern"

**原因：** 某些浏览器对特殊字符（如 %c 样式指令或某些emoji）的处理有严格限制。

**解决方案：**

✅ **推荐方法1 - 使用简化脚本**
复制 `cf-snippets-simple.js` 的内容到控制台运行。这个版本移除了所有可能导致问题的特殊格式。

✅ **推荐方法2 - 使用START-HERE.md中的代码**
在 `START-HERE.md` 中提供的快速开始代码已经过优化，避免了格式化问题。

✅ **推荐方法3 - 使用Web界面**
打开 `cf-snippets-domains-tool.html` 文件，使用图形化界面，无需复制代码。

---

### 错误 2: "Unhandled Promise Rejection"

**原因：** 
- 未登录 Cloudflare Dashboard
- 网络连接问题
- CORS 限制

**解决方案：**

1. 确保已登录 https://dash.cloudflare.com/
2. 检查网络连接
3. 刷新页面后重试
4. 尝试在隐私/隐身窗口中运行

---

### 错误 3: "Failed to fetch zones"

**原因：** API 返回失败，可能是权限问题或账号问题。

**解决方案：**

1. 检查 Cloudflare 账号是否正常
2. 确保账号有权限访问 Zone
3. 等待几秒钟后重试
4. 尝试刷新 Cloudflare Dashboard

---

### 错误 4: "Maximum call stack size exceeded"

**原因：** 域名数量过多导致递归过深。

**解决方案：**

- 使用 `cf-snippets-simple.js`（已优化）
- 或等待一段时间后再尝试查询

---

## ✅ 推荐使用步骤

### 如果出现任何错误：

1. **首先尝试简化版本**
   ```
   打开文件: cf-snippets-simple.js
   复制全部内容到控制台
   ```

2. **如果还是有问题，使用Web界面**
   ```
   打开文件: cf-snippets-domains-tool.html
   在浏览器中打开
   点击查询按钮
   ```

3. **如果还是不行**
   ```
   刷新 Cloudflare Dashboard 页面
   检查网络连接
   等待1-2分钟后重试
   ```

---

## 脚本版本对比

| 版本 | 特点 | 文件大小 | 推荐场景 |
|------|------|--------|--------|
| **cf-snippets-simple.js** | 简化，稳定，无特殊字符 | 2K | 首次尝试，出错时使用 ⭐ |
| **cf-snippets-domains.js** | 完整功能，详细日志 | 6.5K | 深入了解详情 |
| **cf-snippets-domains-tool.html** | 可视化界面，无需代码 | 19K | 普通用户 ⭐ |
| **cf-snippets-domains-bookmarklet.js** | 浏览器书签 | 3.8K | 一键快速查询 |

---

## 快速诊断

复制下面的代码到控制台，检查基本连接是否正常：

```javascript
// 测试基本连接
fetch('/api/v1/zones?per_page=1', { credentials: 'include' })
  .then(r => r.json())
  .then(d => {
    if (d.success) console.log('✅ API连接正常, 找到 ' + d.result_info.total_count + ' 个Zone');
    else console.log('❌ API返回错误:', d);
  })
  .catch(e => console.log('❌ 网络错误:', e));
```

---

## 调试技巧

### 查看详细错误信息

在控制台输入：
```javascript
// 查看浏览器控制台中的完整错误堆栈
// 右键点击错误 → 查看源代码
```

### 检查已保存的结果

```javascript
// 查看是否已保存结果
cfSnippets || cfSnippetsResult

// 查看结果数据结构
Object.keys(cfSnippetsResult || {})

// 查看已开通Snippets的域名数量
(cfSnippetsResult?.snippetsEnabledZones || []).length
```

---

## 环境检查清单

- ✅ 已登录 Cloudflare Dashboard
- ✅ 浏览器已更新到最新版本
- ✅ 网络连接正常
- ✅ 没有VPN/代理阻止
- ✅ Cloudflare 账号处于活跃状态

如果都检查过了，尝试：

1. 清除浏览器缓存
2. 在隐私窗口中尝试
3. 使用不同的浏览器
4. 检查浏览器扩展（可能有冲突）

---

## 获取帮助

1. **查看文档**
   - `CF-SNIPPETS-QUICK-START.md` - 快速开始
   - `CF-SNIPPETS-QUERY-README.md` - 详细说明
   - `INDEX-CF-SNIPPETS.md` - 完整导航

2. **尝试简化版本**
   - `cf-snippets-simple.js` 最稳定

3. **使用Web界面**
   - `cf-snippets-domains-tool.html` 无需代码

---

## 性能提示

- ⏱️ 查询速度与域名数量成正比（每个约100ms）
- 🌐 如果有50个域名，预计需要5-10秒
- 💾 结果保存在全局变量中，可多次使用
- 🔄 可以直接重新执行脚本刷新结果

---

**最后更新：** 2024-01-15
**版本：** 1.0
