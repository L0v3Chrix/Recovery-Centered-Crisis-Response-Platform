// Category mapping utility for organizing the 37+ resource categories into manageable navigation

export interface CategoryMapping {
  routeName: string
  displayName: string
  icon: string
  bgColor: string
  description: string
  printableCategories: string[]
  urgent?: boolean
}

export const CATEGORY_MAPPINGS: CategoryMapping[] = [
  {
    routeName: 'crisis',
    displayName: 'Crisis',
    icon: '🚨',
    bgColor: 'bg-aurora-crimson600 hover:bg-red-700',
    description: '988 | Crisis Text',
    printableCategories: [
      'EMERGENCY SERVICES & CRISIS SUPPORT',
      'BEHAVIORAL/MENTAL HEALTH & COUNSELING',
      'MENTAL HEALTH & COUNSELING'
    ],
    urgent: true
  },
  {
    routeName: 'food',
    displayName: 'Food',
    icon: '🍽️',
    bgColor: 'bg-aurora-emerald500 hover:bg-teal-600',
    description: 'Meals | Pantries',
    printableCategories: [
      'FOOD ASSISTANCE - DAILY MEALS',
      'FOOD ASSISTANCE - GROCERIES & FOOD PANTRIES', 
      'ATX FREE FRIDGES (24/7 ACCESS)'
    ]
  },
  {
    routeName: 'housing',
    displayName: 'Housing',
    icon: '🏠',
    bgColor: 'bg-aurora-indigo500 hover:bg-aurora-indigo700',
    description: 'Shelter | Housing',
    printableCategories: [
      'EMERGENCY SHELTER & HOUSING',
      'TRANSITIONAL & AFFORDABLE HOUSING',
      'COORDINATED HOUSING ASSESSMENTS',
      'HOUSING REPAIRS & ACCESSIBILITY'
    ]
  },
  {
    routeName: 'healthcare',
    displayName: 'Healthcare',
    icon: '🏥',
    bgColor: 'bg-aurora-azure400 hover:bg-sky-500',
    description: 'Medical | Mental Health',
    printableCategories: [
      'MEDICAL & HEALTHCARE SERVICES',
      'HIV/AIDS & STD SERVICES',
      'SUBSTANCE ABUSE & RECOVERY'
    ]
  },
  {
    routeName: 'legal',
    displayName: 'Legal',
    icon: '⚖️',
    bgColor: 'bg-warm-slate-600 hover:bg-gray-700',
    description: 'Aid | Documents',
    printableCategories: [
      'LEGAL AID & ADVOCACY',
      'IDENTIFICATION & VITAL DOCUMENTS',
      'IMMIGRATION SERVICES'
    ]
  },
  {
    routeName: 'employment',
    displayName: 'Employment',
    icon: '💼',
    bgColor: 'bg-aurora-fuchsia500 hover:bg-purple-600',
    description: 'Jobs | Training',
    printableCategories: [
      'EMPLOYMENT & EDUCATION',
      'JOB TRAINING & VOCATIONAL SERVICES',
      'EDUCATIONAL SUPPORT PROGRAMS'
    ]
  },
  {
    routeName: 'transportation',
    displayName: 'Transportation',
    icon: '🚌',
    bgColor: 'bg-aurora-emerald500 hover:bg-emerald-600',
    description: 'Bus Passes | Transit',
    printableCategories: [
      'TRANSPORTATION & BUS PASSES'
    ]
  },
  {
    routeName: 'basic-services',
    displayName: 'Basic Services',
    icon: '🛁',
    bgColor: 'bg-aurora-azure400 hover:bg-cyan-500',
    description: 'Showers | Mail | Laundry',
    printableCategories: [
      'BASIC SERVICES - MAIL, SHOWERS, LAUNDRY',
      'CLOTHING ASSISTANCE',
      'TECHNOLOGY & INTERNET ACCESS'
    ]
  },
  {
    routeName: 'financial',
    displayName: 'Financial Aid',
    icon: '💰',
    bgColor: 'bg-aurora-emerald500 hover:bg-green-600',
    description: 'Utilities | Emergency Aid',
    printableCategories: [
      'UTILITIES & FINANCIAL ASSISTANCE',
      'FINANCIAL COUNSELING & BANKING',
      'GOVERNMENT ASSISTANCE PROGRAMS'
    ]
  },
  {
    routeName: 'family-services',
    displayName: 'Family Services',
    icon: '👨‍👩‍👧‍👦',
    bgColor: 'bg-aurora-fuchsia500 hover:bg-pink-600',
    description: 'Women | Children | Seniors',
    printableCategories: [
      'WOMEN, CHILDREN & FAMILY SERVICES',
      'SENIOR SERVICES',
      'YOUTH SERVICES (EXPANDED)'
    ]
  },
  {
    routeName: 'veterans',
    displayName: 'Veterans',
    icon: '🪖',
    bgColor: 'bg-warm-slate-600 hover:bg-slate-700',
    description: 'VA Services | Support',
    printableCategories: [
      'VETERANS SERVICES'
    ]
  },
  {
    routeName: 'disability-services',
    displayName: 'Disability Services',
    icon: '♿',
    bgColor: 'bg-aurora-azure400 hover:bg-blue-500',
    description: 'Accessibility | Support',
    printableCategories: [
      'DISABILITY SERVICES (EXPANDED)'
    ]
  }
]

// Additional categories that don't need separate pages but are included in comprehensive resources
export const ADDITIONAL_CATEGORIES = [
  'ADDITIONAL COMPREHENSIVE RESOURCES',
  'SPECIALIZED SERVICES', 
  'FAITH-BASED SERVICES',
  'COMMUNITY CENTERS',
  'PET SERVICES',
  'SEASONAL/WEATHER EMERGENCY SERVICES',
  'RECREATION & SOCIAL PROGRAMS',
  'ADDITIONAL COMMUNITY SUPPORT SERVICES'
]

/**
 * Get all category routes that should exist
 */
export function getAllCategoryRoutes(): string[] {
  return CATEGORY_MAPPINGS.map(mapping => mapping.routeName)
}

/**
 * Get category mapping by route name
 */
export function getCategoryMapping(routeName: string): CategoryMapping | undefined {
  return CATEGORY_MAPPINGS.find(mapping => mapping.routeName === routeName)
}

/**
 * Get printable categories for a route
 */
export function getPrintableCategoriesForRoute(routeName: string): string[] {
  const mapping = getCategoryMapping(routeName)
  return mapping ? mapping.printableCategories : []
}

/**
 * Get route name for a printable category
 */
export function getRouteForPrintableCategory(printableCategory: string): string | undefined {
  const mapping = CATEGORY_MAPPINGS.find(m => 
    m.printableCategories.includes(printableCategory)
  )
  return mapping?.routeName
}