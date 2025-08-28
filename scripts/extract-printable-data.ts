#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

// Read the printable page source
const printablePath = path.join(process.cwd(), 'app/printable/page.tsx');
const printableContent = fs.readFileSync(printablePath, 'utf-8');

// Extract the resourceData array using regex
const resourceDataMatch = printableContent.match(/const resourceData: ResourceCategory\[\] = (\[[\s\S]*?\n  \])/);

if (!resourceDataMatch) {
  console.error('Could not find resourceData in printable page');
  process.exit(1);
}

// Clean up the extracted data - convert to valid JSON
let dataStr = resourceDataMatch[1];

// Replace trailing commas before closing brackets/braces
dataStr = dataStr.replace(/,(\s*[}\]])/g, '$1');

// Wrap unquoted property names in quotes
dataStr = dataStr.replace(/(\s+)([a-zA-Z_][a-zA-Z0-9_]*?):/g, '$1"$2":');

// Handle the case where phone numbers or other values might not be quoted
dataStr = dataStr.replace(/:\s*([^",\[\{\s][^,\]\}]*)/g, (match, value) => {
  // Don't quote if it's already quoted, a number, boolean, null, or starts with [ or {
  if (value.startsWith('"') || value.startsWith('[') || value.startsWith('{') || 
      value === 'true' || value === 'false' || value === 'null' || !isNaN(value)) {
    return match;
  }
  // Quote the value
  return `: "${value.trim()}"`;
});

// Output directory
const outputDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  // Parse to validate JSON
  const resourceData = JSON.parse(dataStr);
  
  // Write to file
  const outputPath = path.join(outputDir, 'resources.raw.json');
  fs.writeFileSync(outputPath, JSON.stringify(resourceData, null, 2));
  
  // Print summary
  console.log('✅ Successfully extracted resource data');
  console.log(`📁 Output: ${outputPath}`);
  console.log('\n📊 Summary:');
  console.log(`   Categories: ${resourceData.length}`);
  
  let totalResources = 0;
  resourceData.forEach((category: any) => {
    const count = category.resources?.length || 0;
    totalResources += count;
    console.log(`   - ${category.title}: ${count} resources`);
  });
  
  console.log(`\n   Total Resources: ${totalResources}`);
  
} catch (error) {
  console.error('Failed to parse resource data:', error);
  
  // Write raw data for debugging
  const debugPath = path.join(outputDir, 'resources.raw.debug.txt');
  fs.writeFileSync(debugPath, dataStr);
  console.log(`Debug output written to: ${debugPath}`);
}