# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for "La Marea B&B" (Bed & Breakfast) in Tigre, Buenos Aires, Argentina. Built with Next.js 15, TypeScript, and Tailwind CSS. Focus on SEO optimization, image gallery display, amenities showcase, and guest reviews.

**Property Details:**
- **Official Name**: La Marea B&B
- **Type**: Bed & Breakfast
- **Address**: Avenida Santiago de Liniers 573, Tigre, Buenos Aires
- **Location**: Near Tigre train station (Estación Tigre), close to Río Luján coast (NOT in the Delta)
- **Rating**: 9.6/10 on Booking.com
- **Payment**: Cash only
- **Key Amenities**: Outdoor pool (seasonal), garden, included breakfast, WiFi, BBQ, shared kitchen

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans & Geist Mono (Google Fonts)
- **Deployment**: Vercel (free tier)
- **Images**: Local storage initially, migration to Cloudinary planned for production

## Development Commands

```bash
# Start development server with Turbopack
npm run dev
# Server runs at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

```
/app
  /components
    - OptimizedImage.tsx    # Reusable image component with Next.js optimization
    - StructuredData.tsx    # Schema.org JSON-LD for B&B SEO (includes rating)
    - Gallery.tsx           # Main gallery component with tabs and filters
    - ImageLightbox.tsx     # Full-screen image viewer modal
    - Amenities.tsx         # Amenities grid with icons
    - Reviews.tsx           # Guest reviews/testimonials section
  - layout.tsx              # Root layout with SEO metadata
  - page.tsx                # Homepage/landing page (single-page design)
  - sitemap.ts              # Auto-generated sitemap
  - robots.ts               # Robots.txt configuration
  - globals.css             # Global styles

/public
  /images
    /habitaciones           # Room photos
    /piscina                # Pool & garden photos
    /living                 # Common areas (living, shared kitchen)
    /desayuno               # Breakfast photos
