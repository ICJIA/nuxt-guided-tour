# Plan: `nuxt-guided-tour` — Nuxt Module + Documentation Site

## Context

The ICJIA Markdown Editor (`/Volumes/satechi/webdev/icjia-markdown-editor-2026`) has a reusable onboarding tour module in `app/modules/tour/` (~3,000 lines across 9 files). We're extracting it into a standalone Nuxt module published to npm as `nuxt-guided-tour`, with a documentation website deployed to `nuxt-guided-tour.icjia.app`.

**Repo**: `github.com/ICJIA/nuxt-guided-tour` (monorepo with pnpm workspaces)
**npm**: `nuxt-guided-tour` (unscoped, available)
**Docs site**: `nuxt-guided-tour.icjia.app` (Netlify, CNAME configured by user)

## Monorepo Structure

```
nuxt-guided-tour/
├── packages/
│   ├── nuxt-guided-tour/        # npm package
│   │   ├── src/
│   │   │   ├── module.ts        # defineNuxtModule
│   │   │   └── runtime/
│   │   │       ├── types.ts
│   │   │       ├── composables/useTour.ts
│   │   │       ├── components/
│   │   │       │   ├── TourOverlay.vue
│   │   │       │   ├── TourTrigger.vue
│   │   │       │   ├── TourWelcome.vue
│   │   │       │   └── TourIntro.vue
│   │   │       └── styles/tour.css
│   │   ├── playground/
│   │   │   ├── app.vue
│   │   │   ├── nuxt.config.ts
│   │   │   └── tour.config.ts
│   │   ├── package.json
│   │   ├── build.config.ts
│   │   └── tsconfig.json
│   └── docs/                    # Documentation website
│       ├── app/
│       │   ├── app.vue
│       │   ├── app.config.ts
│       │   ├── layouts/default.vue
│       │   ├── pages/[...slug].vue
│       │   └── components/
│       │       ├── AppHeader.vue
│       │       └── HeroSection.vue
│       ├── content/
│       │   ├── index.md
│       │   ├── 1.getting-started.md
│       │   ├── 2.configuration.md
│       │   ├── 3.components/
│       │   ├── 4.composables/
│       │   ├── 5.types.md
│       │   ├── 6.examples/
│       │   └── 7.faq.md
│       ├── nuxt.config.ts
│       ├── package.json
│       └── public/og-image.png
├── docs/                        # Design/plan docs (this folder)
│   └── PLAN.md
├── pnpm-workspace.yaml
├── package.json
├── LICENSE
└── README.md
```

---

## Implementation Steps

### Step 1: Scaffold monorepo — DONE
- [x] Root `package.json` (private, workspaces scripts)
- [x] `pnpm-workspace.yaml` pointing to `packages/*`
- [x] `.gitignore`, `LICENSE` (MIT)

### Step 2: Set up module package — DONE
- [x] `packages/nuxt-guided-tour/package.json` with deps
- [x] `build.config.ts` with `@nuxt/module-builder`
- [x] `tsconfig.json`

### Step 3: Write `src/module.ts` — DONE
- [x] `addComponentsDir()` for `src/runtime/components/` with configurable prefix (default `Tour`)
- [x] `addImports()` for `useTour` composable
- [x] Push `tour.css` into `nuxt.options.css`
- [x] `meta.configKey: 'guidedTour'`

### Step 4: Extract and refactor `types.ts` — DONE
- [x] Added optional `announce` to `TourConfig`
- [x] Added `IntroSlide` type and sub-types
- [x] Re-export all types from module entry

### Step 5: Extract and refactor `useTour.ts` — DONE
- [x] Removed `useAccessibility()` import
- [x] Added explicit `import { useLocalStorage } from '@vueuse/core'`
- [x] Added `createBuiltInAnnouncer()` function
- [x] Uses `config.announce ?? createBuiltInAnnouncer()`
- [x] In `highlightTarget()`: detects `overflow: hidden` elements
- [x] In `clearHighlight()`: also clears `data-tour-overflow` attributes

### Step 6: Copy `TourOverlay.vue` — DONE
- [x] Updated type import path
- [x] No structural changes needed

### Step 7: Copy `TourTrigger.vue` — DONE
- [x] Already fully generic

