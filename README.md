# Cozyartz Media Group - Sales Funnel

A modern, dark-themed sales funnel website built with Astro, React, Tailwind CSS, and Framer Motion. Designed for Southwest Michigan businesses to generate leads and showcase web development and SEO services.

## 🎯 Features

- **Modern Sales Funnel Flow**: Hero → Lead Magnet (Free Audit) → Services → Social Proof → Contact
- **Dark Theme Design**: Professional, sleek appearance with custom gradients
- **Mobile-First Responsive**: Optimized for all devices
- **Performance Optimized**: Built with Astro for lightning-fast loading
- **Local SEO Ready**: Schema markup and local business optimization
- **Interactive Forms**: Website audit and contact forms with validation
- **Smooth Animations**: Framer Motion animations throughout
- **Cloudflare Pages Ready**: Configured for easy deployment

## 🚀 Tech Stack

- **Framework**: Astro 5.12.8 with React integration
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for modern iconography
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Cloudflare Pages with SSR support

## 📁 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── sections/     # Page sections
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       └── index.astro
├── wrangler.toml         # Cloudflare Pages config
└── tailwind.config.mjs   # Tailwind configuration
```

## 🧞 Commands

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `npm install`         | Installs dependencies                            |
| `npm run dev`         | Starts local dev server at `localhost:4321`      |
| `npm run build`       | Build your production site to `./dist/`          |
| `npm run preview`     | Preview your build locally, before deploying     |
| `npm run deploy`      | Deploy to Cloudflare Pages                       |
| `npm run cf:dev`      | Run Cloudflare Pages dev server                  |

## 🌐 Deployment

### Cloudflare Pages

This project is configured for Cloudflare Pages deployment:

1. **Connect Repository**: Link your GitHub repository to Cloudflare Pages
2. **Build Settings**: 
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
3. **Environment Variables**: Set any required environment variables in Cloudflare Pages dashboard

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy using Wrangler CLI
npm run deploy
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.mjs`:
- Primary colors (blue theme)
- Gray scale for dark theme
- Custom animations and transitions

### Content
Update business information in:
- `src/layouts/BaseLayout.astro` - Schema markup and meta tags
- `src/components/sections/` - All section components
- Contact information throughout components

### Forms
Forms are configured with:
- React Hook Form for form handling
- Zod for validation schemas
- Custom styling with Tailwind

## 📊 Sales Funnel Flow

1. **Hero Section**: Compelling headline with strong CTA
2. **Free Website Audit**: Lead magnet form with email capture
3. **Services Showcase**: Three-tier service presentation
4. **Social Proof**: Local testimonials with results
5. **Contact Form**: Detailed project inquiry form
6. **Footer**: Contact info and service areas

## 🎯 Local Business Focus

Optimized for Southwest Michigan market:
- Battle Creek, Kalamazoo, Grand Rapids area targeting
- Local schema markup implementation
- Regional testimonials and case studies
- Local phone number and address prominence

## 📱 Mobile Optimization

- Mobile-first design approach
- Touch-friendly interactions
- Optimized form layouts
- Fast loading on mobile networks

## 🔧 Development

### Adding New Sections
1. Create component in `src/components/sections/`
2. Import and add to `src/pages/index.astro`
3. Use `client:load` directive for React components

### Styling Guidelines
- Use Tailwind utility classes
- Follow dark theme color palette
- Maintain consistent spacing and typography
- Use Framer Motion for animations

## 📈 Performance

- Server-side rendering with Astro
- Component-level hydration
- Optimized asset loading
- Core Web Vitals optimized

Built with ❤️ for Southwest Michigan businesses.
