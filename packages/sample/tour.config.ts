import type { TourConfig, IntroSlide } from 'nuxt-guided-tour/dist/runtime/types'

/**
 * Intro slides shown before the guided tour begins.
 * These are completely optional — remove or leave empty to skip.
 */
export const introSlides: IntroSlide[] = [
  {
    title: 'Welcome to Our App',
    icon: 'i-heroicons-sparkles',
    content: [
      'This is a sample application demonstrating the nuxt-guided-tour module.',
      'The following slides will explain the key concepts before the hands-on tour.'
    ],
    footer: 'You can customize these slides with your own content.'
  },
  {
    title: 'How the Tour Works',
    icon: 'i-heroicons-light-bulb',
    content: [
      'The guided tour highlights elements on your page one at a time, explaining what each section does.'
    ],
    benefits: [
      {
        icon: 'i-heroicons-cursor-arrow-rays',
        title: 'Highlight Rings',
        description: 'A vivid orange ring draws attention to the current element.'
      },
      {
        icon: 'i-heroicons-key',
        title: 'Keyboard Navigation',
        description: 'Use Arrow keys to navigate and Escape to cancel.'
      },
      {
        icon: 'i-heroicons-eye',
        title: 'Screen Reader Support',
        description: 'ARIA live region announces each step for screen reader users.'
      }
    ]
  }
]

/**
 * Tour configuration — defines each step of the guided tour.
 *
 * Each step points to a DOM element using a CSS selector.
 * The convention is to use data-tour="step-id" attributes on your HTML elements.
 */
export const tourConfig: TourConfig = {
  // Increment this to force all users to see the tour again
  version: 1,

  // Auto-start the tour for first-time visitors
  autoStart: true,

  // Wait 800ms for the UI to settle before showing the welcome modal
  autoStartDelay: 800,

  // localStorage key: stored as "sample-tour-v1"
  storageKeyPrefix: 'sample-tour',

  // Tour steps — shown in this order
  steps: [
    {
      id: 'header',
      target: '[data-tour="header"]',
      title: 'App Header',
      content: 'The header contains your app\'s branding and primary navigation. The tour trigger button lives here too.',
      icon: 'i-heroicons-home',
      position: 'bottom'
    },
    {
      id: 'hero',
      target: '[data-tour="hero"]',
      title: 'Hero Section',
      content: 'The hero section is the first thing visitors see. It communicates your app\'s value proposition.',
      icon: 'i-heroicons-megaphone',
      position: 'bottom',
      tip: 'Keep hero text concise — aim for one clear sentence.'
    },
    {
      id: 'features',
      target: '[data-tour="features"]',
      title: 'Features Grid',
      content: 'Feature cards highlight what your app offers. Each card shows an icon, title, and short description.',
      icon: 'i-heroicons-squares-2x2',
      position: 'top'
    },
    {
      id: 'cta',
      target: '[data-tour="cta"]',
      title: 'Call to Action',
      content: 'The CTA button drives the primary user action. Make it stand out with a bold color.',
      icon: 'i-heroicons-cursor-arrow-ripple',
      position: 'top',
      shortcuts: [
        { label: 'Quick Action', mac: ['\u2318', 'Enter'], win: ['Ctrl', 'Enter'] }
      ]
    },
    {
      id: 'footer',
      target: '[data-tour="footer"]',
      title: 'Footer',
      content: 'The footer provides secondary links and copyright info. That concludes our tour!',
      icon: 'i-heroicons-check-circle',
      position: 'top'
    }
  ]
}
