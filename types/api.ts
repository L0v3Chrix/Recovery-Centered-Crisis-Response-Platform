// SAMHSA Treatment Locator API Response Types
export interface SAMHSAFacility {
  name1: string
  address1: string
  city: string
  state: string
  zip: string
  phone: string
  website_url?: string
  latitude: number
  longitude: number
  services: SAMHSAService[]
  categories: string[]
  payment_options: string[]
  languages: string[]
}

export interface SAMHSAService {
  code: string
  name: string
  category: string
}

export interface SAMHSAResponse {
  facilities: SAMHSAFacility[]
  total: number
  page: number
  per_page: number
}

// Google Maps API Types
export interface GoogleMapsLocation {
  lat: number
  lng: number
}

export interface GooglePlacesResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: GoogleMapsLocation
  }
  opening_hours?: {
    open_now: boolean
    periods: Array<{
      open: { day: number, time: string }
      close: { day: number, time: string }
    }>
  }
  formatted_phone_number?: string
  website?: string
  rating?: number
  user_ratings_total?: number
}

// Crisis Text Line Integration
export interface CrisisTextLineConfig {
  shortCode: string // "741741"
  keyword: string // "HOME"
  embedUrl?: string
}

// API Error Response
export interface APIError {
  message: string
  code: string
  details?: any
}

// Geocoding Response
export interface GeocodeResult {
  address: string
  location: GoogleMapsLocation
  formatted_address: string
  address_components: Array<{
    long_name: string
    short_name: string
    types: string[]
  }>
}

// Location Detection
export interface UserLocation {
  coordinates: GoogleMapsLocation
  accuracy: number
  timestamp: number
  address?: string
  city?: string
  county?: string
  state?: string
}

// Search API Response
export interface ResourceSearchResponse {
  resources: Resource[]
  total: number
  page: number
  per_page: number
  filters_applied: SearchFilters
  location_used?: UserLocation
}

// Resource Update Status
export interface ResourceUpdateStatus {
  resource_id: string
  last_verified: Date
  status: 'active' | 'inactive' | 'needs_verification'
  verification_method: 'phone' | 'website' | 'in_person' | 'partner_api'
  notes?: string
}

import type { Resource, SearchFilters } from './resources'