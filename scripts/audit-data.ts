#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { TResource } from '../src/types/resource';

interface AuditReport {
  totalResources: number;
  missingFields: Record<string, number>;
  invalidData: Record<string, string[]>;
  duplicates: string[];
  categoryDistribution: Record<string, number>;
  regionDistribution: Record<string, number>;
  subcategoryDistribution: Record<string, number>;
  dataQualityScore: number;
  recommendations: string[];
}

function auditResources(): AuditReport {
  const dataPath = path.join(process.cwd(), 'data/resources.normalized.json');
  const resources: TResource[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  const report: AuditReport = {
    totalResources: resources.length,
    missingFields: {},
    invalidData: {},
    duplicates: [],
    categoryDistribution: {},
    regionDistribution: {},
    subcategoryDistribution: {},
    dataQualityScore: 100,
    recommendations: []
  };

  const seenNames = new Set<string>();
  const seenAddresses = new Set<string>();
  const phoneRegex = /^\(\d{3}\)\s?\d{3}-\d{4}$/;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  const urlRegex = /^https?:\/\/.+/;

  // Track missing critical fields
  const criticalFields = ['name', 'category', 'description', 'address', 'phone'];
  const optionalFields = ['website', 'hours', 'services', 'eligibility', 'region', 'coordinates'];

  resources.forEach((resource, index) => {
    // Check for duplicates
    const nameLower = resource.name.toLowerCase();
    if (seenNames.has(nameLower)) {
      report.duplicates.push(`Duplicate name: ${resource.name} (index ${index})`);
    }
    seenNames.add(nameLower);

    if (resource.address) {
      const addressLower = resource.address.toLowerCase();
      if (seenAddresses.has(addressLower)) {
        report.duplicates.push(`Duplicate address: ${resource.address} (${resource.name})`);
      }
      seenAddresses.add(addressLower);
    }

    // Check critical fields
    criticalFields.forEach(field => {
      if (!resource[field as keyof TResource]) {
        report.missingFields[field] = (report.missingFields[field] || 0) + 1;
      }
    });

    // Check optional fields
    optionalFields.forEach(field => {
      if (!resource[field as keyof TResource]) {
        report.missingFields[field] = (report.missingFields[field] || 0) + 1;
      }
    });

    // Validate phone format
    if (resource.phone && !phoneRegex.test(resource.phone)) {
      if (!report.invalidData.phone) report.invalidData.phone = [];
      report.invalidData.phone.push(`${resource.name}: ${resource.phone}`);
    }

    // Validate ZIP code
    if (resource.zip && !zipRegex.test(resource.zip)) {
      if (!report.invalidData.zip) report.invalidData.zip = [];
      report.invalidData.zip.push(`${resource.name}: ${resource.zip}`);
    }

    // Validate website URL
    if (resource.website && !urlRegex.test(resource.website)) {
      if (!report.invalidData.website) report.invalidData.website = [];
      report.invalidData.website.push(`${resource.name}: ${resource.website}`);
    }

    // Track distributions
    report.categoryDistribution[resource.category] = 
      (report.categoryDistribution[resource.category] || 0) + 1;
    
    if (resource.region) {
      report.regionDistribution[resource.region] = 
        (report.regionDistribution[resource.region] || 0) + 1;
    }

    if (resource.subcategories) {
      resource.subcategories.forEach(sub => {
        report.subcategoryDistribution[sub] = 
          (report.subcategoryDistribution[sub] || 0) + 1;
      });
    }
  });

  // Calculate data quality score
  let deductions = 0;
  
  // Deduct for missing critical fields
  Object.entries(report.missingFields).forEach(([field, count]) => {
    if (criticalFields.includes(field)) {
      deductions += (count / resources.length) * 20; // Up to 20 points per critical field
    } else {
      deductions += (count / resources.length) * 5; // Up to 5 points per optional field
    }
  });

  // Deduct for invalid data
  Object.values(report.invalidData).forEach(issues => {
    deductions += (issues.length / resources.length) * 10;
  });

  // Deduct for duplicates
  deductions += (report.duplicates.length / resources.length) * 15;

  report.dataQualityScore = Math.max(0, Math.round(100 - deductions));

  // Generate recommendations
  if (report.missingFields.phone > resources.length * 0.2) {
    report.recommendations.push('⚠️ Over 20% of resources missing phone numbers');
  }
  
  if (report.missingFields.address > resources.length * 0.1) {
    report.recommendations.push('⚠️ Over 10% of resources missing addresses');
  }

  if (report.missingFields.coordinates > resources.length * 0.5) {
    report.recommendations.push('📍 Consider implementing Google Maps geocoding for better location accuracy');
  }

  if (report.duplicates.length > 0) {
    report.recommendations.push(`🔍 Found ${report.duplicates.length} potential duplicate resources`);
  }

  if (Object.keys(report.invalidData).length > 0) {
    report.recommendations.push('📝 Data validation issues found - review invalid data section');
  }

  const avgSubcategories = Object.values(report.subcategoryDistribution).reduce((a, b) => a + b, 0) / resources.length;
  if (avgSubcategories < 1) {
    report.recommendations.push('🏷️ Many resources lack subcategory assignments');
  }

  return report;
}

function printReport(report: AuditReport) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESOURCE DATA AUDIT REPORT');
  console.log('='.repeat(60) + '\n');

  console.log(`📈 Total Resources: ${report.totalResources}`);
  console.log(`✅ Data Quality Score: ${report.dataQualityScore}/100\n`);

  // Category Distribution
  console.log('📂 Category Distribution:');
  Object.entries(report.categoryDistribution)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      const percentage = ((count / report.totalResources) * 100).toFixed(1);
      const bar = '█'.repeat(Math.round(parseInt(percentage) / 2));
      console.log(`  ${category.padEnd(15)} ${count.toString().padStart(4)} (${percentage}%) ${bar}`);
    });

  // Region Distribution
  console.log('\n🗺️ Region Distribution:');
  Object.entries(report.regionDistribution)
    .sort((a, b) => b[1] - a[1])
    .forEach(([region, count]) => {
      const percentage = ((count / report.totalResources) * 100).toFixed(1);
      console.log(`  ${region.padEnd(10)} ${count.toString().padStart(4)} (${percentage}%)`);
    });

  // Missing Fields
  if (Object.keys(report.missingFields).length > 0) {
    console.log('\n❌ Missing Fields:');
    Object.entries(report.missingFields)
      .sort((a, b) => b[1] - a[1])
      .forEach(([field, count]) => {
        const percentage = ((count / report.totalResources) * 100).toFixed(1);
        const severity = count > report.totalResources * 0.5 ? '🔴' : 
                        count > report.totalResources * 0.2 ? '🟡' : '🟢';
        console.log(`  ${severity} ${field.padEnd(15)} ${count.toString().padStart(4)} resources (${percentage}%)`);
      });
  }

  // Invalid Data
  if (Object.keys(report.invalidData).length > 0) {
    console.log('\n⚠️ Invalid Data Found:');
    Object.entries(report.invalidData).forEach(([field, issues]) => {
      console.log(`  ${field}: ${issues.length} issues`);
      if (issues.length <= 5) {
        issues.forEach(issue => console.log(`    - ${issue}`));
      } else {
        issues.slice(0, 3).forEach(issue => console.log(`    - ${issue}`));
        console.log(`    ... and ${issues.length - 3} more`);
      }
    });
  }

  // Duplicates
  if (report.duplicates.length > 0) {
    console.log('\n🔄 Potential Duplicates:');
    report.duplicates.slice(0, 10).forEach(dup => {
      console.log(`  - ${dup}`);
    });
    if (report.duplicates.length > 10) {
      console.log(`  ... and ${report.duplicates.length - 10} more`);
    }
  }

  // Top Subcategories
  console.log('\n🏷️ Top 10 Subcategories:');
  Object.entries(report.subcategoryDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([subcategory, count]) => {
      console.log(`  ${subcategory.padEnd(25)} ${count} resources`);
    });

  // Recommendations
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach(rec => {
      console.log(`  ${rec}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Audit completed at ${new Date().toLocaleString()}`);
  console.log('='.repeat(60) + '\n');
}

// Generate detailed CSV report
function generateCSVReport(report: AuditReport) {
  const csvPath = path.join(process.cwd(), 'data/audit-report.csv');
  const dataPath = path.join(process.cwd(), 'data/resources.normalized.json');
  const resources: TResource[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  const headers = [
    'ID', 'Name', 'Category', 'Subcategories', 'Region', 
    'Has Address', 'Has Phone', 'Has Website', 'Has Hours', 
    'Has Services', 'Has Coordinates', 'Services Count', 'Data Completeness %'
  ];
  
  const rows = resources.map(r => {
    const completeness = [
      r.name ? 1 : 0,
      r.category ? 1 : 0,
      r.description ? 1 : 0,
      r.address ? 1 : 0,
      r.phone ? 1 : 0,
      r.website ? 1 : 0,
      r.hours ? 1 : 0,
      r.services ? 1 : 0,
      r.region ? 1 : 0,
      r.coordinates ? 1 : 0
    ];
    const completenessPct = (completeness.reduce((a, b) => a + b, 0) / 10 * 100).toFixed(0);
    
    return [
      r.id,
      r.name,
      r.category,
      r.subcategories?.join('; ') || '',
      r.region || '',
      r.address ? 'Yes' : 'No',
      r.phone ? 'Yes' : 'No',
      r.website ? 'Yes' : 'No',
      r.hours ? 'Yes' : 'No',
      r.services ? 'Yes' : 'No',
      r.coordinates ? 'Yes' : 'No',
      r.services?.length || 0,
      completenessPct + '%'
    ];
  });
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  fs.writeFileSync(csvPath, csv);
  console.log(`📄 Detailed CSV report saved to: ${csvPath}`);
}

// Main execution
async function main() {
  console.log('🔍 Starting resource data audit...\n');
  
  try {
    const report = auditResources();
    printReport(report);
    generateCSVReport(report);
    
    // Save JSON report
    const reportPath = path.join(process.cwd(), 'data/audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 JSON report saved to: ${reportPath}\n`);
    
    // Exit with appropriate code
    process.exit(report.dataQualityScore < 70 ? 1 : 0);
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

main();