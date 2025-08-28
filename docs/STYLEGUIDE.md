# HelpNow ATX Brand Style Guide

## Brand Identity

**Name:** HelpNow ATX  
**Tagline:** Real help • Verified daily  
**URL:** https://helpnowatx.org

## Logo Usage

### Primary Logo
The HelpNow ATX logo consists of two elements:
1. **Icon:** Two vertical pillars forming an "H" with an ECG heartbeat line across the center
2. **Wordmark:** "elpNow ATX" text completing the word "HelpNow ATX"

### Logo Files
- **SVG (Scalable):** `/public/brand/logo-hlifeline.svg` - Primary logo mark
- **Horizontal Wordmark:** `/public/brand/wordmark-horizontal.svg` - Logo with text
- **Stacked Wordmark:** `/public/brand/wordmark-stacked.svg` - Vertical layout

### Clear Space
Maintain minimum clear space around the logo equal to the width of one pillar (1× pillar width on all sides).

### Minimum Sizes
- **Digital:** 48px minimum height
- **Print:** 0.5 inches minimum height
- **Favicon:** 16px (simplified version)

## Color Palette

### Primary Colors
```css
--aurora-indigo-700: #1B2A5B    /* Deep Blue - Primary brand color */
--aurora-blue-500: #2B50E2      /* Bright Blue - Links and CTAs */
--aurora-cyan-400: #6BA9FF      /* Light Blue - Accents */
--heartbeat-cyan: #3EC6FF       /* Cyan - ECG line color */
```

### Supporting Colors
```css
--aurora-emerald-500: #10b981   /* Success/Verified */
--aurora-crimson-600: #dc2626   /* Crisis/Urgent */
--aurora-fuchsia-500: #d946ef   /* Recovery/Support */
--aurora-azure-400: #38bdf8     /* Healthcare/Info */
```

### Gradients
```css
/* Primary Brand Gradient */
background: linear-gradient(135deg, #1B2A5B 0%, #2B50E2 50%, #6BA9FF 100%);

/* Aurora Background */
background: linear-gradient(135deg, #1B2A5B 0%, #2B50E2 25%, #6BA9FF 75%, #3EC6FF 100%);
```

## Typography

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Weights
- **Black (900):** Logo wordmark, main headings
- **Bold (700):** Section headings, CTAs
- **Semibold (600):** Subheadings, emphasis
- **Medium (500):** Body text, taglines
- **Regular (400):** Secondary text

## Partner Badges

### Available Styles
1. **Gradient Pill** (Recommended) - Aurora gradient background
2. **Dark Background** - Solid dark blue background
3. **Outline Style** - White background with border

### Badge Implementation
```html
<!-- HelpNow ATX Partner Badge -->
<a href="https://helpnowatx.org/?utm_source=partner&utm_medium=badge&utm_campaign=backlink"
   target="_blank" rel="noopener noreferrer"
   aria-label="HelpNow ATX — Find verified help">
  <img src="https://helpnowatx.org/partner-badges/badge-pill.svg"
       alt="Get Help Now — HelpNow ATX (verified resources)"
       width="360" height="110"
       style="max-width:100%;height:auto;border:0;border-radius:18px" />
</a>
```

### Badge Rules
- Always link to https://helpnowatx.org/
- Include UTM parameters for tracking
- Maintain original aspect ratio
- Do not modify colors or text
- Do not use for commercial promotion

## Social Media Images

### Dimensions
- **Facebook/LinkedIn:** 1200×630px
- **X/Twitter:** 1200×675px
- **Instagram Square:** 1080×1080px
- **Instagram Portrait:** 1080×1350px
- **Stories:** 1080×1920px

### Files
All social media images are available in `/public/og/`

## Voice & Tone

### Brand Voice
- **Direct:** Get to the point quickly
- **Compassionate:** Acknowledge difficult situations
- **Trustworthy:** Verified information only
- **Accessible:** Plain language, no jargon
- **Action-oriented:** Clear next steps

### Messaging Principles
1. Lead with help, not problems
2. Focus on "verified" and "current"
3. Be specific about locations (Central Texas, Austin)
4. Include clear calls-to-action
5. Respect privacy and dignity

### Example Messages
- ✅ "Real help, verified daily in Central Texas"
- ✅ "Find food, shelter, and recovery resources now"
- ✅ "516+ verified resources for Central Texas"
- ❌ "Are you struggling with addiction?"
- ❌ "Homeless? We can help!"

## Accessibility

### Color Contrast
- Maintain WCAG AA compliance (4.5:1 for normal text)
- White text on aurora gradient backgrounds
- Dark text (#1B2A5B) on light backgrounds

### Interactive Elements
- Minimum touch target: 44×44px
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader friendly markup

## Do's and Don'ts

### Do's
- ✅ Use the official logo files
- ✅ Maintain brand colors
- ✅ Include proper attribution
- ✅ Link to helpnowatx.org
- ✅ Verify information before sharing

### Don'ts
- ❌ Stretch or distort the logo
- ❌ Change logo colors
- ❌ Add effects or shadows
- ❌ Use old branding assets
- ❌ Imply official endorsement without permission

## Contact

For brand questions or custom implementations:
- Email: partners@helpnowatx.org
- Website: https://helpnowatx.org/partners

---

*Last updated: January 2025*