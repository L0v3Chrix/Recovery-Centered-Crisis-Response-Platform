# Security Configuration for HelpNow ATX

This document outlines the security measures implemented to ensure HTTPS-only content and prevent mixed content warnings.

## ✅ Application Security Checklist

### 1. Code-Level HTTPS Enforcement
- [x] **No HTTP URLs in codebase** - All resource references use HTTPS
- [x] **Image security** - `next.config.js` restricts remote images to HTTPS-only protocol
- [x] **Service Worker HTTPS enforcement** - Custom worker blocks non-HTTPS requests
- [x] **Security headers middleware** - CSP with `upgrade-insecure-requests` directive
- [x] **HSTS ready** - Strict-Transport-Security header configured (31536000 seconds)

### 2. Security Headers (via middleware.ts)
```
Content-Security-Policy: upgrade-insecure-requests
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=31536000; includeSubDomains (production only)
```

### 3. Next.js Configuration
- **Images**: Only HTTPS remote patterns allowed
- **PWA**: Custom service worker with HTTPS enforcement
- **Headers**: Security headers applied to all routes

## 📋 Cloudflare Configuration Checklist

Complete these steps in Cloudflare dashboard:

### SSL/TLS Settings
- [ ] **SSL/TLS encryption mode**: Set to "Full (strict)"
- [ ] **Always Use HTTPS**: Enable
- [ ] **Automatic HTTPS Rewrites**: Enable
- [ ] **Minimum TLS Version**: Set to 1.2 or higher

### Security Settings
- [ ] **HSTS**: Enable with max-age=31536000; includeSubDomains; preload
- [ ] **TLS 1.3**: Enable
- [ ] **Opportunistic Encryption**: Enable
- [ ] **Onion Routing**: Enable (optional)

### Page Rules (if needed)
- [ ] Create rule: `*helpnowatx.org/*` → Always Use HTTPS

### Transform Rules (optional but recommended)
- [ ] Add HTTP Response Header Modification:
  - Set `Content-Security-Policy: upgrade-insecure-requests`
  - Set `X-Content-Type-Options: nosniff`

## 🧪 Verification Steps

### Local Testing
```bash
# Build and start production server
npm run build
npm start

# Open Chrome DevTools
# 1. Go to Security panel
# 2. Should show "This page is secure (valid HTTPS)"
# 3. Console should have NO Mixed Content warnings
```

### Production Testing
1. Deploy to Vercel
2. Wait for Cloudflare cache to update (or purge cache)
3. Open Chrome DevTools → Security panel
4. Verify:
   - ✅ Green lock icon
   - ✅ "This page is secure (valid HTTPS)"
   - ✅ No mixed content warnings in console
   - ✅ All resources loaded over HTTPS

### Security Headers Test
Visit: https://securityheaders.com/?q=helpnowatx.org
Expected grade: A or A+

## 🔒 Mixed Content Prevention

The application prevents mixed content through multiple layers:

1. **Build time**: No HTTP URLs in source code
2. **Configuration**: Next.js blocks HTTP images
3. **Runtime**: Service worker blocks HTTP requests
4. **Headers**: CSP upgrades insecure requests
5. **CDN**: Cloudflare forces HTTPS

## 🚨 Troubleshooting

### If you see mixed content warnings:
1. Check Console for specific HTTP resources
2. Search codebase: `grep -r "http://" --exclude-dir=node_modules`
3. Check external scripts/embeds
4. Verify Cloudflare SSL mode is "Full (strict)"
5. Clear browser cache and Cloudflare cache

### Common issues:
- **"Not Secure" in browser**: Check Cloudflare SSL settings
- **Mixed content blocked**: Find HTTP resource in Console
- **Images not loading**: Ensure they use HTTPS URLs
- **PWA not working**: Service worker requires HTTPS

## 📚 Resources

- [MDN: Mixed Content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
- [Cloudflare SSL/TLS](https://developers.cloudflare.com/ssl/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)