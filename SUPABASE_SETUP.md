# Supabase Setup Guide for XYZ Law Coaching

This guide walks you through setting up Supabase from scratch, running the database schema script, configuring environment variables, and verifying your connection.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **"New Project"**.
3. Select your organization.
4. Enter project parameters:
   - **Name:** `xyz-law-coaching` (or your preferred name)
   - **Database Password:** Generate a secure password and save it in a safe place.
   - **Region:** Select **South Asia (Mumbai) — `ap-south-1`** for the lowest latency in Tamil Nadu and India.
   - **Pricing Plan:** Free plan is suitable for launch.
5. Click **"Create new project"** and wait ~1–2 minutes for provisioning.

---

## 2. Copy Your API Credentials

Once the project is ready:

1. Click the **Settings (gear icon)** in the left sidebar → Select **API**.
2. Copy these 3 credentials into your `.env.local` file (and Vercel Environment Variables):

| Setting in Supabase | Environment Variable in Next.js | Scope |
|---|---|---|
| **Project URL** | `NEXT_PUBLIC_SUPABASE_URL` | Public / Client & Server |
| **Project API Keys → `anon` `public`** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Client & Server |
| **Project API Keys → `service_role` `secret`** | `SUPABASE_SERVICE_ROLE_KEY` | **Secret — Server only!** |

Update your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

---

## 3. What to Run in the SQL Editor

We have saved the complete schema and seed script directly in this repository at:
📁 **[`supabase/schema.sql`](file:///d:/Software/Law/supabase/schema.sql)**

### Steps to execute:
1. In your Supabase Dashboard, click **"SQL Editor"** (terminal/code icon on the left menu).
2. Click **"+ New Query"** (top left).
3. Copy the entire content of [`supabase/schema.sql`](file:///d:/Software/Law/supabase/schema.sql).
4. Paste it into the SQL Editor window.
5. Click the green **"Run"** button (or press `Ctrl` + `Enter`).
6. You will see: `Success. No rows returned` or rows inserted.

---

## 4. What This SQL Script Creates

The script sets up **11 production tables**, complete with Row Level Security (RLS), performance indexes, and initial seed data:

| Table Name | Purpose | RLS Permissions |
|---|---|---|
| `leads` | Website enquiry form submissions | Anyone can `INSERT` (public forms); Admins/service role can view/edit |
| `batches` | Course batches, schedules, seat counts | Public can view active batches; Admins can edit |
| `courses` | Course descriptions, fees, highlights | Public can view active courses; Admins can edit |
| `faculty` | Faculty profiles, bios, credentials | Public can view active faculty; Admins can edit |
| `toppers` | Selected judges & APP toppers | Public can view featured toppers; Admins can edit |
| `testimonials` | Student quotes & video links | Public can view active reviews; Admins can edit |
| `exam_updates` | TNPSC notifications & exam alerts | Public can view active alerts; Admins can edit |
| `site_settings` | Dynamic phone, WhatsApp, address | Public can read; Admins can update |
| `blog_views` | Anonymous blog article view counts | Anyone can log a view; Public can view counts |
| `whatsapp_clicks` | WhatsApp button conversion tracking | Anyone can log a click; Admins can view analytics |
| `selection_stats` | Year-by-year exam selection counts | Public can view active stats; Admins can edit |

---

## 5. Configure Authentication URL Configuration (Optional but Recommended)

If you plan to use Supabase Auth for admin logins in addition to Sanity:
1. Go to **Authentication** → **URL Configuration**.
2. Set **Site URL** to: `https://yourdomain.com` (or `http://localhost:3000` for local testing).
3. Add to **Redirect URLs**: `https://yourdomain.com/**` and `http://localhost:3000/**`.

---

## 6. How to Verify Connection

Run these terminal checks from your project directory:

```bash
# 1. Check all required env vars are detected
npm run check:env

# 2. Run master automated test runner against your local server
npm run test:local
```

You should see:
- `All required env vars set`
- `✅ Leads API — valid submission [CRITICAL]`
- `✅ Admin stats API`
- `✅ Admin leads API`
- `✅ Admin settings API`
- `✅ WhatsApp tracking API`

---

## 7. Viewing and Managing Data

You can view and manage all student enquiries directly from:
- **Supabase Dashboard → Table Editor → `leads`**
- Or directly through your Sanity Studio at `/studio`!
