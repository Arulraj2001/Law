# Vercel Environment Variables Setup

## Add these in Vercel Dashboard:
## Project Settings → Environment Variables

### Production + Preview + Development:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
RESEND_API_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=
SANITY_WEBHOOK_SECRET=
NEXT_PUBLIC_TWITTER_HANDLE=@xyzlawcoaching

### Production only:
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=

### Preview only:
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

### Development only:
NEXT_PUBLIC_SITE_URL=http://localhost:3000

## Important notes:
## 1. Never commit .env.local to git
## 2. NEXT_PUBLIC_ vars are exposed to the browser — don't put secrets
## 3. Service role key is server-only — never prefix with NEXT_PUBLIC_
