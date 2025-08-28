'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { ChevronRight } from 'lucide-react';

const TITLE_MAP: Record<string, string> = {
  'food': 'Food',
  'shelter': 'Shelter',
  'recovery': 'Recovery',
  'healthcare': 'Healthcare',
  'legal': 'Legal',
  'crisis': 'Crisis',
  'quiz': 'Get Matched',
  'results': 'Results',
  'printable': 'Printable Resources',
  'partners': 'Partners',
  'support': 'Support',
  'submit': 'Submit Resource',
  'admin': 'Admin',
  'reports': 'Reports',
  'employment': 'Employment',
  'transportation': 'Transportation',
  'housing': 'Housing',
  'donate': 'Donate',
  'share': 'Share',
};

function toTitle(segment: string): string {
  return TITLE_MAP[segment] || 
    segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, s => s.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show on home page
  if (pathname === '/') return null;
  
  const parts = pathname.split('/').filter(Boolean);
  
  const items = [
    { href: '/', label: 'Home' },
    ...parts.map((_, i) => {
      const href = '/' + parts.slice(0, i + 1).join('/');
      const label = toTitle(parts[i]);
      return { href, label };
    })
  ];

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `https://helpnowatx.org${item.href}`,
        name: item.label
      }
    }))
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            {items.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="mx-1 h-4 w-4 text-gray-400 flex-shrink-0" />
                )}
                {index === items.length - 1 ? (
                  <span 
                    className="font-medium text-gray-900" 
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-aurora-indigo700 transition-colors underline-offset-2 hover:underline"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
      <Script id="jsonld-breadcrumbs" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}