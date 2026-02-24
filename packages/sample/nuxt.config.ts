const siteUrl = 'https://nuxt-guided-tour.netlify.app'

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
  app: {
    head: {
      title: 'nuxt-guided-tour',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'A guided tour and onboarding module for Nuxt applications. WCAG 2.1 AA compliant with keyboard navigation and screen reader support.' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:title', content: 'nuxt-guided-tour' },
        { property: 'og:description', content: 'Guided tours & onboarding for Nuxt applications. WCAG 2.1 AA, keyboard nav, dark mode, fully customizable.' },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:width', content: '1280' },
        { property: 'og:image:height', content: '640' },
        { property: 'og:image:alt', content: 'nuxt-guided-tour banner showing a highlight ring around a nav element' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'nuxt-guided-tour' },
        { name: 'twitter:description', content: 'Guided tours & onboarding for Nuxt applications. WCAG 2.1 AA, keyboard nav, dark mode, fully customizable.' },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
        { name: 'twitter:image:alt', content: 'nuxt-guided-tour banner showing a highlight ring around a nav element' },
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
      ],
    },
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
