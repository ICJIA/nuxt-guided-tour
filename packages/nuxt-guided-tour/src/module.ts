import { defineNuxtModule, addComponentsDir, addImports, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Prefix for auto-imported components.
   * @default 'Tour'
   */
  prefix?: string
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
    prefix: 'Tour'
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
  }
})
