export default defineNuxtConfig({
  modules: [
    'nuxt-guided-tour',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  devtools: { enabled: true },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
