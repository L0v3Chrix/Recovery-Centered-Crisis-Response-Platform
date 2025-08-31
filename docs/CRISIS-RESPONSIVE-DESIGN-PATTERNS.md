# Crisis-Responsive Design Patterns
## Emergency-Optimized Interface Standards

**Document Purpose**: Design patterns and interface standards specifically optimized for crisis situations and vulnerable populations  
**Last Updated**: January 1, 2025  
**Status**: Pre-Development Design Standards

---

## 🚨 CRISIS DESIGN PRINCIPLES

### Core Philosophy
- **Speed Over Aesthetics**: Function must always take precedence over form
- **Clarity Over Complexity**: Every interface element must have obvious purpose
- **Accessibility First**: Design for cognitive overload, motor impairments, visual challenges
- **Emotional Awareness**: Color psychology and visual hierarchy for crisis states
- **Mobile-Critical**: 80%+ of crisis users access via mobile devices

### Crisis User Mental State Considerations
- **Reduced cognitive capacity** due to stress, substance use, or mental health crisis
- **Motor skill impairment** from shaking, intoxication, or medical conditions
- **Visual impairment** from tears, medication, or panic
- **Time sensitivity** - every second counts in emergency situations
- **Privacy concerns** - may be in public or unsafe environments

---

## 🎨 CRISIS VISUAL DESIGN SYSTEM

### Color Palette for Crisis Situations

```css
/* Emergency Color System */
:root {
  /* Crisis Alert Colors */
  --crisis-red: #dc2626;           /* Immediate danger */
  --crisis-red-light: #fee2e2;     /* Background for crisis sections */
  --crisis-red-dark: #991b1b;      /* Pressed states */
  
  /* Urgent Action Colors */
  --urgent-orange: #ea580c;        /* Psychiatric emergency */
  --urgent-orange-light: #fed7aa;  /* Background */
  --urgent-orange-dark: #c2410c;   /* Pressed states */
  
  /* Treatment Entry Colors */
  --treatment-yellow: #d97706;     /* Treatment/detox needs */
  --treatment-yellow-light: #fef3c7; /* Background */
  --treatment-yellow-dark: #a16207; /* Pressed states */
  
  /* Support Colors */
  --support-green: #16a34a;        /* Ongoing support */
  --support-green-light: #dcfce7;  /* Background */
  --support-green-dark: #15803d;   /* Pressed states */
  
  /* High Contrast for Accessibility */
  --text-high-contrast: #111827;   /* Very dark text */
  --bg-high-contrast: #ffffff;     /* Pure white background */
  --border-high-contrast: #374151; /* Dark borders */
  
  /* Safe/Calming Colors */
  --safe-blue: #1e40af;           /* Housing/stable situations */
  --safe-blue-light: #dbeafe;     /* Background */
  --safe-blue-dark: #1e3a8a;      /* Pressed states */
}
```

### Typography for Crisis Readability

```css
/* Crisis Typography System */
.crisis-text {
  /* High readability font stack */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  
  /* Increased line height for readability */
  line-height: 1.6;
  
  /* High contrast text */
  color: var(--text-high-contrast);
  
  /* Anti-aliasing for clarity */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Crisis Heading Hierarchy */
.crisis-h1 {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
}

.crisis-h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.crisis-body {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 500;
  max-width: 65ch; /* Optimal reading length */
}

/* Emergency Contact Text */
.emergency-contact {
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 700;
  font-variant-numeric: tabular-nums; /* Aligned phone numbers */
  letter-spacing: 0.05em;
}
```

---

## 📱 MOBILE-FIRST CRISIS TOUCH TARGETS

### Touch Target Specifications

```css
/* Crisis Touch Target System */
.crisis-button {
  /* Minimum 60px for crisis situations (larger than standard 44px) */
  min-height: 60px;
  min-width: 60px;
  
  /* Extra padding for easier targeting */
  padding: 16px 24px;
  
  /* Larger touch area than visual button */
  position: relative;
}

.crisis-button::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  /* Invisible expanded touch area */
}

/* Emergency buttons get even larger targets */
.emergency-button {
  min-height: 80px;
  min-width: 200px;
  font-size: 1.5rem;
  font-weight: 800;
}

/* Phone number buttons optimized for crisis */
.phone-button {
  min-height: 72px;
  
  /* Visual feedback for press */
  transition: transform 0.1s ease;
}

.phone-button:active {
  transform: scale(0.95);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}
```

