# Aurora Implementation Steps 0-5
## Detailed Execution Plan with Checklists

**Project**: Central Texas Resources - Aurora Hope Design System  
**Phase**: Foundation Implementation (Steps 0-5)  
**Timeline**: Immediate execution, sequential completion  

---

## 🎯 **Overview**

This document provides the exact implementation sequence for Aurora Hope design system Steps 0-5, with detailed checklists, acceptance criteria, and prompt-ready instructions for Claude Code execution.

---

## **STEP 0: Project Setup & Environment**

### **Prompt for Claude Code:**
```
Create branch `feat/aurora-design-support-ghl`.
Install: `npm i lenis framer-motion class-variance-authority`
Add `/docs`: `CHANGELOG.md`, `PROGRESS.md`, `DECISIONS.md`, `STYLEGUIDE.md`, `README-UPDATES.md`.
Update `.gitignore` to ensure `.env.local` is ignored.
Create `.env.local` (local only) with:

```
NEXT_PUBLIC_SITE_URL=https://helpnowatx.org
NEXT_PUBLIC_CASH_APP_HANDLE=$YourCashTag
NEXT_PUBLIC_SQUARE_CHECKOUT=https://squareup.com/checkout/YOUR_LINK
GHL_BASE_URL=https://services.leadconnectorhq.com
GHL_PIT=pit-8963fa78-8ed3-4c4f-99fb-898f76fc6620
GHL_LOCATION_ID=s64yjTf17LupdrR0UtVQ
GHL_PIPELINE_ID=your_pipeline_id
GHL_PIPELINE_STAGE_ID=your_stage_id
GHL_USER_ID=assignee_user_id
GA4_ID=G-XXXXXXX
```

Update `docs/DECISIONS.md` with domain (helpnowatx.org), "Support-first" CTAs, Aurora palette, Lenis/ScrollStack, hidden reports page.
Commit: `chore: init aurora design system scaffolding and docs`
```

### **Implementation Checklist:**
- [ ] Create new branch `feat/aurora-design-support-ghl`
- [ ] Install required dependencies:
  - [ ] `lenis` (smooth scrolling)
  - [ ] `framer-motion` (animations)
  - [ ] `class-variance-authority` (component styling)
- [ ] Create docs folder structure:
  - [ ] `docs/CHANGELOG.md`
  - [ ] `docs/PROGRESS.md`
  - [ ] `docs/DECISIONS.md`
  - [ ] `docs/STYLEGUIDE.md`
  - [ ] `docs/README-UPDATES.md`
- [ ] Update `.gitignore` to exclude `.env.local`
- [ ] Create `.env.local` with all required environment variables
- [ ] Update `docs/DECISIONS.md` with key architectural decisions
- [ ] Commit with conventional commit message

### **Acceptance Criteria:**
- ✅ New branch exists and is active
- ✅ All dependencies installed successfully
- ✅ Complete `/docs` folder structure exists
- ✅ `.env.local` created locally (not committed to git)
- ✅ Decision documentation updated
- ✅ Clean commit with proper conventional format

---

## **STEP 1: Aurora Design Tokens & Component Layer**

### **Prompt for Claude Code:**
```
In `tailwind.config.ts`, extend the theme with:

* colors: `aurora.indigo700:#1B2A5B`, `aurora.indigo500:#2B50E2`, `aurora.azure400:#3EC6FF`, `aurora.emerald500:#14B8A6`, `aurora.fuchsia500:#A855F7`, `aurora.crimson600:#E11D48`, `ink900:#0F172A`, `canvasTint:#F6F8FF`.
* borderRadius `2xl: '1.25rem'`.

In `app/globals.css`, add `:root` CSS variables for the same, and these gradients:
* `.bg-aurora` → `linear-gradient(135deg, #1B2A5B 0%, #2B50E2 35%, #6BA9FF 100%)`
* `.bg-support` → `linear-gradient(135deg, #2B50E2 0%, #14B8A6 50%, #3EC6FF 100%)`

Add **@layer components** utilities:
* `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-quiet`
* `.chip`, `.card`, `.panel`, `.support`

