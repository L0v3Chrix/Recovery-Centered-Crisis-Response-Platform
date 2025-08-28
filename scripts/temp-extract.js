
import printablePage from '../app/printable/page';

// We need to extract the resourceData from the component
// Since it's defined inside the component, we'll need to parse it from source

const fs = require('fs');
const path = require('path');

const printablePath = path.join(process.cwd(), 'app/printable/page.tsx');
const content = fs.readFileSync(printablePath, 'utf-8');

// Extract between const resourceData and the next const or function
const startMarker = 'const resourceData: ResourceCategory[] = [';
const endMarker = '
  ]

';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker, startIdx) + endMarker.length - 2;

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find resource data boundaries');
  process.exit(1);
}

const dataSection = content.substring(startIdx + startMarker.length - 1, endIdx);

// Use eval in a controlled way to parse the TypeScript object literal
const resourceData = eval('(' + dataSection + ')');

// Write the extracted data
fs.writeFileSync(
  path.join(process.cwd(), 'data/resources.raw.json'),
  JSON.stringify(resourceData, null, 2)
);

console.log('✅ Extracted resource data successfully');
console.log('📊 Categories:', resourceData.length);

let total = 0;
resourceData.forEach(cat => {
  const count = cat.resources?.length || 0;
  total += count;
  console.log('  -', cat.title + ':', count, 'resources');
});
console.log('\n📦 Total resources:', total);
