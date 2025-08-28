# Fix Vercel Build Failures - Execution Plan

**Created**: 2025-08-28  
**Branch**: `fix/vercel-build`  
**Priority**: URGENT - Build is currently failing in production

## Current Issues (from Vercel logs)
1. `react/no-unescaped-entities` errors in multiple files
2. `react-hooks/exhaustive-deps` warning in CategoryResources.tsx
3. `@next/next/no-img-element` warnings in page files

## Execution Steps

### Step 0: Create Branch & Temporarily Unblock Deploy
- [ ] Create branch `fix/vercel-build`
- [ ] Edit `next.config.js` to add `eslint.ignoreDuringBuilds: true`
- [ ] Commit: `chore: temporarily ignore ESLint during builds to unblock deploy`
- [ ] Push to trigger Vercel deploy

### Step 1: Fix react/no-unescaped-entities
Files to fix:
- [ ] `app/partners/page.tsx`: Lines 205, 224, 234, 253
- [ ] `components/PrintResultsPage.tsx`: Line 122
- [ ] `components/ResultsPage.tsx`: Line 153

Actions:
- Replace `'` with `&apos;` or `'` (curly quote)
- Replace `"` with `&quot;` or `"` `"` (curly quotes)
- Test with `npm run lint`
- Commit: `fix(lint): escape unescaped entities in JSX text`

### Step 2: Fix @next/next/no-img-element
Files to fix:
- [ ] `app/page.tsx`: Line 66
- [ ] `app/partners/page.tsx`: Line 125

Actions:
- Import `Image from 'next/image'`
- Replace `<img>` tags with `<Image>` components
- Add width, height, and alt props
- Test with `npm run lint`
- Commit: `refactor(image): replace <img> with next/image`

### Step 3: Fix react-hooks/exhaustive-deps
File to fix:
- [ ] `components/CategoryResources.tsx`

Actions:
- Wrap `fetchCategoryInfo` in `useCallback`
- Wrap `fetchResources` in `useCallback`
- Add both to useEffect dependencies
- Test with `npm run lint`
- Commit: `fix(hooks): stabilize callbacks and satisfy exhaustive-deps`

### Step 4: Add Prebuild Checks
- [ ] Update `package.json` scripts to add prebuild checks
- [ ] Test locally with full build
- [ ] Commit: `chore: add prebuild lint/typecheck`

### Step 5: Re-enable ESLint
- [ ] Remove `eslint.ignoreDuringBuilds` from `next.config.js`
- [ ] Run full build locally to verify
- [ ] Commit: `chore: re-enable ESLint in CI build`

### Step 6: Final Verification
- [ ] Run `npm run lint` - should pass with 0 errors
- [ ] Run `npm run typecheck` - should pass
- [ ] Run `npm run build` - should succeed
- [ ] Push to trigger Vercel deployment

## Commands Sequence

```bash
# Step 0: Branch and temporary fix
git checkout -b fix/vercel-build
# Edit next.config.js
git add next.config.js
git commit -m "chore: temporarily ignore ESLint during builds to unblock deploy"
git push origin fix/vercel-build

# Step 1-3: Fix lint issues
npm run lint  # Check current errors
# Fix each file
npm run lint  # Verify fixes

# Step 4: Add prebuild
# Edit package.json
npm run build  # Test full build

# Step 5: Re-enable ESLint
# Edit next.config.js
npm run build  # Final verification

# Push all fixes
git push origin fix/vercel-build
```

## Success Criteria
- ✅ Zero ESLint errors
- ✅ Zero TypeScript errors
- ✅ Build succeeds locally
- ✅ Vercel deployment succeeds
- ✅ ESLint is active in CI

## Rollback Plan
If issues persist:
1. Keep `eslint.ignoreDuringBuilds: true` temporarily
2. Fix issues incrementally
3. Deploy with working build
4. Re-enable ESLint once all issues resolved