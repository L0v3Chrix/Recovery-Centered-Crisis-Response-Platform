# Aurora Hope Design System Styleguide

**Version**: 1.0  
**Last Updated**: 2025-08-28  
**Status**: Framework Defined, Implementation Pending  

This styleguide documents the Aurora Hope Design System for Central Texas Resources, providing clear guidelines for consistent implementation across all components and pages.

---

## 🎨 **Aurora Hope Color Palette**

### **Primary Colors**

#### Aurora Indigo (Trust & Primary Brand)
```css
--aurora-indigo-700: #1B2A5B; /* Primary brand, navigation */
--aurora-indigo-500: #2B50E2; /* Action buttons, CTAs */
```
**Usage**: Primary branding, navigation elements, trust-building sections, main CTAs
**Avoid**: Large backgrounds, emergency content

#### Azure Glow (Interaction & Focus)
```css
--azure-glow-400: #3EC6FF; /* Focus states, hover effects */
```
**Usage**: Focus indicators, hover states, interactive feedback, progress indicators
**Avoid**: Primary buttons, large text blocks

#### Emerald Lift (Support & Positive Actions)
```css
--emerald-lift-500: #14B8A6; /* Support buttons, positive feedback */
```
**Usage**: Support actions, success states, positive feedback, growth indicators
**Avoid**: Warning messages, neutral content

#### Fuchsia Pulse (Education & Highlights)
```css
--fuchsia-pulse-500: #A855F7; /* Educational content, highlights */
```
**Usage**: Educational highlights, creative elements, feature callouts, learning sections
**Avoid**: Emergency content, primary navigation

### **Critical Emergency Color**

#### Crisis Crimson (Emergency Only)
```css
--crisis-crimson-600: #E11D48; /* EMERGENCY CONTENT ONLY */
```
**Usage**: **ONLY** for crisis hotlines, emergency numbers, urgent safety information
**Critical Rule**: Never use for general errors, warnings, or non-emergency content

### **Surface & Background**

#### Canvas Tint
```css
--canvas-tint: #F6F8FF; /* Subtle backgrounds, cards */
```
**Usage**: Page backgrounds, card surfaces, subtle section dividers
**Pairs with**: All Aurora colors for contrast

---

## 🌈 **Gradient System**

### **Radial Gradients** (Hero sections, depth)
```css
.aurora-radial-primary {
  background: radial-gradient(ellipse at center, #2B50E2 0%, #1B2A5B 100%);
}

.aurora-radial-support {
  background: radial-gradient(ellipse at center, #14B8A6 0%, #0F766E 100%);
}
```

### **Linear Gradients** (Buttons, progress)
```css
.aurora-linear-primary {
  background: linear-gradient(135deg, #2B50E2 0%, #3EC6FF 100%);
}

.aurora-linear-support {
  background: linear-gradient(135deg, #14B8A6 0%, #0EA5E9 100%);
}
```

### **Subtle Overlays** (Content blocks)
```css
.aurora-overlay-light {
  background: linear-gradient(180deg, rgba(246, 248, 255, 0) 0%, rgba(246, 248, 255, 0.8) 100%);
}
```

---

## 🎭 **Typography Scale**

### **Headings**
```css
.aurora-heading-1 { @apply text-4xl md:text-5xl font-bold text-aurora-indigo-700; }
.aurora-heading-2 { @apply text-3xl md:text-4xl font-bold text-aurora-indigo-700; }
.aurora-heading-3 { @apply text-2xl md:text-3xl font-semibold text-aurora-indigo-500; }
.aurora-heading-4 { @apply text-xl font-semibold text-aurora-indigo-500; }
```

### **Body Text**
```css
.aurora-body-large { @apply text-lg text-gray-700 leading-relaxed; }
.aurora-body-base { @apply text-base text-gray-700 leading-normal; }
.aurora-body-small { @apply text-sm text-gray-600; }
```

### **Special Text**
```css
.aurora-text-support { @apply text-emerald-lift-500 font-semibold; }
.aurora-text-highlight { @apply text-fuchsia-pulse-500 font-medium; }
.aurora-text-emergency { @apply text-crisis-crimson-600 font-bold; }
```

---

## 🔘 **Component Patterns**

### **Button System**

#### Primary Action Button
```css
.btn-aurora-primary {
  @apply bg-aurora-indigo-500 hover:bg-aurora-indigo-700 
         text-white px-6 py-3 rounded-lg font-semibold
         transition-all duration-200 hover:shadow-lg
         focus:ring-2 focus:ring-azure-glow-400;
}
```

