'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'

interface QuizAnswer {
  questionId: string
  answer: string | string[]
  weight?: number
}

interface QuizState {
  currentStep: number
  answers: QuizAnswer[]
}

const QUIZ_STEPS = [
  {
    id: 'safety',
    title: 'Safety Check',
    question: 'Are you or someone else in immediate danger?',
    type: 'safety',
    options: [
      { id: 'emergency', text: 'Yes - Emergency situation', action: 'crisis-redirect' },
      { id: 'urgent', text: 'Urgent but not emergency', weight: 0.8 },
      { id: 'safe', text: 'No immediate danger', weight: 0.2 }
    ]
  },
  {
    id: 'primary-need',
    title: 'Primary Need',
    question: 'What do you need help with right now? (Select all that apply)',
    type: 'category',
    multiSelect: true,
    options: [
      { id: 'crisis', text: 'Mental health crisis or suicide thoughts', category: 'crisis', weight: 1.0 },
      { id: 'food', text: 'Food or meals', category: 'food', weight: 1.0 },
      { id: 'shelter', text: 'Housing or shelter', category: 'shelter', weight: 1.0 },
      { id: 'recovery', text: 'Addiction treatment or recovery', category: 'recovery', weight: 1.0 },
      { id: 'healthcare', text: 'Medical care or mental health', category: 'healthcare', weight: 1.0 },
      { id: 'legal', text: 'Legal help or documentation', category: 'legal', weight: 1.0 }
    ]
  },
  {
    id: 'who',
    title: 'Who needs help?',
    question: 'Who are you getting help for?',
    type: 'demographic',
    options: [
      { id: 'myself', text: 'Myself', weight: 1.0 },
      { id: 'family-adult', text: 'Adult family member', weight: 0.9 },
      { id: 'family-child', text: 'Child/teen in my family', weight: 0.8 },
      { id: 'friend', text: 'Friend or someone I know', weight: 0.7 },
      { id: 'unsure', text: 'I\'m not sure', weight: 0.5 }
    ]
  },
  {
    id: 'timing',
    title: 'How urgent is this?',
    question: 'When do you need help?',
    type: 'urgency',
    options: [
      { id: 'now', text: 'Right now', weight: 1.0 },
      { id: 'today', text: 'Today', weight: 0.9 },
      { id: 'week', text: 'This week', weight: 0.7 },
      { id: 'planning', text: 'Planning ahead', weight: 0.5 }
    ]
  },
  {
    id: 'location',
    title: 'Where are you located?',
    question: 'What area are you in?',
    type: 'location',
    options: [
      { id: 'central-austin', text: 'Central Austin', location: 'central', weight: 1.0 },
      { id: 'north-austin', text: 'North Austin', location: 'north', weight: 1.0 },
      { id: 'south-austin', text: 'South Austin', location: 'south', weight: 1.0 },
      { id: 'east-austin', text: 'East Austin', location: 'east', weight: 1.0 },
      { id: 'west-austin', text: 'West Austin', location: 'west', weight: 1.0 },
      { id: 'outside-austin', text: 'Outside Austin', location: 'other', weight: 0.8 },
      { id: 'anywhere', text: 'Anywhere is fine', weight: 0.6 }
    ]
  },
  {
    id: 'access',
    title: 'Access preferences',
    question: 'How would you prefer to access help?',
    type: 'access',
    options: [
      { id: 'phone', text: 'Phone call', weight: 1.0 },
      { id: 'walk-in', text: 'Walk-in/in person', weight: 1.0 },
      { id: 'online', text: 'Online/website', weight: 0.8 },
      { id: 'text', text: 'Text message', weight: 0.7 },
      { id: 'any', text: 'Any way possible', weight: 0.9 }
    ]
  }
]