### Mobile Layout Patterns

```css
/* Crisis Mobile Layout */
.crisis-container {
  /* Full width utilization */
  width: 100%;
  max-width: 100vw;
  
  /* Generous spacing for crisis situations */
  padding: 24px 16px;
  
  /* Prevent horizontal scroll */
  overflow-x: hidden;
}

/* Crisis sections with clear separation */
.crisis-section {
  margin-bottom: 32px;
  padding: 24px;
  border-radius: 16px;
  border: 3px solid;
  
  /* High contrast borders */
  border-color: var(--border-high-contrast);
}

/* Emergency contact grid for mobile */
.emergency-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

@media (min-width: 480px) {
  .emergency-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Single-column layout for crisis clarity */
.crisis-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
```

---

## 🎯 CRISIS INTERACTION PATTERNS

### Immediate Action Buttons

```tsx
// Emergency Button Component with Crisis Optimizations
interface EmergencyButtonProps {
  number: string
  label: string
  priority: 'life-threatening' | 'urgent' | 'important'
  context?: string
}

const EmergencyButton = ({ number, label, priority, context }: EmergencyButtonProps) => {
  const [isPressing, setIsPressing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  
  const priorityStyles = {
    'life-threatening': {
      bg: 'bg-red-600 hover:bg-red-700',
      ring: 'focus:ring-red-500',
      pulse: 'animate-pulse',
      size: 'min-h-[80px] text-xl',
      icon: '🚨'
    },
    'urgent': {
      bg: 'bg-orange-600 hover:bg-orange-700', 
      ring: 'focus:ring-orange-500',
      size: 'min-h-[72px] text-lg',
      icon: '📞'
    },
    'important': {
      bg: 'bg-blue-600 hover:bg-blue-700',
      ring: 'focus:ring-blue-500', 
      size: 'min-h-[60px] text-base',
      icon: '📞'
    }
  }
  
  const style = priorityStyles[priority]
  
  return (
    <a
      href={`tel:${number}`}
      className={`
        ${style.bg} ${style.ring} ${style.size}
        ${priority === 'life-threatening' ? style.pulse : ''}
        ${isPressing ? 'transform scale-95' : ''}
        w-full text-white font-bold rounded-2xl
        transition-all duration-150 ease-out
        focus:outline-none focus:ring-4 focus:ring-opacity-75
        shadow-lg hover:shadow-xl
        flex items-center justify-center space-x-3
        active:transform active:scale-95
      `}
      onTouchStart={() => setIsPressing(true)}
      onTouchEnd={() => setIsPressing(false)}
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
      onMouseLeave={() => setIsPressing(false)}
      onClick={() => setHasInteracted(true)}
      role="button"
      aria-label={`Call ${number} for ${label}${context ? ` - ${context}` : ''}`}
    >
      <span className="text-2xl" role="img" aria-hidden="true">
        {style.icon}
      </span>
      <div className="text-left">
        <div className="font-bold leading-tight">{label}</div>
        <div className="font-mono text-sm tracking-wider opacity-90">
          {number}
        </div>
        {context && priority === 'life-threatening' && (
          <div className="text-xs opacity-80 mt-1">{context}</div>
        )}
      </div>
    </a>
  )
}
```

### Progressive Disclosure for Crisis Information

```tsx
// Crisis Section with Progressive Disclosure
const CrisisSection = ({ title, resources, urgency, autoExpand = false }) => {
  const [isExpanded, setIsExpanded] = useState(autoExpand)
  const [viewedCount, setViewedCount] = useState(0)
  
  // Show most critical resources first
  const criticalResources = resources.slice(0, 3)
  const additionalResources = resources.slice(3)
  
  const expandSection = () => {
    setIsExpanded(true)
    // Track user engagement for crisis analytics
    trackCrisisEngagement('section_expanded', { urgency, resourceCount: resources.length })
  }
  
  return (
    <section className={`crisis-section urgency-${urgency}`}>
      {/* Always visible critical resources */}
      <div className="critical-resources mb-6">
        <h2 className="crisis-h2 mb-6">{title}</h2>
        <div className="emergency-grid">
          {criticalResources.map((resource) => (
            <EmergencyButton
              key={resource.id}
              number={resource.phone}
              label={resource.name}
              priority={urgency === 'immediate' ? 'life-threatening' : 'urgent'}
              context={resource.responseTime}
            />
          ))}
        </div>
      </div>
      
      {/* Expandable additional resources */}
      {additionalResources.length > 0 && (
        <div className="additional-resources">
          {isExpanded && (
            <div className="grid gap-4 mb-6">
              {additionalResources.map((resource) => (
                <CrisisResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
          
          {!isExpanded && (
            <button
              onClick={expandSection}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
              aria-expanded={isExpanded}
            >
              ▼ View {additionalResources.length} More {title} Resources
            </button>
          )}
        </div>
      )}
    </section>
  )
}
```