```

## SEO Configuration

### Metadata (app/layout.tsx)
- Title optimized for "Bed & Breakfast en Tigre" and "B&B Tigre"
- Spanish language (lang="es")
- Open Graph tags for social sharing
- Twitter Card metadata
- Local keywords: "bed and breakfast tigre", "b&b tigre", "hospedaje tigre", "piscina tigre"
- Description emphasizes: B&B, pool, garden, breakfast, 9.6/10 rating
- Real address included: Avenida Santiago de Liniers 573

### Structured Data (app/components/StructuredData.tsx)
- Schema.org **BedAndBreakfast** type (not Hotel)
- Real address: Avenida Santiago de Liniers 573, Tigre
- Geographic coordinates for Tigre (-34.426, -58.579)
- AggregateRating: 9.6/10 from Booking.com
- Amenities listed: piscina, jardín, WiFi, desayuno, parrilla
- **TODO**: Update with real phone number

### Files to Update Before Production
1. `app/sitemap.ts` - Change baseUrl to actual domain
2. `app/robots.ts` - Update baseUrl
3. `app/components/StructuredData.tsx` - Add real phone number
4. `app/layout.tsx` - Update Open Graph image when available
5. `app/page.tsx` - Update Facebook page URL (Instagram is @lamareatigre, correct)
6. `app/components/Reviews.tsx` - Replace placeholder reviews with real guest reviews

## Image Optimization

### Current Setup (Local)
- Images stored in `/public/images/`
- Next.js Image component optimizes automatically
- Formats: AVIF → WebP → fallback
- Responsive sizes configured in `next.config.ts`

### Recommended Image Specs
- Format: JPG or PNG
- Max size: 1920x1080px
- Max weight: <500KB per image
- Next.js will convert to WebP/AVIF automatically

### Migration to Cloudinary (Production)
When ready to deploy:
1. Create Cloudinary account (free tier: 25GB storage + 25GB bandwidth/month)
2. Upload images to Cloudinary
3. Uncomment `remotePatterns` in `next.config.ts`
4. Update image paths to Cloudinary URLs
5. Replace `OptimizedImage` component src props

## Vercel Deployment

### Free Tier Limits
- 100 GB bandwidth/month (sufficient for low traffic)
- 100 MB max project size
- Unlimited deploys
- Free SSL certificate
- CDN included

### Deployment Steps
1. Push to GitHub repository
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Deploy automatically on push to main

### Environment Variables (None required currently)
When adding Cloudinary:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

## Google My Business Setup

**Critical for local SEO:**
1. Create/claim Google Business Profile
2. Add exact hotel location (Tigre coordinates)
3. Upload photos (same as website gallery)
4. Link website once deployed
5. Categories: "Hotel", "Lodging"
6. Business hours and contact info

## Content TODO

Current placeholders to replace:
- [ ] Real B&B photos in gallery section (9 placeholder images currently)
- [ ] Actual phone number (currently: +54 11 XXXX-XXXX) in page.tsx and StructuredData.tsx
- [ ] Real Facebook page URL (Instagram @lamareatigre is correct)
- [ ] Replace placeholder guest reviews in Reviews.tsx with real Booking.com/Google reviews
- [ ] Optional: Add more detailed "Sobre Nosotros" description if needed
- [ ] Optional: Add room descriptions and pricing

**Already completed:**
- ✅ Real address: Avenida Santiago de Liniers 573, Tigre
- ✅ Instagram handle: @lamareatigre
- ✅ GPS coordinates: -34.426, -58.579
- ✅ Amenities details: piscina, jardín, WiFi, desayuno, parrilla, cocina compartida
- ✅ Rating: 9.6/10 Booking.com

## Performance Optimizations

Already implemented:
- Turbopack for fast builds
- Image optimization with AVIF/WebP
- Lazy loading for images
- Responsive image sizes
- Long cache TTL (1 year) for optimized images
- Server-side rendering for SEO

## Domain & Hosting Costs

**Annual costs (USD):**
- Domain (.com.ar): ~$10-15/year
- Vercel hosting: $0 (free tier)
- Cloudinary: $0 (free tier)
- **Total: ~$10-15/year**

## Architecture Notes

### Why Next.js App Router?
- Built-in SEO with metadata API
- Server components by default (better performance)
- File-based routing
- Automatic code splitting
- Easy deployment to Vercel

### Why Tailwind CSS?
- Rapid prototyping for landing pages
- Built-in responsive utilities
- Small production bundle (unused classes removed)
- No external CSS files needed

### Component Strategy
- `OptimizedImage`: Centralized image optimization logic (currently not used in gallery)
- `StructuredData`: Isolated SEO schema markup for BedAndBreakfast with rating
- `Gallery`: Client component with tabs for filtering images (Habitaciones, Piscina & Jardín, Áreas Comunes, Desayuno)
- `ImageLightbox`: Full-screen modal for viewing images (ESC or click outside to close)
- `Amenities`: Showcases 6 key amenities with icons (pool, garden, breakfast, WiFi, BBQ, kitchen)
- `Reviews`: Displays guest testimonials and 9.6/10 rating with links to Booking.com & Google Reviews
- Page components: Self-contained sections for easy editing

### Design Philosophy
- **Single-page landing**: All content on one page for better SEO and mobile UX
- **Mobile-first**: Designed primarily for mobile devices, scales up to desktop
- **Trust signals**: 9.6/10 rating badge in hero, reviews section, real address
- **Gallery categories**: Habitaciones, Piscina & Jardín, Áreas Comunes, Desayuno
- **Interactive lightbox**: Click any image to view full-size
- **Horizontal scroll tabs**: Mobile-optimized category tabs with scroll
- **CTA buttons**: "Contactar" and "Ver Fotos" in hero for quick actions

## Adding Real Images

When ready to add hotel photos:

1. **Prepare images:**
   - Resize to max 1920x1080px
   - Compress to <500KB
   - Use descriptive filenames (e.g., `habitacion-doble.jpg`)

2. **Add to folders:**
   - Place in `/public/images/[category]/`
   - Categories: habitaciones, piscina, living, desayuno

3. **Update Gallery component** (`app/components/Gallery.tsx`):
   - Replace `PLACEHOLDER_IMAGES` array with real image paths
   - Uncomment the `<Image>` component (line ~70)
   - Remove placeholder div

4. **Example:**
   ```typescript
   const GALLERY_IMAGES: GalleryImage[] = [
     { src: '/images/habitaciones/doble-1.jpg', alt: 'Habitación Doble', category: 'habitaciones' },
     { src: '/images/living/principal.jpg', alt: 'Living Principal', category: 'living' },
     // ... add all images
   ]
   ```

## Future Enhancements

Potential additions:
- Contact form with email integration
- Booking system integration (e.g., Booking.com embed)
- Multi-language support (English version)
- Google Maps embed for location
- Testimonials/reviews section
- WhatsApp contact button (click-to-chat)
