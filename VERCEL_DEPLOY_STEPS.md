# Vercel Deployment Steps (Manual)

## Step 1 — Import Project on Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Click "Import Git Repository"
4. Select: xyz-law-coaching
5. Framework Preset: Next.js (auto-detected, do not change)
6. Root Directory: ./ (leave as default)
7. Build Command: npm run build (auto-detected)
8. Output Directory: .next (auto-detected)
9. Install Command: npm install (auto-detected)
10. DO NOT click Deploy yet

## Step 2 — Add Environment Variables
Still on the import screen, scroll to "Environment Variables"

Add each variable from .env.local:

Click "Add" for each:

| Variable Name | Value | Environment |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | [your value] | All |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | [val] | All |
| SUPABASE_SERVICE_ROLE_KEY | [val] | All |
| NEXT_PUBLIC_SANITY_PROJECT_ID | [val] | All |
| NEXT_PUBLIC_SANITY_DATASET | production | All |
| NEXT_PUBLIC_SANITY_API_VERSION | 2024-01-01 | All |
| SANITY_API_TOKEN | [val] | All |
| RESEND_API_KEY | [val] | All |
| NEXT_PUBLIC_WHATSAPP_NUMBER | [val] | All |
| SANITY_WEBHOOK_SECRET | [val] | All |
| NEXT_PUBLIC_SITE_URL | https://yourdomain.com | Production |
| NEXT_PUBLIC_SITE_URL | https://your-project.vercel.app | Preview |
| NEXT_PUBLIC_SITE_URL | http://localhost:3000 | Development |
| NEXT_PUBLIC_GOOGLE_VERIFICATION | [val] | Production |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | [val] | Production |
| NEXT_PUBLIC_TWITTER_HANDLE | @xyzlawcoaching | All |

## Step 3 — Deploy
Click "Deploy" button
Watch the build log
Build should complete in 3-5 minutes
With 0 errors (verified in local build)

## Step 4 — Verify Deployment URL
Build completes → Vercel shows:
"Your project is now deployed"
Click "Visit" to open the site

## Step 5 — Add Custom Domain
1. Go to Project → Settings → Domains
2. Type: yourdomain.com → Add
3. Type: www.yourdomain.com → Add
4. Vercel shows DNS records to configure

DNS Records to add at registrar:
| Type | Host | Value |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

5. Go to domain registrar
6. Find DNS settings
7. Add these records
8. Save and wait 10-60 minutes
9. Return to Vercel → domain shows ✅

## Step 6 — Configure Sanity CORS
Go to sanity.io/manage → your project
→ API → CORS Origins → Add:
- https://yourdomain.com (Allow credentials: YES)
- https://www.yourdomain.com (credentials: YES)

Update Sanity config for production:
The API token in .env is already set.
No code changes needed.

## Step 7 — Set up Sanity Webhook
sanity.io/manage → API → Webhooks → New:
Name: Production Revalidation
URL: https://yourdomain.com/api/revalidate?secret=[SANITY_WEBHOOK_SECRET value]
Dataset: production
Triggers: create, update, delete
HTTP Method: POST
Save

Test webhook: publish any Sanity document
Check Vercel Functions log for /api/revalidate being called

## Step 8 — Google Search Console
1. Go to search.google.com/search-console
2. Add Property → URL prefix: https://yourdomain.com
3. Verify with HTML tag method:
   Copy verification code from meta tag
   Add to env: NEXT_PUBLIC_GOOGLE_VERIFICATION=[code]
4. Redeploy (Vercel auto-redeploys from git) OR manually trigger redeploy in Vercel
5. Click Verify in Search Console
6. Go to Sitemaps section
7. Add: sitemap.xml
8. Submit

## Step 9 — Supabase Production Setup
1. Make sure Supabase project region is ap-south-1 (South Asia)
2. Go to Supabase → Settings → API
3. Verify the production URL and keys match what's in Vercel env vars
4. Go to Authentication → URL Configuration
5. Add: https://yourdomain.com to Site URL
6. Add to Redirect URLs: https://yourdomain.com/**
7. Run the whatsapp_clicks table SQL in SQL Editor:
```sql
CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  message_type TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_wa_clicks_type ON whatsapp_clicks(message_type);
CREATE INDEX IF NOT EXISTS idx_wa_clicks_time ON whatsapp_clicks(clicked_at DESC);
```
