# nuxt-guided-tour Sample Site

A minimal, standalone Nuxt site demonstrating how to integrate `nuxt-guided-tour` into your application. Use this as a quick-start reference.

## What This Sample Shows

- How to install and configure the `nuxt-guided-tour` module
- How to mark HTML elements with `data-tour` attributes
- How to define tour steps that point to those elements
- How to wire up the Welcome, Intro, Overlay, and Trigger components
- How the tour auto-starts for first-time visitors
- How to build a static site with `nuxt generate`

## Project Structure

```
sample/
├── app/
│   ├── app.vue              # Main app with tour wiring
│   ├── pages/
│   │   └── index.vue        # Home page with data-tour elements
│   └── components/
│       └── SampleTour.vue   # Tour logic isolated in a component
├── tour.config.ts            # Tour steps and intro slides
├── nuxt.config.ts            # Nuxt config with module registration
├── package.json
└── README.md                 # You are here
```

## Quick Start

### 1. Install dependencies

From the monorepo root:

```bash
pnpm install
```

Or if running standalone (copy this folder out of the monorepo):

```bash
pnpm install
```

### 2. Run in development mode

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The tour will auto-start for first-time visitors.

### 3. Generate a static site

```bash
pnpm generate
```

This creates a static site in `.output/public/` that can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.).

### 4. Preview the static site

```bash
pnpm preview
```

## How It Works

### Step 1: Register the module

In `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-guided-tour']
})
```

This auto-imports all `Tour*` components and the `useTour()` composable.

### Step 2: Mark elements with `data-tour` attributes

In your page templates, add `data-tour` attributes to any element you want to highlight:

```html
<header data-tour="header">...</header>
<nav data-tour="navigation">...</nav>
<section data-tour="hero">...</section>
<div data-tour="features">...</div>
<footer data-tour="footer">...</footer>
```

These are plain HTML data attributes — they don't affect styling or behavior until the tour activates.

### Step 3: Define tour steps

Create a `tour.config.ts` file mapping each `data-tour` attribute to a step:

```typescript
import type { TourConfig } from 'nuxt-guided-tour/dist/runtime/types'

export const tourConfig: TourConfig = {
  version: 1,              // Increment to force re-display
  autoStart: true,         // Auto-start for first-time users
  autoStartDelay: 800,     // Wait 800ms for UI to settle
  storageKeyPrefix: 'my-app-tour',  // localStorage key
  steps: [
    {
      id: 'header',
      target: '[data-tour="header"]',   // CSS selector
      title: 'Header',
      content: 'This is the app header.',
      icon: 'i-heroicons-home',
      position: 'bottom'    // Popover appears below the element
    },
    // ... more steps
  ]
}
```

### Step 4: Wire up components

The tour has three optional phases:
1. **Welcome** — asks if the user wants a tour
2. **Intro** — educational slides before the tour
3. **Tour steps** — the actual element-by-element walkthrough

```vue
<TourWelcome :is-visible="showWelcome" @start-tour="..." @skip-tour="..." />
<TourIntro :is-visible="showIntro" :slides="introSlides" @next="..." @skip="..." />
<TourOverlay :is-active="tour.isActive.value" :current-step="tour.currentStep.value" :progress="tour.progress.value" @next="tour.next" @previous="tour.previous" @cancel="tour.cancel" />
<TourTrigger @click="restartTour" />
```

### Step 5: Handle the flow

The typical flow:
1. On mount, check if tour should auto-start → show Welcome
2. User clicks "Start" → show Intro slides (or skip to tour)
3. User finishes slides → start tour with `tour.start()`
4. Tour marks completion in localStorage
5. Restart anytime with `tour.resetCompletion()`

## Key Concepts

### `data-tour` Attributes

Use `data-tour="unique-id"` on any element. The tour config references them with `target: '[data-tour="unique-id"]'`.

### localStorage Persistence

Tour completion is stored as `${storageKeyPrefix}-v${version}` in localStorage. Increment `version` to make all users see the tour again.

### Keyboard Navigation

- **Escape** — Cancel tour
- **ArrowRight** — Next step
- **ArrowLeft** — Previous step

### Overflow Detection

Elements with `overflow: hidden` are automatically detected. The highlight uses `outline` (not clipped) instead of `::before`.

## Customization Tips

- **No welcome modal?** Skip `TourWelcome` and call `tour.start()` directly.
- **No intro slides?** Skip `TourIntro` or pass empty `slides`.
- **Custom colors?** Override `[data-tour-active="true"]::before` in your CSS.
- **Custom announcer?** Pass an `announce` function in `TourConfig`.
