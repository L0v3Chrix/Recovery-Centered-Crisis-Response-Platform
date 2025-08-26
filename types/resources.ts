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
}

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

export interface OperatingHours {
  monday?: DayHours
  tuesday?: DayHours
  wednesday?: DayHours
  thursday?: DayHours
  friday?: DayHours
  saturday?: DayHours
  sunday?: DayHours
  isOpen24Hours?: boolean
  specialHours?: SpecialHours[]
}

export interface DayHours {
  open: string // "09:00"
  close: string // "17:00"
  isClosed?: boolean
}

export interface SpecialHours {
  date: string // "2025-12-25"
  hours?: DayHours
  isClosed: boolean
  note?: string // "Closed for Christmas"
}

export interface CrisisResource extends Resource {
  category: ResourceCategory.CRISIS
  crisisHotline: string
  textSupport?: string
  chatSupport?: string
  isAvailable24Hours: boolean
  responseTime?: string // "immediate", "within 1 hour", etc.
}

export interface FoodResource extends Resource {
  category: ResourceCategory.FOOD
  mealTypes: MealType[]
  requiresRegistration?: boolean
  ageRestrictions?: string
  dietaryOptions?: DietaryOption[]
}

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACKS = 'snacks',
  GROCERIES = 'groceries',
  FOOD_PANTRY = 'food_pantry'
}

export enum DietaryOption {
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  GLUTEN_FREE = 'gluten_free',
  DIABETIC = 'diabetic',
  HALAL = 'halal',
  KOSHER = 'kosher'
}

export interface ShelterResource extends Resource {
  category: ResourceCategory.SHELTER
  shelterType: ShelterType
  capacity?: number
  availableBeds?: number
  genderRestrictions?: 'male' | 'female' | 'mixed' | 'none'
  ageRestrictions?: string
  petPolicy?: string
  sobrietyRequired?: boolean
  maxStayDuration?: string
}

export enum ShelterType {
  EMERGENCY = 'emergency',
  TRANSITIONAL = 'transitional',
  PERMANENT_SUPPORTIVE = 'permanent_supportive',
  FAMILY = 'family',
  YOUTH = 'youth',
  VETERANS = 'veterans',
  WOMEN = 'women',
  MEN = 'men'
}

export interface Location {
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zipCode: string
  county: string
}

export interface SearchFilters {
  category?: ResourceCategory
  recoveryStage?: RecoveryStage
  location?: {
    lat: number
    lng: number
    radius: number // in miles
  }
  isOpenNow?: boolean
  acceptsWalkIns?: boolean
  hasTransportation?: boolean
  languages?: string[]
}

export interface ResourceMatch {
  resource: Resource
  score: number // 0-100 match score
  reasons: string[] // Why this resource matches
  distance?: number // in miles from user location
}