# Database Schema Updates
## Technical Specifications for Sober Living Integration

**Document Purpose**: Define database schema extensions needed to support 60+ sober living and reentry housing facilities  
**Last Updated**: January 1, 2025  
**Status**: Pre-Development Technical Planning

---

## 📊 CURRENT SCHEMA ANALYSIS

### Existing Resource Interface (types/resources.ts)

```typescript
export interface Resource {
  id: string
  name: string
  description: string
  category: ResourceCategory
  address: string
  phone: string
  website?: string
  hours: OperatingHours
  eligibility: string[]
  services: string[]
  recoveryStage: RecoveryStage[]
  lastVerified: Date
  coordinates: {lat: number, lng: number}
  isOpen24Hours?: boolean
  hasCrisisSupport?: boolean
  acceptsWalkIns?: boolean
  languages?: string[]
  accessibilityNotes?: string
  notes?: string
  area?: 'north' | 'south' | 'east' | 'west' | 'central' | 'other'
  zipCode?: string
}
```

### Existing Enums

```typescript
export enum ResourceCategory {
  CRISIS = 'crisis',
  FOOD = 'food',
  SHELTER = 'shelter',
  RECOVERY = 'recovery',
  HEALTHCARE = 'healthcare',
  LEGAL = 'legal',
  EMPLOYMENT = 'employment',
  TRANSPORTATION = 'transportation',
  DOCUMENTATION = 'documentation',
  FINANCIAL = 'financial',
  MENTAL_HEALTH = 'mental_health'
}

export enum RecoveryStage {
  CRISIS = 'crisis',
  DETOX = 'detox',
  TREATMENT = 'treatment',
  EARLY_RECOVERY = 'early_recovery',
  MAINTENANCE = 'maintenance',
  SUPPORT = 'support',
  FAMILY_SUPPORT = 'family_support'
}
```

---

## 🔧 REQUIRED SCHEMA EXTENSIONS

### 1. New Housing-Specific Enums

```typescript
export enum HousingType {
  SOBER_LIVING = 'sober_living',
  OXFORD_HOUSE = 'oxford_house',
  HALFWAY_HOUSE = 'halfway_house',
  TRANSITIONAL_HOUSING = 'transitional_housing',
  REENTRY_HOUSING = 'reentry_housing',
  VETERANS_HOUSING = 'veterans_housing',
  FAITH_BASED = 'faith_based',
  SPECIALIZED_PROGRAM = 'specialized_program'
}

export enum GenderRestriction {
  MIXED = 'mixed',
  MEN_ONLY = 'men_only',
  WOMEN_ONLY = 'women_only',
  NONE = 'none'
}

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  WAITLIST = 'waitlist',
  FULL = 'full',
  UNKNOWN = 'unknown'
}

export enum CostRange {
  BUDGET = 'budget',      // Under $600
  MODERATE = 'moderate',  // $600-1000
  EXPENSIVE = 'expensive', // $1000-1500
  PREMIUM = 'premium'     // $1500+
}

// Extend existing ResourceCategory
export enum ResourceCategory {
  // ... existing categories
  SOBER_LIVING = 'sober_living',
  REENTRY_HOUSING = 'reentry_housing'
}
```

### 2. New Housing-Specific Interfaces

