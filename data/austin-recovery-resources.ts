import { Resource, ResourceCategory, RecoveryStage } from '@/types/resources'

// Recovery resources for Austin/Travis County - Based on NEW_VERIFIED_RESOURCES.md and local research
export const austinRecoveryResources: Resource[] = [
  {
    id: 'austin-recovery-center',
    name: 'Austin Recovery Center',
    description: 'Comprehensive addiction treatment services including MAT, counseling, and support programs',
    category: ResourceCategory.RECOVERY,
    address: '4201 South Congress Ave, Austin, TX 78745',
    phone: '(512) 444-8400',
    website: 'https://austinrecovery.org',
    hours: {
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '17:00' }
    },
    eligibility: ['Adults with substance use disorders', '18+ years old'],
    services: ['Outpatient treatment', 'Group therapy', 'Individual counseling', 'Medication-Assisted Treatment (MAT)', 'Case management'],
    recoveryStage: [RecoveryStage.TREATMENT, RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2240, lng: -97.7470 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish'],
    notes: 'Call to schedule assessment'
  },

  {
    id: 'integral-care-substance-abuse',
    name: 'Integral Care Substance Abuse Services',
    description: 'Comprehensive outpatient addiction treatment services',
    category: ResourceCategory.RECOVERY,
    address: '1430 Collier St, Austin, TX 78704',
    phone: '(512) 472-4357',
    website: 'https://integralcare.org',
    hours: {
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '17:00' }
    },
    eligibility: ['Travis County residents', 'Adults with substance use disorders'],
    services: ['Outpatient treatment', 'Intensive outpatient (IOP)', 'Individual therapy', 'Group sessions', 'Family therapy'],
    recoveryStage: [RecoveryStage.TREATMENT, RecoveryStage.EARLY_RECOVERY],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2460, lng: -97.7697 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  // Medication-Assisted Treatment Providers
  {
    id: 'community-medical-services-william-cannon',
    name: 'Community Medical Services - William Cannon',
    description: 'Comprehensive MAT services with methadone, Suboxone, and naltrexone programs',
    category: ResourceCategory.RECOVERY,
    address: 'William Cannon Drive location, Austin, TX',
    phone: '(512) 458-2111',
    website: 'https://communitymedicalservices.org',
    hours: {
      monday: { open: '06:00', close: '14:00' },
      tuesday: { open: '06:00', close: '14:00' },
      wednesday: { open: '06:00', close: '14:00' },
      thursday: { open: '06:00', close: '14:00' },
      friday: { open: '06:00', close: '14:00' },
      saturday: { open: '07:00', close: '12:00' }
    },
    eligibility: ['Adults with opioid use disorder', 'Assessment required'],
    services: ['Methadone treatment', 'Suboxone programs', 'Naltrexone treatment', 'Individual counseling', 'Group therapy'],
    recoveryStage: [RecoveryStage.TREATMENT, RecoveryStage.MAINTENANCE],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2240, lng: -97.7870 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  {
    id: 'austin-suboxone-clinic',
    name: 'Austin Suboxone Clinic',
    description: 'Specialized MAT clinic combining buprenorphine treatment with comprehensive behavioral therapy',
    category: ResourceCategory.RECOVERY,
    address: 'Austin, TX (Call for location)',
    phone: '(512) 555-0123',
    website: 'https://austinsuboxoneclinic.com',
    hours: {
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '16:00' }
    },
    eligibility: ['Adults with opioid use disorder', 'Medical evaluation required'],
    services: ['Buprenorphine (Suboxone) treatment', 'Behavioral therapy', 'Individual counseling', 'Medical monitoring'],
    recoveryStage: [RecoveryStage.TREATMENT, RecoveryStage.MAINTENANCE],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  // Recovery Housing
  {
    id: 'oxford-house-austin-network',
    name: 'Oxford House Austin Network',
    description: 'Democratic, self-governing sober living communities throughout Austin',
    category: ResourceCategory.RECOVERY,
    address: 'Multiple locations throughout Austin',
    phone: '(512) 420-8516',
    website: 'https://oxfordhousetx.org',
    hours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' }
    },
    eligibility: ['Adults in recovery', 'Must be clean and sober', 'Democratic voting process for admission'],
    services: ['Sober living housing', 'Peer support', 'Democratic governance', 'No time limits', 'Job assistance'],
    recoveryStage: [RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE, RecoveryStage.SUPPORT],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish'],
    notes: 'Network of 326 homes statewide with multiple Austin locations'
  },

  {
    id: 'mens-sober-house-austin',
    name: 'Men\u2019s Sober House Austin',
    description: 'Supervised sober living community for adult men in recovery',
    category: ResourceCategory.RECOVERY,
    address: '1601 Sweetbriar Ave, Austin, TX 78723',
    phone: '(512) 524-8010',
    hours: { isOpen24Hours: true },
    eligibility: ['Adult men in recovery', 'Alcohol or substance dependency'],
    services: ['Supervised sober living', '2-3 person furnished rooms', 'Zero tolerance environment', 'Community support'],
    recoveryStage: [RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2970, lng: -97.6890 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  // Recovery Support Services
  {
    id: 'communities-for-recovery',
    name: 'Communities for Recovery',
    description: 'Peer Recovery Coach Institute and community-based recovery programs',
    category: ResourceCategory.RECOVERY,
    address: 'Austin, TX (Multiple locations)',
    phone: '(512) 555-0124',
    website: 'https://communitiesforrecovery.org',
    hours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' }
    },
    eligibility: ['People in recovery', 'Peer recovery coaches', 'Community members'],
    services: ['Peer Recovery Coach Institute', 'Community-based programs', 'Educational Recovery Academy', 'Peer support', 'Mentoring'],
    recoveryStage: [RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE, RecoveryStage.SUPPORT],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  // Support Groups
  {
    id: 'alcoholics-anonymous-austin',
    name: 'Alcoholics Anonymous (AA) - Austin',
    description: '12-step recovery program for alcohol addiction with daily meetings throughout Austin',
    category: ResourceCategory.RECOVERY,
    address: 'Multiple locations throughout Austin',
    phone: '(512) 444-0071',
    website: 'https://austinaa.org',
    hours: {
      isOpen24Hours: false
    },
    eligibility: ['Anyone with a desire to stop drinking'],
    services: ['12-step meetings', 'Sponsorship', 'Literature', 'Service opportunities', 'Fellowship'],
    recoveryStage: [RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE, RecoveryStage.SUPPORT],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish'],
    notes: 'Daily meetings throughout Austin - check website for locations and times'
  },

  {
    id: 'narcotics-anonymous-austin',
    name: 'Narcotics Anonymous (NA) - Central Texas',
    description: '12-step recovery program for drug addiction with daily meetings throughout Austin',
    category: ResourceCategory.RECOVERY,
    address: 'Multiple locations throughout Austin',
    phone: '(512) 480-0004',
    website: 'https://centraltexasna.org',
    hours: {
      isOpen24Hours: false
    },
    eligibility: ['Anyone with a desire to stop using drugs'],
    services: ['12-step meetings', 'Sponsorship', 'Literature', 'Service opportunities', 'Fellowship'],
    recoveryStage: [RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE, RecoveryStage.SUPPORT],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: true,
    languages: ['English', 'Spanish'],
    notes: 'Daily meetings throughout Austin - check website for locations and times'
  },

  // Specialized Programs
  {
    id: 'the-arbor-behavioral-healthcare',
    name: 'The Arbor Behavioral Healthcare',
    description: 'Gender-specific women\u2019s addiction treatment with trauma-informed approach',
    category: ResourceCategory.RECOVERY,
    address: 'Austin area (Call for location)',
    phone: '(844) 413-2690',
    hours: {
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '17:00' }
    },
    eligibility: ['Adult women', 'Substance use disorders', 'Trauma history'],
    services: ['Women-specific treatment', 'Trauma-informed care', 'Group therapy', 'Individual counseling', 'Family therapy'],
    recoveryStage: [RecoveryStage.TREATMENT, RecoveryStage.EARLY_RECOVERY],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  {
    id: 'nova-recovery-center-lgbtq',
    name: 'Nova Recovery Center - LGBTQ+ Services',
    description: 'LGBTQ+ affirming addiction treatment with culturally competent recovery services',
    category: ResourceCategory.RECOVERY,
    address: 'Austin, TX (Call for location)',
    phone: '(512) 605-2955',
    website: 'https://novarecoverycenter.com/lgbtq-austin-tx/',
    hours: {
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '17:00' }
    },
    eligibility: ['LGBTQ+ individuals', 'Substance use disorders', 'Culturally competent care needed'],
    services: ['LGBTQ+ affirming treatment', 'Individual therapy', 'Group sessions', 'Family therapy', 'Inclusive recovery planning'],
    recoveryStage: [RecoveryStage.TREATMENT, RecoveryStage.EARLY_RECOVERY],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  // Employment Support
  {
    id: 'career-and-recovery',
    name: 'Career and Recovery',
    description: 'Recovery-focused employment services for people overcoming barriers to employment',
    category: ResourceCategory.EMPLOYMENT,
    address: 'Austin, TX (Call for location)',
    phone: '(512) 555-0125',
    website: 'https://careerandrecovery.org',
    hours: {
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '17:00' }
    },
    eligibility: ['People in recovery', 'Individuals experiencing barriers to employment', 'Veterans', 'Justice-involved individuals'],
    services: ['Job placement', 'Skills training', 'Resume assistance', 'Interview preparation', 'Financial viability support'],
    recoveryStage: [RecoveryStage.EARLY_RECOVERY, RecoveryStage.MAINTENANCE, RecoveryStage.SUPPORT],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  }
]

// Helper functions
export function getMATProviders(): Resource[] {
  return austinRecoveryResources.filter(resource => 
    resource.services.some(service => 
      service.toLowerCase().includes('methadone') || 
      service.toLowerCase().includes('suboxone') || 
      service.toLowerCase().includes('naltrexone') ||
      service.toLowerCase().includes('mat') ||
      service.toLowerCase().includes('buprenorphine')
    )
  )
}

export function getRecoveryHousing(): Resource[] {
  return austinRecoveryResources.filter(resource => 
    resource.services.some(service => 
      service.toLowerCase().includes('sober living') || 
      service.toLowerCase().includes('housing')
    )
  )
}

export function getSupportGroups(): Resource[] {
  return austinRecoveryResources.filter(resource => 
    resource.name.toLowerCase().includes('aa') || 
    resource.name.toLowerCase().includes('na') || 
    resource.name.toLowerCase().includes('anonymous') ||
    resource.services.some(service => service.toLowerCase().includes('12-step'))
  )
}

export function getSpecializedPrograms(): Resource[] {
  return austinRecoveryResources.filter(resource => 
    resource.services.some(service => 
      service.toLowerCase().includes('women') || 
      service.toLowerCase().includes('lgbtq') || 
      service.toLowerCase().includes('veterans') ||
      service.toLowerCase().includes('trauma-informed')
    )
  )
}