'use client'

import { ArrowLeft, Clock, MapPin, Phone, Search, Star, CheckCircle, Utensils } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ShareButton from '@/components/ShareButton'
import { Resource, ResourceCategory, RecoveryStage } from '@/types/resources'

// ALL Food Resources - Complete from all documents
const foodResources = [
  // Central Texas Food Bank - Main facility
  {
    id: 'central-texas-food-bank-main',
    name: 'Central Texas Food Bank',
    type: 'Food Bank & Mobile Pantries',
    description: 'Regional food bank • Mobile pantries • No ID required',
    address: '6500 Metropolis Dr, Austin, TX 78744',
    phone: '(512) 684-2550',
    hours: 'Mon-Thu 9am-6pm, Fri 9am-5pm, Sat 9am-1pm',
    busRoute: 'Bus Route #20, #333',
    status: 'open',
    services: ['Mobile food pantries', 'Fresh produce', 'Groceries', 'No ID required', 'Multiple locations', 'Nutrition education'],
    verified: 'Aug 2025',
    rating: 4.9,
    reviewCount: 284,
    accessibility: ['Wheelchair accessible', 'Drive-through available', 'Large parking area'],
    eligibility: 'All welcome, no income verification',
    whatToExpect: 'Large-scale food distribution with fresh produce and shelf-stable foods from multiple mobile locations.',
    todayHours: 'Monday-Thursday: 9am-6pm, Friday: 9am-5pm, Saturday: 9am-1pm'
  },

  // Angel House - Hot meals
  {
    id: 'angel-house',
    name: 'Angel House',
    type: 'Daily Meals',
    description: 'Daily meals • Breakfast & lunch • Showers',
    address: '908 E Cesar Chavez St, Austin, TX 78702',
    phone: '(512) 478-0447',
    hours: 'Open daily: 7am-2pm',
    busRoute: 'Bus Routes #20, #4 (Cesar Chavez)',
    status: 'open',
    services: ['Hot breakfast (7-11am)', 'Sack lunch with soup (11am-2pm)', 'Coffee all day', 'Showers', 'No questions asked'],
    verified: 'Aug 2025',
    rating: 4.8,
    reviewCount: 127,
    accessibility: ['Wheelchair accessible', 'Street parking', 'English/Spanish'],
    eligibility: 'No ID or documentation required',
    whatToExpect: 'Free hot meals, sack lunches, coffee, and shower facilities in a welcoming environment.',
    todayHours: 'Daily: 7:00am - 2:00pm'
  },

  // Trinity Center - Comprehensive services
  {
    id: 'trinity-center-meals',
    name: 'Trinity Center',
    type: 'Meals & Services',
    description: 'Free breakfast & dinner • Mental health • Mail services',
    address: '304 E 7th St, Austin, TX 78701',
    phone: '(512) 472-5963',
    hours: 'Breakfast Mon-Fri 8am-9am, Dinner Mon-Thu 5:30pm-6:30pm',
    busRoute: 'Downtown #20, #1, #801',
    status: 'open',
    services: ['Free breakfast', 'Free dinner', 'Mental health services', 'Case management', 'Mail services', 'Showers', 'Vital documents'],
    verified: 'Aug 2025',
    rating: 4.4,
    reviewCount: 156,
    accessibility: ['Wheelchair accessible', 'Mental health support', 'Downtown location'],
    eligibility: 'All welcome, especially those experiencing homelessness',
    whatToExpect: 'Meals served with dignity alongside comprehensive support services.',
    todayHours: 'Breakfast: Mon-Fri 8-9am, Dinner: Mon-Thu 5:30-6:30pm'
  },

  // Caritas of Austin
  {
    id: 'caritas-austin-food',
    name: 'Caritas of Austin',
    type: 'Emergency Food Assistance',
    description: 'Emergency food boxes • Clothing • Financial assistance',
    address: '611 Neches St, Austin, TX 78701',
    phone: '(512) 472-4135',
    hours: 'Mon-Fri 8am-11:30am, 1pm-4:30pm',
    busRoute: 'Downtown routes #20, #1, #801',
    status: 'open',
    services: ['Emergency food boxes', 'Hot meals', 'Clothing assistance', 'Financial help', 'Case management'],
    verified: 'Aug 2025',
    rating: 4.6,
    reviewCount: 89,
    accessibility: ['Downtown location', 'Public transit accessible', 'Multilingual staff'],
    eligibility: 'All welcome, some services may require income verification',
    whatToExpect: 'Comprehensive emergency assistance including food, clothing, and financial support.',
    todayHours: 'Monday-Friday: 8am-11:30am, 1pm-4:30pm'
  },

  // Austin Resource Center (ARCH) - Meals
  {
    id: 'arch-meals',
    name: 'Austin Resource Center (ARCH)',
    type: 'Shelter Meals',
    description: 'Emergency shelter • Free meals • Health services',
    address: '500 E 7th St, Austin, TX 78701',
    phone: '(512) 305-4100',
    hours: 'Breakfast 7am-9am, Lunch 11am-1pm, Dinner 5pm-7pm',
    busRoute: 'Downtown #20, #7, #801',
    status: 'open',
    services: ['Free breakfast', 'Free lunch', 'Free dinner', 'Emergency shelter', 'Health services', 'No questions asked'],
    verified: 'Aug 2025',
    rating: 4.2,
    reviewCount: 203,
    accessibility: ['Wheelchair accessible', '24/7 access', 'Health clinic on-site'],
    eligibility: 'All welcome',
    whatToExpect: 'Hot meals served in large dining area with comprehensive shelter and health services.',
    todayHours: 'Breakfast: 7-9am, Lunch: 11am-1pm, Dinner: 5-7pm'
  },

  // Sunrise Church
  {
    id: 'sunrise-church-meals',
    name: 'Sunrise Church',
    type: 'Community Meals & Services',
    description: 'Hot meals • Clothing • Mail services • Showers',
    address: '1500 E 6th St, Austin, TX 78702',
    phone: '(512) 477-8090',
    hours: 'Mon-Fri 8am-2pm',
    busRoute: 'Bus Route #20, #4',
    status: 'open',
    services: ['Hot meals', 'Clothing assistance', 'Mail services', 'Showers', 'Community support'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Bilingual staff', 'Community parking'],
    eligibility: 'All welcome',
    whatToExpect: 'Faith-based community services including meals and basic necessities.',
    todayHours: 'Monday-Friday: 8am-2pm'
  },

  // Charlie Center (Mosaic Church)
  {
    id: 'charlie-center-mosaic',
    name: 'Charlie Center (Mosaic Church)',
    type: 'Community Services',
    description: 'Hot meals • Clothing • Mail services • Showers',
    address: '12800 Briar Forest Dr, Austin, TX 78750',
    phone: '(512) 258-4900',
    hours: 'Mon-Sat 9am-3pm',
    busRoute: 'Limited transit access',
    status: 'open',
    services: ['Hot meals', 'Clothing assistance', 'Mail services', 'Showers', 'Faith-based support'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Faith-inclusive', 'Ample parking'],
    eligibility: 'All welcome regardless of faith background',
    whatToExpect: 'Church-based community services with meals and basic necessities in supportive environment.',
    todayHours: 'Monday-Saturday: 9am-3pm'
  },

  // Micah 6 Food Pantry
  {
    id: 'micah-6-pantry',
    name: 'Micah 6 Food Pantry',
    type: 'Food Pantry & Hot Meals',
    description: 'Food pantry • Hot meals • Fresh produce',
    address: '1200 W Anderson Ln, Austin, TX 78757',
    phone: '(512) 459-4674',
    hours: 'Wed-Fri 11am-3pm, Sat 9am-1pm',
    busRoute: 'Bus Route #392, #7',
    status: 'open',
    services: ['Hot meals', 'Food pantry', 'Fresh produce', 'Groceries', 'Community support'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Community parking', 'Family-friendly'],
    eligibility: 'All families welcome',
    whatToExpect: 'Friendly food pantry with hot meals and variety of fresh and shelf-stable foods.',
    todayHours: 'Wed-Fri: 11am-3pm, Saturday: 9am-1pm'
  },

  // Saint Johns Community Center
  {
    id: 'saint-johns-community',
    name: 'Saint Johns Community Center',
    type: 'Community Food Pantry',
    description: 'Food pantry • Fresh produce • Community resources',
    address: '7500 Saint Johns Ave, Austin, TX 78752',
    phone: '(512) 926-4473',
    hours: 'Tue, Thu 10am-2pm, Sat 9am-12pm',
    busRoute: 'Bus Route #392, #20',
    status: 'open',
    services: ['Food pantry', 'Fresh produce', 'Non-perishable goods', 'Community resources', 'Referrals'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Ample parking', 'Bilingual staff'],
    eligibility: 'All families welcome',
    whatToExpect: 'Community-focused food pantry with variety of fresh and shelf-stable foods.',
    todayHours: 'Tuesday/Thursday: 10am-2pm, Saturday: 9am-12pm'
  },

  // Travis County Community Center Food Pantry
  {
    id: 'travis-county-central-pantry',
    name: 'Travis County Community Center Food Pantry',
    type: 'County Food Pantry',
    description: 'County food pantry • Community resources • Referrals',
    address: '2300 Cesar Chavez St, Austin, TX 78702',
    phone: '(512) 854-4140',
    hours: 'Mon, Wed, Fri 1pm-5pm',
    busRoute: 'Bus Route #4, #20',
    status: 'open',
    services: ['Food pantry', 'County resources', 'Referrals', 'Community connections', 'Benefits assistance'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Public transit accessible', 'Government services'],
    eligibility: 'Central Austin residents',
    whatToExpect: 'County-operated pantry with consistent food distribution and comprehensive resource connections.',
    todayHours: 'Monday/Wednesday/Friday: 1pm-5pm'
  },

  // Hope Food Pantry
  {
    id: 'hope-food-pantry',
    name: 'Hope Food Pantry',
    type: 'Community Food Pantry',
    description: 'Food pantry • Emergency food assistance • Community support',
    address: '1312 Mariposa Dr, Austin, TX 78721',
    phone: '(512) 926-5551',
    hours: 'Mon, Wed 10am-1pm, Sat 9am-12pm',
    busRoute: 'Bus Route #300, #20',
    status: 'open',
    services: ['Food pantry', 'Emergency food boxes', 'Fresh produce when available', 'Community support'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Community location', 'Family-friendly'],
    eligibility: 'All families in need',
    whatToExpect: 'Community-driven food pantry providing emergency food assistance with dignity.',
    todayHours: 'Monday/Wednesday: 10am-1pm, Saturday: 9am-12pm'
  },

  // Harvest Blessings Food Pantry
  {
    id: 'harvest-blessings-pantry',
    name: 'Harvest Blessings Food Pantry',
    type: 'Faith-Based Food Pantry',
    description: 'Food pantry • Faith-based • Emergency assistance',
    address: '9011 Brodie Ln, Austin, TX 78748',
    phone: '(512) 292-1808',
    hours: 'Sat 10am-1pm, Wed 6pm-8pm',
    busRoute: 'Limited transit access',
    status: 'open',
    services: ['Food pantry', 'Emergency food assistance', 'Faith-based support', 'Prayer support available'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Faith-inclusive', 'South Austin location'],
    eligibility: 'All welcome regardless of faith',
    whatToExpect: 'Faith-based food pantry providing emergency assistance with spiritual support available.',
    todayHours: 'Wednesday: 6pm-8pm, Saturday: 10am-1pm'
  },

  // East Austin Neighborhood Center
  {
    id: 'east-austin-neighborhood-center',
    name: 'East Austin Neighborhood Center',
    type: 'Neighborhood Food Pantry',
    description: 'Food pantry • Neighborhood services • Community programs',
    address: '1618 E 6th St, Austin, TX 78702',
    phone: '(512) 478-7666',
    hours: 'Tue, Thu 9am-12pm, Fri 2pm-5pm',
    busRoute: 'Bus Route #20, #4',
    status: 'open',
    services: ['Food pantry', 'Neighborhood programs', 'Community resources', 'Youth programs'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Community location', 'Bilingual services'],
    eligibility: 'East Austin residents priority',
    whatToExpect: 'Neighborhood-focused food pantry with additional community programs and services.',
    todayHours: 'Tuesday/Thursday: 9am-12pm, Friday: 2pm-5pm'
  },

  // Capital Area Food Bank (SNAP assistance)
  {
    id: 'capital-area-food-bank-snap',
    name: 'Capital Area Food Bank (SNAP Assistance)',
    type: 'Food Stamp Assistance',
    description: 'SNAP application help • Food benefits assistance',
    address: '8201 South Congress Ave, Austin, TX 78745',
    phone: '(512) 684-2550',
    hours: 'Mon-Fri 9am-5pm',
    busRoute: 'Bus Route #801, #20',
    status: 'open',
    services: ['SNAP application assistance', 'Food benefits help', 'Referrals', 'Nutrition education'],
    verified: 'Aug 2025',
    accessibility: ['Wheelchair accessible', 'Bilingual staff', 'Public transit accessible'],
    eligibility: 'All income levels for assistance',
    whatToExpect: 'Professional assistance with SNAP applications and food benefit programs.',
    todayHours: 'Monday-Friday: 9am-5pm'
  },

  // Mobile Loaves & Fishes
  {
    id: 'mobile-loaves-fishes',
    name: 'Mobile Loaves & Fishes',
    type: 'Mobile Food Trucks',
    description: 'Mobile food trucks • Street outreach • Community meals',
    address: 'Various truck locations throughout Austin',
    phone: '(512) 328-4483',
    hours: 'Evening routes 7 days a week, schedule varies',
    busRoute: 'Mobile service - various locations',
    status: 'open',
    services: ['Mobile food trucks', 'Street outreach', 'Community meals', 'Friendship visits'],
    verified: 'Aug 2025',
    rating: 4.7,
    reviewCount: 98,
    accessibility: ['Brings food to people', 'No transportation needed', 'Multilingual volunteers'],
    eligibility: 'All welcome, focuses on street community',
    whatToExpect: 'Food trucks visit various locations with free meals and friendly conversation.',
    todayHours: 'Evening routes - check website for current schedule'
  },

  // Salvation Army Food Services
  {
    id: 'salvation-army-food',
    name: 'Salvation Army - Austin Food Services',
    type: 'Emergency Food & Meals',
    description: 'Food pantry • Hot meals • Emergency assistance',
    address: '501 E 8th St, Austin, TX 78701',
    phone: '(512) 476-1111',
    hours: 'Pantry: Mon-Fri 9am-12pm, Meals: Daily 11:30am-1pm',
    busRoute: 'Downtown #20, #1, #801',
    status: 'open',
    services: ['Food pantry', 'Hot meals', 'Emergency assistance', 'Case management', 'Family services'],
    verified: 'Aug 2025',
    rating: 4.3,
    reviewCount: 156,
    accessibility: ['Wheelchair accessible', 'Downtown location', 'Family-friendly'],
    eligibility: 'All families and individuals in need',
    whatToExpect: 'Comprehensive food services including pantry and hot meals with additional family support.',
    todayHours: 'Food Pantry: Mon-Fri 9am-12pm, Hot Meals: Daily 11:30am-1pm'
  }
]

export default function FoodPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResource, setSelectedResource] = useState<string | null>(null)

  const getStatusDisplay = (status: string, timeLeft?: string) => {
    switch (status) {
      case 'open':
        return { text: 'OPEN', color: 'text-success-sage-600', bg: 'bg-success-sage-100', indicator: '🟢' }
      case 'closing-soon':
        return { text: `CLOSING SOON (${timeLeft})`, color: 'text-warning-amber-600', bg: 'bg-warning-amber-100', indicator: '🟡' }
      case 'closed':
        return { text: 'CLOSED', color: 'text-warm-slate-600', bg: 'bg-warm-slate-100', indicator: '🔴' }
      default:
        return { text: 'UNKNOWN', color: 'text-warm-slate-600', bg: 'bg-warm-slate-100', indicator: '⚪' }
    }
  }

  return (
    <div className="min-h-screen bg-soft-cream-50">
      {/* Header - Following wireframe */}
      <div className="bg-success-sage-400 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-success-sage-100 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold">🍽️ Food Resources (15)</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and Filters - Following wireframe */}
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search within food resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-success-sage-400 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-warm-slate-600">🔽 Filters:</span>
            <button className="bg-success-sage-100 text-success-sage-800 px-3 py-1 rounded-full text-sm font-medium">
              Open Now
            </button>
            <button className="bg-warm-slate-100 text-warm-slate-700 px-3 py-1 rounded-full text-sm hover:bg-warm-slate-200">
              No ID Required
            </button>
            <button className="bg-warm-slate-100 text-warm-slate-700 px-3 py-1 rounded-full text-sm hover:bg-warm-slate-200">
              Free
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 text-sm text-warm-slate-600 mb-6">
            <span>🗂️ Sort:</span>
            <select className="bg-white border border-warm-slate-300 rounded px-2 py-1 text-success-sage-700 font-medium">
              <option>Distance</option>
              <option>Hours</option>
              <option>Name</option>
              <option>Recently Updated</option>
            </select>
          </div>
        </div>

        {/* Resource Cards - Exactly following wireframe format */}
        <div className="space-y-6">
          {foodResources.map((resource) => {
            const status = getStatusDisplay(resource.status)
            
            return (
              <div key={resource.id} className="bg-white rounded-lg border border-warm-slate-200 overflow-hidden">
                {/* Header with status */}
                <div className="p-6 border-b border-warm-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-warm-slate-800">{resource.name}</h3>
                        <span className={`text-sm font-bold px-2 py-1 rounded ${status.bg} ${status.color}`}>
                          {status.indicator} {status.text}
                        </span>
                      </div>
                      <p className="text-warm-slate-600 mb-2">{resource.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-warm-slate-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{resource.address}</span>
                        </div>
                        {resource.busRoute && (
                          <div className="flex items-center gap-1">
                            <span className="text-trust-teal-600">🚌</span>
                            <span>{resource.busRoute}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-sm text-warm-slate-600 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{resource.hours}</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-warm-slate-600 mb-3">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${resource.phone}`} className="text-success-sage-600 font-medium hover:underline">
                          {resource.phone}
                        </a>
                      </div>

                      {resource.verified && (
                        <div className="flex items-center gap-2 text-sm mb-4">
                          <CheckCircle className="w-4 h-4 text-success-sage-600" />
                          <span className="text-warm-slate-600">Verified: {resource.verified}</span>
                          {resource.rating && (
                            <>
                              <span className="text-warm-slate-400">•</span>
                              <div className="flex items-center gap-1">
                                <span className="text-warning-amber-500">{resource.rating}⭐</span>
                                <span className="text-warm-slate-500">({resource.reviewCount})</span>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Services Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {resource.services.slice(0, 4).map((service, index) => (
                            <span 
                              key={index}
                              className="bg-success-sage-100 text-success-sage-800 text-xs px-2 py-1 rounded"
                            >
                              {service}
                            </span>
                          ))}
                          {resource.services.length > 4 && (
                            <span className="bg-warm-slate-100 text-warm-slate-600 text-xs px-2 py-1 rounded">
                              +{resource.services.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons - Following wireframe */}
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`tel:${resource.phone}`}
                          className="inline-flex items-center gap-2 bg-success-sage-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-success-sage-700 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          📞 Call
                        </a>
                        
                        <button
                          onClick={() => {
                            const address = encodeURIComponent(resource.address)
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank')
                          }}
                          className="inline-flex items-center gap-2 bg-trust-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-trust-teal-700 transition-colors"
                        >
                          🗺️ Directions
                        </button>

                        <ShareButton 
                          resource={{
                            id: resource.id,
                            name: resource.name,
                            description: resource.description,
                            category: ResourceCategory.FOOD,
                            address: resource.address,
                            phone: resource.phone,
                            services: resource.services,
                            hours: {
                              monday: { open: '07:00', close: '14:00' },
                              tuesday: { open: '07:00', close: '14:00' },
                              wednesday: { open: '07:00', close: '14:00' },
                              thursday: { open: '07:00', close: '14:00' },
                              friday: { open: '07:00', close: '14:00' },
                              saturday: { open: '07:00', close: '14:00' },
                              sunday: { open: '07:00', close: '14:00' }
                            },
                            eligibility: [resource.eligibility],
                            recoveryStage: [RecoveryStage.CRISIS, RecoveryStage.SUPPORT],
                            lastVerified: new Date(),
                            coordinates: { lat: 30.2672, lng: -97.7431 }
                          }}
                          size="md"
                          className="bg-warm-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-warm-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable detail section - click to expand */}
                {selectedResource === resource.id && (
                  <div className="p-6 bg-soft-cream-50 border-t border-warm-slate-100">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-warm-slate-800 mb-2">━━━ TODAY&apos;S HOURS ━━━</h4>
                        <p className="text-warm-slate-700 mb-1">{resource.todayHours}</p>
                        <p className="text-sm text-warm-slate-600 mb-4">📍 What to expect: {resource.whatToExpect}</p>

                        <h4 className="font-semibold text-warm-slate-800 mb-2">━━━ ALL SERVICES ━━━</h4>
                        <ul className="space-y-1 mb-4">
                          {resource.services.map((service, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-success-sage-600" />
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-warm-slate-800 mb-2">━━━ ACCESSIBILITY ━━━</h4>
                        <ul className="space-y-1 mb-4">
                          {resource.accessibility.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <span className="text-trust-teal-600">♿</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-semibold text-warm-slate-800 mb-2">━━━ SHARE THIS RESOURCE ━━━</h4>
                        <div className="flex flex-wrap gap-2">
                          <button className="bg-success-sage-500 text-white px-3 py-1 rounded text-sm">📱 WhatsApp</button>
                          <button className="bg-warm-slate-500 text-white px-3 py-1 rounded text-sm">📧 Email</button>
                          <button className="bg-trust-teal-500 text-white px-3 py-1 rounded text-sm">💬 SMS</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle expand button */}
                <button
                  onClick={() => setSelectedResource(selectedResource === resource.id ? null : resource.id)}
                  className="w-full p-2 text-center text-sm text-warm-slate-600 hover:bg-warm-slate-50 border-t"
                >
                  {selectedResource === resource.id ? '↑ Show Less' : '↓ Show Details'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}