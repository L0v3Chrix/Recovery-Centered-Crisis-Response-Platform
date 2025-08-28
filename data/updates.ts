// Support funding transparency - what your contributions fund each week

export interface WeeklyUpdate {
  title: string
  description: string
  cost: string
  priority: 'high' | 'medium' | 'low'
  category: 'infrastructure' | 'verification' | 'updates' | 'development'
}

export const weeklyUpdates: WeeklyUpdate[] = [
  {
    title: 'Server hosting & CDN',
    description: 'Keep the site fast and available 24/7 across all devices',
    cost: '~$30/week',
    priority: 'high',
    category: 'infrastructure'
  },
  {
    title: 'Data verification calls',
    description: 'Weekly calls to verify 500+ resources are still active and accepting clients',
    cost: '~$50/week', 
    priority: 'high',
    category: 'verification'
  },
  {
    title: 'Emergency updates',
    description: 'Real-time updates when resources change hours, close, or add new services',
    cost: '~$20/week',
    priority: 'high',
    category: 'updates'
  },
  {
    title: 'New resource research',
    description: 'Finding and vetting new resources to add to the database',
    cost: '~$25/week',
    priority: 'medium',
    category: 'development'
  },
  {
    title: 'Mobile app improvements', 
    description: 'Ongoing enhancements to make the mobile experience faster and more intuitive',
    cost: '~$15/week',
    priority: 'medium',
    category: 'development'
  }
]

export const getTotalWeeklyCost = (): number => {
  return weeklyUpdates.reduce((total, update) => {
    const cost = parseInt(update.cost.replace(/[^0-9]/g, ''))
    return total + cost
  }, 0)
}

export const getHighPriorityUpdates = (): WeeklyUpdate[] => {
  return weeklyUpdates.filter(update => update.priority === 'high')
}

export default weeklyUpdates