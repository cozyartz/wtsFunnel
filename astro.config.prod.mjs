// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// Production config for Cloudflare Pages
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
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