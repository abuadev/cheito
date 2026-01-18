// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'http://cheitodiaz.com',
  integrations: [preact()],
  vite: {
    server: {
      allowedHosts: ['7b39e1f9f442.ngrok-free.app']
    }
  }
});