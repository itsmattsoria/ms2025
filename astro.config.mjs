// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import shortcodeReplacer from './src/integrations/shortcodeReplacer.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://mattsoria.com',
  integrations: [shortcodeReplacer()],
  trailingSlash: 'never',
  redirects: {
    '/adventure': '/photography',
    '/nature': '/photography',
    '/travel': '/photography',
    '/people': '/photography',
    about: '/',
  },
});
