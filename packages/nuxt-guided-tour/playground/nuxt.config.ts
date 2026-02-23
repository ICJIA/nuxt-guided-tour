export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  devtools: { enabled: true },
  css: ['~/assets/playground.css']
})
