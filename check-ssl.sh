#!/bin/bash

echo "🔍 Checking SSL Status for www.helpnowatx.org..."
echo "================================================"

# Check for Cloudflare headers
echo -n "1. Cloudflare Proxy: "
if curl -sI https://www.helpnowatx.org | grep -qi "cf-ray\|cloudflare"; then
    echo "✅ WORKING (Traffic going through Cloudflare)"
else
    echo "❌ NOT WORKING (Bypassing Cloudflare - Fix DNS settings!)"
fi

# Check Server header
echo -n "2. Server Header: "
SERVER=$(curl -sI https://www.helpnowatx.org | grep -i "server:" | cut -d' ' -f2-)
echo "$SERVER"

# Check SSL Certificate Issuer
echo -n "3. SSL Certificate: "
ISSUER=$(echo | openssl s_client -connect www.helpnowatx.org:443 -servername www.helpnowatx.org 2>/dev/null | openssl x509 -noout -issuer 2>/dev/null | cut -d'=' -f2-)
if [[ $ISSUER == *"Cloudflare"* ]] || [[ $ISSUER == *"Google Trust Services"* ]]; then
    echo "✅ Cloudflare SSL (Good!)"
elif [[ $ISSUER == *"Let's Encrypt"* ]]; then
    echo "⚠️  Let's Encrypt (Not proxied through Cloudflare)"
else
    echo "$ISSUER"
fi

# Check HSTS header
echo -n "4. HSTS Security: "
if curl -sI https://www.helpnowatx.org | grep -qi "strict-transport-security"; then
    echo "✅ Enabled"
else
    echo "❌ Missing"
fi

# Check if site loads over HTTPS
echo -n "5. HTTPS Status: "
if curl -sI https://www.helpnowatx.org | grep -q "HTTP/2 200"; then
    echo "✅ Site loads over HTTPS"
else
    echo "❌ Issue loading site"
fi

echo ""
echo "================================================"
echo "📝 REQUIRED FIXES IN CLOUDFLARE:"
echo "1. Set DNS records to 🟠 Proxied (orange cloud)"
echo "2. Set SSL/TLS mode to 'Full (strict)'"
echo "3. Enable 'Always Use HTTPS'"
echo ""
echo "Run this script again after making changes!"