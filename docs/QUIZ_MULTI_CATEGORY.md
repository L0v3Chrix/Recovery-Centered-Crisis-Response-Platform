# Multi-Category Quiz Implementation

**Implemented**: 2025-08-28  
**Branch**: `fix/quiz-data-print-v2`

## Overview

The quiz system now supports selecting multiple categories and returns balanced results using a diversity guard algorithm. This ensures users who need help in multiple areas receive a mixed set of resources rather than all resources from a single category.

## Key Features

### 1. Multi-Category Selection
- Users can select multiple categories in the quiz (e.g., Food + Shelter + Healthcare)
- The UI already supported multi-select; API has been updated to match
- Categories are sent as an array: `categories: ['food', 'shelter', 'healthcare']`

### 2. Diversity Guard Algorithm
The system implements a round-robin diversity guard to ensure balanced results:
- Groups scored resources by category
- Sorts each category by relevance score
- Interleaves results using round-robin selection
- Ensures no single category dominates the results

Example: If user selects 3 categories and requests 9 results:
- Returns 3 from each category (if available)
- Pattern: Food → Shelter → Healthcare → Food → Shelter → Healthcare...

### 3. Scoring System
Resources are scored based on multiple factors:
- **Category Match**: 50% - Direct match with requested categories
- **Region Proximity**: 20% - Same region as user location
- **Distance**: 20% - Physical proximity (if coordinates available)
- **Eligibility**: 10% - Match with user's specific needs

## API Changes

### Request Format
```typescript
// OLD (single category)
{
  category: 'food',
  zip: '78701'
}

// NEW (multiple categories)
{
  categories: ['food', 'shelter', 'healthcare'],
  zip: '78701'
}
```

### Response Format
```typescript
{
  success: true,
  recommendations: [
    {
      resource: { /* resource data */ },
      score: 85, // 0-100 relevance score
      distance: 2.5, // km if coordinates available
      reasons: ['Matches food category', 'In your area']
    }
  ],
  meta: {
    totalResources: 492,
    candidatesConsidered: 150,
    categoriesRequested: ['food', 'shelter', 'healthcare'],
    categoryTotals: {
      food: 37,
      shelter: 33,
      healthcare: 26
    },
    resultsReturned: 20
  }
}
```

## Implementation Details

### Files Modified
1. `/app/api/quiz/recommendations/route.ts` - Updated to accept array of categories and implement diversity guard
2. `/components/ResultsPage.tsx` - Updated to send all selected categories
3. `/components/PrintResultsPage.tsx` - Updated to extract and send categories

### Diversity Guard Function
```typescript
function applyDiversityGuard(scoredResources, categories, limit) {
  // 1. Group resources by category
  // 2. Sort each group by score
  // 3. Round-robin selection from each category
  // 4. Stop when limit reached or no more resources
}
```

## Testing

Created comprehensive tests for:
- Multi-category acceptance
- Diversity guard algorithm
- Balanced distribution
- Score ordering within categories
- Edge cases (uneven distributions, single category)

Run tests:
```bash
npx tsx scripts/test-diversity.ts
```

## Category Distribution

Current resource counts by category:
- Crisis: 277 (56.3%)
- Food: 37 (7.5%)
- Shelter: 33 (6.7%)
- Employment: 32 (6.5%)
- Healthcare: 26 (5.3%)
- Seniors: 21 (4.3%)
- Recovery: 20 (4.1%)
- Legal: 20 (4.1%)
- Transport: 19 (3.9%)
- Youth: 7 (1.4%)

## Benefits

1. **Better User Experience**: Users with multiple needs get diverse, relevant resources
2. **Prevents Category Bias**: No single category dominates results
3. **Maintains Relevance**: Still prioritizes high-scoring resources within each category
4. **Fair Distribution**: Ensures all selected categories are represented

## Example Usage

User selects: Food, Shelter, Healthcare
ZIP: 78701 (Central Austin)

Results (first 6):
1. Food resource (score: 90) - Central Austin food bank
2. Shelter resource (score: 88) - Emergency shelter downtown
3. Healthcare resource (score: 85) - Free clinic central
4. Food resource (score: 82) - Community pantry
5. Shelter resource (score: 80) - Transitional housing
6. Healthcare resource (score: 78) - Mental health services

## Future Enhancements

1. **Weighted Categories**: Allow users to prioritize certain categories
2. **Smart Grouping**: Group related resources (e.g., shelter + case management)
3. **Time-based Filtering**: Show only currently open resources
4. **Capacity Awareness**: Deprioritize full shelters/programs