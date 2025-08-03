import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Disable SSR and enable SPA mode for WordPress plugin
  ssr: false,

  // Disable app manifest to prevent 404 errors
  app: {
    buildAssetsDir: "/_nuxt/",
  },

  // Disable experimental features that cause issues in WordPress
  experimental: {
    payloadExtraction: false,
  },

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
