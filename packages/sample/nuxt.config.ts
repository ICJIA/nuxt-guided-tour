export default defineNuxtConfig({
  modules: [
    'nuxt-guided-tour',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  guidedTour: {
    // Uses the default green (#22c55e). Uncomment to override:
    // highlightColor: '#7c3aed',
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
