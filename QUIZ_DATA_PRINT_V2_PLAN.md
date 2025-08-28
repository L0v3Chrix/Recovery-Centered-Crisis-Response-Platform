# Quiz + Data Pipeline + Printable Filters - Execution Plan

**Created**: 2025-08-28  
**Branch**: `fix/quiz-data-print-v2`  
**Status**: Ready for implementation

## Overview

This plan addresses critical improvements to the quiz system, data pipeline, and printable page functionality. The implementation will deliver:
1. Multi-category quiz support with accurate ranking
2. Complete resource ingestion from printable page with geocoding
3. Filterable printable page that reduces print output
4. Comprehensive documentation and testing

## Execution Steps

### Step 0: Setup & Dependencies
- Create feature branch `fix/quiz-data-print-v2`
- Install required packages:
  ```bash
  npm i pdf-parse @googlemaps/google-maps-services-js zod vitest ts-node tsx csv-parse yaml sharp
  ```
- Verify `.env.local` configuration
- **Commit**: `chore: deps for ingest, geocode, tests, image renders`

### Step 1: Data Model Definition
- Create `src/types/resource.ts` with Zod schemas
- Define categories enum (18 categories)
- Define regions enum (north/south/east/west/central)
- Include all resource fields (address, coordinates, services, etc.)
- **Commit**: `feat(types): resource schema with regions & subs`

### Step 2: Data Ingestion Pipeline
- Create `scripts/ingest-printable.ts`
- Extract data from printable page HTML/TSX
- Parse categories and resources
- Output to `data/resources.raw.json`
- **Commit**: `feat(data): ingest printable to structured JSON`
- **Doc**: `docs/DATA_PIPELINE.md`

### Step 3: Geocoding & Regionization
- Create `data/zip-regions.yaml` for ZIP-to-region mapping
- Build `scripts/geocode-and-regionize.ts`
- Implement caching to `data/cache/geocode.json`
- Calculate regions based on ZIP or coordinates
- Output to `data/resources.enriched.json`
- **Commit**: `feat(data): geocode + regionize with cache & overrides`
- **Doc**: `docs/REGION_MAPPING.md`

### Step 4: Category Normalization
- Create `data/categories.yaml` for heading mappings
- Build `scripts/normalize-categories.ts`
- Map raw categories to standard enums
- Output to `data/resources.normalized.json`
- **Commit**: `feat(data): normalize categories & subs`
- **Doc**: `docs/CATEGORIES.md`

### Step 5: Multi-Category Quiz UI
- Update `lib/quiz-types.ts` with array support
- Create `components/quiz/StepCategories.tsx` with toggles
- Update quiz state management for arrays
- Persist to URL parameters
- **Commit**: `feat(quiz): multi-select categories (array)`

### Step 6: Scoring API with Diversity
- Create `/api/quiz/recommendations/schema.ts`
- Build `/api/quiz/recommendations/route.ts`
- Implement weighted scoring:
  - Category match: 50%
  - Distance: 20%
  - Region: 20%
  - Eligibility: 10%
- Add round-robin diversity guard
- **Commit**: `feat(quiz): scoring + category diversity guard`

### Step 7: Wire UI to API
- Connect quiz to new API endpoint
- Update results page to handle mixed categories
- Test multi-category submissions
- **Commit**: `fix(ui): quiz uses scoring API and renders balanced results`

### Step 8: Printable Page Filters
- Add category filter toggles
- Implement instant DOM filtering
- Sync filters to URL parameters
- Ensure print CSS only shows filtered items
- **Commit**: `feat(printable): category filters control DOM & print output`

### Step 9: Resource Counts & Audit
- Create `scripts/audit-categories.ts`
- Generate category counts
- Generate ZIP coverage stats
- Output to `docs/CATEGORY_COUNTS.md`
- **Commit**: `chore(audit): write CATEGORY_COUNTS.md`

### Step 10: Testing
- Write Vitest tests for scoring functions
- Test diversity guard algorithm
- Create fixture dataset (5 per category)
- Verify multi-category mixing
- **Commit**: `test(quiz): scoring + diversity guard`

### Step 11: Category Pages Update
- Update all category pages to use `resources.normalized.json`
- Add filters for subcategory, region, status
- Show resource counts
- **Commit**: `feat(site): category pages use normalized dataset with filters`

### Step 12: Documentation
- Create/update all documentation:
  - `docs/DATA_PIPELINE.md`
  - `docs/QUIZ_MATCHING.md`
  - `docs/CATEGORIES.md`
  - `docs/REGION_MAPPING.md`
  - `docs/CATEGORY_COUNTS.md`
  - Update `PROGRESS.md` and `CHANGELOG.md`
- **Commit**: `docs: add pipeline, quiz, categories, region mapping, counts`

### Step 13: Acceptance Testing
- Verify multi-category quiz works
- Test ZIP-based ordering
- Confirm printable filters reduce pages
- Validate category counts
- Run all unit tests
- Review category pages
- **Commit**: `test: acceptance criteria verified`

## Acceptance Criteria

✅ **Quiz**
- Accepts multiple category selections
- Returns mixed, ranked results (not 20 from one category)
- ZIP changes affect ordering

✅ **Data Pipeline**
- All resources from printable page ingested
- Resources geocoded with regions
- Categories normalized to enums

✅ **Printable Page**
- Category chips filter cards immediately
- Only selected categories print (fewer pages)
- URL reflects selection state

✅ **Documentation**
- Pipeline process documented
- Category counts accurate
- Region mapping explained
- All changes in CHANGELOG

## Time Estimate

- Setup & Dependencies: 15 minutes
- Data Model & Ingestion: 2 hours
- Geocoding & Normalization: 2 hours
- Quiz Updates: 1.5 hours
- Printable Filters: 1 hour
- Testing & Documentation: 1.5 hours
- **Total**: ~8 hours

## Risk Mitigation

1. **Geocoding API limits**: Implement caching, use mock data for Austin ZIPs
2. **Data quality**: Build validation and cleanup scripts
3. **Performance**: Limit API results, implement pagination
4. **Print CSS**: Test across browsers, provide fallbacks

## Success Metrics

- 100% of printable resources ingested
- 0 placeholder data in scoring
- <2 second response time for quiz API
- Printable page reduces to 3-5 pages when filtered
- All tests passing

## Next Steps

1. Create branch and install dependencies
2. Begin with data model (Step 1)
3. Follow steps sequentially
4. Run acceptance tests before merge
5. Deploy to production