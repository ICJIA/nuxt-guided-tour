# nuxt-guided-tour

[![npm version](https://img.shields.io/npm/v/nuxt-guided-tour.svg)](https://www.npmjs.com/package/nuxt-guided-tour)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A guided tour/onboarding module for Nuxt applications. WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.

**[Live Demo](https://nuxt-guided-tour.netlify.app)**

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
  modules: ['nuxt-guided-tour'],
  guidedTour: {
    // Optional: customize the highlight ring color (default: '#22c55e' green)
    highlightColor: '#22c55e',
    // Optional: brighter variant for the pulse animation peak
    // (auto-derived from highlightColor if omitted)
    highlightColorBright: '#4ade80',
  }
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

## Customizing Colors

The tour highlight defaults to green (`#22c55e`). There are three ways to customize it, from simplest to most flexible:

### Option 1: nuxt.config.ts (quickest)

Set the primary colors in your Nuxt config:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-guided-tour'],
  guidedTour: {
    highlightColor: '#e11d48',       // rose-600
    highlightColorBright: '#fb7185', // rose-400
  }
})
```

### Option 2: CSS variables (more control)

Override any `--tour-*` variable in your own CSS. This gives you control over colors, geometry, glow intensities, and animation:

```css
:root {
  /* Primary colors */
  --tour-highlight: #2563eb;
  --tour-highlight-bright: #60a5fa;

  /* Ring geometry */
  --tour-border-width: 4px;
  --tour-border-radius: 8px;

  /* Glow intensities (0%–100%) */
  --tour-glow-ring-opacity: 50%;
  --tour-glow-near-opacity: 80%;

  /* Animation */
  --tour-pulse-duration: 1.5s;
  --tour-pulse-scale: 1.02;

  /* Dark mode (inherits from above if not set) */
  --tour-dark-highlight: #3b82f6;
  --tour-dark-highlight-bright: #93c5fd;
}
```

### Option 3: Theme file (full control)

The module ships a fully documented theme template. Copy it into your project and uncomment the variables you want to change:

```bash
cp node_modules/nuxt-guided-tour/dist/runtime/styles/tour-theme.css assets/css/tour-theme.css
```

Then import it in your `nuxt.config.ts`:

```ts
css: ['~/assets/css/tour-theme.css']
```

Or append it to your existing CSS file:

```css
@import 'nuxt-guided-tour/theme';
```

The theme file documents every available variable with descriptions and preset color palettes (green, blue, purple, rose, amber, cyan).

### All CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--tour-highlight` | `#22c55e` | Base highlight ring color |
| `--tour-highlight-bright` | `#4ade80` | Brighter pulse peak color |
| `--tour-border-width` | `5px` | Highlight border thickness |
| `--tour-border-radius` | `10px` | Highlight border rounding |
| `--tour-ring-offset` | `-8px` | Ring distance from element edge |
| `--tour-ring-spread` | `8px` | Outer ring spread at rest |
| `--tour-ring-spread-pulse` | `12px` | Outer ring spread at pulse peak |
| `--tour-glow-ring-opacity` | `60%` | Ring glow intensity |
| `--tour-glow-near-opacity` | `90%` | Close glow intensity |
| `--tour-glow-mid-opacity` | `60%` | Medium glow intensity |
| `--tour-glow-far-opacity` | `30%` | Far glow intensity |
| `--tour-glow-inset-opacity` | `20%` | Inset glow intensity |
| `--tour-glow-near` | `40px` | Close glow radius |
| `--tour-glow-mid` | `80px` | Medium glow radius |
| `--tour-glow-far` | `120px` | Far glow radius |
| `--tour-glow-inset` | `25px` | Inset glow radius |
| `--tour-pulse-duration` | `1s` | Pulse animation cycle time |
| `--tour-pulse-scale` | `1.03` | Scale factor at pulse peak |
| `--tour-dark-highlight` | inherited | Dark mode base color |
| `--tour-dark-highlight-bright` | inherited | Dark mode bright color |
| `--tour-dark-ring-spread` | `10px` | Dark mode ring spread |
| `--tour-dark-ring-spread-pulse` | `14px` | Dark mode pulse spread |
| `--tour-dark-pulse-scale` | `1.04` | Dark mode pulse scale |
| `--tour-focus-width` | `3px` | Keyboard focus outline width |
| `--tour-focus-offset` | `6px` | Keyboard focus outline gap |
| `--tour-backdrop-color` | `rgba(0,0,0,0.5)` | Overlay backdrop color |
| `--tour-z-popover` | `99999` | Popover z-index |
| `--tour-z-highlight` | `9998` | Highlighted element z-index |

### Module Options

| Option | Default | Description |
|--------|---------|-------------|
| `highlightColor` | `#22c55e` | Sets `--tour-highlight` |
| `highlightColorBright` | `#4ade80` | Sets `--tour-highlight-bright` (auto-derived if omitted) |
| `prefix` | `Tour` | Component name prefix (`TourOverlay`, `TourTrigger`, etc.) |

---

## Package Size

The published npm package is **~12 kB** gzipped (~52 kB unpacked). It has two runtime dependencies (`@nuxt/kit` and `@nuxt/schema`) and requires `nuxt`, `@nuxt/ui`, and `@vueuse/core` as peer dependencies.

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

## Publishing to npm

A publish script is included at `packages/nuxt-guided-tour/publish.sh`. It bumps the version, builds, runs a dry run, and publishes on confirmation.

```bash
cd packages/nuxt-guided-tour
./publish.sh
```

The script will:
1. Show the current version and prompt for **patch**, **minor**, or **major** bump
2. Update `package.json` and build the module
3. Run `npm publish --dry-run`
4. If the dry run passes, ask for confirmation before publishing
5. If the dry run fails, revert the version automatically

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
