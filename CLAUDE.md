# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern sales funnel website for Cozyartz Media Group, built with Astro, React, and Tailwind CSS. The site targets Southwest Michigan businesses with web development and SEO services through a structured conversion flow.

## Essential Commands

All commands should be run from the project root:

```bash
npm run dev              # Start development server at localhost:4321
npm run build            # Build static site to ./dist/
npm run build:prod       # Build with production config (Cloudflare SSR)
npm run preview          # Preview build locally
npm run deploy           # Build and deploy to Cloudflare Pages
npm run cf:dev           # Run Cloudflare Pages dev server
```

## Architecture

### Dual Build Configuration
- **Development/Static**: Uses `astro.config.mjs` for static site generation
- **Production**: Uses `astro.config.prod.mjs` with Cloudflare adapter for SSR deployment

### Component Architecture
```
src/
├── layouts/BaseLayout.astro    # Main layout with SEO schema
├── pages/index.astro           # Main landing page
├── components/
│   ├── ui/                     # Reusable components (Button, Input, etc.)
│   └── sections/               # Page sections (Hero, Services, etc.)
```

### Sales Funnel Flow
The site follows a structured conversion path:
1. **Hero** - Video background with primary CTA
2. **Website Audit** - Lead magnet form (email capture)
3. **Services** - Three-tier service presentation  
4. **Testimonials** - Local social proof
5. **Contact** - Detailed project inquiry form

### Technology Stack
- **Astro 5.12.8** - Main framework with React integration
- **React 19** - Interactive components with `client:load` hydration
- **Tailwind CSS** - Custom dark theme with blue primary colors
- **Framer Motion** - Animations and scroll effects
- **React Hook Form + Zod** - Form handling and validation
- **Cloudflare Pages** - Deployment target with SSR support

### Local Business Optimization
- **Schema markup** in BaseLayout.astro with local business data
- **Geographic targeting** for Battle Creek/Kalamazoo/Grand Rapids area
- **Phone number**: 269-261-0069 (hardcoded in schema and components)
- **Service area radius**: 50km from Battle Creek coordinates

## Development Patterns

### Component Integration
- All React components use `client:load` directive in index.astro
- Components import from relative paths (e.g., `../ui/Button.jsx`)
- Framer Motion animations are implemented across all interactive elements

### Styling System
- **Dark theme default** with custom gray/primary color scales
- **Mobile-first responsive** design approach
- **Custom animations** defined in tailwind.config.mjs
- **Inter font** loaded from Google Fonts

### Form Architecture
- React Hook Form for form state management
- Zod schemas for validation (implemented in individual components)
- Custom styled components using Tailwind utilities

## Deployment Configuration

### Cloudflare Pages Setup
- **Build command**: `npm run build:prod`
- **Output directory**: `dist`
- **Wrangler config**: Environment-specific vars in wrangler.toml
- **Compatibility date**: 2024-01-01 with nodejs_compat flag

### Environment Variables
- `NODE_ENV` configured per environment in wrangler.toml
- Production and preview environments defined

## Key Implementation Details

### Video Background
- Cloudflare Stream integration in Hero component
- Autoplay, loop, muted configuration for optimal UX
- Parallax scrolling effects with Framer Motion

### SEO Implementation
- Comprehensive local business schema in BaseLayout.astro
- Service area and contact information structured data
- Meta tags optimized for Southwest Michigan market

### Form Validation
Forms use consistent patterns:
- React Hook Form for state management
- Custom styled inputs with focus states
- Error handling with Tailwind error styling