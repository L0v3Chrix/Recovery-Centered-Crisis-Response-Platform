'use client'

import React from 'react'
import { Heart, DollarSign, Users, Zap, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

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
    window.open('https://square.link/u/hdeWZna4', '_blank')
  }

  const handleCashAppClick = () => {
    trackSupportClick('cashapp') 
    window.open('https://cash.app/$helpnowatx', '_blank')
  }

  const handleMoreClick = () => {
    trackSupportClick('more')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-canvas-tint to-white">
      {/* Hero Section */}
      <div className="bg-support py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About This Project
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-medium leading-relaxed">
              A free, comprehensive guide to verified help resources in Central Texas
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-aurora-indigo700 mb-6">
                  Why we built this
                </h2>
                <p className="text-lg text-warm-slate-700 mb-6 leading-relaxed">
                  When you need help, you need it now. Not after calling 10 numbers, 
                  not after waiting on hold, and definitely not after being passed around 
                  between agencies that may or may not still exist.
                </p>
                <p className="text-lg text-warm-slate-700 mb-6 leading-relaxed">
                  <strong>Central Texas Resources</strong> cuts through the noise. Every resource 
                  is verified weekly. Every phone number works. Every address is current. 
                  When someone is in crisis, they get accurate information instantly.
                </p>
                <div className="flex items-center gap-4 text-sm text-aurora-indigo600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Austin, TX
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Updated weekly
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-aurora-emerald500 rounded-full mr-1"></span>
                    516+ verified resources
                  </div>
                </div>
              </div>
              <div className="bg-aurora-azure50 rounded-xl p-8 border border-aurora-azure200">
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-4">
                  Built by the community, for the community
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  This project is maintained by <strong>Raise the Vibe</strong>, a local 
                  Austin team dedicated to using technology to solve real problems for real people.
                </p>
                <p className="text-warm-slate-600">
                  We believe access to help shouldn&apos;t depend on knowing the right person 
                  or having the right connections. It should be simple, fast, and always available.
                </p>
              </div>
            </div>

            {/* Ways to Support Grid */}
            <h2 className="text-3xl font-bold text-aurora-indigo700 text-center mb-12">
              Ways to support this project
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Financial Support */}
              <div className="card text-center">
                <DollarSign className="w-12 h-12 text-aurora-emerald500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                  Fund the updates
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  Server costs, weekly verification calls, and emergency updates cost ~$100/week.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={handleSquareClick}
                    className="btn-sm bg-aurora-emerald500 text-white hover:bg-aurora-emerald600 w-full"
                  >
                    Support via Square
                  </button>
                  <button
                    onClick={handleCashAppClick}
                    className="btn-sm btn-outline w-full"
                  >
                    Cash App
                  </button>
                </div>
              </div>

              {/* Share */}
              <div className="card text-center">
                <Users className="w-12 h-12 text-aurora-fuchsia500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                  Spread the word
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  Share helpnowatx.org with anyone who might need it. Word of mouth saves lives.
                </p>
                <Link href="/share" className="btn-sm btn-primary w-full">
                  Get share tools
                </Link>
              </div>

              {/* Submit Updates */}
              <div className="card text-center">
                <Zap className="w-12 h-12 text-aurora-azure400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                  Submit updates
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  Know a resource that&apos;s missing or outdated? Help keep our database fresh.
                </p>
                <Link href="/submit" className="btn-sm btn-primary w-full">
                  Submit resource
                </Link>
              </div>

              {/* Partners */}
              <div className="card text-center">
                <Heart className="w-12 h-12 text-aurora-indigo500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                  Partner with us
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  Organizations and volunteers who help verify and maintain resources.
                </p>
                <Link href="/partners" className="btn-sm btn-primary w-full">
                  Learn about partnerships
                </Link>
              </div>
            </div>

            {/* Operating Transparency */}
            <div className="bg-gradient-to-br from-aurora-azure400/10 to-aurora-emerald500/10 rounded-xl p-8 border border-aurora-azure400/20">
              <h3 className="text-2xl font-semibold text-aurora-indigo700 mb-6 text-center">
                How your support keeps this running
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-emerald500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">$30</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Server & CDN</h4>
                  <p className="text-sm text-warm-slate-600">Keep the site fast and available 24/7</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-azure400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">$50</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Verification calls</h4>
                  <p className="text-sm text-warm-slate-600">Weekly calls to verify 500+ resources are active</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-fuchsia500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">$20</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Emergency updates</h4>
                  <p className="text-sm text-warm-slate-600">Real-time updates when resources change</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-warm-slate-700 mb-4">
                  <strong>Total weekly cost: ~$100</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-sm text-warm-slate-600">
                  <p>
                    <strong>100% transparent:</strong> All contributions go directly to operations
                  </p>
                  <p>
                    <strong>No overhead:</strong> No salaries, offices, or administrative costs
                  </p>
                  <p>
                    <strong>Open books:</strong> Monthly reports available on request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}