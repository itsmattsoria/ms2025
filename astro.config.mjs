// @ts-check
import { defineConfig } from 'astro/config';

import shortcodeReplacer from './src/integrations/shortcodeReplacer.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mattsoria.com',
  integrations: [shortcodeReplacer()],
  trailingSlash: 'never',
  redirects: {
    '/adventure': '/photography',
    '/nature': '/photography',
    '/travel': '/photography',
    '/people': '/photography',
    about: '/',
    '/feed.xml': '/journal/feed.xml',
    '/rss': '/journal/feed.xml',
  },
});
