#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import { TResource, TResourceCategory } from '../src/types/resource';

interface CategoryConfig {
  subcategories: string[];
  keywords: string[];
}

type CategoryMap = Record<string, CategoryConfig>;

function loadCategoryMap(): CategoryMap {
  const yamlPath = path.join(process.cwd(), 'data/categories.yaml');
  const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
  return parse(yamlContent);
}

function findBestCategory(
  resource: Partial<TResource>,
  categoryMap: CategoryMap
): { category: TResourceCategory; subcategories: string[] } {
  // Current category might already be correct
  if (resource.category && categoryMap[resource.category]) {
    return {
      category: resource.category as TResourceCategory,
      subcategories: determineSubcategories(resource, categoryMap[resource.category])
    };
  }
  
  // Score each category based on keyword matches
  const scores: Record<string, number> = {};
  const matchedSubcategories: Record<string, Set<string>> = {};
  
  for (const [category, config] of Object.entries(categoryMap)) {
    scores[category] = 0;
    matchedSubcategories[category] = new Set();
    
    const searchText = [
      resource.name,
      resource.description,
      ...(resource.services || [])
    ].join(' ').toLowerCase();
    
    // Check keywords
    for (const keyword of config.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        scores[category] += 2;
      }
    }
    
    // Check subcategory keywords
    for (const subcategory of config.subcategories) {
      const subKeywords = subcategory.split('_').join(' ');
      if (searchText.includes(subKeywords)) {
        scores[category] += 3;
        matchedSubcategories[category].add(subcategory);
      }
    }
  }
  
  // Find the best matching category
  let bestCategory = 'crisis'; // default
  let bestScore = 0;
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }
  
  return {
    category: bestCategory as TResourceCategory,
    subcategories: Array.from(matchedSubcategories[bestCategory] || [])
  };
}

function determineSubcategories(
  resource: Partial<TResource>,
  config: CategoryConfig
): string[] {
  const subcategories: string[] = [];
  const searchText = [
    resource.name,
    resource.description,
    ...(resource.services || [])
  ].join(' ').toLowerCase();
  
  for (const subcategory of config.subcategories) {
    const subKeywords = subcategory.split('_').join(' ');
    if (searchText.includes(subKeywords)) {
      subcategories.push(subcategory);
    }
  }
  
  // Add default subcategory if none found
  if (subcategories.length === 0 && config.subcategories.length > 0) {
    subcategories.push(config.subcategories[0]);
  }
  
  return subcategories;
}

async function main() {
  console.log('🏷️ Normalizing categories and subcategories...\n');
  
  try {
    // Load data
    const enrichedPath = path.join(process.cwd(), 'data/resources.enriched.json');
    const resources: Partial<TResource>[] = JSON.parse(fs.readFileSync(enrichedPath, 'utf-8'));
    const categoryMap = loadCategoryMap();
    
    console.log(`📝 Processing ${resources.length} resources`);
    console.log(`📂 Categories available: ${Object.keys(categoryMap).length}`);
    
    // Track changes
    const categoryChanges: Record<string, number> = {};
    let totalSubcategoriesAdded = 0;
    
    // Process each resource
    for (const resource of resources) {
      const oldCategory = resource.category;
      const { category, subcategories } = findBestCategory(resource, categoryMap);
      
      // Track category changes
      if (oldCategory !== category) {
        const changeKey = `${oldCategory} → ${category}`;
        categoryChanges[changeKey] = (categoryChanges[changeKey] || 0) + 1;
      }
      
      resource.category = category;
      resource.subcategories = subcategories;
      totalSubcategoriesAdded += subcategories.length;
    }
    
    // Save normalized data
    const normalizedPath = path.join(process.cwd(), 'data/resources.normalized.json');
    fs.writeFileSync(normalizedPath, JSON.stringify(resources, null, 2));
    console.log(`\n✅ Normalized data saved to: ${normalizedPath}`);
    
    // Print statistics
    console.log('\n📊 Normalization Statistics:');
    console.log(`   Total subcategories assigned: ${totalSubcategoriesAdded}`);
    console.log(`   Average subcategories per resource: ${(totalSubcategoriesAdded / resources.length).toFixed(2)}`);
    
    if (Object.keys(categoryChanges).length > 0) {
      console.log('\n🔄 Category changes:');
      for (const [change, count] of Object.entries(categoryChanges)) {
        console.log(`   ${change}: ${count} resources`);
      }
    }
    
    // Final category distribution
    const finalCategories: Record<string, number> = {};
    for (const resource of resources) {
      const cat = resource.category || 'unknown';
      finalCategories[cat] = (finalCategories[cat] || 0) + 1;
    }
    
    console.log('\n📈 Final category distribution:');
    for (const [category, count] of Object.entries(finalCategories)) {
      const percentage = ((count / resources.length) * 100).toFixed(1);
      console.log(`   ${category}: ${count} resources (${percentage}%)`);
    }
    
    // Subcategory distribution
    const subcategoryDist: Record<string, number> = {};
    for (const resource of resources) {
      for (const subcat of resource.subcategories || []) {
        subcategoryDist[subcat] = (subcategoryDist[subcat] || 0) + 1;
      }
    }
    
    console.log('\n🏷️ Top 10 subcategories:');
    const sortedSubcats = Object.entries(subcategoryDist)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    for (const [subcat, count] of sortedSubcats) {
      console.log(`   ${subcat}: ${count} resources`);
    }
    
  } catch (error) {
    console.error('❌ Normalization failed:', error);
    process.exit(1);
  }
}

main();