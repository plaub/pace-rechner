import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    experimental: {
      wasm: true,
    },
    minify: false,
  },
  build: {
    transpile: ["vue3-timepicker"],
  },
  vite: {
    optimizeDeps: {
      include: ["vue3-timepicker"],
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
});
