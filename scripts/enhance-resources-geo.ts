#!/usr/bin/env tsx

// Utility script to enhance all resources with geographical data
// Run with: npx tsx scripts/enhance-resources-geo.ts

import { enhanceResourceWithGeoData } from '../lib/geographical'
import { crisisResources, foodResources } from '../data/comprehensive-resource-database'

function enhanceResourceCollection(resources: any[], collectionName: string) {
  console.log(`\n=== Enhancing ${collectionName} (${resources.length} resources) ===`)
  
  const enhanced = resources.map(resource => {
    const original = { ...resource }
    const enhanced = enhanceResourceWithGeoData(resource)
    
    if (enhanced.area && enhanced.area !== 'other') {
      console.log(`✓ ${resource.name}: ${resource.address} → ${enhanced.area} Austin (${enhanced.zipCode})`)
      return enhanced
    } else if (enhanced.zipCode) {
      console.log(`? ${resource.name}: Found ZIP ${enhanced.zipCode} but no area match`)
      return enhanced
    } else {
      console.log(`- ${resource.name}: No ZIP code found in address: ${resource.address}`)
      return original
    }
  })
  
  return enhanced
}

function main() {
  console.log('🗺️  Enhancing Central Texas Resources with Geographical Data')
  console.log('=====================================================')
  
  // Enhance crisis resources
  const enhancedCrisisResources = enhanceResourceCollection(crisisResources, 'Crisis Resources')
  
  // Enhance food resources  
  const enhancedFoodResources = enhanceResourceCollection(foodResources, 'Food Resources')
  
  // Summary
  const totalResources = crisisResources.length + foodResources.length
  const crisisWithArea = enhancedCrisisResources.filter(r => r.area && r.area !== 'other').length
  const foodWithArea = enhancedFoodResources.filter(r => r.area && r.area !== 'other').length
  const totalWithArea = crisisWithArea + foodWithArea
  
  console.log('\n📊 Enhancement Summary')
  console.log('=====================')
  console.log(`Total resources processed: ${totalResources}`)
  console.log(`Resources with area data: ${totalWithArea} (${Math.round(totalWithArea/totalResources*100)}%)`)
  console.log(`Crisis resources with area: ${crisisWithArea}/${crisisResources.length}`)
  console.log(`Food resources with area: ${foodWithArea}/${foodResources.length}`)
  
  // Area distribution
  const areaDistribution: Record<string, number> = {}
  ;[...enhancedCrisisResources, ...enhancedFoodResources].forEach(resource => {
    if (resource.area) {
      areaDistribution[resource.area] = (areaDistribution[resource.area] || 0) + 1
    }
  })
  
  console.log('\n🏘️  Area Distribution')
  console.log('==================')
  Object.entries(areaDistribution).forEach(([area, count]) => {
    console.log(`${area}: ${count} resources`)
  })
  
  console.log('\n✅ Geographical enhancement complete!')
  console.log('Next steps:')
  console.log('1. Update resource database files with enhanced data')
  console.log('2. Test quiz with geographical filtering')
  console.log('3. Verify area-based scoring improvements')
}

if (require.main === module) {
  main()
}