#!/bin/bash

# Migration Verification Script
# This script verifies that the domain migration is complete

DOMAIN="epicdreamsentertainment.com"
OLD_DOMAIN="epicdreamsassetmanagement.com"

echo "🔍 Epic Dreams Store Migration Verification"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check DNS resolution
echo "1️⃣  Checking DNS resolution..."
if nslookup $DOMAIN > /dev/null 2>&1; then
    echo -e "${GREEN}✅ DNS resolves correctly${NC}"
else
    echo -e "${RED}❌ DNS not resolving${NC}"
fi
echo ""

# Check if site is accessible
echo "2️⃣  Checking if site is accessible..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Site is accessible (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ Site returned HTTP $HTTP_CODE${NC}"
fi
echo ""

# Check if correct domain is in metadata
echo "3️⃣  Checking metadata for correct domain..."
if curl -s https://$DOMAIN | grep -q "epicdreamsentertainment.com"; then
    echo -e "${GREEN}✅ Metadata contains correct domain${NC}"
else
    echo -e "${YELLOW}⚠️  Metadata may still reference old domain - redeploy needed${NC}"
fi
echo ""

# Check Stripe webhook endpoint
echo "4️⃣  Checking Stripe webhook endpoint..."
WEBHOOK_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN/api/webhooks/stripe)
if [ "$WEBHOOK_CODE" = "405" ] || [ "$WEBHOOK_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Webhook endpoint responding (HTTP $WEBHOOK_CODE)${NC}"
else
    echo -e "${RED}❌ Webhook endpoint issue (HTTP $WEBHOOK_CODE)${NC}"
fi
echo ""

# Check sitemap
echo "5️⃣  Checking sitemap..."
if curl -s https://$DOMAIN/sitemap.xml | grep -q "epicdreamsentertainment.com"; then
    echo -e "${GREEN}✅ Sitemap uses correct domain${NC}"
else
    echo -e "${YELLOW}⚠️  Sitemap may reference old domain - redeploy needed${NC}"
fi
echo ""

# Check SSL certificate
echo "6️⃣  Checking SSL certificate..."
if curl -s https://$DOMAIN > /dev/null 2>&1; then
    echo -e "${GREEN}✅ SSL certificate valid${NC}"
else
    echo -e "${RED}❌ SSL certificate issue${NC}"
fi
echo ""

# Summary
echo "=========================================="
echo "📋 SUMMARY"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Visit: https://$DOMAIN"
echo "2. Test checkout with card: 4242 4242 4242 4242"
echo "3. Verify order in admin: https://$DOMAIN/admin"
echo "4. Check Stripe webhook logs: https://dashboard.stripe.com/webhooks"
echo ""
echo "For detailed instructions: See MIGRATION_CHECKLIST.md"
echo ""
