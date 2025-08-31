'use client'

import { useState, useEffect } from 'react'
import { X, MapPin, Search, Phone, Heart } from 'lucide-react'
import Link from 'next/link'

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Check if user has seen the welcome modal (privacy-first, no tracking)
    const hasSeenWelcome = localStorage.getItem('helpnow-welcomed')
    if (!hasSeenWelcome) {
      // Delay to let the page load first
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Remember that user has seen welcome (privacy-first)
    localStorage.setItem('helpnow-welcomed', 'true')
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      handleClose()
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const slides = [
    {
      icon: <Heart className="w-16 h-16 text-aurora-emerald500" />,
      title: "Welcome to Austin's verified help directory",
      description: "516+ resources verified weekly. When you need help, you need it now - not after calling dead numbers or visiting closed locations.",
      action: null
    },
    {
      icon: <Search className="w-16 h-16 text-aurora-azure400" />,
      title: "Three ways to find help",
      description: "🔍 Browse categories above • 📋 Take our guided assessment • 🖨️ Print resources for offline use",
      action: null
    },
    {
      icon: <MapPin className="w-16 h-16 text-aurora-fuchsia500" />,
      title: "Your privacy matters",
      description: "No registration required. No personal data collected. Just instant access to verified help when you need it most.",
      action: {
        primary: { text: "Start exploring", href: null, onClick: handleClose },
        secondary: { text: "Take assessment", href: "/quiz" }
      }
    }
  ]

  if (!isOpen) return null

  const currentSlideData = slides[currentSlide]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full mx-auto shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close welcome"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {currentSlideData.icon}
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {currentSlideData.title}
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-8">
            {currentSlideData.description}
          </p>

          {/* Navigation */}
          <div className="space-y-4">
            {/* Action buttons for final slide */}
            {currentSlideData.action && (
              <div className="space-y-3 mb-6">
                <button
                  onClick={currentSlideData.action.primary.onClick}
                  className="w-full bg-aurora-emerald500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {currentSlideData.action.primary.text}
                </button>
                <Link 
                  href={currentSlideData.action.secondary.href}
                  onClick={handleClose}
                  className="block w-full text-aurora-indigo700 hover:text-aurora-indigo500 font-medium py-3 px-6 border border-aurora-indigo700 hover:border-aurora-indigo500 rounded-lg transition-colors"
                >
                  {currentSlideData.action.secondary.text}
                </Link>
              </div>
            )}

            {/* Slide navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentSlide === 0}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentSlide === 0 
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-aurora-indigo700 hover:text-aurora-indigo500'
                }`}
              >
                Previous
              </button>

              {/* Slide indicators */}
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-aurora-emerald500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {!currentSlideData.action && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-aurora-indigo700 hover:text-aurora-indigo500 rounded-lg transition-colors"
                >
                  Next
                </button>
              )}

              {currentSlideData.action && (
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-500 hover:text-gray-600 rounded-lg transition-colors"
                >
                  Skip
                </button>
              )}
            </div>
          </div>

          {/* Always available skip option */}
          <button
            onClick={handleClose}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors underline"
          >
            Skip welcome tour
          </button>
        </div>
      </div>
    </div>
  )
}