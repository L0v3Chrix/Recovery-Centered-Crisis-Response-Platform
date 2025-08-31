'use client'

import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Powered by info */}
          <div className="text-center sm:text-left">
            <p className="text-slate-300 text-sm">
              Proudly powered by{' '}
              <a
                href="https://www.raizethevibe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-medium"
              >
                Raise the Vibe
              </a>
            </p>
            <p className="text-slate-400 text-xs mt-1">
              A vibecoding studio building AI-ready solutions for local impact
            </p>
          </div>

          {/* Right: Essential links */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-4">
            <Link
              href="/share"
              className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
            >
              Share
            </Link>
            <Link
              href="/submit"
              className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
            >
              Submit Updates
            </Link>
            <Link
              href="/partners"
              className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
            >
              Partners
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}