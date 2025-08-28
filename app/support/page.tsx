'use client'

import React from 'react'
import { Heart, DollarSign, Users, Zap } from 'lucide-react'

export default function SupportPage() {
  // Track GA events for support clicks
  const trackSupportClick = (method: 'square' | 'cashapp' | 'more') => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'support_click', {
        method: method,
        value: 1,
        currency: 'USD'
      })
    }
  }

  const handleSquareClick = () => {
    trackSupportClick('square')
    window.open(process.env.NEXT_PUBLIC_SQUARE_CHECKOUT, '_blank')
  }

  const handleCashAppClick = () => {
    trackSupportClick('cashapp') 
    window.open(`https://cash.app/${process.env.NEXT_PUBLIC_CASH_APP_HANDLE}`, '_blank')
  }

  const handleMoreClick = () => {
    trackSupportClick('more')
  }

  // Sample updates data - in real implementation this would come from data/updates.ts
  const weeklyUpdates = [
    {
      title: 'Server hosting & CDN',
      description: 'Keep the site fast and available 24/7',
      cost: '~$30/week'
    },
    {
      title: 'Data verification calls', 
      description: 'Weekly calls to verify 500+ resources are still active',
      cost: '~$50/week'
    },
    {
      title: 'Emergency updates',
      description: 'Real-time updates when resources change or close',
      cost: '~$20/week'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-canvas-tint to-white">
      {/* Hero Section */}
      <div className="bg-support py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Help keep this project alive
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-medium leading-relaxed">
              Back the signal—your tip funds fresh updates & uptime.
            </p>
            
            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={handleSquareClick}
                className="btn bg-white text-aurora-indigo700 hover:bg-gray-100 text-lg px-8 py-4 font-bold min-w-[200px]"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Support via Square
              </button>
              
              <button
                onClick={handleCashAppClick}
                className="btn-ghost border-white text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold min-w-[200px]"
              >
                💰 Cash App
              </button>
            </div>

            <button
              onClick={handleMoreClick}
              className="btn-quiet text-white/80 hover:text-white hover:bg-white/5 underline"
            >
              More ways to support →
            </button>
          </div>
        </div>
      </div>

      {/* What Your Support Funds Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-aurora-indigo700 text-center mb-12">
              What your support funds this week
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {weeklyUpdates.map((update, index) => (
                <div key={index} className="card text-center">
                  <div className="w-12 h-12 bg-aurora-emerald500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                    {update.title}
                  </h3>
                  <p className="text-warm-slate-600 mb-4 leading-relaxed">
                    {update.description}
                  </p>
                  <div className="text-aurora-emerald500 font-bold">
                    {update.cost}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="panel bg-gradient-to-br from-aurora-azure400/10 to-aurora-emerald500/10 border-aurora-azure400/20">
                <p className="text-lg text-warm-slate-700 mb-4">
                  <strong>Total weekly operating cost:</strong> ~$100
                </p>
                <p className="text-warm-slate-600">
                  Every dollar goes directly to keeping resources verified, updated, and accessible 
                  when people need them most. No fancy offices, no admin overhead—just the essentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Ways to Support Section (Stub) */}
      <div className="bg-canvas-tint py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-aurora-indigo700 mb-8">
              More ways to support
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <Users className="w-12 h-12 text-aurora-fuchsia500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                  Spread the word
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  Share helpnowatx.org with anyone who might need it. 
                  Word of mouth is the most powerful support.
                </p>
                <a href="/share" className="btn-primary">
                  Get share tools
                </a>
              </div>
              
              <div className="card">
                <Zap className="w-12 h-12 text-aurora-azure400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                  Submit updates
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  Know a resource that&apos;s missing or outdated? 
                  Help keep the database fresh and accurate.
                </p>
                <a href="/submit" className="btn-primary">
                  Submit resource
                </a>
              </div>
            </div>

            {/* Trust Notes */}
            <div className="mt-12">
              <div className="text-sm text-warm-slate-500 space-y-2">
                <p>
                  <strong>100% transparent:</strong> All contributions go directly to server costs, 
                  data verification, and emergency updates.
                </p>
                <p>
                  <strong>No recurring fees:</strong> Support when you can, as much as you can. 
                  No pressure, no subscriptions.
                </p>
                <p>
                  <strong>Open book:</strong> Monthly expense reports available on request. 
                  This project runs lean and stays accountable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}