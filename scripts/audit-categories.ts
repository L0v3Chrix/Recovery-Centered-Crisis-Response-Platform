import fs from 'fs';
import path from 'path';

interface Resource {
  id: string;
  name: string;
  category: string;
  subcategories?: string[];
  region?: string;
  zip?: string;
  city?: string;
}

function auditCategories() {
  console.log('📊 Category Audit Report');
  console.log('='.repeat(50));
  
  // Load resources
  const dataPath = path.join(process.cwd(), 'data/resources.normalized.json');
  const data = fs.readFileSync(dataPath, 'utf-8');
  const resources: Resource[] = JSON.parse(data);
  
  console.log(`\n✅ Total resources loaded: ${resources.length}`);
  
  // Count by category
  const categoryCounts = new Map<string, number>();
  const categoryByRegion = new Map<string, Map<string, number>>();
  const categoryByZip = new Map<string, Map<string, number>>();
  const subcategoryCounts = new Map<string, number>();
  
  resources.forEach(resource => {
    // Count main categories
    categoryCounts.set(resource.category, (categoryCounts.get(resource.category) || 0) + 1);
    
    // Count by region
    if (resource.region) {
      if (!categoryByRegion.has(resource.category)) {
        categoryByRegion.set(resource.category, new Map());
      }
      const regionMap = categoryByRegion.get(resource.category)!;
      regionMap.set(resource.region, (regionMap.get(resource.region) || 0) + 1);
    }
    
    // Count by ZIP
    if (resource.zip) {
      if (!categoryByZip.has(resource.category)) {
        categoryByZip.set(resource.category, new Map());
      }
      const zipMap = categoryByZip.get(resource.category)!;
      zipMap.set(resource.zip, (zipMap.get(resource.zip) || 0) + 1);
    }
    
    // Count subcategories
    if (resource.subcategories) {
      resource.subcategories.forEach(sub => {
        subcategoryCounts.set(sub, (subcategoryCounts.get(sub) || 0) + 1);
      });
    }
  });
  
  // Sort categories by count
  const sortedCategories = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1]);
  
  // Print category counts
  console.log('\n📁 Resources by Category:');
  console.log('-'.repeat(40));
  sortedCategories.forEach(([category, count]) => {
    const percentage = ((count / resources.length) * 100).toFixed(1);
    console.log(`  ${category.padEnd(15)} ${count.toString().padStart(4)} (${percentage}%)`);
  });
  
  // Print region distribution for top categories
  console.log('\n🗺️  Regional Distribution (Top 5 Categories):');
  console.log('-'.repeat(40));
  sortedCategories.slice(0, 5).forEach(([category]) => {
    const regionMap = categoryByRegion.get(category);
    if (regionMap) {
      console.log(`  ${category}:`);
      Array.from(regionMap.entries())
        .sort((a, b) => b[1] - a[1])
        .forEach(([region, count]) => {
          console.log(`    ${region.padEnd(10)} ${count}`);
        });
    }
  });
  
  // Print top ZIPs overall
  const allZips = new Map<string, number>();
  resources.forEach(r => {
    if (r.zip) {
      allZips.set(r.zip, (allZips.get(r.zip) || 0) + 1);
    }
  });
  
  const topZips = Array.from(allZips.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  console.log('\n📍 Top 10 ZIP Codes:');
  console.log('-'.repeat(40));
  topZips.forEach(([zip, count]) => {
    console.log(`  ${zip}    ${count} resources`);
  });
  
  // Print top subcategories
  const topSubcategories = Array.from(subcategoryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
  
  console.log('\n🏷️  Top 15 Subcategories:');
  console.log('-'.repeat(40));
  topSubcategories.forEach(([sub, count]) => {
    console.log(`  ${sub.padEnd(25)} ${count}`);
  });
  
  // Generate markdown report
  let markdown = `# Category & Coverage Report

Generated: ${new Date().toLocaleString()}

## Summary
- **Total Resources**: ${resources.length}
- **Categories**: ${categoryCounts.size}
- **Unique ZIPs**: ${allZips.size}

## Resources by Category

| Category | Count | Percentage |
|----------|-------|------------|
`;

  sortedCategories.forEach(([category, count]) => {
    const percentage = ((count / resources.length) * 100).toFixed(1);
    markdown += `| ${category} | ${count} | ${percentage}% |\n`;
  });
  
  markdown += `\n## Top ZIP Codes

| ZIP Code | Resources |
|----------|-----------|
`;

  topZips.forEach(([zip, count]) => {
    markdown += `| ${zip} | ${count} |\n`;
  });
  
  markdown += `\n## Regional Coverage

`;
  
  ['north', 'south', 'east', 'west', 'central'].forEach(region => {
    const count = resources.filter(r => r.region === region).length;
    const percentage = ((count / resources.length) * 100).toFixed(1);
    markdown += `- **${region.charAt(0).toUpperCase() + region.slice(1)}**: ${count} resources (${percentage}%)\n`;
  });
  
  // Write markdown file
  const reportPath = path.join(process.cwd(), 'docs/CATEGORY_COUNTS.md');
  fs.writeFileSync(reportPath, markdown);
  console.log(`\n✅ Report written to: docs/CATEGORY_COUNTS.md`);
  
  // Print summary
  console.log('\n' + '=' . repeat(50));
  console.log('📈 Audit Complete!');
  console.log(`   ${resources.length} total resources`);
  console.log(`   ${categoryCounts.size} categories`);
  console.log(`   ${allZips.size} unique ZIP codes`);
  console.log('='.repeat(50));
}

// Run the audit
auditCategories();