// @ts-check
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
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
        default: 'Get started with Astro on your next project. It uses eslint, prettier, tailwindcss, aplinejs and some more to provide every tool needed for a great website.',
      }),
      SEO_OG_TITLE_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        default: 'Astro is ♥',
      }),
      SEO_OG_DESCRIPTION_DEFAULT: envField.string({
        context: 'server',
        access: 'public',
        default: 'Astro is awesome because it is so simple and easy to integrate with.',
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
  }
});
