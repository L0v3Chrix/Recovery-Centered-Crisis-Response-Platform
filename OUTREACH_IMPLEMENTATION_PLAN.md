# Outreach & Submissions Implementation Plan
## Aurora Hope Design System Implementation

**Project**: Central Texas Resources - Outreach & Submissions Enhancement  
**Design System**: Aurora Hope Palette  
**Framework**: Next.js 14 + Lenis + Framer Motion  
**Date**: 2025-08-28  

---

## 🎯 **Project Vision**

Transform the Central Texas Resources platform with a modern, hope-centered design system that emphasizes support-first language, purposeful motion, and community engagement through outreach tools.

---

## 🎨 **Aurora Hope Design System**

### Core Palette
- **Aurora Indigo 700** `#1B2A5B` (trust, primary brand)
- **Aurora Indigo 500** `#2B50E2` (action buttons, CTAs)  
- **Azure Glow 400** `#3EC6FF` (focus states, hovers)
- **Emerald Lift 500** `#14B8A6` (positive actions, support)
- **Fuchsia Pulse 500** `#A855F7` (education highlights)
- **Crisis Crimson 600** `#E11D48` (emergency ribbon ONLY)
- **Canvas Tint** `#F6F8FF` (surface backgrounds)

### Motion Guidelines
- **Purposeful**: Every animation serves user understanding
- **Reduced-motion aware**: Respects user preferences
- **Lenis**: Smooth scrolling implementation
- **ScrollStack**: Stacked card interactions

### Language Strategy
- **Primary**: "Support" (keep project alive, tip dev, fuel updates)
- **Secondary**: "Donate" (traditional donation language)
- **Focus**: Hope, change, resilience, community support

---

## 📋 **Implementation Sequence**

### **Phase 1: Foundation & Design System** ⏱️ 2-3 hours

#### **Step 0: Project Setup**
- [ ] Create `feat/aurora-design-system` branch
- [ ] Install dependencies: `lenis`, `framer-motion`
- [ ] Scaffold `/docs` folder structure:
  - [ ] `docs/CHANGELOG.md`
  - [ ] `docs/PROGRESS.md` 
  - [ ] `docs/DECISIONS.md`
  - [ ] `docs/STYLEGUIDE.md`
  - [ ] `docs/README-UPDATES.md`
- [ ] **Rule**: Update docs/CHANGELOG after every step

#### **Step 1: Design Tokens**
- [ ] Add Aurora Hope palette to Tailwind config
- [ ] Create component layer with design tokens
- [ ] Implement gradient utilities (radial/linear)
- [ ] Add reduced-motion preferences
- [ ] Update CHANGELOG with design system additions

#### **Step 2: Layout Enhancement**
- [ ] Update root layout with Aurora palette
- [ ] Implement Lenis smooth scrolling
- [ ] Add Framer Motion wrapper
- [ ] Update header with new color scheme
- [ ] Create **Support-first footer** (replace donation language)
- [ ] Update CHANGELOG with layout improvements

---

### **Phase 2: Support & Community Pages** ⏱️ 3-4 hours

#### **Step 3: /support Page**
- [ ] Create `app/support/page.tsx` (replaces /donate)
- [ ] Implement "Support-first" language throughout
- [ ] Add Square Checkout integration (any amount)
- [ ] Add Cash App integration with copy functionality
- [ ] Create "What your support funds this week" impact strip
- [ ] Apply Aurora design system styling
- [ ] Add purposeful micro-animations
- [ ] Update CHANGELOG with support page implementation

#### **Step 4: /submit Page (GHL API v2)**
- [ ] Create `app/submit/page.tsx`
- [ ] Integrate GoHighLevel API v2
- [ ] Implement PIT (Pipeline ID) + Location ID
- [ ] Create form validation and submission flow
- [ ] Add success/error states with Aurora styling
- [ ] Apply motion guidelines to form interactions
- [ ] Update CHANGELOG with GHL integration

#### **Step 5: Hidden Admin Reports**
- [ ] Create `app/admin/reports/page.tsx` (password protected)
- [ ] Implement submission analytics dashboard
- [ ] Add GHL data visualization
- [ ] Apply Aurora design system to admin interface
- [ ] Add authentication layer
- [ ] Update CHANGELOG with admin features

