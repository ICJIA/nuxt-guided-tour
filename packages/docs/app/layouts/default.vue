<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="docs-layout">
    <header class="docs-header">
      <div class="docs-header-content">
        <NuxtLink to="/" class="docs-logo">
          <UIcon name="i-heroicons-map" class="docs-logo-icon" />
          <span>nuxt-guided-tour</span>
        </NuxtLink>
        <div class="docs-header-actions">
          <NuxtLink
            to="https://github.com/ICJIA/nuxt-guided-tour"
            external
            target="_blank"
            class="docs-github-link"
          >
            <UIcon name="i-simple-icons-github" class="docs-github-icon" />
          </NuxtLink>
          <UColorModeButton />
        </div>
      </div>
    </header>

    <div class="docs-body" :class="{ 'docs-body--home': isHome }">
      <aside v-if="!isHome" class="docs-sidebar">
        <nav class="docs-nav">
          <NuxtLink to="/getting-started" class="docs-nav-link">Getting Started</NuxtLink>
          <NuxtLink to="/configuration" class="docs-nav-link">Configuration</NuxtLink>

          <h4 class="docs-nav-heading">Components</h4>
          <NuxtLink to="/components/tour-overlay" class="docs-nav-link">TourOverlay</NuxtLink>
          <NuxtLink to="/components/tour-trigger" class="docs-nav-link">TourTrigger</NuxtLink>
          <NuxtLink to="/components/tour-welcome" class="docs-nav-link">TourWelcome</NuxtLink>
          <NuxtLink to="/components/tour-intro" class="docs-nav-link">TourIntro</NuxtLink>

          <h4 class="docs-nav-heading">Composables</h4>
          <NuxtLink to="/composables/use-tour" class="docs-nav-link">useTour()</NuxtLink>

          <NuxtLink to="/types" class="docs-nav-link">Types</NuxtLink>

          <h4 class="docs-nav-heading">Examples</h4>
          <NuxtLink to="/examples/basic-tour" class="docs-nav-link">Basic Tour</NuxtLink>
          <NuxtLink to="/examples/custom-welcome" class="docs-nav-link">Custom Welcome</NuxtLink>
          <NuxtLink to="/examples/intro-slides" class="docs-nav-link">Intro Slides</NuxtLink>

          <NuxtLink to="/faq" class="docs-nav-link">FAQ</NuxtLink>
        </nav>
      </aside>

      <main class="docs-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
.docs-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.docs-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ui-bg);
  border-bottom: 1px solid var(--ui-border);
  backdrop-filter: blur(8px);
}

.docs-header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.docs-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--ui-text);
  text-decoration: none;
}

.docs-logo-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--ui-primary);
}

.docs-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.docs-github-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: var(--ui-text-muted);
  border-radius: 0.375rem;
}

.docs-github-link:hover {
  color: var(--ui-text);
  background: var(--ui-bg-elevated);
}

.docs-github-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.docs-body {
  flex: 1;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.docs-body--home {
  max-width: none;
}

.docs-sidebar {
  width: 240px;
  flex-shrink: 0;
  padding: 1.5rem;
  border-right: 1px solid var(--ui-border);
  position: sticky;
  top: 3.5rem;
  height: calc(100vh - 3.5rem);
  overflow-y: auto;
}

.docs-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.docs-nav-heading {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ui-text-dimmed);
  margin: 1rem 0 0.25rem;
  padding: 0 0.75rem;
}

.docs-nav-link {
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: var(--ui-text-muted);
  text-decoration: none;
  border-radius: 0.375rem;
}

.docs-nav-link:hover {
  color: var(--ui-text);
  background: var(--ui-bg-elevated);
}

.docs-nav-link.router-link-active {
  color: var(--ui-primary);
  background: rgba(var(--ui-primary-rgb, 34, 197, 94), 0.1);
  font-weight: 500;
}

.docs-main {
  flex: 1;
  padding: 2rem;
  min-width: 0;
}

@media (max-width: 768px) {
  .docs-sidebar {
    display: none;
  }
}
</style>
