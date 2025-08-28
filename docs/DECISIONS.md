# Technical Decisions - Aurora Hope Implementation

**Project**: Central Texas Resources - Aurora Design System  
**Decision Log Started**: 2025-08-28  

This document tracks all major technical decisions made during the Aurora Hope implementation, including context, alternatives considered, and rationale.

---

## Design System Decisions

### **Decision 1: Aurora Hope Color Palette** 
**Date**: 2025-08-28  
**Status**: Approved  

**Context**: Need modern, hope-centered color system to replace existing basic styling

**Decision**: Implement 7-color Aurora Hope palette with strict usage guidelines
- Aurora Indigo (trust, primary branding)
- Azure Glow (interactive states)  
- Emerald Lift (support/positive actions)
- Fuchsia Pulse (education highlights)
- Crisis Crimson (emergency content ONLY)
- Canvas Tint (backgrounds)

**Alternatives Considered**:
- Keep existing basic blue/gray system
- Use standard Material Design colors
- Create custom brand colors without psychological mapping

**Rationale**: 
- Psychology-based color choices support user emotional state during crisis
- Clear usage guidelines prevent color misuse (especially emergency red)
- Modern palette improves visual appeal and brand consistency

**Impact**: Requires Tailwind config update, component refactoring, documentation

---

### **Decision 2: Motion Framework Selection**
**Date**: 2025-08-28  
**Status**: Approved  

**Context**: Need smooth, purposeful animations while maintaining accessibility

**Decision**: Lenis for smooth scrolling + Framer Motion for component animations

**Alternatives Considered**:
- GSAP (more powerful but heavier)
- CSS-only animations (limited functionality)
- React Spring (good but different API paradigm)
- No motion enhancement (missed UX opportunity)

**Rationale**:
- Lenis provides excellent smooth scrolling with minimal overhead
- Framer Motion integrates perfectly with React/Next.js
- Both libraries respect `prefers-reduced-motion`
- Combined bundle size reasonable for benefit provided

**Impact**: Requires new dependencies, motion wrapper components

---

### **Decision 3: Language Strategy - "Support-First"**
**Date**: 2025-08-28  
**Status**: Approved  

**Context**: Traditional donation language can feel transactional; community resource platform needs community-centered language

**Decision**: Implement "Support-first" language throughout
- Primary: "Support this project", "Keep resources updated"
- Secondary: Traditional donation language where needed
- Focus: Community investment rather than charity

**Alternatives Considered**:
- Keep traditional donation language
- Mix donation/support equally
- Completely remove money requests

**Rationale**:
- Support language emphasizes ongoing community investment
- Less transactional feeling builds stronger connection
- Still allows traditional donation options for familiar users
- Aligns with community-centered mission

**Impact**: Requires copy updates across multiple pages, new messaging framework

---

## Technical Architecture Decisions

### **Decision 4: GHL API v2 Integration**
**Date**: 2025-08-28  
**Status**: Approved  

**Context**: Need modern, reliable form submission system for community resource submissions

**Decision**: Implement GoHighLevel API v2 with PIT + Location ID architecture

**Alternatives Considered**:
- GHL API v1 (deprecated)
- Direct form submissions to email
- Third-party form services (Typeform, etc.)
- Custom backend solution

**Rationale**:
- API v2 is current, supported version with better reliability
- PIT + Location ID provides better data organization
- Integrates with existing CRM workflows
- No additional service dependencies or costs

**Impact**: Requires API integration, form validation, error handling

---

### **Decision 5: Documentation Hygiene Standard**
**Date**: 2025-08-28  
**Status**: Approved  

**Context**: Complex implementation needs clear documentation and decision tracking

**Decision**: Mandatory documentation updates after every implementation step
- CHANGELOG.md for all changes
- PROGRESS.md for status tracking
- DECISIONS.md for technical choices (this file)
- STYLEGUIDE.md for design system usage

**Alternatives Considered**:
- Update documentation only at milestones
- Use inline code comments only
- External documentation system

**Rationale**:
- Prevents documentation drift
- Creates clear implementation history
- Supports future maintenance and updates
- Establishes professional development standards

**Impact**: Additional time per step, but prevents future confusion

---

## Implementation Decisions - Aurora Phase

### **Decision 6: Domain Selection - helpnowatx.org**
**Date**: 2025-08-28  
**Status**: Approved  

**Context**: Need production-ready domain for Aurora implementation

**Decision**: Use helpnowatx.org as primary domain
- Short, memorable, action-oriented
- Clear connection to emergency resources
- ATX identifies Austin/Central Texas region

**Impact**: All environment variables and configurations use this domain

---

### **Decision 7: Support-First Language Implementation**  
**Date**: 2025-08-28
**Status**: Approved

**Decision**: Replace all "Donate" language with "Support" throughout
- Primary CTAs: "Help keep this project alive", "Tip your dev", "Fuel the updates"
- Navigation: /support (not /donate)
- Community-focused messaging over transactional

**Impact**: Complete copy rewrite, URL restructuring, cultural shift

---

### **Decision 8: Aurora Palette Priority Usage**
**Date**: 2025-08-28
**Status**: Approved

**Decision**: Strict color hierarchy with psychological mapping
- Aurora Indigo: Primary brand, trust elements
- Azure Glow: Interactive states only
- Emerald Lift: Support/positive actions
- Fuchsia Pulse: Education highlights
- Crisis Crimson: **EMERGENCY ONLY** - never for general errors

**Impact**: Design system requires discipline, prevents color misuse

---

### **Decision 9: Lenis + ScrollStack Motion Framework**
**Date**: 2025-08-28
**Status**: Approved  

**Decision**: Implement Lenis for smooth scrolling + custom ScrollStack for guided paths
- Performance-optimized ScrollStack with existing tweaks
- Reduced-motion compliance mandatory
- 3-card guided paths: Food today, Shelter tonight, Recovery now

**Impact**: Enhanced UX, requires motion testing, accessibility validation

---

### **Decision 10: Hidden Admin Reports Architecture** 
**Date**: 2025-08-28
**Status**: Approved

**Decision**: /admin/reports page with simple password protection
- Hidden from navigation and sitemaps
- GHL submission analytics and insights
- Lightweight auth (no complex system needed)

**Impact**: Admin functionality without overcomplication

## Pending Decisions

### **Pending 1: Admin Authentication Method**
**Status**: Under consideration  
**Timeline**: Decide during Phase 2  

**Context**: Hidden admin reports page needs security without overcomplexity

**Options**:
1. Simple password protection
2. NextAuth.js integration
3. API key-based access
4. IP whitelist approach

**Considerations**: Security level needed, maintenance overhead, user experience

---

### **Pending 2: Mobile Motion Optimization**
**Status**: Under consideration  
**Timeline**: Decide during Phase 1 testing  

**Context**: Motion effects may impact performance on older mobile devices

**Options**:
1. Reduce motion complexity on mobile
2. Use progressive enhancement
3. Implement performance budgets
4. Device detection for motion levels

**Considerations**: Performance vs. experience, testing resources required

---

## Decision Review Process

**Weekly Review**: Every Friday, review pending decisions and implementation impact  
**Milestone Review**: After each phase, assess decision effectiveness  
**Final Review**: Before launch, validate all decisions still align with goals

**Decision Criteria**:
- User experience impact
- Technical complexity
- Maintenance overhead  
- Performance implications
- Accessibility compliance
- Budget/timeline constraints