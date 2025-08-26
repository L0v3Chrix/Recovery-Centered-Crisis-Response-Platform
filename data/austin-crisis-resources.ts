import { Resource, ResourceCategory, RecoveryStage, CrisisResource } from '@/types/resources'

// Crisis and emergency resources for Austin/Travis County area
export const austinCrisisResources: Resource[] = [
  {
    id: 'crisis-988-lifeline',
    name: '988 Suicide & Crisis Lifeline',
    description: 'National crisis support available 24/7/365. Free, confidential crisis counseling.',
    category: ResourceCategory.CRISIS,
    address: 'National Hotline Service',
    phone: '988',
    website: 'https://988lifeline.org',
    hours: { isOpen24Hours: true },
    eligibility: ['Anyone in crisis', 'Free and confidential'],
    services: ['Crisis intervention', 'Emotional support', 'Suicide prevention', 'Follow-up care referrals'],
    recoveryStage: [RecoveryStage.CRISIS],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 }, // Austin center
    isOpen24Hours: true,
    hasCrisisSupport: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish', '200+ languages available']
  },

  {
    id: 'crisis-text-line',
    name: 'Crisis Text Line',
    description: 'Free, 24/7 crisis support via text message. Text HOME to 741741.',
    category: ResourceCategory.CRISIS,
    address: 'Text Service',
    phone: '741741',
    website: 'https://www.crisistextline.org',
    hours: { isOpen24Hours: true },
    eligibility: ['Anyone in crisis', 'Free and confidential'],
    services: ['Text-based crisis support', 'Active listening', 'De-escalation', 'Safety planning'],
    recoveryStage: [RecoveryStage.CRISIS],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    isOpen24Hours: true,
    hasCrisisSupport: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish'],
    notes: 'Text HOME to 741741 to connect with a crisis counselor'
  },

  {
    id: 'austin-travis-crisis-line',
    name: 'Austin/Travis County Crisis Line',
    description: '24/7 local crisis intervention and mental health emergency services',
    category: ResourceCategory.CRISIS,
    address: '1430 Collier St, Austin, TX 78704',
    phone: '(512) 472-4357',
    website: 'https://integralcare.org',
    hours: { isOpen24Hours: true },
    eligibility: ['Austin/Travis County residents', 'Mental health emergencies'],
    services: ['24/7 crisis line', 'Mobile crisis outreach', 'Walk-in crisis services', 'Assessment and referrals'],
    recoveryStage: [RecoveryStage.CRISIS],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2460, lng: -97.7697 },
    isOpen24Hours: true,
    hasCrisisSupport: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'integral-care-crisis',
    name: 'Integral Care Crisis Services',
    description: 'Comprehensive crisis services including mobile outreach and walk-in crisis support',
    category: ResourceCategory.CRISIS,
    address: '1430 Collier St, Austin, TX 78704',
    phone: '(512) 472-4357',
    website: 'https://integralcare.org',
    hours: { isOpen24Hours: true },
    eligibility: ['Travis County residents', 'Mental health or substance use crisis'],
    services: ['24/7 crisis line', 'Mobile crisis outreach', 'Walk-in crisis services', 'Crisis respite', 'Peer support'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.EARLY_RECOVERY],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2460, lng: -97.7697 },
    isOpen24Hours: true,
    hasCrisisSupport: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'austin-state-hospital-emergency',
    name: 'Austin State Hospital Emergency Services',
    description: 'Psychiatric emergency services and crisis assessment',
    category: ResourceCategory.CRISIS,
    address: '4110 Guadalupe St, Austin, TX 78751',
    phone: '(512) 452-0361',
    hours: { isOpen24Hours: true },
    eligibility: ['Psychiatric emergencies', 'Involuntary commitments', 'Crisis assessments'],
    services: ['Psychiatric emergency services', 'Crisis assessment', 'Involuntary commitment evaluation', '24/7 emergency response'],
    recoveryStage: [RecoveryStage.CRISIS],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.3089, lng: -97.7311 },
    isOpen24Hours: true,
    hasCrisisSupport: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  },

  {
    id: 'nami-central-texas-crisis',
    name: 'NAMI Central Texas Crisis Support',
    description: 'Crisis support, family support, and resource navigation for mental health',
    category: ResourceCategory.CRISIS,
    address: 'Phone support and referrals',
    phone: '(512) 420-9810',
    website: 'https://namicentraltx.org',
    hours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' }
    },
    eligibility: ['Anyone affected by mental illness', 'Family members and caregivers'],
    services: ['Crisis support', 'Family support', 'Resource navigation', 'Education and advocacy', 'Support groups'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT, RecoveryStage.FAMILY_SUPPORT],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    hasCrisisSupport: true,
    acceptsWalkIns: false,
    languages: ['English', 'Spanish']
  },

  {
    id: 'emergency-911',
    name: 'Emergency Services - 911',
    description: 'Call 911 for immediate medical or psychiatric emergencies',
    category: ResourceCategory.CRISIS,
    address: 'Emergency Response System',
    phone: '911',
    hours: { isOpen24Hours: true },
    eligibility: ['Life-threatening emergencies', 'Medical emergencies', 'Psychiatric emergencies'],
    services: ['Emergency medical response', 'Fire department', 'Police response', 'Psychiatric emergency response'],
    recoveryStage: [RecoveryStage.CRISIS],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    isOpen24Hours: true,
    hasCrisisSupport: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish', 'Translation services available'],
    notes: 'For life-threatening emergencies only'
  },

  // Substance use specific crisis resources
  {
    id: 'samhsa-national-helpline',
    name: 'SAMHSA National Helpline',
    description: 'Free, confidential, 24/7 treatment referral and information service for substance use disorders',
    category: ResourceCategory.CRISIS,
    address: 'National Helpline Service',
    phone: '1-800-662-4357',
    website: 'https://www.samhsa.gov/find-help/national-helpline',
    hours: { isOpen24Hours: true },
    eligibility: ['Anyone seeking help for substance use disorders', 'Family members'],
    services: ['Treatment referrals', 'Information service', 'Local support group referrals', 'Community organizations'],
    recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.DETOX],
    lastVerified: new Date('2025-01-01'),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    isOpen24Hours: true,
    hasCrisisSupport: true,
    acceptsWalkIns: true,
    languages: ['English', 'Spanish']
  }
]

// Helper functions
export function get24HourCrisisResources(): Resource[] {
  return austinCrisisResources.filter(resource => resource.isOpen24Hours)
}

export function getPhoneCrisisResources(): Resource[] {
  return austinCrisisResources.filter(resource => 
    resource.services.some(service => 
      service.toLowerCase().includes('phone') || 
      service.toLowerCase().includes('hotline') || 
      service.toLowerCase().includes('crisis line')
    )
  )
}

export function getTextCrisisResources(): Resource[] {
  return austinCrisisResources.filter(resource => 
    resource.services.some(service => 
      service.toLowerCase().includes('text')
    )
  )
}