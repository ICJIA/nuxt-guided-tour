# nuxt-guided-tour

[![npm version](https://img.shields.io/npm/v/nuxt-guided-tour.svg)](https://www.npmjs.com/package/nuxt-guided-tour)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A guided tour/onboarding module for Nuxt applications. WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.

## Features

- Step-by-step guided tours with vivid highlight rings
- Optional welcome modal and informational intro slides
- Keyboard navigation (Arrow keys, Escape)
- Built-in ARIA live region announcements for screen readers
- Dark mode support with adjusted colors
- Reduced motion support (WCAG 2.3.3)
- localStorage persistence with versioned keys
- Auto-detection of `overflow:hidden` elements (uses outline instead of pseudo-elements)
- Fully customizable via props, CSS overrides, and custom announce functions

## Documentation

Full documentation: [nuxt-guided-tour.icjia.app](https://nuxt-guided-tour.icjia.app)

---

## Monorepo Structure

This repository is a pnpm workspace monorepo containing:

```
nuxt-guided-tour/
├── packages/
│   ├── nuxt-guided-tour/   # The npm package (module source)
│   │   ├── src/             # Module + runtime source code
│   │   └── playground/      # Dev playground for testing
│   ├── docs/                # Documentation website (Nuxt Content)
│   └── sample/              # Sample Nuxt site showing full implementation
├── docs/                    # Design docs and implementation plan
├── pnpm-workspace.yaml
├── package.json
├── LICENSE
└── README.md
```

---

## Quick Start (Consumers)

Install `nuxt-guided-tour` in your Nuxt app:

```bash
# npm
npm install nuxt-guided-tour @nuxt/ui @vueuse/core

# pnpm
pnpm add nuxt-guided-tour @nuxt/ui @vueuse/core

# yarn
yarn add nuxt-guided-tour @nuxt/ui @vueuse/core
```

Add to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-guided-tour']
})
```

Define tour steps:

```ts
// tour.config.ts
import type { TourConfig } from 'nuxt-guided-tour/dist/runtime/types'

export const tourConfig: TourConfig = {
  version: 1,
  autoStart: true,
  autoStartDelay: 800,
  storageKeyPrefix: 'my-app-tour',
  steps: [
    {
      id: 'header',
      target: '[data-tour="header"]',
      title: 'App Header',
      content: 'This is the header of our application.',
      icon: 'i-heroicons-home',
      position: 'bottom'
    }
    // ... more steps
  ]
}
```

Mark elements in your template:

```html
<header data-tour="header">My App</header>
```

Wire up components:

```vue
<script setup>
import { tourConfig } from '~/tour.config'
const tour = useTour(tourConfig)

onMounted(() => {
  if (tour.autoStart && !tour.hasCompletedTour.value) {
    setTimeout(() => tour.start(), tour.autoStartDelay)
  }
})
</script>

<template>
  <header data-tour="header">My App</header>

  <TourOverlay
    :is-active="tour.isActive.value"
    :current-step="tour.currentStep.value"
    :progress="tour.progress.value"
    @next="tour.next"
    @previous="tour.previous"
    @cancel="tour.cancel"
  />
</template>
```

---

## Running the Sample Site

The `packages/sample/` directory contains a complete, minimal Nuxt site demonstrating the full guided tour implementation. Use it as a reference for integrating the tour into your own app.

### Development Mode

```bash
# From the monorepo root:
pnpm install
pnpm -C packages/nuxt-guided-tour dev:prepare   # Stub the module first
pnpm sample:dev                                  # Start the sample site

# Or using npx if pnpm is not globally installed:
npx pnpm install
npx pnpm -C packages/nuxt-guided-tour dev:prepare
npx pnpm sample:dev
```

Open [http://localhost:3000](http://localhost:3000). The tour auto-starts for first-time visitors.

### Static Generation

```bash
pnpm sample:generate
```

This creates a static site in `packages/sample/.output/public/` deployable to any static host.

### Preview Static Build

```bash
npx pnpm -C packages/sample preview
```

### What the Sample Shows

- How to mark HTML elements with `data-tour="step-id"` attributes
- How to define tour steps in `tour.config.ts`
- How to wire up `TourWelcome`, `TourIntro`, `TourOverlay`, and `TourTrigger` components
- How the Welcome → Intro Slides → Tour Steps flow works
- How localStorage persistence prevents re-showing to returning users
- How to restart the tour programmatically

See `packages/sample/README.md` for detailed instructions.

---

## Running the Documentation Site

The `packages/docs/` directory is a Nuxt Content site with full API documentation.

### Development

```bash
pnpm docs:dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the docs locally.

### Generate Static Site for Deployment

```bash
pnpm docs:generate
```

Output goes to `packages/docs/.output/public/`.

### Deploy to Netlify

1. Build the docs:
   ```bash
   pnpm docs:generate
   ```

2. Deploy the output directory. In Netlify:
   - **Build command**: `pnpm docs:generate`
   - **Publish directory**: `packages/docs/.output/public`
   - **Base directory**: (root of this repo)

3. Configure your custom domain (e.g., `nuxt-guided-tour.icjia.app`) in Netlify's domain settings.

Alternatively, use the Netlify CLI:
```bash
npx netlify deploy --dir packages/docs/.output/public --prod
```

---

## Package Manager Support

This monorepo supports **pnpm** (recommended), **yarn classic (v1)**, and **npm**:

| Manager | Workspace Config | Install | Run Script |
|---------|-----------------|---------|------------|
| pnpm | `pnpm-workspace.yaml` | `pnpm install` | `pnpm -C packages/sample dev` |
| yarn v1 | `workspaces` in `package.json` | `yarn install` | `yarn workspace nuxt-guided-tour-sample dev` |
| npm | `workspaces` in `package.json` | `npm install` | `npm -w packages/sample run dev` |

Both `pnpm-workspace.yaml` and the `"workspaces"` field in `package.json` are configured, so any package manager will resolve local workspace packages correctly.

### Yarn Classic (v1) Usage

```bash
yarn install
yarn workspace nuxt-guided-tour dev:prepare
yarn workspace nuxt-guided-tour-sample dev
yarn workspace nuxt-guided-tour-docs dev
```

---

## Development (Contributing)

### Prerequisites

- Node.js >= 18
- pnpm >= 8 (recommended), yarn >= 1.22, or npm >= 9

### Setup

```bash
git clone https://github.com/ICJIA/nuxt-guided-tour.git
cd nuxt-guided-tour

# pnpm (recommended)
pnpm install

# or yarn
yarn install

# or npm
npm install
```

### Build the Module

```bash
pnpm -C packages/nuxt-guided-tour dev:prepare   # Stub for dev
pnpm build                                       # Full build
```

### Run the Playground

The playground is a minimal test app inside the module package:

```bash
pnpm dev
```

### Module Package Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run playground in dev mode |
| `pnpm dev:prepare` | Stub module + prepare playground types |
| `pnpm build` | Build the module to `dist/` |
| `pnpm docs:dev` | Run docs site in dev mode |
| `pnpm docs:generate` | Generate static docs site |
| `pnpm sample:dev` | Run sample site in dev mode |
| `pnpm sample:generate` | Generate static sample site |

---

## Components

| Component | Description |
|-----------|-------------|
| `TourOverlay` | Main tour dialog with step content, navigation, and keyboard handling |
| `TourTrigger` | Button to manually start/restart the tour |
| `TourWelcome` | Optional welcome modal asking if users want to take the tour |
| `TourIntro` | Optional informational slides before the hands-on tour |

## Composable

### `useTour(config: TourConfig)`

Returns tour state and navigation methods:

- **State**: `isActive`, `currentStep`, `currentStepIndex`, `progress`, `hasCompletedTour`
- **Navigation**: `start()`, `next()`, `previous()`, `cancel()`, `complete()`, `goToStep()`
- **Utilities**: `getStepById()`, `getStepIndex()`, `markAsSeen()`, `resetCompletion()`

---

## Peer Dependencies

| Package | Version | Required |
|---------|---------|----------|
| `nuxt` | `>= 3.0.0` | Yes |
| `@nuxt/ui` | `>= 3.0.0` | Yes |
| `@vueuse/core` | `>= 10.0.0` | Yes |

## License

[MIT](./LICENSE)
