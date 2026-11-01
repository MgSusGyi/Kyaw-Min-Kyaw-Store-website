# ကျော်မင်းကျော် စတိုး · Kyaw Min Kyaw Store

Modern glassmorphism website for **Kyaw Min Kyaw Store** in Hinthada, Myanmar.

**Theme:** Apple-inspired Liquid Glass + red accent  
**Stack:** Next.js 15 · Tailwind CSS v4 · localStorage demo (easy to upgrade to real DB)

---

## Features

### User
- Beautiful homepage with category sections (Men’s Wear, T-Shirts, Trousers, Shorts, Accessories)
- Login / Register required for chat & ordering
- Real-time style chat with admin (demo uses localStorage)
- Order form with **Delivery (Hinthada only)** or **Pickup**
- Leave & view customer reviews

### Admin
- Login as admin (`admin@kyawminkyaw.com` / `admin123`)
- Dashboard with stats
- Manage products / photos (add image URLs)
- Reply to customer chats

---

## Quick Start (Local)

```bash
# 1. Go into the project
cd kyaw-min-kyaw

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open http://localhost:3000

**Demo accounts**
- Admin: `admin@kyawminkyaw.com` / `admin123`
- Any other email + password (min 4 chars) works as normal user

---

## Deploy to Vercel (Step-by-step)

### Method 1 — GitHub (Recommended)

1. **Create a GitHub repository**
   - Go to https://github.com/new
   - Name it e.g. `kyaw-min-kyaw-store`
   - Keep it public or private

2. **Push this project**
   ```bash
   cd kyaw-min-kyaw
   git init
   git add .
   git commit -m "Initial Kyaw Min Kyaw Store website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kyaw-min-kyaw-store.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com and sign in (use GitHub)
   - Click **Add New… → Project**
   - Import the `kyaw-min-kyaw-store` repository
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: leave blank (or `.` if needed)
   - Click **Deploy**

4. Wait 1–2 minutes. Vercel will give you a live URL like:
   `https://kyaw-min-kyaw-store.vercel.app`

### Method 2 — Vercel CLI

```bash
npm i -g vercel
cd kyaw-min-kyaw
vercel
# Follow the prompts (link to your account, project name, etc.)
vercel --prod
```

---

## Adding Your Real Store Photo

1. Upload the storefront photo to:
   - Imgur, Cloudinary, or Vercel Blob
2. Copy the direct image URL
3. Login as Admin → **Manage Products** → paste the URL + title

You can also replace the Unsplash placeholder images in `src/app/page.tsx` with your own URLs.

---

## Important Notes about Database

This version uses **browser localStorage** so it works immediately on Vercel with **zero configuration**.

For a real production store you should later connect:
- **Neon** (serverless Postgres) or **Supabase**
- NextAuth / Auth.js for real authentication
- Supabase Realtime or Pusher for live chat
- Vercel Blob or Cloudinary for image uploads

The UI and all pages are already structured so you can plug a real database in without redesigning the site.

---

## Custom Domain (Optional)

After deploying on Vercel:
1. Project Settings → Domains
2. Add your domain (e.g. `kyawminkyaw.com`)
3. Update DNS records as Vercel instructs

---

## Support

Store address: 36, Man Ba Khine St, Arr Kar Shop House, Hinthada, Myanmar  
Phone: (044) 098580686

Made with ❤️ for Kyaw Min Kyaw Store.
