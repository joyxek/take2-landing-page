# Take2 Landing Page - Deployment Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📋 Pre-Deployment Checklist

### Required Updates Before Going Live

1. **Application Form URL** - Update in `/src/app/apply/page.tsx`:
   ```javascript
   // Replace this placeholder:
   window.location.href = 'https://forms.gle/REPLACE-WITH-ACTUAL-TAKE2-FORM-ID';
   
   // With your actual form URL:
   window.location.href = 'https://airtable.com/shrYourActualFormID';
   // OR
   window.location.href = 'https://typeform.com/to/YourFormID';
   ```

2. **Email Capture Integration** - Update in `/src/components/Footer.tsx`:
   - Replace the setTimeout simulation with actual email service integration
   - Consider using: Mailchimp, ConvertKit, or Airtable for email capture

3. **OpenGraph Image** - Add actual image:
   - Create `/public/og-image.jpg` (1200x630px)
   - Update social media preview image

4. **Favicon Files** - Replace placeholder files:
   - `/public/favicon.ico`
   - `/public/apple-touch-icon.png`
   - Use actual Take2 branding

5. **Google Analytics/Tracking** - Add tracking code to layout if needed

## 🎯 Performance Optimizations Implemented

- ✅ **Lazy Loading**: Three.js scenes load only when needed
- ✅ **Particle Optimization**: Capped at 450 particles total (< 1200 limit)
- ✅ **Font Optimization**: All fonts use `display: swap`
- ✅ **Tree Shaking**: Lucide icons imported individually
- ✅ **CSS Performance**: `will-change: transform` on animated elements
- ✅ **SEO Ready**: Complete OpenGraph and meta tags

## 📱 Mobile Performance Target

**Target: Lighthouse Mobile Score ≥85**

Optimizations included:
- Reduced motion detection and fallbacks
- Optimized particle counts
- Lazy-loaded heavy components
- Efficient font loading
- Minimal JavaScript bundles

## 🔗 Application Flow

1. **Hero CTA** → `/apply` → External form
2. **NumbersStack CTA** → `/apply` → External form
3. **Footer Email** → Lead capture (needs integration)
4. **Footer "Apply Now"** → `/apply` → External form

## 🎨 Design System

### Colors
- **Primary**: `#0D0D0D` (Dark)
- **Accent Green**: `#6EE7B7`
- **Accent Blue**: `#3B82F6`

### Fonts
- **Headlines**: Instrument Serif
- **Body**: Carlito
- **Handwriting**: Caveat
- **Monospace**: Geist Mono

## 📄 Content Structure

1. **Hero Section**: Animated headline with strikethrough effect
2. **How It Works**: Modal with step carousel
3. **Comparison Section**: Take2 vs Dating Apps with interactive chips
4. **Numbers Stack**: Stats with floating animations + CTA
5. **Footer**: Email capture + links

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Three.js
- **Gestures**: @use-gesture/react
- **Icons**: Lucide React (tree-shaken)

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel via GitHub integration
```

### Netlify
```bash
npm run build
# Deploy /out folder to Netlify
```

### Custom Server
```bash
npm run build
npm start
```

## ⚡ Performance Monitoring

After deployment, monitor:
- Lighthouse scores (target: Mobile ≥85)
- Core Web Vitals
- Conversion rates on `/apply` route
- Email signup rates in footer

## 🔒 Security Notes

- All external links use proper security attributes
- Form submissions redirect to secure external services
- No sensitive data stored client-side
- HTTPS required for production

## 📊 Analytics Integration

Add tracking for:
- Page views
- CTA clicks (`/apply` navigation)
- Email signups
- Modal interactions
- Scroll depth

---

**Ready for Production**: Update the placeholder URLs and deploy! 🎉
