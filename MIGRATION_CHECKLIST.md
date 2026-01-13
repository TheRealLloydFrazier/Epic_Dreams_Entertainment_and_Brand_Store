# Store Domain Migration Checklist
**From:** `epicdreamsassetmanagement.com` → **To:** `epicdreamsentertainment.com`

## ✅ Completed Steps

- [x] Code references updated to new domain
- [x] GitHub workflow updated
- [x] Documentation updated (DOMAINS.md, VERCEL_DEPLOYMENT.md)
- [x] Domain added to Vercel project
- [x] DNS records configured (A record → 216.198.79.1)
- [x] Domain verified and site is live
- [x] Changes committed and pushed to branch `claude/migrate-store-domain-OARB4`

## 🔧 Manual Steps Required

### 1. Set Primary Domain in Vercel ⏳

**Location:** Vercel Dashboard → Settings → Domains

**Instructions:**
1. Go to: https://vercel.com/epic-dreams-team/epic-dreams-asset-management-and-holding-company-incorporated/settings/domains
2. Find `epicdreamsentertainment.com` in the domains list
3. Click the three dots **"..."** menu next to the domain
4. Select **"Set as Primary"** or **"Mark as Primary"**
5. Confirm the change

**Why:** This ensures all traffic redirects to the new domain and sets it as the default.

---

### 2. Update Environment Variables ⏳

**Location:** Vercel Dashboard → Settings → Environment Variables

**Instructions:**
1. Go to: https://vercel.com/epic-dreams-team/epic-dreams-asset-management-and-holding-company-incorporated/settings/environment-variables
2. Find the variable: `NEXT_PUBLIC_APP_URL`
3. Click **Edit** (pencil icon)
4. Change value from:
   ```
   https://epicdreamsassetmanagement.com
   ```
   to:
   ```
   https://epicdreamsentertainment.com
   ```
5. Make sure it's applied to:
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**
6. Click **Save**

**Why:** This updates:
- SEO metadata and Open Graph tags
- Stripe Checkout success/cancel redirect URLs
- Sitemap generation
- Any absolute URLs in the application

---

### 3. Redeploy Application ⏳

**Location:** Vercel Dashboard → Deployments

**Instructions:**
1. Go to: https://vercel.com/epic-dreams-team/epic-dreams-asset-management-and-holding-company-incorporated/deployments
2. Find the most recent deployment
3. Click the three dots **"..."** next to it
4. Select **"Redeploy"**
5. Keep **"Use existing Build Cache"** unchecked (to ensure clean build with new env vars)
6. Click **"Redeploy"**
7. Wait for deployment to complete (~2-3 minutes)

**Why:** The environment variable change needs a redeploy to take effect.

---

### 4. Update Stripe Webhook URL ⏳

**Location:** Stripe Dashboard → Developers → Webhooks

**Instructions:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Find your existing webhook endpoint
3. Click on it to view details
4. Click **"..."** menu → **"Update details"**
5. Change **Endpoint URL** from:
   ```
   https://epic-dreams-asset-management-and-ho.vercel.app/api/webhooks/stripe
   ```
   or:
   ```
   https://epicdreamsassetmanagement.com/api/webhooks/stripe
   ```
   to:
   ```
   https://epicdreamsentertainment.com/api/webhooks/stripe
   ```
6. Ensure these events are still selected:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
7. Click **"Update endpoint"**
8. Copy the **Signing secret** (starts with `whsec_`) if it changed
9. If signing secret changed, update `STRIPE_WEBHOOK_SECRET` in Vercel (Step 2)

**Why:** Ensures Stripe can send payment notifications to your new domain.

---

### 5. Test Everything ⏳

**After completing steps 1-4, verify:**

#### Store Functionality
- [ ] Visit https://epicdreamsentertainment.com - homepage loads
- [ ] Navigate to /store - products display correctly
- [ ] Browse different collections (Tees, Hoodies, Signed Items)
- [ ] View individual product pages
- [ ] Add items to cart
- [ ] View cart and adjust quantities
- [ ] Click "Checkout"