### Step 8: Refactor `TourWelcome.vue` — DONE
- [x] Added props: `title`, `description`, `subdescription`, `logoUrl`, `logoAlt`, `startLabel`, `skipLabel`
- [x] Replaced hardcoded ICJIA logo/title/text with prop bindings
- [x] `v-if="logoUrl"` on the logo element

### Step 9: Refactor `TourIntro.vue` — DONE
- [x] Added `slides` prop of type `IntroSlide[]`
- [x] Computed `totalSlides` from `props.slides.length`
- [x] Guard with `v-if="isVisible && slides.length > 0"`
- [x] Removed hardcoded `slides` const

### Step 10: Refactor `tour.css` — DONE
- [x] Removed app-specific selectors for `[data-tour="editor-pane"]` and `[data-tour="preview-pane"]`
- [x] Added generic `[data-tour-overflow="true"][data-tour-active="true"]` selectors
- [x] Kept all generic highlight ring, dark mode, and reduced motion styles

### Step 11: Create playground — DONE
- [x] `playground/nuxt.config.ts` referencing `../src/module`
- [x] `playground/app.vue` with demo layout, data-tour elements, full component wiring
- [x] `playground/tour.config.ts` with example steps and intro slides

### Step 12: Build and verify module
- [ ] `pnpm install` at root
- [ ] `pnpm dev:prepare` to stub module
- [ ] `pnpm dev` to test playground
- [ ] Verify components render, composable works, CSS highlight rings appear

### Step 13: Set up docs site (`packages/docs/`)
- [ ] `nuxt.config.ts` with `@nuxt/ui`, `@nuxt/content`, `nuxt-guided-tour` (workspace link)
- [ ] `app.config.ts` with green primary color, dark mode default
- [ ] `package.json` with all deps

### Step 14: Build docs layout
- [ ] `app/layouts/default.vue` — sidebar navigation + main content area
- [ ] `app/pages/[...slug].vue` — catch-all content renderer
- [ ] `app/components/AppHeader.vue` — logo, GitHub link, color mode toggle
- [ ] `app/components/HeroSection.vue` — landing page hero

### Step 15: Write documentation content
- [ ] **index.md** — Landing page hero content
- [ ] **getting-started.md** — Install, configure, minimal example
- [ ] **configuration.md** — TourConfig options, module options
- [ ] **components/** — One page per component with props/emits tables
- [ ] **composables/use-tour.md** — Full `useTour()` API
- [ ] **types.md** — All TypeScript type definitions
- [ ] **examples/** — Basic tour, custom welcome, custom intro, advanced patterns
- [ ] **faq.md** — Common questions

### Step 16: Deploy docs to Netlify
- [ ] `nuxi generate` for static output
- [ ] Deploy to Netlify
- [ ] User configures CNAME for `nuxt-guided-tour.icjia.app`

### Step 17: Create GitHub repo and push
- [ ] `gh repo create ICJIA/nuxt-guided-tour --public`
- [ ] Push all code
- [ ] Root README with badges and links

---

## Key Refactoring Details

### `useAccessibility()` decoupling (Step 5)
The built-in announcer creates a visually-hidden `<div>` with `aria-live="polite"` appended to `<body>`. Consuming apps can override by passing their own `announce` function in `TourConfig`. The ICJIA app would do:
```ts
const { announce } = useAccessibility()
const tour = useTour({ ...tourConfig, announce })
```

### `useLocalStorage` (Step 5)
Explicitly import from `@vueuse/core` instead of relying on auto-import.

### Overflow detection (Steps 5 + 10)
Instead of app-specific CSS selectors, the composable auto-detects overflow and sets `data-tour-overflow="true"`, and the CSS uses `outline` (which isn't clipped) instead of `::before`.

---

## Verification
1. **Module builds**: `pnpm -C packages/nuxt-guided-tour build` succeeds
2. **Playground works**: `pnpm dev` starts, tour runs end-to-end
3. **Keyboard nav**: Escape cancels, ArrowRight/Left navigates steps
4. **Accessibility**: Built-in ARIA announcer creates `#nuxt-guided-tour-announcer` element
5. **Docs build**: `pnpm -C packages/docs generate` produces static site
6. **Docs render**: All pages render with sidebar nav, code blocks, green accent, dark mode
