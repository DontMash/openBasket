// @ts-check
import alpinejs from '@astrojs/alpinejs';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  prefetch: {
    prefetchAll: true
  },

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    alpinejs({ entrypoint: 'src/alpine.config' }),
    icon({
      iconDir: 'src/assets/icons'
    }),
  ],

  env: {
    schema: {
      SEO_TITLE_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        default: 'Astro Starter',
      }),
      SEO_DESCRIPTION_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      SEO_KEYWORDS_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      SEO_OG_TITLE_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      SEO_OG_DESCRIPTION_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      SEO_OG_IMAGE_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        default: 'og-image.jpg',
      }),
      SEO_OG_IMAGE_ALT_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        default: 'Logo',
      }),
    }
  },
});