#### Stripe Checkout
- [ ] Checkout opens Stripe hosted page
- [ ] Test with card: `4242 4242 4242 4242` (any future date, any CVC)
- [ ] Payment succeeds and redirects to success page
- [ ] Order appears in admin dashboard

#### Stripe Webhooks
- [ ] Go to Stripe Dashboard → Developers → Webhooks
- [ ] Click on your webhook
- [ ] Check **"Recent deliveries"** tab
- [ ] Verify events are being received successfully (after test checkout)
- [ ] All recent events should show ✅ success (200 status)

#### Admin Panel
- [ ] Go to https://epicdreamsentertainment.com/admin
- [ ] Login with credentials: `admin@epicdreamsent.com` / `ChangeMe123!`
- [ ] Verify dashboard loads
- [ ] Check orders list
- [ ] View test order from checkout
- [ ] Check all admin sections (Products, Artists, Orders, Settings)

#### SEO & Metadata
- [ ] View page source on homepage (right-click → View Page Source)
- [ ] Verify `<meta property="og:url"` contains `epicdreamsentertainment.com`
- [ ] Check sitemap: https://epicdreamsentertainment.com/sitemap.xml
- [ ] Verify all URLs in sitemap use new domain

#### Email Notifications (if SMTP configured)
- [ ] Complete a test order
- [ ] Check if order confirmation email arrives
- [ ] Verify email contains correct domain links

---

## 📊 Quick Verification Commands

If you have access to the codebase locally:

```bash
# Check DNS propagation
nslookup epicdreamsentertainment.com

# Check if domain resolves to Vercel
curl -I https://epicdreamsentertainment.com

# Test Stripe webhook endpoint
curl https://epicdreamsentertainment.com/api/webhooks/stripe
# Should return: Method not allowed (POST expected)
```

---

## 🔄 Optional: Setup 301 Redirects

To redirect traffic from old domain to new domain:

**Option A: Vercel Redirects (Recommended)**

The primary domain setting in Vercel (Step 1) automatically handles this.

**Option B: DNS-level Redirect**

If you want to keep `epicdreamsassetmanagement.com` active for a corporate site:
1. Don't remove it from Vercel domains
2. It will automatically redirect to the primary domain

---

## 🎯 Migration Timeline

| Step | Estimated Time | Complexity |
|------|----------------|------------|
| 1. Set Primary Domain | 1 minute | Easy |
| 2. Update Environment Variable | 2 minutes | Easy |
| 3. Redeploy | 3-5 minutes | Easy |
| 4. Update Stripe Webhook | 2 minutes | Easy |
| 5. Testing | 10-15 minutes | Medium |

**Total estimated time:** ~20-25 minutes

---

## ❓ Troubleshooting

### Issue: Site still shows old domain in metadata
**Solution:** Make sure you completed Step 2 (environment variable update) and Step 3 (redeploy).

### Issue: Stripe webhooks failing
**Solution:**
1. Check webhook URL is correct in Stripe Dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` matches the signing secret in Stripe
3. Check webhook logs in Stripe Dashboard for specific error messages

### Issue: Checkout redirects to wrong domain
**Solution:** Redeploy after updating `NEXT_PUBLIC_APP_URL` environment variable.

### Issue: Old domain still shows in some places
**Solution:** Clear your browser cache or try in incognito mode.

---

## 📞 Support Resources

- **Vercel Documentation:** https://vercel.com/docs/projects/domains
- **Stripe Webhooks Guide:** https://stripe.com/docs/webhooks
- **DNS Propagation Checker:** https://dnschecker.org/#A/epicdreamsentertainment.com
- **Vercel Community:** https://github.com/vercel/vercel/discussions

---

## ✅ Final Checklist

Once all steps are complete:

- [ ] Old domain redirects to new domain
- [ ] All metadata uses new domain
- [ ] Stripe checkout works end-to-end
- [ ] Webhooks are being received
- [ ] Admin panel accessible
- [ ] No console errors on frontend
- [ ] Test order completes successfully

---

**Migration prepared by:** Claude Code
**Date:** January 13, 2026
**Branch:** `claude/migrate-store-domain-OARB4`
**Commit:** c4a3197
