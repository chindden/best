/**
 * Cloudflare Snippets Domains Query Tool
 * 查询Cloudflare账号所有已开通Snippets权限的域名
 * 在浏览器控制台运行，需要已登录Cloudflare账号
 * 
 * Usage: 复制此文件内容到浏览器控制台执行
 */

(async () => {
  try {
    console.log('%c🔍 开始查询Cloudflare Snippets域名...', 'color: #0066cc; font-weight: bold; font-size: 14px');
    console.log('');

    // 获取所有Zone（域名）
    let allZones = [];
    let page = 1;
    let hasMore = true;

    console.log('📋 第一步: 获取账号下的所有Zone...');
    
    while (hasMore) {
      const zonesResponse = await fetch('/api/v1/zones?per_page=50&page=' + page, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const zonesData = await zonesResponse.json();

      if (zonesData.success && zonesData.result) {
        allZones = allZones.concat(zonesData.result);
        hasMore = zonesData.result_info && zonesData.result_info.page < zonesData.result_info.total_pages;
        page++;
        console.log(`  └─ 已获取 ${allZones.length} 个Zone`);
      } else {
        console.error('❌ 获取Zone列表失败:', zonesData);
        throw new Error('Failed to fetch zones');
      }
    }

    console.log(`✓ 共找到 ${allZones.length} 个Zone\n`);

    // 检查每个Zone的Snippets权限
    let snippetsEnabledZones = [];
    let snippetsDisabledZones = [];
    let errorZones = [];

    console.log('🔎 第二步: 检查每个Zone的Snippets权限...\n');

    for (let index = 0; index < allZones.length; index++) {
      const zone = allZones[index];
      try {
        // 获取Zone的subscription/features信息
        const zoneDetailsResponse = await fetch(`/api/v1/zones/${zone.id}/subscription`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        const zoneDetails = await zoneDetailsResponse.json();

        // 检查是否有snippets权限
        if (zoneDetails.success && zoneDetails.result) {
          const componentSubscriptions = zoneDetails.result.component_values || {};

          // 检查snippets component
          if (componentSubscriptions.snippets !== undefined && componentSubscriptions.snippets > 0) {
            const zoneInfo = {
              name: zone.name,
              zoneId: zone.id,
              snippets: componentSubscriptions.snippets,
              status: zone.status,
              plan: zone.plan ? zone.plan.name : 'Unknown'
            };
            snippetsEnabledZones.push(zoneInfo);
            console.log(`  ✓ [${index + 1}/${allZones.length}] ${zone.name}`);
            console.log(`    └─ Snippets配额: ${componentSubscriptions.snippets}, Plan: ${zoneInfo.plan}`);
          } else {
            snippetsDisabledZones.push({
              name: zone.name,
              zoneId: zone.id,
              plan: zone.plan ? zone.plan.name : 'Unknown'
            });
            console.log(`  ✗ [${index + 1}/${allZones.length}] ${zone.name} (未开通Snippets)`);
          }
        } else {
          errorZones.push({
            name: zone.name,
            zoneId: zone.id,
            error: zoneDetails.errors ? zoneDetails.errors[0].message : 'Unknown error'
          });
          console.log(`  ⚠ [${index + 1}/${allZones.length}] ${zone.name} (检查失败)`);
        }
      } catch (error) {
        errorZones.push({
          name: zone.name,
          zoneId: zone.id,
          error: error.message
        });
        console.warn(`  ⚠ [${index + 1}/${allZones.length}] ${zone.name} (异常: ${error.message})`);
      }

      // 添加延迟避免API限流
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 输出统计信息
    console.log('\n' + '='.repeat(60));
    console.log('%c📊 查询结果统计', 'color: #0066cc; font-weight: bold; font-size: 12px');
    console.log('='.repeat(60));
    console.log(`✓ 已开通Snippets的域名: ${snippetsEnabledZones.length}`);
    console.log(`✗ 未开通Snippets的域名: ${snippetsDisabledZones.length}`);
    console.log(`⚠ 检查失败的域名: ${errorZones.length}`);
    console.log('='.repeat(60));

    // 输出已开通Snippets的域名
    if (snippetsEnabledZones.length > 0) {
      console.log('\n%c已开通Snippets权限的域名:', 'color: #00aa00; font-weight: bold; font-size: 13px');
      console.table(snippetsEnabledZones.map((zone, idx) => ({
        '序号': idx + 1,
        '域名': zone.name,
        'Zone ID': zone.zoneId,
        'Snippets配额': zone.snippets,
        '状态': zone.status,
        '套餐': zone.plan
      })));
    } else {
      console.log('\n%c❌ 没有找到已开通Snippets权限的域名', 'color: #ff6600; font-weight: bold');
    }

    // 输出未开通Snippets的域名
    if (snippetsDisabledZones.length > 0) {
      console.log('\n%c未开通Snippets权限的域名:', 'color: #ff9900; font-weight: bold; font-size: 13px');
      console.table(snippetsDisabledZones.map((zone, idx) => ({
        '序号': idx + 1,
        '域名': zone.name,
        'Zone ID': zone.zoneId,
        '套餐': zone.plan
      })));
    }

    // 输出失败的Zone
    if (errorZones.length > 0) {
      console.log('\n%c检查失败的域名:', 'color: #ff0000; font-weight: bold; font-size: 13px');
      console.table(errorZones.map((zone, idx) => ({
        '序号': idx + 1,
        '域名': zone.name,
        'Zone ID': zone.zoneId,
        '错误': zone.error
      })));
    }

    // 导出结果对象
    const result = {
      timestamp: new Date().toISOString(),
      summary: {
        total: allZones.length,
        snippetsEnabled: snippetsEnabledZones.length,
        snippetsDisabled: snippetsDisabledZones.length,
        errors: errorZones.length
      },
      snippetsEnabledZones,
      snippetsDisabledZones,
      errorZones
    };

    console.log('\n%c✅ 查询完成！结果已保存到变量 cfSnippetsResult', 'color: #00aa00; font-weight: bold; font-size: 12px');
    console.log('💡 可以在控制台输入 cfSnippetsResult 查看完整结果');
    console.log('💡 可以输入 cfSnippetsResult.snippetsEnabledZones 查看已开通Snippets的域名列表');

    // 保存到全局变量供后续使用
    window.cfSnippetsResult = result;

    return result;

  } catch (error) {
    console.error('%c❌ 发生错误:', 'color: #ff0000; font-weight: bold', error);
    throw error;
  }
})();
