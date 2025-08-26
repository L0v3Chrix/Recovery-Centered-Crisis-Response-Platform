import { Resource, ResourceCategory, RecoveryStage, SearchFilters, ResourceMatch, CrisisResource } from '@/types/resources'
import { austinFoodResources } from '@/data/austin-food-resources'
import { austinCrisisResources } from '@/data/austin-crisis-resources'
import { austinRecoveryResources } from '@/data/austin-recovery-resources'

// Resource Database with real Austin data
class ResourceDatabase {
  private resources: Resource[] = []

  constructor() {
    this.seedData()
  }

  // Search resources with filters
  searchResources(filters: SearchFilters): ResourceMatch[] {
    let results = this.resources

    // Filter by category
    if (filters.category) {
      results = results.filter(r => r.category === filters.category)
    }

    // Filter by recovery stage
    if (filters.recoveryStage) {
      results = results.filter(r => r.recoveryStage.includes(filters.recoveryStage!))
    }

    // Filter by open now
    if (filters.isOpenNow) {
      results = results.filter(r => this.isResourceOpenNow(r))
    }

    // Filter by walk-ins accepted
    if (filters.acceptsWalkIns !== undefined) {
      results = results.filter(r => r.acceptsWalkIns === filters.acceptsWalkIns)
    }

    // Filter by location/distance
    if (filters.location) {
      results = results.filter(r => {
        const distance = this.calculateDistance(
          filters.location!.lat,
          filters.location!.lng,
          r.coordinates.lat,
          r.coordinates.lng
        )
        return distance <= filters.location!.radius
      })
    }

    // Convert to ResourceMatch with basic scoring
    return results.map(resource => ({
      resource,
      score: this.calculateMatchScore(resource, filters),
      reasons: this.getMatchReasons(resource, filters),
      distance: filters.location ? this.calculateDistance(
        filters.location.lat,
        filters.location.lng,
        resource.coordinates.lat,
        resource.coordinates.lng
      ) : undefined
    })).sort((a, b) => b.score - a.score)
  }

  // Get resources by category
  getResourcesByCategory(category: ResourceCategory): Resource[] {
    return this.resources.filter(r => r.category === category)
  }

  // Get crisis resources
  getCrisisResources(): CrisisResource[] {
    return this.resources.filter(r => r.category === ResourceCategory.CRISIS) as CrisisResource[]
  }

  // Get resource by ID
  getResourceById(id: string): Resource | undefined {
    return this.resources.find(r => r.id === id)
  }

  // Add new resource
  addResource(resource: Resource): void {
    this.resources.push(resource)
  }

  // Update resource
  updateResource(id: string, updates: Partial<Resource>): boolean {
    const index = this.resources.findIndex(r => r.id === id)
    if (index !== -1) {
      this.resources[index] = { ...this.resources[index], ...updates }
      return true
    }
    return false
  }

  // Get all resources
  getAllResources(): Resource[] {
    return this.resources
  }

  // Private helper methods
  private isResourceOpenNow(resource: Resource): boolean {
    if (resource.isOpen24Hours) return true

    const now = new Date()
    const dayOfWeek = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const currentTime = now.getHours() * 100 + now.getMinutes()

    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const todayHours = resource.hours[dayNames[dayOfWeek] as keyof typeof resource.hours]

    // Check if todayHours is a DayHours object
    if (!todayHours || typeof todayHours === 'boolean' || Array.isArray(todayHours)) return false
    if ('isClosed' in todayHours && todayHours.isClosed) return false

    const openTime = this.parseTime(todayHours.open)
    const closeTime = this.parseTime(todayHours.close)

    return currentTime >= openTime && currentTime <= closeTime
  }

  private parseTime(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 100 + minutes
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959 // Earth's radius in miles
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180)
  }

  private calculateMatchScore(resource: Resource, filters: SearchFilters): number {
    let score = 50 // Base score

    // Category exact match
    if (filters.category === resource.category) score += 30

    // Recovery stage match
    if (filters.recoveryStage && resource.recoveryStage.includes(filters.recoveryStage)) {
      score += 20
    }

    // Crisis resources get priority
    if (resource.category === ResourceCategory.CRISIS) score += 10

    // Open now bonus
    if (filters.isOpenNow && this.isResourceOpenNow(resource)) score += 15

    // Walk-ins accepted bonus
    if (filters.acceptsWalkIns && resource.acceptsWalkIns) score += 10

    return Math.min(score, 100)
  }

  private getMatchReasons(resource: Resource, filters: SearchFilters): string[] {
    const reasons: string[] = []

    if (filters.category === resource.category) {
      reasons.push(`Matches ${resource.category} category`)
    }

    if (filters.recoveryStage && resource.recoveryStage.includes(filters.recoveryStage)) {
      reasons.push(`Supports ${filters.recoveryStage} stage`)
    }

    if (resource.hasCrisisSupport) {
      reasons.push('Provides crisis support')
    }

    if (resource.acceptsWalkIns) {
      reasons.push('Accepts walk-ins')
    }

    if (resource.isOpen24Hours) {
      reasons.push('Available 24/7')
    }

    return reasons
  }

  private seedData(): void {
    // Load real Austin resource data
    this.resources = [
      ...austinCrisisResources,
      ...austinFoodResources,
      ...austinRecoveryResources
    ]
    
    console.log(`Loaded ${this.resources.length} resources into database`)
  }
}

// Export singleton instance
export const database = new ResourceDatabase()

// Utility functions
export const searchResources = (filters: SearchFilters): ResourceMatch[] => {
  return database.searchResources(filters)
}

export const getResourcesByCategory = (category: ResourceCategory): Resource[] => {
  return database.getResourcesByCategory(category)
}

export const getCrisisResources = (): CrisisResource[] => {
  return database.getCrisisResources()
}

export const getResourceById = (id: string): Resource | undefined => {
  return database.getResourceById(id)
}