---

### **Phase 3: Partnership & Sharing Tools** ⏱️ 2-3 hours

#### **Step 6: /partners Enhancement**
- [ ] Update existing partners page with Aurora palette
- [ ] Refresh badge designs with new color system
- [ ] Maintain embed functionality
- [ ] Update press kit generation
- [ ] Apply new motion guidelines
- [ ] Update CHANGELOG with partners improvements

#### **Step 7: /share Polish**
- [ ] Update existing share page with Aurora design
- [ ] Add "sharing with care" tips section
- [ ] Enhance platform integration buttons
- [ ] Apply purposeful animations to sharing actions
- [ ] Update captions with support-first language
- [ ] Update CHANGELOG with sharing enhancements

---

### **Phase 4: Technical Polish & Launch** ⏱️ 2-3 hours

#### **Step 8: SEO & Analytics**
- [ ] Implement enhanced GA4 tracking
- [ ] Add Open Graph meta tags with Aurora branding
- [ ] Create Twitter Cards for social sharing
- [ ] Optimize Core Web Vitals
- [ ] Add structured data markup
- [ ] Update CHANGELOG with SEO improvements

#### **Step 9: Documentation & Launch Prep**
- [ ] Complete STYLEGUIDE.md with Aurora system docs
- [ ] Update README-UPDATES.md with new features
- [ ] Finalize CHANGELOG.md with comprehensive changes
- [ ] Create deployment checklist
- [ ] Test all functionality across devices/browsers
- [ ] Update CHANGELOG with launch preparations

---

## 📊 **Success Metrics**

### **Design System Goals**
- [ ] 100% Aurora Hope palette implementation
- [ ] Consistent motion language across all interactions
- [ ] Support-first language in 90% of user-facing content
- [ ] Reduced-motion compliance

### **Functional Goals**
- [ ] GHL API v2 integration working with 99% success rate
- [ ] Support page converting 25% better than donation page
- [ ] Admin reports providing actionable insights
- [ ] Partnership tools generating 10+ badge implementations

### **Technical Goals**
- [ ] Core Web Vitals scores: Good (90th percentile)
- [ ] Accessibility score: 95+ (Lighthouse)
- [ ] Cross-browser compatibility: 99%
- [ ] Mobile responsiveness: 100%

---

## 🎨 **Visual Direction**

### **Color Usage Rules**
- **Aurora Indigo**: Primary brand, navigation, trust elements
- **Azure Glow**: Interactive states, focus indicators
- **Emerald Lift**: Support actions, positive feedback
- **Fuchsia Pulse**: Educational content, highlights
- **Crisis Crimson**: Emergency content ONLY
- **Canvas Tint**: Backgrounds, subtle surfaces

### **Gradient Applications**
- **Radial gradients**: Hero sections, cards with depth
- **Linear gradients**: Buttons, progress indicators
- **Subtle overlays**: Section dividers, content blocks
- **No flat neon**: All colors work within cohesive system

---

## 📚 **Documentation Standards**

### **Required Updates Per Step**
1. **CHANGELOG.md**: What changed, why, impact
2. **PROGRESS.md**: Current status, next steps
3. **DECISIONS.md**: Technical choices made, rationale
4. **STYLEGUIDE.md**: Design system usage, examples

### **Commit Message Format**
```
feat(aurora): [component] - brief description

- Specific change 1
- Specific change 2
- Apply Aurora Hope palette
- Update documentation

🎨 Aurora Design System Implementation
```

---

## ⚠️ **Critical Requirements**

1. **Every step MUST update docs/CHANGELOG.md**
2. **Support-first language** throughout (not donation-focused)
3. **Crisis Crimson ONLY for emergencies** 
4. **Reduced-motion compliance** required
5. **GHL API v2** implementation (not v1)
6. **Mobile-first responsive design**
7. **Accessibility standards maintained**

---

## 🚀 **Ready to Build**

**Next Action**: Start with **Step 0** - Project setup and branch creation  
**Estimated Total Time**: 9-13 hours  
**Priority Sequence**: Foundation → Support → Technical → Polish  

**Key Success Factor**: Consistent documentation updates and Aurora design system adherence throughout implementation.