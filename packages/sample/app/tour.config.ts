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

  // Tour steps — walks through each nav link and button left to right
  steps: [
    {
      id: 'nav-home',
      target: '[data-tour="nav-home"]',
      title: 'Home',
      content: 'Navigate back to the home page.',
      icon: 'i-heroicons-home',
      position: 'bottom'
    },
    {
      id: 'nav-about',
      target: '[data-tour="nav-about"]',
      title: 'About',
      content: 'Learn more about the application.',
      icon: 'i-heroicons-information-circle',
      position: 'bottom'
    },
    {
      id: 'nav-contact',
      target: '[data-tour="nav-contact"]',
      title: 'Contact',
      content: 'Get in touch with the team.',
      icon: 'i-heroicons-envelope',
      position: 'bottom'
    },
    {
      id: 'cta',
      target: '[data-tour="cta"]',
      title: 'Get Started',
      content: 'Click here to begin using the app.',
      icon: 'i-heroicons-rocket-launch',
      position: 'top'
    }
  ]
}