export default function QuizWizard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    answers: []
  })
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<string[]>([])

  // URL persistence
  useEffect(() => {
    const step = searchParams.get('step')
    const answersParam = searchParams.get('answers')
    
    if (step) {
      const stepNum = parseInt(step)
      if (stepNum >= 1 && stepNum <= QUIZ_STEPS.length) {
        setQuizState(prev => ({ ...prev, currentStep: stepNum }))
      }
    }
    
    if (answersParam) {
      try {
        const answers = JSON.parse(decodeURIComponent(answersParam))
        setQuizState(prev => ({ ...prev, answers }))
      } catch (e) {
        console.warn('Failed to parse quiz answers from URL')
      }
    }
  }, [searchParams])

  const updateURL = (step: number, answers: QuizAnswer[]) => {
    const url = new URL(window.location.href)
    url.searchParams.set('step', step.toString())
    if (answers.length > 0) {
      url.searchParams.set('answers', encodeURIComponent(JSON.stringify(answers)))
    }
    window.history.replaceState(null, '', url.toString())
  }

  const handleAnswer = (optionId: string) => {
    const currentStepData = QUIZ_STEPS[quizState.currentStep - 1]
    const selectedOption = currentStepData.options.find(opt => opt.id === optionId)
    
    // Handle crisis redirect
    if (selectedOption?.action === 'crisis-redirect') {
      router.push('/crisis')
      return
    }

    // Handle multi-select for primary-need step
    if (currentStepData.multiSelect) {
      const updatedSelections = multiSelectAnswers.includes(optionId)
        ? multiSelectAnswers.filter(id => id !== optionId)
        : [...multiSelectAnswers, optionId]
      
      setMultiSelectAnswers(updatedSelections)
      return // Don't advance step automatically for multi-select
    }

    const newAnswer: QuizAnswer = {
      questionId: currentStepData.id,
      answer: optionId,
      weight: selectedOption?.weight || 1.0
    }

    const updatedAnswers = [
      ...quizState.answers.filter(a => a.questionId !== currentStepData.id),
      newAnswer
    ]

    advanceToNextStep(updatedAnswers)
  }

  const handleMultiSelectContinue = () => {
    if (multiSelectAnswers.length === 0) return
    
    const currentStepData = QUIZ_STEPS[quizState.currentStep - 1]
    const newAnswer: QuizAnswer = {
      questionId: currentStepData.id,
      answer: multiSelectAnswers,
      weight: 1.0
    }

    const updatedAnswers = [
      ...quizState.answers.filter(a => a.questionId !== currentStepData.id),
      newAnswer
    ]

    setMultiSelectAnswers([])
    advanceToNextStep(updatedAnswers)
  }

  const advanceToNextStep = (updatedAnswers: QuizAnswer[]) => {
    const nextStep = quizState.currentStep + 1

    if (nextStep > QUIZ_STEPS.length) {
      // Quiz complete, redirect to results
      const resultsUrl = `/results?${new URLSearchParams({
        answers: JSON.stringify(updatedAnswers)
      })}`
      router.push(resultsUrl)
    } else {
      const newState = {
        currentStep: nextStep,
        answers: updatedAnswers
      }
      setQuizState(newState)
      updateURL(nextStep, updatedAnswers)
    }
  }

  const goBack = () => {
    if (quizState.currentStep > 1) {
      const prevStep = quizState.currentStep - 1
      setQuizState(prev => ({ ...prev, currentStep: prevStep }))
      updateURL(prevStep, quizState.answers)
    } else {
      router.push('/')
    }
  }

  const currentStepData = QUIZ_STEPS[quizState.currentStep - 1]
  const progress = (quizState.currentStep / QUIZ_STEPS.length) * 100

  return (
    <div className="min-h-screen bg-aurora flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center text-warm-slate-600 hover:text-aurora-indigo700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {quizState.currentStep === 1 ? 'Back to Home' : 'Previous'}
            </button>
            <div className="text-sm font-medium text-warm-slate-600">
              Step {quizState.currentStep} of {QUIZ_STEPS.length}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-aurora-emerald500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {currentStepData.type === 'safety' && (
              <div className="flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-aurora-crimson600 mr-3" />
                <span className="text-aurora-crimson600 font-semibold">Safety First</span>
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-aurora-indigo700 mb-2 text-center">
              {currentStepData.title}
            </h1>
            
            <p className="text-lg text-warm-slate-700 mb-8 text-center">
              {currentStepData.question}
            </p>

            <div className="space-y-3" role={currentStepData.multiSelect ? "group" : "radiogroup"} aria-labelledby="quiz-question">
              {currentStepData.options.map((option) => {
                const isSelected = currentStepData.multiSelect 
                  ? multiSelectAnswers.includes(option.id)
                  : quizState.answers.some(a => a.questionId === currentStepData.id && a.answer === option.id)
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aurora-azure400 focus:ring-offset-2 ${
                      isSelected 
                        ? 'border-aurora-azure400 bg-aurora-azure400/10' 
                        : 'border-gray-200 hover:border-aurora-azure400 hover:bg-aurora-azure400/5'
                    }`}
                    role={currentStepData.multiSelect ? "checkbox" : "radio"}
                    aria-checked={isSelected}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 border-2 mr-4 flex-shrink-0 flex items-center justify-center ${
                        currentStepData.multiSelect 
                          ? 'rounded border-gray-300' 
                          : 'rounded-full border-gray-300'
                      } ${
                        isSelected 
                          ? 'border-aurora-azure400 bg-aurora-azure400' 
                          : ''
                      }`}>
                        {isSelected && (
                          <div className={`${
                            currentStepData.multiSelect 
                              ? 'w-2 h-2 bg-white' 
                              : 'w-2 h-2 bg-white rounded-full'
                          }`} />
                        )}
                      </div>
                      <span className="text-warm-slate-700 font-medium">{option.text}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {currentStepData.multiSelect && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleMultiSelectContinue}
                  disabled={multiSelectAnswers.length === 0}
                  className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue ({multiSelectAnswers.length} selected)
                </button>
              </div>
            )}

            {currentStepData.type === 'safety' && (
              <div className="mt-6 p-4 bg-aurora-crimson50 border border-aurora-crimson200 rounded-lg">
                <p className="text-sm text-aurora-crimson700">
                  <strong>If this is an emergency:</strong> Call 911 immediately. 
                  For mental health crisis: Call 988 or text HOME to 741741.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}