// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Production config for Cloudflare Pages (static)
export default defineConfig({
  output: 'static',
  integrations: [
    tailwind(),
    react({
      include: ['**/react/*', '**/components/**/*'],
    })
  ],
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify('production')
    }
  }
});