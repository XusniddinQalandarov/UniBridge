# Netlify Deployment Guide

Your UniBridge app is now ready for Netlify production deployment! 🚀

## What's Been Configured

✅ **netlify.toml** - Main configuration file with:
- Build command: `npm run build`
- Publish directory: `dist` (updated for Nuxt build output)
- **Node version: 20** (updated for compatibility)
- SPA redirects for client-side routing
- Security headers
- Cache optimization for static assets

✅ **.nvmrc** - Node version specification file (Node 20)

✅ **package.json** - Added engines field requiring Node >= 20.0.0

✅ **Nuxt Config** - Updated with:
- Netlify preset: `nitro: { preset: 'netlify' }`
- SSR enabled for better SEO

✅ **Build optimization** - The app builds successfully with optimized chunks

✅ **Git ignore** - Added `.netlify` folder to gitignore

✅ **Redirects file** - Backup `_redirects` file in public folder

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push to GitHub/GitLab:**
   ```bash
   git add .
   git commit -m "Fix Netlify publish directory - use 'dist' instead of '.output/public'"
   git push origin master
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select this repository

3. **Configure build settings:**
   - Build command: `npm run build` (should auto-detect)
   - Publish directory: `dist` (should auto-detect)
   - Node version will be set to 20 automatically via .nvmrc

4. **Deploy!**
   - Click "Deploy site"
   - Your site will be live in a few minutes

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy:**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

## Environment Variables

If your app uses environment variables, add them in:
- Netlify UI: Site settings → Environment variables
- Or in your deployment command

## Features Included

🎨 **Hero image carousels** with GSAP animations
🎓 **Student success stories** carousel
🌐 **Multi-language support** (Uzbek, Russian, English)
📱 **Responsive design** with TailwindCSS
⚡ **Optimized performance** with code splitting
🔒 **Security headers** configured
💾 **Efficient caching** for static assets

## Troubleshooting

If you encounter build issues:

1. **Clear Netlify cache and redeploy:**
   - Go to Netlify UI → Deploys → Trigger deploy
   - Click "Clear cache and deploy"

2. **Verify publish directory:**
   - Check that netlify.toml has `publish = "dist"`
   - Run `npm run build` locally and verify `dist` folder is created

3. **Local testing:**
   ```bash
   nvm use 20
   rm -rf node_modules package-lock.json
   npm ci
   npm run build
   ls -la dist
   ```

Your app is production-ready! 🎉