Focus ring uses `box-shadow: 0 0 0 3px rgba(62,198,255,.35);`.
Update `docs/STYLEGUIDE.md` with tokens & usage.
Commit: `feat(ui): add Aurora tokens, gradients, and component layer`
Append to `docs/PROGRESS.md` and `docs/CHANGELOG.md`.
```

### **Implementation Checklist:**
- [ ] **Tailwind Configuration:**
  - [ ] Add Aurora color palette to theme extension
  - [ ] Add custom border radius values
  - [ ] Verify configuration syntax is correct
- [ ] **CSS Variables & Gradients:**
  - [ ] Add `:root` CSS variables for all Aurora colors
  - [ ] Implement `.bg-aurora` gradient
  - [ ] Implement `.bg-support` gradient
  - [ ] Test gradient rendering
- [ ] **Component Layer:**
  - [ ] Create button component classes (`.btn`, `.btn-primary`, etc.)
  - [ ] Create layout component classes (`.chip`, `.card`, etc.)
  - [ ] Implement focus ring styling
  - [ ] Verify component layer loads correctly
- [ ] **Documentation:**
  - [ ] Update `docs/STYLEGUIDE.md` with token reference
  - [ ] Add usage examples and guidelines
  - [ ] Document gradient applications
- [ ] **Progress Tracking:**
  - [ ] Append completion to `docs/PROGRESS.md`
  - [ ] Add detailed entry to `docs/CHANGELOG.md`
- [ ] **Commit:**
  - [ ] Use conventional commit format
  - [ ] Include all changes in single commit

### **Acceptance Criteria:**
- ✅ Can use Aurora color classes (e.g., `text-aurora-indigo700`)
- ✅ Gradient backgrounds render correctly
- ✅ Component classes work (`.btn-primary`, `.card`)
- ✅ Focus rings display properly
- ✅ Documentation updated with examples
- ✅ No build errors or TypeScript issues

---

## **STEP 2: Layout, Header & Support-First Footer**

### **Prompt for Claude Code:**
```
Update `app/layout.tsx`:

* Wrap content in a max-width container, set base font & tracking.
* Add "Skip to content" link for a11y.

Create `components/SiteFooter.tsx` with:
* Left: "Published by Raise the Vibe • helpnowatx.org"
* Right nav: **Support** (`/support`), **Share** (`/share`), **Partners** (`/partners`), **Submit** (`/submit`)
* Use `.btn-quiet` for links on mobile; ensure 44px targets.

Mount footer globally.
Commit: `feat(ui): modern layout + support-first footer`
Update `docs/PROGRESS.md` and `docs/CHANGELOG.md`.
```

### **Implementation Checklist:**
- [ ] **Layout Updates:**
  - [ ] Add max-width container to `app/layout.tsx`
  - [ ] Set base font and tracking
  - [ ] Add skip-to-content link for accessibility
  - [ ] Verify layout responsiveness
- [ ] **Footer Component:**
  - [ ] Create `components/SiteFooter.tsx`
  - [ ] Add "Published by Raise the Vibe" text with domain
  - [ ] Create navigation with Support, Share, Partners, Submit
  - [ ] Apply `.btn-quiet` styling for mobile
  - [ ] Ensure 44px minimum touch targets
  - [ ] Test responsive behavior
- [ ] **Global Integration:**
  - [ ] Mount footer in root layout
  - [ ] Verify footer appears on all pages
  - [ ] Test footer styling and interactions
- [ ] **Documentation & Commit:**
  - [ ] Update progress tracking documents
  - [ ] Commit with proper conventional format

### **Acceptance Criteria:**
- ✅ Footer appears on every page
- ✅ "Donate" is not in navigation (replaced with "Support")
- ✅ All footer links work correctly
- ✅ Mobile touch targets meet 44px minimum
- ✅ Skip-to-content link functions properly
- ✅ Layout maintains proper max-width and spacing

---

## **STEP 3: Home Rebuild with Lenis ScrollStack**

### **Prompt for Claude Code:**
```
Add `components/ScrollStack.tsx` and `components/ScrollStack.css` from the ScrollStack you provided (keep our perf tweaks).
Create `components/GuidedPaths.tsx` that imports `ScrollStack, ScrollStackItem` and renders 3 cards: **Food today**, **Shelter tonight**, **Recovery now** (short checklists).
Update `app/page.tsx` to:

* Crisis ribbon (crimson), brand header, location chip, verified chip
* Search + mode toggle ("I need help" / "I'm helping someone")
* Quick Access grid (6 cards) using `.card`
* **Guided paths** section using `<GuidedPaths/>` on a tinted panel
* "How to use this map of help" panel (supportive guidance)
* **Support** strip using `.bg-support` gradient with CTAs: "Help keep this project alive", "Tip your dev", "Fuel the updates", "More ways to support"

Commit: `feat(home): rebuild with aurora gradients + Lenis ScrollStack guided paths`
Update `docs/PROGRESS.md` and `docs/CHANGELOG.md`.
```

### **Implementation Checklist:**
- [ ] **ScrollStack Implementation:**
  - [ ] Create `components/ScrollStack.tsx`
  - [ ] Create `components/ScrollStack.css`
  - [ ] Maintain performance optimizations
  - [ ] Test smooth scrolling functionality
- [ ] **Guided Paths Component:**
  - [ ] Create `components/GuidedPaths.tsx`
  - [ ] Implement 3 cards: Food today, Shelter tonight, Recovery now
  - [ ] Add appropriate checklist content for each
  - [ ] Style with Aurora design tokens
- [ ] **Homepage Rebuild:**
  - [ ] Add crisis ribbon with crimson color
  - [ ] Create brand header with location and verified chips
  - [ ] Implement search with mode toggle
  - [ ] Create Quick Access grid (6 cards)
  - [ ] Integrate GuidedPaths section
  - [ ] Add "How to use" guidance panel
  - [ ] Implement support strip with gradient background
  - [ ] Add support CTAs with proper linking
- [ ] **Quality Assurance:**
  - [ ] Test reduced-motion compliance
  - [ ] Verify mobile responsiveness
  - [ ] Check gradient rendering
  - [ ] Test all interactive elements
- [ ] **Documentation:**
  - [ ] Update progress and changelog documents

### **Acceptance Criteria:**
- ✅ Homepage looks modern with rich gradients (less white space)
- ✅ ScrollStack provides smooth stacked card interactions
- ✅ Guided paths section functions correctly
- ✅ Support strip displays with proper gradient
- ✅ All CTAs link to correct destinations
- ✅ Reduced-motion preferences respected
- ✅ Mobile experience optimized

---

## **STEP 4: /support Page Implementation**

### **Prompt for Claude Code:**
```
Create `app/support/page.tsx`:

