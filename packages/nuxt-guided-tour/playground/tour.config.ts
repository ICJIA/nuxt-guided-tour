import type { TourConfig, IntroSlide } from '../src/runtime/types'

export const introSlides: IntroSlide[] = [
  {
    title: 'Welcome to the Demo',
    icon: 'i-heroicons-sparkles',
    content: [
      'This is a playground for the nuxt-guided-tour module.',
      'These intro slides are completely optional and customizable.'
    ],
    footer: 'You can add as many or as few slides as you like.'
  },
  {
    title: 'How It Works',
    icon: 'i-heroicons-light-bulb',
    content: [
      'The tour highlights elements on your page and walks users through your app\'s features.'
    ],
    benefits: [
      {
        icon: 'i-heroicons-cursor-arrow-rays',
        title: 'Step-by-Step',
        description: 'Guide users through your UI one element at a time.'
      },
      {
        icon: 'i-heroicons-key',
        title: 'Keyboard Accessible',
        description: 'Full keyboard navigation with Arrow keys and Escape.'
      },
      {
        icon: 'i-heroicons-moon',
        title: 'Dark Mode',
        description: 'Automatically adapts to light and dark themes.'
      }
    ]
  }
]

export const tourConfig: TourConfig = {
  version: 1,
  autoStart: true,
  autoStartDelay: 800,
  storageKeyPrefix: 'playground-tour',
  steps: [
    {
      id: 'header',
      target: '[data-tour="header"]',
      title: 'App Header',
      content: 'This is the header area. It typically contains your logo and navigation.',
      icon: 'i-heroicons-bars-3',
      position: 'bottom'
    },
    {
      id: 'main-content',
      target: '[data-tour="main-content"]',
      title: 'Main Content',
      content: 'This is your main content area where the primary UI lives.',
      icon: 'i-heroicons-document-text',
      position: 'bottom'
    },
    {
      id: 'feature-1',
      target: '[data-tour="feature-1"]',
      title: 'Feature Card',
      content: 'Each feature card highlights a capability. The tour can point to any element with a data-tour attribute.',
      icon: 'i-heroicons-star',
      position: 'right',
      tip: 'Tip: Use descriptive IDs for your data-tour attributes.'
    },
    {
      id: 'action-button',
      target: '[data-tour="action-button"]',
      title: 'Action Button',
      content: 'Buttons and interactive elements can be highlighted too. Users can still interact with them.',
      icon: 'i-heroicons-cursor-arrow-ripple',
      position: 'top',
      shortcuts: [
        { label: 'Submit', mac: ['\u2318', 'Enter'], win: ['Ctrl', 'Enter'] }
      ]
    },
    {
      id: 'sidebar',
      target: '[data-tour="sidebar"]',
      title: 'Sidebar',
      content: 'The sidebar provides quick navigation. Elements with overflow:hidden are automatically detected and highlighted with outline instead.',
      icon: 'i-heroicons-bars-3-bottom-left',
      position: 'right'
    },
    {
      id: 'footer',
      target: '[data-tour="footer"]',
      title: 'Footer',
      content: 'That\'s the end of this demo tour! In a real app, you would guide users through your actual features.',
      icon: 'i-heroicons-check-circle',
      position: 'top'
    }
  ]
}
