import { defineNuxtModule, addComponentsDir, addImports, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Prefix for auto-imported components.
   * @default 'Tour'
   */
  prefix?: string

  /**
   * Highlight ring color (any valid CSS color).
   * @default '#22c55e' (green)
   */
  highlightColor?: string

  /**
   * Brighter variant used for the pulse peak. If not set, auto-derived
   * by mixing the highlight color with white.
   */
  highlightColorBright?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-guided-tour',
    configKey: 'guidedTour',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    prefix: 'Tour',
    highlightColor: '#22c55e',
    highlightColorBright: '#4ade80'
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Register components with configurable prefix
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix
    })

    // Register composables
    addImports({
      name: 'useTour',
      as: 'useTour',
      from: resolve('./runtime/composables/useTour')
    })

    // Push tour CSS
    nuxt.options.css.push(resolve('./runtime/styles/tour.css'))

    // Inject highlight color overrides if customised
    const base = options.highlightColor ?? '#7c3aed'
    const bright = options.highlightColorBright ?? `color-mix(in srgb, ${base} 60%, white)`

    nuxt.options.app.head = nuxt.options.app.head || {}
    const head = nuxt.options.app.head as { style?: Array<{ textContent: string }> }
    head.style = head.style || []
    head.style.push({
      textContent: `:root{--tour-highlight:${base};--tour-highlight-bright:${bright}}`
    })
  }
})
