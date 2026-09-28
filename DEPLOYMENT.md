# Deployment Guide — XYZ Law Coaching

## Prerequisites
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Supabase project created (ap-south-1)
- [ ] Sanity project created + API token
- [ ] Resend account + email verified
- [ ] Domain purchased (Namecheap/GoDaddy)

## Step 1: Connect GitHub to Vercel
1. Go to vercel.com → New Project
2. Import from GitHub
3. Select: xyz-law-coaching repository
4. Framework: Next.js (auto-detected)
5. Root directory: ./ (default)
6. Build command: npm run build (default)

## Step 2: Add Environment Variables
Go to Project Settings → Environment Variables
Add all variables from VERCEL_ENV_SETUP.md
Set each to correct environment
(Production / Preview / Development)

## Step 3: Deploy
Click Deploy
First deploy takes 3-5 minutes

## Step 4: Configure Custom Domain
1. Go to Project → Settings → Domains
2. Add: yourdomain.com
3. Add: www.yourdomain.com
4. Copy the DNS records shown
5. Go to domain registrar (Namecheap etc.)
6. Update DNS records:
   A record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
7. Wait 10-60 minutes for DNS propagation

## Step 5: Set up Sanity Webhook
1. Go to sanity.io/manage → your project
2. API → Webhooks → Add webhook
3. Name: Production Revalidation
4. URL: https://yourdomain.com/api/revalidate?secret=YOUR_SANITY_WEBHOOK_SECRET
5. Dataset: production
6. Trigger on: create, update, delete
7. Projections: leave blank (all fields)
8. Save

## Step 6: Set up Google Search Console
1. Go to search.google.com/search-console
2. Add property: yourdomain.com
3. Verify via HTML tag:
   Copy verification code
   Add to .env: NEXT_PUBLIC_GOOGLE_VERIFICATION
   Redeploy
4. Submit sitemap:
   Sitemaps → Add sitemap URL:
   https://yourdomain.com/sitemap.xml

## Step 7: Set up Vercel Analytics
1. Go to project → Analytics tab
2. Enable Web Analytics (free)
3. Web Vitals are automatically tracked

## Step 8: Post-deploy verification
Run all checks from Phase 6C checklist.