```typescript
export interface HousingResource extends Resource {
  category: ResourceCategory.SOBER_LIVING | ResourceCategory.REENTRY_HOUSING
  housingType: HousingType
  genderRestriction: GenderRestriction
  availabilityStatus: AvailabilityStatus
  costRange: CostRange
  
  // Cost Information
  monthlyRateMin?: number
  monthlyRateMax?: number
  applicationFee?: number
  depositRequired?: number
  utilitiesIncluded?: boolean
  
  // Capacity Information
  totalBeds?: number
  availableBeds?: number
  maxStayDuration?: string  // "6 months", "no limit", etc.
  
  // Requirements
  sobrietyRequirement?: number  // days clean required
  backgroundCheckRequired?: boolean
  employmentRequired?: boolean
  programParticipationRequired?: boolean
  referralRequired?: boolean
  meetingRequirements?: string[]  // ["AA", "NA", "12-step"]
  
  // Process Information
  admissionProcess: string
  waitListStatus?: boolean
  intakeContactMethod: string  // "phone", "website", "walk-in", "referral"
  
  // Special Features
  matFriendly?: boolean  // Medication-Assisted Treatment
  traumaInformed?: boolean
  lgbtqAffirming?: boolean
  veteransSpecific?: boolean
  familyFriendly?: boolean
  petPolicy?: string
  
  // Additional Services
  transportationProvided?: boolean
  employmentSupport?: boolean
  educationalSupport?: boolean
  mentalHealthServices?: boolean
  medicalServices?: boolean
  
  // Contact Extensions
  intakePhone?: string
  emergencyContact?: string
  email?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    website?: string
  }
}

export interface CrisisResource extends Resource {
  category: ResourceCategory.CRISIS
  crisisHotline: string
  textSupport?: string
  chatSupport?: string
  isAvailable24Hours: boolean
  responseTime?: string
  languages: string[]
  emergencyServices: boolean
}
```

### 3. Enhanced Search and Filter Interfaces

```typescript
export interface HousingSearchFilters extends SearchFilters {
  housingType?: HousingType[]
  genderRestriction?: GenderRestriction[]
  costRange?: CostRange[]
  availabilityStatus?: AvailabilityStatus[]
  
  // Requirements Filters
  maxSobrietyRequirement?: number
  backgroundCheckAcceptable?: boolean
  employmentRequired?: boolean
  matFriendly?: boolean
  
  // Special Populations
  lgbtqAffirming?: boolean
  veteransSpecific?: boolean
  traumaInformed?: boolean
  familyFriendly?: boolean
  
  // Location Preferences
  maxDistance?: number  // miles from user location
  area?: string[]  // ['north', 'south', etc.]
  publicTransportAccess?: boolean
}

export interface HousingMatch extends ResourceMatch {
  housingResource: HousingResource
  availabilityScore: number  // 0-100, higher = more available
  affordabilityScore: number  // 0-100, higher = more affordable  
  requirementsMatch: number  // 0-100, higher = better fit
  specialFeatures: string[]  // matching special features
}
```

---

## 🗄️ DATA STRUCTURE UPDATES

### New Data Files Required

1. **austin-sober-living-resources.ts**
   - All sober living facilities (Oxford House, private networks, specialized)
   - Uses HousingResource interface
   - Organized by housing type and location

2. **austin-reentry-housing-resources.ts**
   - Halfway houses, transitional housing, reentry programs
   - Uses HousingResource interface
   - Includes federal, state, and private facilities

3. **crisis-resources-enhanced.ts**
   - Enhanced crisis resources using CrisisResource interface
   - Better organization for Life-Saving Links page

### Data File Organization

