# Quick Start: Deploy to Vercel

Your repository is now optimized and ready to deploy to Vercel. Follow these simple steps to get your site live.

## What We Fixed

✅ Removed GitHub Pages deployment (was causing 404 errors)
✅ Optimized build scripts for Vercel
✅ Configured for automatic deployments from GitHub

## Step-by-Step Setup (5 minutes)

### 1. Go to Vercel
Visit [https://vercel.com/signup](https://vercel.com/signup) and sign up using your GitHub account.

### 2. Import Your Repository
1. Click **"Add New..."** → **"Project"**
2. Find **"Epic-Dreams-Asset-Management-and-Holding-Company-Incorporated"** in the list
3. Click **"Import"**

### 3. Configure Your Project

Vercel will auto-detect Next.js. Set these options:

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** ./ (leave as default)
**Build Command:** `npm run build` (already set)
**Output Directory:** (leave as default)

### 4. Add Environment Variables

Click **"Environment Variables"** and add these:

#### Required Variables

| Variable Name | Where to Get It |
|--------------|-----------------|
| `DATABASE_URL` | Your Neon/Supabase PostgreSQL connection string |
| `DIRECT_URL` | Your direct database connection (for migrations) |
| `NEXT_PUBLIC_APP_URL` | Your domain (e.g., `https://epicdreamsentertainment.com`) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Leave empty for now (we'll set this up after deployment) |
| `ADMIN_SESSION_SECRET` | Generate with: `openssl rand -base64 32` |

#### Optional Variables (can add later)

- `SMTP_HOST` - Email server for order notifications
- `SMTP_PORT` - Usually 587
- `SMTP_USER` - Email username
- `SMTP_PASSWORD` - Email password
- `PLAUSIBLE_DOMAIN` - Analytics domain
- `GA4_MEASUREMENT_ID` - Google Analytics ID

**Important:** Make sure to add these to all three environments:
- Production
- Preview
- Development

### 5. Deploy!

Click **"Deploy"** and wait 2-3 minutes. Vercel will:
1. Clone your repo from GitHub
2. Install dependencies
3. Build your Next.js app
4. Deploy it live

### 6. Set Up Your Database (First Time Only)

After your first deployment:

1. **Get your Vercel CLI token:**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Pull environment variables locally:**
   ```bash
   vercel env pull .env.local
   ```

3. **Set up the database schema and seed data:**
   ```bash
   npm run db:setup
   ```

   This will:
   - Create all database tables
   - Add demo products, artists, and content
   - Create the admin user

### 7. Initialize Your Admin Account

Once deployed, visit:
```
https://your-vercel-url.vercel.app/setup
```

Click **"Create Admin User"** to initialize your admin account with:
- Email: `admin@epicdreamsent.com`
- Password: `ChangeMe123!`

Then go to `/admin` and log in!

### 8. Connect Your Domain (Optional)

To use `epicdreamsentertainment.com` or `epicdreamsassetmanagement.com`:

1. In Vercel, go to **Settings** → **Domains**
2. Add your domain
3. Update your domain's DNS records:
   - **Type:** A
   - **Name:** @ (or www)
   - **Value:** 76.76.21.21 (Vercel's IP)

   Or use CNAME:
   - **Type:** CNAME
   - **Name:** @ (or www)
   - **Value:** cname.vercel-dns.com

4. Wait 5-60 minutes for DNS propagation
5. Update `NEXT_PUBLIC_APP_URL` in Vercel to your custom domain
6. Redeploy

### 9. Set Up Stripe Webhook (For Payments)

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter: `https://your-domain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing Secret** (starts with `whsec_`)
6. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`
7. Redeploy

## How Automatic Deployments Work

From now on, whenever you push code to GitHub:

1. **Push to `main` branch** → Automatic production deployment
2. **Push to any other branch** → Automatic preview deployment with unique URL
3. **Open a pull request** → Automatic preview deployment with comments

You don't need to do anything manually - Vercel watches your GitHub repo!

## Troubleshooting

### Build fails with Prisma error
- Make sure `DATABASE_URL` and `DIRECT_URL` are set in Vercel environment variables
- Make sure you're using the correct Neon connection strings (pooled vs direct)

### Pages show 404
- Check that environment variables are set for Production, Preview, AND Development
- Make sure `NEXT_PUBLIC_APP_URL` is set correctly

### Admin login doesn't work
- Visit `/setup` first to create the admin user
- Make sure `ADMIN_SESSION_SECRET` is set

### Need help?
- Check the [full deployment guide](./VERCEL_DEPLOYMENT.md)
- Visit Vercel's [Next.js deployment docs](https://vercel.com/docs/frameworks/nextjs)
- Reach out to support@epicdreamsent.com

## Next Steps After Deployment

1. ✅ Log in to `/admin`
2. ✅ Change your admin password
3. ✅ Review products and inventory
4. ✅ Test the checkout flow with Stripe test cards
5. ✅ Set up email notifications (optional)
6. ✅ Connect analytics (optional)
7. ✅ Update policy pages with your information

---

**Your site is now production-ready!** 🎉

GitHub remains your code hub, and Vercel handles all the hosting and deployment automatically.
