export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  css: ["./app/assets/css/main.css", "./app/assets/css/theme.css"],

  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "vue-yandex-maps/nuxt",
    "@nuxt/fonts",
  ],

  // ==================== FONTS ====================
  fonts: {
    provider: "google",
    defaults: {
      weights: [400, 700],
      styles: ["normal", "italic"],
      subsets: ["cyrillic-ext", "cyrillic", "latin"],
    },
    families: [
      {
        name: "Plus Jakarta Sans",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
    ],
  },

  // ==================== IMAGE ====================
  image: {
    quality: 80,
    format: ["webp", "avif"],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
    domains: ["unsplash.com"],
  },

  // ==================== YANDEX MAPS ====================
  yandexMaps: {
    apikey: import.meta.env.NUXT_PUBLIC_YANDEX_MAPS_APIKEY,
    lang: "ru_RU",
    version: "v3",
    initializeOn: "onPluginInit",
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
