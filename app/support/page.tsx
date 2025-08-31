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
              You&apos;re Part of Something Beautiful
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-medium leading-relaxed">
              Every contribution fuels hope, powers breakthroughs, and keeps Austin&apos;s lifeline free
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#donation-levels"
                className="inline-flex items-center px-8 py-4 text-lg font-bold text-aurora-indigo700 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                💚 Choose Your Impact Level 💲
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Levels Section - Above the fold */}
      <div id="donation-levels" className="py-16 bg-gradient-to-b from-white to-aurora-azure50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-aurora-indigo700 mb-4">
              Choose Your Impact Level
            </h2>
            <p className="text-lg text-warm-slate-700 leading-relaxed">
              Every contribution creates someone&apos;s breakthrough moment. Pick the level that feels right for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* $5 Level */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-aurora-emerald500/20 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-aurora-emerald500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☕</span>
                </div>
                <h3 className="text-xl font-bold text-aurora-indigo700 mb-2">Spark Hope</h3>
                <div className="text-3xl font-bold text-aurora-emerald500 mb-2">$5</div>
                <p className="text-sm text-warm-slate-600">Buy a coffee, keep hope brewing</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleSquareClick}
                  className="w-full bg-aurora-emerald500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💳 Square - $5
                </button>
                <button
                  onClick={handleCashAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💰 Cash App - $5
                </button>
              </div>
            </div>

            {/* $25 Level */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-aurora-azure400/20 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-aurora-azure400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-aurora-indigo700 mb-2">Power Updates</h3>
                <div className="text-3xl font-bold text-aurora-azure400 mb-2">$25</div>
                <p className="text-sm text-warm-slate-600">Fuel weekly verification calls</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleSquareClick}
                  className="w-full bg-aurora-azure400 hover:bg-sky-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💳 Square - $25
                </button>
                <button
                  onClick={handleCashAppClick}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💰 Cash App - $25
                </button>
              </div>
            </div>

            {/* $50 Level */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-aurora-fuchsia500/20 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-aurora-fuchsia500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-aurora-indigo700 mb-2">Champion</h3>
                <div className="text-3xl font-bold text-aurora-fuchsia500 mb-2">$50</div>
                <p className="text-sm text-warm-slate-600">Protect a month of verified info</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleSquareClick}
                  className="w-full bg-aurora-fuchsia500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💳 Square - $50
                </button>
                <button
                  onClick={handleCashAppClick}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💰 Cash App - $50
                </button>
              </div>
            </div>

            {/* $100 Level */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-500/20 hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                HERO
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🦸‍♀️</span>
                </div>
                <h3 className="text-xl font-bold text-aurora-indigo700 mb-2">Community Hero</h3>
                <div className="text-3xl font-bold text-yellow-600 mb-2">$100</div>
                <p className="text-sm text-warm-slate-600">Champion Austin&apos;s safety net</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleSquareClick}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💳 Square - $100
                </button>
                <button
                  onClick={handleCashAppClick}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  💰 Cash App - $100
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-warm-slate-600 mb-4">
              <strong>Choose any amount:</strong> Every contribution powers someone&apos;s breakthrough moment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSquareClick}
                className="btn bg-aurora-indigo700 text-white hover:bg-aurora-indigo500 font-semibold px-8 py-3"
              >
                💳 Custom Amount - Square
              </button>
              <button
                onClick={handleCashAppClick}
                className="btn bg-green-600 text-white hover:bg-green-700 font-semibold px-8 py-3"
              >
                💰 Custom Amount - Cash App
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white">
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

            {/* Inspirational Story Section */}
            <div className="bg-gradient-to-r from-aurora-emerald500/10 to-aurora-azure400/10 rounded-2xl p-8 mb-16 border border-aurora-emerald500/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-aurora-indigo700 mb-4">
                  The Story Behind This Lifeline
                </h2>
                <div className="w-24 h-1 bg-aurora-emerald500 mx-auto rounded-full mb-6"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-white/60 rounded-xl p-6 border border-aurora-azure400/20">
                    <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                      🌅 It Started with One Late Night Search
                    </h3>
                    <p className="text-warm-slate-700 leading-relaxed">
                      At 2:47 AM, someone in Austin was frantically searching for emergency food assistance. 
                      They found 12 different websites with outdated information, called 8 numbers that didn&apos;t work, 
                      and nearly gave up. That person shouldn&apos;t have had to wait until morning for help.
                    </p>
                  </div>
                  
                  <div className="bg-white/60 rounded-xl p-6 border border-aurora-emerald500/20">
                    <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                      💡 The Breakthrough Moment
                    </h3>
                    <p className="text-warm-slate-700 leading-relaxed">
                      <strong>Raize the Vibe</strong> partnered with local advocates to build something different - 
                      a living directory where every resource is verified weekly, every phone number works, 
                      and every address is current. Not just another website, but Austin&apos;s most trusted lifeline.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/60 rounded-xl p-6 border border-aurora-fuchsia500/20">
                    <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                      🚀 Growing Every Week
                    </h3>
                    <p className="text-warm-slate-700 leading-relaxed mb-4">
                      Today, HelpNow ATX serves thousands of searches monthly. People find housing at 3 AM, 
                      locate food pantries on Sundays, and connect with crisis support when they need it most.
                    </p>
                    <div className="bg-aurora-emerald500/10 rounded-lg p-4">
                      <p className="text-sm font-medium text-aurora-emerald700">
                        <strong>Growing Impact:</strong> Every search represents someone&apos;s moment of hope. 
                        Every verified resource becomes someone&apos;s breakthrough in their darkest hour.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 rounded-xl p-6 border border-aurora-azure400/20">
                    <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                      🎯 Your Role in This Story
                    </h3>
                    <p className="text-warm-slate-700 leading-relaxed">
                      Every contribution you make becomes part of someone else&apos;s breakthrough story. 
                      You&apos;re not just supporting a website - you&apos;re ensuring that when Austin&apos;s most vulnerable 
                      residents need help, they find it instantly, accurately, and with dignity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ways to Support Grid */}
            <h2 className="text-3xl font-bold text-aurora-indigo700 text-center mb-12">
              Join Austin&apos;s Hope Network
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Financial Support */}
              <div className="card text-center">
                <DollarSign className="w-12 h-12 text-aurora-emerald500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-aurora-indigo700 mb-3">
                  Be someone&apos;s turning point
                </h3>
                <p className="text-warm-slate-600 mb-4">
                  Your support powers the moment when someone in crisis finds exactly the help they need. Every dollar fuels hope.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={handleSquareClick}
                    className="btn-sm bg-aurora-emerald500 text-white hover:bg-aurora-emerald600 w-full"
                  >
                    🌟 Spark hope ($5+)
                  </button>
                  <button
                    onClick={handleCashAppClick}
                    className="btn-sm btn-outline w-full"
                  >
                    ⚡ Power updates ($25+)
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

            {/* Community Impact */}
            <div className="bg-gradient-to-br from-aurora-azure400/10 to-aurora-emerald500/10 rounded-xl p-8 border border-aurora-azure400/20">
              <h3 className="text-2xl font-semibold text-aurora-indigo700 mb-6 text-center">
                Your impact ripples through Austin
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-emerald500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">💫</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Instant hope</h4>
                  <p className="text-sm text-warm-slate-600">Available 24/7 when crisis strikes at 3am</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-azure400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">🎯</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Verified accuracy</h4>
                  <p className="text-sm text-warm-slate-600">516+ resources checked weekly - no dead ends</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-fuchsia500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">🚀</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Lightning updates</h4>
                  <p className="text-sm text-warm-slate-600">Real-time changes keep help current</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-warm-slate-700 mb-4">
                  <strong>Every contribution multiplies hope across Central Texas</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-sm text-warm-slate-600">
                  <p>
                    <strong>🏆 Community champion:</strong> You fuel someone&apos;s breakthrough moment
                  </p>
                  <p>
                    <strong>💚 Pure impact:</strong> 100% powers verified resources
                  </p>
                  <p>
                    <strong>⚡ Always growing:</strong> More resources added weekly
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