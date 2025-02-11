// @ts-check
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    alpinejs({ entrypoint: 'src/alpine' }),
    icon({
      iconDir: 'src/assets/icons'
    }),
  ]
});
