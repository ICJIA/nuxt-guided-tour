export default defineNuxtConfig({
  modules: [
    'nuxt-guided-tour',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  guidedTour: {
    highlightColor: '#7c3aed',
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