---

## 🔍 SEARCH & NAVIGATION FOR CRISIS

### Crisis-Optimized Search Interface

```tsx
// Crisis Search with Immediate Results
const CrisisSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  
  // Immediate search with no debouncing for crisis situations
  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true)
      const searchResults = searchCrisisResources(query)
      setResults(searchResults)
      setIsSearching(false)
    } else {
      setResults([])
    }
  }, [query])
  
  // Quick search suggestions for common crisis terms
  const quickSearches = [
    { term: 'suicide', icon: '🚨', priority: 'life-threatening' },
    { term: 'overdose', icon: '🚨', priority: 'life-threatening' }, 
    { term: 'hospital', icon: '🏥', priority: 'urgent' },
    { term: 'detox', icon: '🏥', priority: 'urgent' },
    { term: 'crisis', icon: '📞', priority: 'important' }
  ]
  
  return (
    <div className="crisis-search mb-8">
      {/* Large, accessible search input */}
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for immediate help..."
          className="
            w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-300
            focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50
            transition-all duration-200
          "
          autoFocus
          aria-label="Search for crisis resources"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <div className="animate-spin text-2xl">⏳</div>
          ) : (
            <div className="text-2xl text-gray-400">🔍</div>
          )}
        </div>
      </div>
      
      {/* Quick search buttons */}
      {query.length === 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-3">Common searches:</p>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((search) => (
              <button
                key={search.term}
                onClick={() => setQuery(search.term)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${search.priority === 'life-threatening' 
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : search.priority === 'urgent'
                    ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'  
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }
                `}
              >
                {search.icon} {search.term}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Immediate search results */}
      {results.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6">
          <h3 className="font-bold text-lg mb-4">Found {results.length} resources:</h3>
          <div className="space-y-3">
            {results.slice(0, 5).map((result) => (
              <div key={result.id} className="flex items-center space-x-4">
                <EmergencyButton
                  number={result.phone}
                  label={result.name}
                  priority="important"
                />
                <div className="flex-1 text-sm text-gray-600">
                  {result.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

### Crisis Navigation Breadcrumbs

```tsx
// Crisis-Aware Navigation
const CrisisNavigation = ({ currentPage, urgencyLevel }) => {
  const emergencyExit = () => {
    // Quick exit to 911 or crisis line
    window.location.href = 'tel:911'
  }
  
  return (
    <nav 
      className={`
        crisis-nav sticky top-0 z-50 transition-colors
        ${urgencyLevel === 'crisis' ? 'bg-red-600' : 'bg-blue-600'}
        text-white shadow-lg
      `}
      role="navigation"
      aria-label="Crisis navigation"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Current location indicator */}
          <div className="flex items-center space-x-2">
            <span className="text-sm opacity-75">You are here:</span>
            <span className="font-semibold">{currentPage}</span>
          </div>
          
          {/* Quick action buttons */}
          <div className="flex items-center space-x-3">
            {currentPage !== 'Crisis Help' && (
              <a
                href="/life-saving-links"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                🚨 Crisis Help
              </a>
            )}
            
            {currentPage !== 'Housing' && (
              <a
                href="/housing"  
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                🏠 Housing
              </a>
            )}
            
            <button
              onClick={emergencyExit}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-bold transition-colors"
              aria-label="Emergency call to 911"
            >
              📞 911
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

---

## ⚡ PERFORMANCE PATTERNS FOR CRISIS

### Critical Resource Preloading

```tsx
// Preload critical crisis resources
useEffect(() => {
  // Preload emergency contact resources
  const criticalResources = [
    'tel:988',
    'tel:911', 
    'tel:(512)472-4357', // Austin Crisis Line
    'sms:741741' // Crisis Text Line
  ]
  
  // Pre-warm phone call connections
  criticalResources.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = 'fetch'
    document.head.appendChild(link)
  })
  
  // Preload critical page resources
  const criticalPages = ['/life-saving-links', '/housing']
  criticalPages.forEach(page => {
    // Prefetch next.js pages
    router.prefetch(page)
  })
}, [])
```

### Offline Crisis Support

```tsx
// Service Worker for Crisis Page Offline Support
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('crisis-cache-v1').then((cache) => {
      return cache.addAll([
        '/life-saving-links',
        '/crisis-offline.html',
        '/emergency-contacts.json',
        // Critical CSS and JS
        '/_next/static/css/crisis.css',
        '/_next/static/js/crisis.js'
      ])
    })
  )
})

