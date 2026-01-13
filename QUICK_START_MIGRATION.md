# 🚀 Quick Start: Complete Your Domain Migration

Your store is **live at https://epicdreamsentertainment.com** but needs 4 quick steps to complete the migration.

## ⚡ 4 Steps (15 minutes total)

### Step 1: Set Primary Domain (2 min)
**Go to:** https://vercel.com → Your Project → Settings → Domains

1. Find `epicdreamsentertainment.com` in the list
2. Click **"..."** → **"Set as Primary"**
3. Done!

---

### Step 2: Update Environment Variable (2 min)
**Go to:** https://vercel.com → Your Project → Settings → Environment Variables

1. Find: `NEXT_PUBLIC_APP_URL`
2. Click **Edit**
3. Change to: `https://epicdreamsentertainment.com`
4. Apply to: Production + Preview + Development
5. Click **Save**

---

### Step 3: Redeploy (5 min)
**Go to:** https://vercel.com → Your Project → Deployments

1. Click latest deployment → **"..."** → **"Redeploy"**
2. Uncheck "Use existing Build Cache"
3. Click **Redeploy**
4. Wait for completion

---

### Step 4: Update Stripe Webhook (2 min)
**Go to:** https://dashboard.stripe.com/webhooks

1. Click your existing webhook
2. Click **"..."** → **"Update details"**
3. Change URL to: `https://epicdreamsentertainment.com/api/webhooks/stripe`
4. Click **Update endpoint**

---

## ✅ Test Your Store (5 min)

1. Visit: https://epicdreamsentertainment.com
2. Add item to cart
3. Checkout with test card: `4242 4242 4242 4242`
4. Verify order appears in admin: https://epicdreamsentertainment.com/admin

---

## 📋 Done!

Your store is now fully migrated to **Epic Dreams Entertainment** domain! 🎉

For detailed instructions, see: [MIGRATION_CHECKLIST.md](./MIGRATION_CHECKLIST.md)
