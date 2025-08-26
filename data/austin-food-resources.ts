import { Resource, ResourceCategory, RecoveryStage, MealType, FoodResource } from '@/types/resources'

// Extracted from Austin Resource Guide (English) - Food.pdf - May 2024
// Source: Street Forum Mutual Aid volunteers

export const austinFoodResources: Resource[] = [
  // MEALS - Hot meal programs
  {
    id: 'angel-house-austin',
    name: 'Angel House',
    description: 'Daily sack breakfast & coffee, and sack lunch with soup; showers, men\u2019s clothes',
    category: ResourceCategory.FOOD,
    address: '908 E Cesar Chavez St, Austin, TX 78702',
    phone: '(512) 643-2327',
    hours: {
      monday: { open: '09:30', close: '12:30' },
      tuesday: { open: '09:30', close: '12:30' },
      wednesday: { open: '09:30', close: '12:30' },
      thursday: { open: '09:30', close: '12:30' },
      friday: { open: '09:30', close: '12:30' },
      saturday: { open: '09:30', close: '12:30' },
      sunday: { open: '09:30', close: '12:30' }
    },
    eligibility: ['No restrictions'],
    services: ['Sack breakfast', 'Coffee', 'Sack lunch with soup', 'Showers', 'Men\u2019s clothing'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-15'),
    coordinates: { lat: 30.2594, lng: -97.7294 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'street-forum-mutual-aid',
    name: 'Street Forum Mutual Aid',
    description: 'Hot breakfast tacos/sandwiches, coffee, water, and hygiene',
    category: ResourceCategory.FOOD,
    address: '422 Guadalupe St, Austin, TX 78701',
    phone: 'Contact via @streetforumatx on Instagram',
    hours: {
      sunday: { open: '09:00', close: '11:00' }
    },
    eligibility: ['No restrictions'],
    services: ['Hot breakfast tacos', 'Sandwiches', 'Coffee', 'Water', 'Hygiene supplies'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-15'),
    coordinates: { lat: 30.2695, lng: -97.7455 }, // Republic Square
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'sunrise-homeless-navigation',
    name: 'Sunrise Homeless Navigation Center',
    description: 'Hot lunch and coffee/tea, comprehensive services',
    category: ResourceCategory.FOOD,
    address: '4430 Menchaca Rd, Austin, TX 78745',
    phone: '(512) 444-4673',
    hours: {
      monday: { open: '09:00', close: '13:00' },
      tuesday: { open: '09:00', close: '13:00' },
      wednesday: { open: '09:00', close: '13:00' },
      thursday: { open: '09:00', close: '13:00' },
      friday: { open: '09:00', close: '13:00' }
    },
    eligibility: ['No restrictions'],
    services: ['Hot lunch', 'Coffee', 'Tea', 'Coordinated assessments', 'Vital documents', 'Clothing', 'Showers', 'Mail services', 'Benefits assistance'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-16'),
    coordinates: { lat: 30.2240, lng: -97.8010 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'trinity-center-austin',
    name: 'Trinity Center',
    description: 'Daily breakfast served at doors along 7th St. Sunday lunch with optional worship.',
    category: ResourceCategory.FOOD,
    address: '304 E 7th St, Austin, TX 78701',
    phone: '(512) 610-3520',
    hours: {
      monday: { open: '09:00', close: '09:30' },
      tuesday: { open: '09:00', close: '09:30' },
      wednesday: { open: '09:00', close: '09:30' },
      thursday: { open: '09:00', close: '09:30' },
      friday: { open: '09:00', close: '09:30' },
      sunday: { open: '15:30', close: '16:00' }
    },
    eligibility: ['No restrictions'],
    services: ['Daily breakfast', 'Sunday lunch', 'Vital documents', 'Clothing', 'Supplies', 'Mail services', 'Showers', 'Financial assistance'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-16'),
    coordinates: { lat: 30.2669, lng: -97.7403 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'caritas-austin',
    name: 'Caritas',
    description: 'Free, nutritious lunch. Across from the ARCH.',
    category: ResourceCategory.FOOD,
    address: '611 Neches St, Austin, TX 78701',
    phone: '(512) 479-4610',
    hours: {
      monday: { open: '11:00', close: '12:30' },
      tuesday: { open: '11:00', close: '12:30' },
      wednesday: { open: '11:00', close: '12:30' },
      thursday: { open: '11:00', close: '12:30' },
      friday: { open: '11:00', close: '12:30' }
    },
    eligibility: ['No restrictions'],
    services: ['Free nutritious lunch'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-16'),
    coordinates: { lat: 30.2669, lng: -97.7392 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'mobile-loaves-fishes',
    name: 'Mobile Loaves and Fishes Trucks',
    description: 'Trucks provide breakfast, lunch, and dinner from trucks at various locations',
    category: ResourceCategory.FOOD,
    address: 'Contact phone number for daily locations',
    phone: '(512) 328-7299',
    hours: {
      isOpen24Hours: false,
      // Operating 7AM-7:30PM various locations
    },
    eligibility: ['No restrictions'],
    services: ['Mobile food trucks', 'Breakfast', 'Lunch', 'Dinner', 'Street outreach'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-16'),
    coordinates: { lat: 30.2672, lng: -97.7431 }, // Austin center
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  // FOOD PANTRIES
  {
    id: 'central-texas-food-bank',
    name: 'Central Texas Food Bank',
    description: 'Find free food near you through the largest food bank network in Central Texas',
    category: ResourceCategory.FOOD,
    address: 'Multiple locations - see website',
    phone: '(877) 541-7905',
    website: 'https://www.centraltexasfoodbank.org/food-assistance/get-food-now',
    hours: {
      isOpen24Hours: false
    },
    eligibility: ['No restrictions'],
    services: ['Food pantries', 'Mobile pantries', 'Fresh produce', 'Nutrition education', 'Senior programs'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-15'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'micah-6-food-pantry',
    name: 'Micah 6 Food Pantry',
    description: 'No zip limits. Can visit once a week. Health screenings on Thursday.',
    category: ResourceCategory.FOOD,
    address: '2200 San Antonio St, Austin, TX 78705',
    phone: '(512) 477-7454',
    hours: {
      thursday: { open: '17:30', close: '19:00' },
      saturday: { open: '09:30', close: '11:00' }
    },
    eligibility: ['No income or zip code restrictions', 'Can visit once per week'],
    services: ['Food pantry', 'Health screenings'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-06-20'),
    coordinates: { lat: 30.2847, lng: -97.7464 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'manos-de-cristo-pantry',
    name: 'Manos de Cristo',
    description: 'No income or zip limits. Only 12 served each day. Other resources available.',
    category: ResourceCategory.FOOD,
    address: '4911 Harmon Ave, Austin, TX 78751',
    phone: '(512) 476-5321',
    hours: {
      monday: { open: '08:00', close: '11:00' },
      tuesday: { open: '08:00', close: '11:00' },
      wednesday: { open: '08:00', close: '11:00' },
      thursday: { open: '08:00', close: '11:00' },
      friday: { open: '08:00', close: '11:00' }
    },
    eligibility: ['No income or zip code restrictions', 'Limited to 12 people per day'],
    services: ['Food pantry', 'Additional support services'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-16'),
    coordinates: { lat: 30.3145, lng: -97.7073 },
    acceptsWalkIns: true,
    notes: 'First come, first served - limited to 12 people daily',
    languages: ['English', 'Spanish']
  },

  // ATX FREE FRIDGES - 24/7 Access
  {
    id: 'atx-free-fridges-dove-springs',
    name: 'ATX Free Fridge - Dove Springs',
    description: 'Free community fridge with donated food available 24/7',
    category: ResourceCategory.FOOD,
    address: '6710 Ripple Run Rd, Austin, TX',
    phone: 'Contact: atxfreefridge@gmail.com',
    hours: { isOpen24Hours: true },
    eligibility: ['No restrictions'],
    services: ['24/7 free food', 'Community donations'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-15'),
    coordinates: { lat: 30.1735, lng: -97.7590 },
    isOpen24Hours: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'atx-free-fridge-2nd-street',
    name: 'ATX Free Fridge - 2nd Street',
    description: 'Free community fridge with donated food available 24/7',
    category: ResourceCategory.FOOD,
    address: '1710 E 2nd St, Austin, TX',
    phone: 'Contact: atxfreefridge@gmail.com',
    hours: { isOpen24Hours: true },
    eligibility: ['No restrictions'],
    services: ['24/7 free food', 'Community donations'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-15'),
    coordinates: { lat: 30.2594, lng: -97.7235 },
    isOpen24Hours: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'atx-free-fridge-dittmar',
    name: 'ATX Free Fridge - Dittmar',
    description: 'Free community fridge with donated food available 24/7. Also has clothing racks.',
    category: ResourceCategory.FOOD,
    address: '618 W Dittmar Rd, Austin, TX',
    phone: 'Contact: atxfreefridge@gmail.com',
    hours: { isOpen24Hours: true },
    eligibility: ['No restrictions'],
    services: ['24/7 free food', 'Community donations', 'Clothing racks'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-05-15'),
    coordinates: { lat: 30.2068, lng: -97.7845 },
    isOpen24Hours: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  // Additional key food resources
  {
    id: 'hope-food-pantry',
    name: 'Hope Food Pantry',
    description: 'Food pantry with shelves and fridge. Come twice per month. Lottery system for distribution.',
    category: ResourceCategory.FOOD,
    address: '4001 Speedway, Austin, TX 78751',
    phone: '(512) 592-3171',
    website: 'https://hopefoodpantryaustin.org/',
    hours: {
      thursday: { open: '09:00', close: '10:30' },
      friday: { open: '09:00', close: '10:30' },
      saturday: { open: '09:00', close: '10:30' }
    },
    eligibility: ['Can visit twice per month', 'Lottery system for food distribution'],
    services: ['Food pantry', 'Fresh produce', 'Pet food', 'Reading materials', 'Utility assistance'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
    lastVerified: new Date('2024-06-08'),
    coordinates: { lat: 30.2991, lng: -97.7364 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  }
]

// Helper function to get food resources by meal type
export function getFoodResourcesByMealType(mealType: MealType): Resource[] {
  return austinFoodResources.filter(resource => {
    // Check if resource provides specific meal type based on services
    const services = resource.services.map(s => s.toLowerCase())
    
    switch (mealType) {
      case MealType.BREAKFAST:
        return services.some(s => s.includes('breakfast'))
      case MealType.LUNCH:
        return services.some(s => s.includes('lunch'))
      case MealType.DINNER:
        return services.some(s => s.includes('dinner'))
      case MealType.GROCERIES:
        return services.some(s => s.includes('pantry') || s.includes('groceries'))
      case MealType.FOOD_PANTRY:
        return services.some(s => s.includes('pantry'))
      default:
        return true
    }
  })
}

// Helper to get 24/7 food resources
export function get247FoodResources(): Resource[] {
  return austinFoodResources.filter(resource => resource.isOpen24Hours)
}

// Helper to get walk-in friendly food resources
export function getWalkInFoodResources(): Resource[] {
  return austinFoodResources.filter(resource => resource.acceptsWalkIns)
}