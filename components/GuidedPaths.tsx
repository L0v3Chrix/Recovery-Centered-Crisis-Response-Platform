'use client'

import React from 'react'
import { ScrollStack, ScrollStackItem } from './ScrollStack'

export default function GuidedPaths() {
  const paths = [
    {
      title: 'Food today',
      subtitle: 'Get nourished right now',
      checklist: [
        'Find food pantries open today',
        'Locate free meal programs',
        'Connect with emergency food assistance',
        'Get info on SNAP/food stamp help'
      ],
      bgColor: 'bg-gradient-to-br from-aurora-emerald500/10 to-aurora-azure400/10',
      borderColor: 'border-aurora-emerald500/30',
      iconColor: 'text-aurora-emerald500'
    },
    {
      title: 'Shelter tonight',
      subtitle: 'Safe place to sleep',
      checklist: [
        'Find emergency shelter availability',
        'Learn about transitional housing',
        'Connect with housing assistance programs', 
        'Get help with rent/utilities'
      ],
      bgColor: 'bg-gradient-to-br from-aurora-indigo500/10 to-aurora-fuchsia500/10',
      borderColor: 'border-aurora-indigo500/30',
      iconColor: 'text-aurora-indigo500'
    },
    {
      title: 'Recovery now',
      subtitle: 'Start your healing journey',
      checklist: [
        'Find treatment programs accepting patients',
        'Locate support groups meeting today',
        'Connect with crisis counselors',
        'Access harm reduction resources'
      ],
      bgColor: 'bg-gradient-to-br from-aurora-fuchsia500/10 to-aurora-azure400/10',
      borderColor: 'border-aurora-fuchsia500/30',
      iconColor: 'text-aurora-fuchsia500'
    }
  ]

  return (
    <section className="panel">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-aurora-indigo700 mb-4">
          Guided paths to help
        </h2>
        <p className="text-lg text-warm-slate-600 max-w-2xl mx-auto">
          Three focused journeys to get you exactly what you need, when you need it most.
        </p>
      </div>

      <ScrollStack className="max-w-2xl mx-auto">
        {paths.map((path, index) => (
          <ScrollStackItem key={path.title} className="mb-8">
            <div className={`card ${path.bgColor} border-l-4 ${path.borderColor} hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm ${path.iconColor} text-2xl font-bold`}>
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-aurora-indigo700 mb-1">
                    {path.title}
                  </h3>
                  <p className="text-warm-slate-600 mb-4 font-medium">
                    {path.subtitle}
                  </p>
                  
                  {/* Checklist */}
                  <ul className="space-y-2">
                    {path.checklist.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className={`w-5 h-5 rounded-full ${path.iconColor} flex items-center justify-center text-xs font-bold mt-0.5`}>
                          ✓
                        </span>
                        <span className="text-sm text-warm-slate-700 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <div className="mt-6">
                    <button className="btn-primary">
                      Start here →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}