'use client'

import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="bg-canvas-tint border-t border-aurora-azure400/20 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Published by info */}
          <div className="text-center sm:text-left">
            <p className="text-warm-slate-600 text-sm">
              Published by{' '}
              <a
                href="https://raisethevibe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aurora-indigo700 hover:text-aurora-indigo500 font-medium"
              >
                Raise the Vibe
              </a>
              {' • '}
              <span className="text-aurora-indigo700 font-medium">
                helpnowatx.org
              </span>
            </p>
          </div>

          {/* Right: Navigation Links */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-2">
            <Link
              href="/share"
              className="btn-quiet min-h-[44px]"
            >
              Share
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}