* Hero: **Help keep this project alive**
* Subcopy: "Back the signal—your tip funds fresh updates & uptime."
* Primary CTA → `process.env.NEXT_PUBLIC_SQUARE_CHECKOUT`
* Secondary CTA → `https://cash.app/${process.env.NEXT_PUBLIC_CASH_APP_HANDLE}`
* Tertiary link: "More ways to support" (stub section with FAQ + trust notes)
* "What your support funds this week" strip (read from a local `data/updates.ts` stub for now)

Fire GA events `support_click` with {method: 'square'|'cashapp'|'more'}.
Commit: `feat(support): support-first page with Square + Cash App`
Update docs files.
```

### **Implementation Checklist:**
- [ ] **Support Page Structure:**
  - [ ] Create `app/support/page.tsx`
  - [ ] Implement hero section with support-first messaging
  - [ ] Add compelling subcopy about funding updates
  - [ ] Apply Aurora design system styling
- [ ] **Payment Integration:**
  - [ ] Primary CTA linking to Square Checkout (env variable)
  - [ ] Secondary CTA linking to Cash App (env variable)
  - [ ] Ensure both CTAs are prominent and accessible
  - [ ] Test CTA functionality with placeholder URLs
- [ ] **Additional Sections:**
  - [ ] Tertiary "More ways to support" section
  - [ ] FAQ and trust notes stub content
  - [ ] "What your support funds this week" strip
  - [ ] Create `data/updates.ts` stub for funding transparency
- [ ] **Analytics Integration:**
  - [ ] Implement GA event tracking for `support_click`
  - [ ] Track method parameter (square/cashapp/more)
  - [ ] Test event firing in development
- [ ] **Quality Assurance:**
  - [ ] Verify no hardcoded dollar amounts
  - [ ] Test responsive design
  - [ ] Ensure accessibility compliance
  - [ ] Validate environment variable usage
- [ ] **Documentation:**
  - [ ] Update progress and changelog documents
  - [ ] Document support page functionality

### **Acceptance Criteria:**
- ✅ Support page renders correctly
- ✅ CTAs open correct destinations (Square/Cash App)
- ✅ No dollar amounts are hardcoded
- ✅ GA events fire correctly
- ✅ Support-first language throughout
- ✅ Environment variables working properly
- ✅ Mobile responsiveness maintained

---

## 📋 **Overall Implementation Checklist**

### **Pre-Implementation Setup:**
- [ ] Review all 5 steps thoroughly
- [ ] Understand acceptance criteria for each step
- [ ] Prepare environment for testing
- [ ] Ensure access to all required resources

### **Execution Standards:**
- [ ] Complete each step sequentially
- [ ] Test acceptance criteria before proceeding
- [ ] Update documentation after each step
- [ ] Use conventional commit messages
- [ ] Maintain code quality standards

### **Quality Assurance Requirements:**
- [ ] Mobile responsiveness on all new components
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Performance optimization (Core Web Vitals)
- [ ] Cross-browser compatibility testing
- [ ] Reduced-motion preference respect

### **Documentation Standards:**
- [ ] Update `docs/PROGRESS.md` after each step
- [ ] Add detailed entries to `docs/CHANGELOG.md`
- [ ] Document technical decisions in `docs/DECISIONS.md`
- [ ] Update styleguide with new components
- [ ] Maintain feature documentation

---

## 🎯 **Success Metrics**

### **Technical Success:**
- All builds complete without errors
- TypeScript compilation successful
- No accessibility regressions
- Performance budgets maintained

### **Design Success:**
- Aurora palette implemented correctly
- Support-first language throughout
- Modern gradient usage (no flat neon)
- Crisis crimson used only for emergencies

### **Functional Success:**
- Environment variables working
- CTAs linking to correct destinations
- Analytics events firing properly
- Mobile experience optimized

---

## 📸 **Documentation Requirements**

After completing Steps 0-5, provide:
- [ ] Screenshot of homepage with Aurora gradients
- [ ] Screenshot of `/support` page functionality
- [ ] Confirmation of mobile responsiveness
- [ ] Verification of reduced-motion compliance
- [ ] Analytics event testing results

---

**Ready to Execute**: All steps documented with clear acceptance criteria and detailed checklists. Begin with Step 0 and proceed sequentially through Step 4.