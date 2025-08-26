# Deployment Guide - Central Texas Resources MVP

## Quick Deploy to Vercel

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Create Vercel account at https://vercel.com
3. Login: `vercel login`

### Deploy Commands
```bash
# Build locally first (optional - Vercel will do this)
npm run build

# Deploy to production
vercel --prod
```

### Environment Variables
Set these in Vercel dashboard or via CLI:

```bash
# Optional - Google Maps API key for enhanced location features
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Site URL for PWA manifest and sharing
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app

# Crisis Text Line configuration (optional)
NEXT_PUBLIC_CRISIS_TEXT_NUMBER=741741
NEXT_PUBLIC_CRISIS_TEXT_KEYWORD=HOME
```

### Custom Domain Setup (Optional)
1. In Vercel dashboard, go to your project
2. Go to Settings → Domains
3. Add your custom domain (e.g., centraltexasresources.org)
4. Follow DNS configuration instructions

## Alternative Deployment Options

### Deploy to Netlify
```bash
# Build the app
npm run build
npm run export

# Upload the `out` folder to Netlify
```

### Deploy to GitHub Pages
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select source as GitHub Actions
4. Use Next.js GitHub Actions workflow

## Pre-deployment Checklist

- [ ] Build succeeds locally (`npm run build`)
- [ ] All resource data loads correctly (check console for "Loaded X resources")
- [ ] Mobile responsiveness tested
- [ ] Crisis hotlines are clickable
- [ ] PWA manifest loads correctly
- [ ] Location prompt works (if Google Maps API key provided)

## Performance Optimization

The app is already optimized with:
- ✅ Next.js static generation
- ✅ PWA with offline capability
- ✅ Image optimization
- ✅ Bundle splitting
- ✅ Mobile-first design

Build output shows excellent performance:
- Main page: 3.37 kB
- First Load JS: 90.5 kB
- All pages prerendered as static content

## Current Data

The MVP includes **33 verified resources**:
- **Crisis resources**: 988 Lifeline, local crisis lines, emergency services
- **Food resources**: 20+ food pantries, meal programs, 24/7 free fridges
- **Recovery resources**: Treatment centers, MAT providers, support groups, housing

All data is based on official sources including:
- Street Forum Mutual Aid Austin Resource Guide (May 2024)
- SAMHSA treatment locator
- Verified local recovery organizations

## Post-Deployment

1. Test all crisis hotline links work on mobile
2. Verify resource search and filtering
3. Check PWA installation on mobile devices
4. Monitor performance with Lighthouse
5. Set up basic analytics (optional)

## Domain Recommendation

For maximum trust and findability:
- Primary: `centraltexasresources.org`
- Alternative: `austinresources.org`
- Fallback: `txrecoveryresources.com`

The MVP is ready for immediate deployment and real-world use.