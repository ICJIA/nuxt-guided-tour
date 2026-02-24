const siteUrl = 'https://nuxt-guided-tour.netlify.app'
const siteTitle = 'nuxt-guided-tour'
const siteDescription = 'A guided tour and onboarding module for Nuxt applications. WCAG 2.1 AA compliant with keyboard navigation and screen reader support.'
const ogDescription = 'Guided tours & onboarding for Nuxt applications. WCAG 2.1 AA, keyboard nav, dark mode, fully customizable.'
const ogImageAlt = 'nuxt-guided-tour banner showing a highlight ring around a nav element'

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
      title: siteTitle,
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: siteDescription },
        { name: 'author', content: 'ICJIA' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:site_name', content: siteTitle },
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: ogDescription },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:width', content: '1280' },
        { property: 'og:image:height', content: '640' },
        { property: 'og:image:alt', content: ogImageAlt },
        { property: 'og:locale', content: 'en_US' },
        // Article dates (content freshness)
        { property: 'article:published_time', content: '2025-02-01T00:00:00Z' },
        { property: 'article:modified_time', content: new Date().toISOString().split('T')[0] + 'T00:00:00Z' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteTitle },
        { name: 'twitter:description', content: ogDescription },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
        { name: 'twitter:image:alt', content: ogImageAlt },
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: siteTitle,
            description: siteDescription,
            url: siteUrl,
            author: {
              '@type': 'Organization',
              name: 'ICJIA',
              url: 'https://github.com/ICJIA',
            },
            datePublished: '2025-02-01',
            dateModified: new Date().toISOString().split('T')[0],
            image: `${siteUrl}/og-image.png`,
            inLanguage: 'en',
            isPartOf: {
              '@type': 'SoftwareSourceCode',
              name: 'nuxt-guided-tour',
              url: 'https://github.com/ICJIA/nuxt-guided-tour',
              codeRepository: 'https://github.com/ICJIA/nuxt-guided-tour',
              programmingLanguage: ['TypeScript', 'Vue', 'CSS'],
              license: 'https://opensource.org/licenses/MIT',
            },
          }),
        },
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