// Offline emergency contact fallback
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('life-saving-links')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/crisis-offline.html')
      })
    )
  }
})
```

---

## 🎨 VISUAL HIERARCHY FOR CRISIS

### Emergency Visual Patterns

```css
/* Crisis Visual Hierarchy */
.crisis-tier-1 {
  /* Life-threatening emergencies */
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 3px solid #dc2626;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
  50% { box-shadow: 0 0 30px rgba(220, 38, 38, 0.5); }
}

.crisis-tier-2 {
  /* Urgent psychiatric/medical needs */
  background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
  border: 3px solid #ea580c;
  box-shadow: 0 0 15px rgba(234, 88, 12, 0.2);
}

.crisis-tier-3 {
  /* Treatment entry needs */
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #d97706;
  box-shadow: 0 0 10px rgba(217, 119, 6, 0.15);
}

.crisis-tier-4 {
  /* Ongoing support needs */
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border: 2px solid #16a34a;
  box-shadow: 0 0 8px rgba(22, 163, 74, 0.1);
}
```

### Status Indicators

```css
/* Availability Status Indicators */
.status-available {
  background: #16a34a;
  color: white;
  animation: pulse-available 3s infinite;
}

@keyframes pulse-available {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.status-waitlist {
  background: #d97706; 
  color: white;
}

.status-full {
  background: #dc2626;
  color: white;
}

.status-unknown {
  background: #6b7280;
  color: white;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .crisis-section {
    border-width: 4px;
    box-shadow: none;
  }
  
  .emergency-button {
    border: 3px solid #000;
    font-weight: 900;
  }
}
```

---

## 📞 CONTACT INTERACTION PATTERNS

### Phone Call Optimization

```tsx
// Enhanced phone call component with crisis optimizations
const CrisisPhoneButton = ({ number, resource, urgency }) => {
  const [callAttempted, setCallAttempted] = useState(false)
  const [backupShown, setBackupShown] = useState(false)
  
  const handleCall = () => {
    // Track crisis call attempts
    trackCrisisCall(resource.id, urgency)
    setCallAttempted(true)
    
    // Show backup options after 30 seconds if user returns
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        setBackupShown(true)
      }
    }, 30000)
  }
  
  return (
    <div className="crisis-phone-section">
      {/* Primary call button */}
      <a
        href={`tel:${number}`}
        onClick={handleCall}
        className="crisis-call-button"
        aria-label={`Call ${resource.name} at ${number} for immediate help`}
      >
        📞 Call {resource.name}
        <div className="phone-number">{number}</div>
        {resource.responseTime && (
          <div className="response-time">Response: {resource.responseTime}</div>
        )}
      </a>
      
      {/* Backup options if primary call was attempted */}
      {backupShown && (
        <div className="backup-options mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 mb-2">
            Having trouble connecting? Try these backup options:
          </p>
          
          {resource.textSupport && (
            <a
              href={`sms:${resource.textSupport}`}
              className="backup-option text-button"
            >
              📱 Text {resource.textSupport}
            </a>
          )}
          
          {resource.website && (
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="backup-option web-button"
            >
              🌐 Visit Website
            </a>
          )}
          
          {/* Alternative crisis resources */}
          <div className="mt-3">
            <p className="text-xs text-yellow-700 mb-1">Or try these alternatives:</p>
            <div className="flex space-x-2">
              <a href="tel:988" className="alt-crisis-button">988 Crisis</a>
              <a href="tel:911" className="alt-crisis-button">911 Emergency</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

**Next Document**: ACCESSIBILITY-AND-COMPLIANCE-REQUIREMENTS.md  
**Status**: Crisis-responsive design patterns complete, ready for accessibility specifications