#### Support Action Button  
```css
.btn-aurora-support {
  @apply bg-emerald-lift-500 hover:bg-emerald-600
         text-white px-6 py-3 rounded-lg font-semibold
         transition-all duration-200 hover:shadow-lg
         focus:ring-2 focus:ring-emerald-300;
}
```

#### Emergency Button (Use Sparingly)
```css
.btn-aurora-emergency {
  @apply bg-crisis-crimson-600 hover:bg-crisis-crimson-700
         text-white px-6 py-3 rounded-lg font-bold
         transition-all duration-200 hover:shadow-lg
         animate-pulse focus:ring-2 focus:ring-crisis-crimson-300;
}
```

### **Card System**

#### Standard Card
```css
.card-aurora-base {
  @apply bg-white rounded-xl p-6 shadow-sm border border-gray-100
         hover:shadow-md transition-shadow duration-200;
}
```

#### Support Card (with gradient)
```css
.card-aurora-support {
  @apply bg-gradient-to-br from-emerald-50 to-teal-50
         rounded-xl p-6 border border-emerald-200
         hover:shadow-lg transition-all duration-300;
}
```

#### Emergency Card
```css
.card-aurora-emergency {
  @apply bg-gradient-to-br from-red-50 to-rose-50
         rounded-xl p-6 border-l-4 border-l-crisis-crimson-600
         shadow-md;
}
```

---

## 🎬 **Motion Guidelines**

### **Animation Principles**
- **Purposeful**: Every animation serves user understanding
- **Respectful**: Always honor `prefers-reduced-motion`
- **Subtle**: Enhance, don't distract from content
- **Consistent**: Use established timing and easing

### **Timing Scale**
```css
--aurora-duration-fast: 150ms;    /* Hover states, micro-interactions */
--aurora-duration-base: 300ms;    /* Standard transitions */  
--aurora-duration-slow: 500ms;    /* Page transitions, large movements */
--aurora-duration-lazy: 800ms;    /* Scroll-triggered animations */
```

### **Easing Functions**
```css
--aurora-ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* Smooth deceleration */
--aurora-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful bounce */
--aurora-ease-linear: linear;                            /* Progress indicators */
```

### **Reduced Motion Compliance**
```css
@media (prefers-reduced-motion: reduce) {
  .aurora-motion {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 **Responsive Guidelines**

### **Breakpoint System**
```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### **Mobile Considerations**
- Touch targets minimum 44px
- Reduce motion complexity on mobile
- Prioritize content hierarchy
- Ensure crisis information remains prominent

---

## ✅ **Accessibility Standards**

### **Color Contrast Requirements**
- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text**: 3:1 minimum contrast ratio  
- **Interactive elements**: 3:1 for non-text elements
- **Emergency content**: Must meet highest contrast standards

### **Focus Management**
```css
.aurora-focus {
  @apply focus:outline-none focus:ring-2 focus:ring-azure-glow-400 
         focus:ring-offset-2 focus:ring-offset-white;
}
```

### **Screen Reader Support**
- All interactive elements have proper ARIA labels
- Color never conveys information alone
- Emergency content includes text alternatives

---

## 🚫 **Usage Don'ts**

### **Color Don'ts**
- ❌ Never use Crisis Crimson for general errors or warnings
- ❌ Don't use Aurora Indigo for emergency content  
- ❌ Avoid high-contrast combinations that create vibration
- ❌ Don't mix more than 3 Aurora colors in single component

### **Motion Don'ts**
- ❌ No animations on critical emergency information
- ❌ Don't animate more than 3 elements simultaneously
- ❌ Avoid motion that could trigger vestibular disorders
- ❌ No infinite animations without user control

### **Typography Don'ts**
- ❌ Don't use body text smaller than 16px on mobile
- ❌ Avoid all-caps text for more than 3 words
- ❌ Don't stack more than 3 font weights in single view

---

## 📋 **Implementation Checklist**

### **Before Using Aurora Components**
- [ ] Confirm color choice aligns with content purpose
- [ ] Verify contrast ratios meet accessibility standards
- [ ] Test with `prefers-reduced-motion` setting
- [ ] Validate mobile touch target sizes
- [ ] Ensure emergency content uses Crisis Crimson appropriately

### **Design Review Criteria**
- [ ] Colors used according to psychological purpose
- [ ] Motion enhances rather than distracts
- [ ] Emergency content is immediately recognizable  
- [ ] Support-first language implemented
- [ ] Mobile experience prioritized

---

**Next Update**: After Phase 1 implementation with real component examples and usage screenshots.