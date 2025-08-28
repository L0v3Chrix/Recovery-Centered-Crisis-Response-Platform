# Breadcrumbs + Mobile Navigation + Logo Implementation Plan

**Created**: 2025-08-28  
**Branch**: `feat/breadcrumbs-nav-logo`  
**Status**: Ready for implementation

## Overview

This plan will implement:
1. App-wide breadcrumbs with JSON-LD for SEO
2. Accessible mobile navigation with focus trap
3. Replace hero text with logo image
4. Centralized navigation items

## Execution Steps

### Step 0: Setup Branch & Logo Asset
- [ ] Create branch `feat/breadcrumbs-nav-logo`
- [ ] Add logo file to `/public/brand/`
- [ ] Note: We'll use the existing logo SVG instead of adding a new PNG

### Step 1: Centralize Navigation Items
- [ ] Create `/lib/nav.ts` with NAV_ITEMS export
- [ ] Define NavItem type
- [ ] List all navigation items in single source

### Step 2: Create Breadcrumbs Component
- [ ] Create `/components/Breadcrumbs.tsx`
- [ ] Implement dynamic breadcrumb generation from route
- [ ] Add JSON-LD structured data for SEO
- [ ] Style with Tailwind

### Step 3: Create Mobile Navigation
- [ ] Create `/components/MobileNav.tsx`
- [ ] Implement accessible menu with focus trap
- [ ] Add ESC key handler
- [ ] Add overlay click handler
- [ ] Use NAV_ITEMS from lib/nav

### Step 4: Update Site Header
- [ ] Update existing `SiteHeader.tsx`
- [ ] Add logo image to header
- [ ] Add desktop navigation from NAV_ITEMS
- [ ] Integrate MobileNav component
- [ ] Add skip to content link

### Step 5: Wire Components in Layout
- [ ] Update `app/layout.tsx`
- [ ] Import and render SiteHeader
- [ ] Import and render Breadcrumbs
- [ ] Ensure proper component placement

### Step 6: Update Home Hero
- [ ] Update `app/page.tsx`
- [ ] Replace text with logo image
- [ ] Maintain existing styling and layout
- [ ] Ensure proper image optimization

### Step 7: Testing & Verification
- [ ] Test breadcrumbs on various routes
- [ ] Test mobile menu functionality
- [ ] Verify ESC key and focus trap
- [ ] Check JSON-LD output
- [ ] Verify logo displays correctly
- [ ] Run lint checks

## File Structure

```
/lib/
  nav.ts                 # Centralized navigation items

/components/
  Breadcrumbs.tsx       # Breadcrumb component with JSON-LD
  MobileNav.tsx         # Mobile navigation component  
  SiteHeader.tsx        # Updated header with logo

/app/
  layout.tsx            # Updated with new components
  page.tsx              # Updated hero with logo

/public/brand/
  logo-hlifeline.svg    # Existing logo (will use this)
```

## Commands

```bash
# Create branch
git checkout -b feat/breadcrumbs-nav-logo

# Test implementation
npm run dev
npm run lint

# Commit changes
git add -A
git commit -m "feat: add breadcrumbs, mobile nav, and logo header"

# Push branch
git push origin feat/breadcrumbs-nav-logo
```

## Success Criteria

- ✅ Breadcrumbs show on all non-home pages
- ✅ Mobile menu opens/closes properly with focus trap
- ✅ ESC key closes mobile menu
- ✅ Logo displays in header and hero
- ✅ JSON-LD structured data for breadcrumbs
- ✅ Desktop and mobile nav use same NAV_ITEMS
- ✅ No ESLint errors
- ✅ Accessible keyboard navigation

## Notes

- Will use existing SVG logo instead of adding new PNG
- Logo path: `/brand/logo-hlifeline.svg`
- Maintain existing Aurora design system colors
- Keep CLS < 0.02 with proper image sizing