```typescript
// austin-sober-living-resources.ts
export const austinSoberLivingResources: HousingResource[] = [
  {
    // Recovery Centered Living - Featured
    id: 'recovery-centered-living',
    name: 'Recovery Centered Living (RCL)',
    description: 'MAT advocate home with peer-led approach supporting multiple recovery pathways',
    category: ResourceCategory.SOBER_LIVING,
    housingType: HousingType.SOBER_LIVING,
    genderRestriction: GenderRestriction.MIXED,
    availabilityStatus: AvailabilityStatus.AVAILABLE,
    costRange: CostRange.MODERATE,
    
    address: '3 Recovery Residences, Austin area',
    phone: '(512) 784-2851',
    email: 'recoverycenteredliving@gmail.com',
    website: 'https://www.recoverycenteredliving.com',
    
    monthlyRateMin: 800,
    monthlyRateMax: 1200,
    totalBeds: 30, // estimated across 3 locations
    maxStayDuration: 'no limit',
    
    sobrietyRequirement: 30, // 30 days clean
    backgroundCheckRequired: true,
    employmentRequired: false,
    programParticipationRequired: true,
    referralRequired: false,
    meetingRequirements: ['flexible - 12-step, Recovery Dharma, SMART Recovery'],
    
    admissionProcess: 'Interview and house guidelines compliance',
    waitListStatus: false,
    intakeContactMethod: 'phone',
    
    matFriendly: true,  // KEY FEATURE
    traumaInformed: true,
    lgbtqAffirming: true,
    veteransSpecific: false,
    familyFriendly: false,
    
    hours: { isOpen24Hours: false },
    eligibility: ['Adults in recovery', 'MAT program participants'],
    services: ['Peer support', 'Multiple recovery pathways', 'High accountability'],
    recoveryStage: [RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish'],
    area: 'central',
    
    // Housing-specific fields
    transportationProvided: false,
    employmentSupport: true,
    educationalSupport: false,
    mentalHealthServices: false,
    medicalServices: false,
    
    notes: 'Founder-led with lived recovery experience, fills gaps in traditional sober living'
  },
  
  // Oxford House Network
  {
    id: 'oxford-house-lamar',
    name: 'Oxford House Lamar',
    description: 'Democratic sober living community with peer governance',
    category: ResourceCategory.SOBER_LIVING,
    housingType: HousingType.OXFORD_HOUSE,
    genderRestriction: GenderRestriction.MIXED, // varies by house
    availabilityStatus: AvailabilityStatus.AVAILABLE,
    costRange: CostRange.BUDGET,
    
    address: '1210 Neans Dr, Austin, TX 78758',
    phone: '(512) 580-1304',
    website: 'https://www.oxfordhousetx.org',
    
    monthlyRateMin: 400,
    monthlyRateMax: 600,
    totalBeds: 8, // typical Oxford House
    maxStayDuration: 'no limit',
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: false,
    employmentRequired: true,
    programParticipationRequired: false,
    referralRequired: false,
    
    admissionProcess: 'Democratic voting process by residents',
    waitListStatus: false,
    intakeContactMethod: 'phone',
    
    matFriendly: false, // typically not MAT-friendly
    traumaInformed: false,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    // ... standard Resource fields
  }
  
  // ... Additional 58 facilities
]

// Helper functions for data access
export function getFeaturedSoberLiving(): HousingResource {
  return austinSoberLivingResources.find(r => r.id === 'recovery-centered-living')!
}

export function getAvailableHousing(): HousingResource[] {
  return austinSoberLivingResources.filter(r => 
    r.availabilityStatus === AvailabilityStatus.AVAILABLE
  )
}

export function getMatFriendlyHousing(): HousingResource[] {
  return austinSoberLivingResources.filter(r => r.matFriendly === true)
}

export function getHousingByType(type: HousingType): HousingResource[] {
  return austinSoberLivingResources.filter(r => r.housingType === type)
}

export function getHousingByGender(gender: GenderRestriction): HousingResource[] {
  return austinSoberLivingResources.filter(r => 
    r.genderRestriction === gender || r.genderRestriction === GenderRestriction.MIXED
  )
}

export function searchHousing(filters: HousingSearchFilters): HousingMatch[] {
  // Implementation for advanced search and matching
  // Returns scored results based on filter criteria
}
```

---

## 🔄 DATABASE MIGRATION STRATEGY

### Phase 1: Schema Extension
1. **Update types/resources.ts** with new enums and interfaces
2. **Test existing functionality** to ensure no breaking changes
3. **Create new helper functions** for housing-specific operations

### Phase 2: Data Integration
1. **Create new data files** for sober living and reentry housing
2. **Populate with 60+ researched facilities**
3. **Validate data integrity** and completeness
4. **Test search and filter functionality**

### Phase 3: Enhanced Crisis Data
1. **Upgrade existing crisis resources** to CrisisResource interface
2. **Organize by urgency levels** for Life-Saving Links page
3. **Add enhanced contact methods** (text, chat, etc.)

### Backward Compatibility
- **All existing Resource interfaces remain valid**
- **New optional fields don't break existing data**
- **Gradual migration strategy** for enhanced features
- **Fallback handling** for missing housing-specific fields

