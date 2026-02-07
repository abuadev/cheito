// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'http://cheitodiaz.com',
  integrations: [preact()],
  vite: {
    server: {
      allowedHosts: ['bf27-88-28-22-48.ngrok-free.app']
    }
  }
});