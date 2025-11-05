/**
 * Cloudflare Snippets Domains - Simple Version
 * 简化版本，适合快速查询
 * 复制此代码到浏览器控制台执行
 */

(async () => {
  try {
    console.log('Starting query...');
    
    // 获取所有Zone
    let allZones = [];
    let page = 1;
    
    while (true) {
      const res = await fetch('/api/v1/zones?per_page=50&page=' + page, {
        credentials: 'include'
      });
      const data = await res.json();
      
      if (!data.success || !data.result) break;
      
      allZones = allZones.concat(data.result);
      
      if (data.result_info.page >= data.result_info.total_pages) break;
      page++;
    }
    
    console.log('Found ' + allZones.length + ' zones');
    
    // 检查Snippets权限
    let enabled = [];
    for (const zone of allZones) {
      try {
        const res = await fetch('/api/v1/zones/' + zone.id + '/subscription', {
          credentials: 'include'
        });
        const data = await res.json();
        
        if (data.success && data.result && data.result.component_values && data.result.component_values.snippets > 0) {
          enabled.push({
            domain: zone.name,
            snippets: data.result.component_values.snippets,
            plan: zone.plan ? zone.plan.name : 'Unknown'
          });
        }
      } catch (e) {
        console.warn('Error checking ' + zone.name + ': ' + e.message);
      }
      
      await new Promise(r => setTimeout(r, 100));
    }
    
    console.log('='.repeat(50));
    console.log('Found ' + enabled.length + ' domains with Snippets enabled:');
    console.log('='.repeat(50));
    console.table(enabled);
    
    window.cfSnippets = enabled;
    
    console.log('\nResults saved to window.cfSnippets');
    console.log('Export as CSV: copy(cfSnippets.map(x => x.domain).join("\\n"))');
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
