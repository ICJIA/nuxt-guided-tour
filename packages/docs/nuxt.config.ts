export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-guided-tour',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/docs.css'],
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['typescript', 'vue', 'bash', 'json', 'css'],
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          }
        }
      }
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  app: {
    head: {
      title: 'nuxt-guided-tour',
      meta: [
        { name: 'description', content: 'A guided tour/onboarding module for Nuxt applications' }
      ]
    }
  }
})
