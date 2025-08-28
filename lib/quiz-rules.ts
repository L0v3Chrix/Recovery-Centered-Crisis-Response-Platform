// Quiz Rules DSL - Domain Specific Language for resource matching

export interface QuizRule {
  id: string
  name: string
  description: string
  conditions: RuleCondition[]
  actions: RuleAction[]
  priority: number
}

export interface RuleCondition {
  field: string
  operator: 'equals' | 'contains' | 'in' | 'not_in' | 'greater_than' | 'less_than'
  value: any
}

export interface RuleAction {
  type: 'boost' | 'filter' | 'tag' | 'redirect'
  value: any
  weight?: number
}

// Example rules engine
export const quizRules: QuizRule[] = [
  {
    id: 'crisis-priority',
    name: 'Crisis Priority',
    description: 'Prioritize crisis resources for safety concerns',
    conditions: [
      { field: 'safety', operator: 'in', value: ['emergency', 'urgent'] }
    ],
    actions: [
      { type: 'boost', value: 'category:crisis', weight: 50 },
      { type: 'filter', value: 'hasCrisisSupport:true' }
    ],
    priority: 100
  },
  {
    id: 'immediate-help',
    name: 'Immediate Help',
    description: 'Boost 24/7 resources for urgent needs',
    conditions: [
      { field: 'timing', operator: 'equals', value: 'now' }
    ],
    actions: [
      { type: 'boost', value: 'isOpen24Hours:true', weight: 30 },
      { type: 'boost', value: 'acceptsWalkIns:true', weight: 20 }
    ],
    priority: 90
  },
  {
    id: 'category-match',
    name: 'Category Match',
    description: 'Match primary category selection',
    conditions: [
      { field: 'primary-need', operator: 'not_in', value: ['multiple'] }
    ],
    actions: [
      { type: 'boost', value: 'category:${primary-need}', weight: 40 }
    ],
    priority: 80
  },
  {
    id: 'location-proximity',
    name: 'Location Proximity',
    description: 'Prefer nearby resources',
    conditions: [
      { field: 'location', operator: 'not_in', value: ['anywhere', 'other'] }
    ],
    actions: [
      { type: 'boost', value: 'location:${location}', weight: 25 }
    ],
    priority: 70
  },
  {
    id: 'access-preference',
    name: 'Access Preference',
    description: 'Match preferred access method',
    conditions: [
      { field: 'access', operator: 'equals', value: 'walk-in' }
    ],
    actions: [
      { type: 'boost', value: 'acceptsWalkIns:true', weight: 20 }
    ],
    priority: 60
  },
  {
    id: 'phone-preference',
    name: 'Phone Preference',
    description: 'Boost phone-accessible resources',
    conditions: [
      { field: 'access', operator: 'equals', value: 'phone' }
    ],
    actions: [
      { type: 'boost', value: 'hasPhone:true', weight: 15 }
    ],
    priority: 60
  },
  {
    id: 'recovery-specialization',
    name: 'Recovery Specialization',
    description: 'Match recovery stage preferences',
    conditions: [
      { field: 'primary-need', operator: 'equals', value: 'recovery' }
    ],
    actions: [
      { type: 'tag', value: 'recovery:MAT' },
      { type: 'tag', value: 'recovery:treatment' },
      { type: 'boost', value: 'recoveryStage:treatment', weight: 35 }
    ],
    priority: 75
  }
]

// Rule evaluation engine
export class RulesEngine {
  static evaluateRules(answers: Record<string, any>, rules: QuizRule[] = quizRules): RuleAction[] {
    const applicableRules = rules.filter(rule => 
      this.evaluateConditions(rule.conditions, answers)
    ).sort((a, b) => b.priority - a.priority)

    const actions: RuleAction[] = []
    for (const rule of applicableRules) {
      actions.push(...rule.actions.map(action => ({
        ...action,
        value: this.interpolateValue(action.value, answers)
      })))
    }

    return actions
  }

  private static evaluateConditions(conditions: RuleCondition[], answers: Record<string, any>): boolean {
    return conditions.every(condition => {
      const fieldValue = answers[condition.field]
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === condition.value
        case 'contains':
          return Array.isArray(fieldValue) 
            ? fieldValue.includes(condition.value)
            : String(fieldValue).includes(String(condition.value))
        case 'in':
          return Array.isArray(condition.value) && condition.value.includes(fieldValue)
        case 'not_in':
          return Array.isArray(condition.value) && !condition.value.includes(fieldValue)
        case 'greater_than':
          return Number(fieldValue) > Number(condition.value)
        case 'less_than':
          return Number(fieldValue) < Number(condition.value)
        default:
          return false
      }
    })
  }

  private static interpolateValue(template: string, answers: Record<string, any>): string {
    return String(template).replace(/\$\{([^}]+)\}/g, (_, key) => {
      return answers[key] || key
    })
  }
}

// Helper to convert quiz answers to rule evaluation format
export function formatAnswersForRules(answers: Array<{ questionId: string, answer: string }>): Record<string, any> {
  const formatted: Record<string, any> = {}
  
  for (const answer of answers) {
    formatted[answer.questionId] = answer.answer
  }

  return formatted
}