---

## 🔍 SEARCH AND FILTERING IMPLEMENTATION

### Advanced Search Algorithm

```typescript
export function searchHousingResources(
  query: string,
  filters: HousingSearchFilters,
  userLocation?: { lat: number, lng: number }
): HousingMatch[] {
  
  let results = austinSoberLivingResources
  
  // Filter by housing type
  if (filters.housingType?.length) {
    results = results.filter(r => filters.housingType!.includes(r.housingType))
  }
  
  // Filter by gender restrictions
  if (filters.genderRestriction?.length) {
    results = results.filter(r => 
      filters.genderRestriction!.includes(r.genderRestriction) ||
      r.genderRestriction === GenderRestriction.MIXED
    )
  }
  
  // Filter by cost range
  if (filters.costRange?.length) {
    results = results.filter(r => filters.costRange!.includes(r.costRange))
  }
  
  // Filter by availability
  if (filters.availabilityStatus?.length) {
    results = results.filter(r => 
      filters.availabilityStatus!.includes(r.availabilityStatus)
    )
  }
  
  // Filter by special features
  if (filters.matFriendly) {
    results = results.filter(r => r.matFriendly === true)
  }
  
  if (filters.lgbtqAffirming) {
    results = results.filter(r => r.lgbtqAffirming === true)
  }
  
  // Convert to HousingMatch with scoring
  return results.map(resource => ({
    resource,
    housingResource: resource,
    score: calculateMatchScore(resource, filters, query),
    availabilityScore: calculateAvailabilityScore(resource),
    affordabilityScore: calculateAffordabilityScore(resource, filters),
    requirementsMatch: calculateRequirementsMatch(resource, filters),
    specialFeatures: getMatchingFeatures(resource, filters),
    distance: userLocation ? calculateDistance(userLocation, resource.coordinates) : undefined,
    reasons: generateMatchReasons(resource, filters, query)
  })).sort((a, b) => b.score - a.score)
}

function calculateMatchScore(
  resource: HousingResource, 
  filters: HousingSearchFilters, 
  query: string
): number {
  let score = 0
  
  // Base availability score (40% of total)
  if (resource.availabilityStatus === AvailabilityStatus.AVAILABLE) score += 40
  else if (resource.availabilityStatus === AvailabilityStatus.WAITLIST) score += 20
  
  // Requirements match (30% of total)
  if (!filters.maxSobrietyRequirement || 
      !resource.sobrietyRequirement || 
      resource.sobrietyRequirement <= filters.maxSobrietyRequirement) score += 15
      
  if (!filters.backgroundCheckAcceptable || !resource.backgroundCheckRequired) score += 15
  
  // Special features bonus (20% of total)
  if (filters.matFriendly && resource.matFriendly) score += 10
  if (filters.lgbtqAffirming && resource.lgbtqAffirming) score += 10
  
  // Text match bonus (10% of total)
  if (query && (
    resource.name.toLowerCase().includes(query.toLowerCase()) ||
    resource.description.toLowerCase().includes(query.toLowerCase())
  )) score += 10
  
  return score
}
```

---

## 📊 DATA VALIDATION REQUIREMENTS

### Required Field Validation
- **All HousingResource fields** must have valid values
- **Phone numbers** must be in (XXX) XXX-XXXX format
- **Coordinates** must be within Austin metro area bounds
- **Costs** must be positive numbers if provided
- **URLs** must be valid if provided

### Data Quality Checks
- **Duplicate detection** by name and address
- **Phone number verification** (valid format and working)
- **Address geocoding** for accurate coordinates
- **Website availability** checking

### Regular Maintenance
- **Monthly data verification** for contact information
- **Quarterly availability status** updates
- **Annual comprehensive review** of all facility information
- **Real-time monitoring** for broken links or invalid contacts

---

**Next Document**: COMPONENT-ARCHITECTURE-PLAN.md  
**Status**: Database schema ready for implementation