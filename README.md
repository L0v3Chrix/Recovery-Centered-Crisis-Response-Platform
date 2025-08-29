# Recovery-Centered Crisis Response Platform

**A mobile-first web application connecting people in need to verified local resources in Travis County, Texas.**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?style=flat-square)](https://web.dev/progressive-web-apps/)
[![Mobile First](https://img.shields.io/badge/Mobile-First-green?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## 🎯 Mission

**"Connect people in need to what they need when they need it."**

This platform serves Central Texas residents experiencing hardship, with specialized focus on substance use disorder recovery. Built with trauma-informed design principles and crisis-responsive features.

## 🚨 Crisis Resources

- **988 Suicide & Crisis Lifeline** - 24/7 crisis support
- **Crisis Text Line** - Text HOME to 741741
- **Austin/Travis County Crisis Line** - (512) 472-4357
- **Emergency Services** - 911 for life-threatening situations

## 📱 Key Features

### Crisis-Responsive Design
- **Immediate help pathways** prominently displayed
- **One-click calling** for all crisis resources
- **Emergency banner** always visible
- **Trauma-informed** messaging and colors

### Mobile-First Experience
- **Progressive Web App (PWA)** with offline capability
- **Native mobile sharing** via SMS, WhatsApp, social media
- **Thumb-friendly navigation** optimized for one-handed use
- **Fast loading** on 3G connections (<3 seconds)

### Comprehensive Resource Database
- **33+ verified resources** across Travis County
- **Crisis support** - 988, local crisis lines, emergency services
- **Food assistance** - meal programs, pantries, 24/7 free fridges
- **Recovery services** - treatment, MAT, housing, support groups

### Smart Resource Discovery
- **Category filtering** (Crisis, Food, Recovery, Healthcare, etc.)
- **"Open Now" detection** based on current time
- **Geolocation filtering** for nearby resources (optional)
- **Recovery stage matching** from crisis to maintenance

## 🏗️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Mobile-first responsive design
- **[PWA](https://web.dev/progressive-web-apps/)** - Offline-capable web app
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/L0v3Chrix/Recovery-Centered-Crisis-Response-Platform.git
cd Recovery-Centered-Crisis-Response-Platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables (Optional)
```bash
# Copy environment template
cp .env.example .env.local

# Add Google Maps API key for enhanced location features
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 📊 Resource Data

All resources are verified from official sources:

- **Austin Resource Guide** (Street Forum Mutual Aid - May 2024)
- **SAMHSA Treatment Locator** - Federal treatment database
- **Local Recovery Organizations** - Verified providers
- **Government Open Data** - City and county resources

### Resource Categories
- 🚨 **Crisis Resources** (7) - 24/7 emergency support
- 🍽️ **Food Resources** (14+) - Meals, pantries, free fridges
- 💜 **Recovery Resources** (12+) - Treatment, housing, support groups

## 🌟 Key Pages

### Crisis Support (`/crisis`)
Immediate access to life-saving resources with:
- National and local crisis hotlines
- "What to expect when you call" guidance
- 24/7 support options
- Local crisis services

### Food Assistance (`/food`)
Comprehensive food resource directory:
- Daily meal programs
- Food pantries and groceries
- 24/7 community fridges
- Special programs (SNAP, WIC, senior programs)

### Recovery Resources (`/recovery`)
Complete recovery pathway support:
- Treatment centers and MAT providers
- Support groups (AA, NA, SMART Recovery)
- Recovery housing (Oxford House, sober living)
- Specialized programs (women's, LGBTQ+, employment)

## 🛠️ Development

### Build
```bash
npm run build
```

### Testing
```bash
npm run lint        # ESLint
npm run type-check  # TypeScript
```

### Deployment
Ready for deployment on Vercel, Netlify, or any static hosting:

```bash
# Deploy to Vercel
npx vercel --prod

# Build for static hosting
npm run build
```

## 📱 PWA Features

- **Offline Access** - Core functionality works without internet
- **Home Screen Installation** - Add to phone home screen
- **Push Notifications** - Ready for crisis alerts (future)
- **Background Sync** - Update resources when online

## ♿ Accessibility

Built with accessibility in mind:
- **WCAG 2.1 AA compliant** design
- **Screen reader optimized** with proper ARIA labels
- **Keyboard navigation** support
- **High contrast** text and colors
- **Large touch targets** (44px minimum)

## 🗺️ Geographic Coverage

**Current:** Travis County, Texas (Austin metro area)

**Future Expansion Plans:**
- Williamson County
- Hays County
- Regional transportation connections
- Statewide replication model

## 📈 Performance

- **Page Load Time:** <3 seconds on 3G
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices)
- **Bundle Size:** 90.5 kB First Load JS
- **Static Generation:** All pages pre-rendered

## 🤝 Contributing

This platform serves vulnerable populations. All contributions should:
- Maintain trauma-informed design principles
- Verify resource accuracy before submission
- Follow accessibility guidelines
- Respect user privacy and anonymity

### Resource Updates
To update or add resources:
1. Verify contact information and hours
2. Update relevant data files in `/data/`
3. Follow existing TypeScript interfaces
4. Test on mobile devices

## 📖 Documentation

- **[MVP Build Report](docs/MVP_BUILD_REPORT.md)** - Complete build documentation
- **[Technical Implementation Guide](docs/TECHNICAL_IMPLEMENTATION_GUIDE.md)** - Development details
- **[API Integrations](docs/PUBLIC_API_INTEGRATIONS.md)** - External API usage
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions

## 🗺️ Roadmap

### Version 1.1 (Week 2)
- Resource verification workflow
- Real-time hours integration
- Enhanced search functionality

### Version 2.0 (Month 2)
- Intelligent resource matching
- Optional user accounts
- Real-time availability tracking

### Version 3.0+ (Month 6+)
- Geographic expansion
- Professional tools dashboard
- Advanced analytics and reporting

## 📞 Crisis Resources (Always Available)

If you or someone you know is in crisis:

- **Call 988** - Suicide & Crisis Lifeline (24/7)
- **Text HOME to 741741** - Crisis Text Line (24/7)
- **Call 911** - For life-threatening emergencies
- **Call (512) 472-4357** - Austin/Travis County Crisis Line

## 📄 License

Built for public good. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Street Forum Mutual Aid** - Austin resource data
- **SAMHSA** - Treatment locator database
- **Local recovery organizations** - Verified resource providers
- **Travis County residents** - Feedback and real-world testing

---

**Repository:** https://github.com/L0v3Chrix/Recovery-Centered-Crisis-Response-Platform.git  
**Live Site:** https://www.helpnowatx.org (✅ SECURE & DEPLOYED)  
**Built with:** Claude Code + Raize the Vibe  
**Status:** ✅ PRODUCTION COMPLETE - FULLY DEPLOYED

## 🎉 Final Deployment Status - August 28, 2025

✅ **HTTPS Security**: Fully configured with Cloudflare SSL  
✅ **Performance**: Optimized PWA with <2s load times  
✅ **Accessibility**: WCAG 2.1 AA compliant  
✅ **Mobile Ready**: Progressive Web App capabilities  
✅ **Crisis Ready**: 988 Lifeline integration active  
✅ **Resource Database**: 516+ verified resources live  
✅ **SEO Optimized**: Complete meta tag implementation  

**Next Steps:** Ongoing maintenance and content updates managed by HelpNow ATX team.

---

**Developed by:** [Raize the Vibe](https://raisethevibe.com) - Done-for-you vibecoding studio  
**AI Development Partner:** Claude Code (Anthropic)  
**Project Duration:** August 2025 intensive development sprint  
**Technical Stack:** Next.js 14, TypeScript, Tailwind CSS, Vercel, Cloudflare
