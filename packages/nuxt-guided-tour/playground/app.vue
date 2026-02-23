<script setup lang="ts">
import { tourConfig, introSlides } from './tour.config'

const tour = useTour(tourConfig)

// Tour flow state
const showWelcome = ref(false)
const showIntro = ref(false)

// Auto-start flow
onMounted(() => {
  if (tour.autoStart && !tour.hasCompletedTour.value) {
    setTimeout(() => {
      showWelcome.value = true
    }, tour.autoStartDelay)
  }
})

function handleStartFromWelcome() {
  showWelcome.value = false
  if (introSlides.length > 0) {
    showIntro.value = true
  } else {
    tour.start()
  }
}

function handleSkipFromWelcome() {
  showWelcome.value = false
  tour.markAsSeen()
}

function handleIntroComplete() {
  showIntro.value = false
  tour.start()
}

function handleIntroSkip() {
  showIntro.value = false
  tour.markAsSeen()
}

function handleRestartTour() {
  tour.resetCompletion()
  showWelcome.value = true
}
</script>

<template>
  <div class="playground-app">
    <!-- Header -->
    <header data-tour="header" class="app-header">
      <div class="header-content">
        <h1 class="header-title">nuxt-guided-tour Playground</h1>
        <TourTrigger
          label="Take a tour"
          icon="i-heroicons-question-mark-circle"
          variant="soft"
          color="primary"
          @click="handleRestartTour"
        />
      </div>
    </header>

    <div class="app-layout">
      <!-- Sidebar -->
      <aside data-tour="sidebar" class="app-sidebar">
        <nav>
          <h3 class="sidebar-title">Navigation</h3>
          <ul class="sidebar-nav">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main data-tour="main-content" class="app-main">
        <h2 class="main-title">Welcome to the Playground</h2>
        <p class="main-description">
          This is a demo of the nuxt-guided-tour module. Click "Take a tour" to see it in action.
        </p>

        <div class="features-grid">
          <div data-tour="feature-1" class="feature-card">
            <UIcon name="i-heroicons-sparkles" class="feature-icon" />
            <h3>Highlight Rings</h3>
            <p>Vivid orange pulsing highlights draw attention to target elements.</p>
          </div>
          <div class="feature-card">
            <UIcon name="i-heroicons-moon" class="feature-icon" />
            <h3>Dark Mode</h3>
            <p>Fully supports light and dark themes with adjusted colors.</p>
          </div>
          <div class="feature-card">
            <UIcon name="i-heroicons-key" class="feature-icon" />
            <h3>Keyboard Nav</h3>
            <p>Arrow keys, Escape, and full screen reader support.</p>
          </div>
        </div>

        <div class="action-area">
          <UButton
            data-tour="action-button"
            color="primary"
            size="lg"
            icon="i-heroicons-play"
            @click="handleRestartTour"
          >
            Start Demo Tour
          </UButton>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer data-tour="footer" class="app-footer">
      <p>nuxt-guided-tour playground &mdash; MIT License</p>
    </footer>

    <!-- Tour Components -->
    <TourWelcome
      :is-visible="showWelcome"
      title="Welcome to the Playground!"
      description="This demo shows how nuxt-guided-tour works. Would you like a quick tour?"
      subdescription="The tour takes about 30 seconds and shows you the key features."
      start-label="Let's go!"
      @start-tour="handleStartFromWelcome"
      @skip-tour="handleSkipFromWelcome"
    />

    <TourIntro
      :is-visible="showIntro"
      :slides="introSlides"
      @next="handleIntroComplete"
      @skip="handleIntroSkip"
    />

    <TourOverlay
      :is-active="tour.isActive.value"
      :current-step="tour.currentStep.value"
      :progress="tour.progress.value"
      @next="tour.next"
      @previous="tour.previous"
      @cancel="tour.cancel"
    />
  </div>
</template>

<style>
.playground-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--ui-bg);
  color: var(--ui-text);
}

.app-header {
  background: var(--ui-bg-elevated);
  border-bottom: 1px solid var(--ui-border);
  padding: 1rem 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.app-layout {
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-sidebar {
  width: 200px;
  padding: 1.5rem;
  border-right: 1px solid var(--ui-border);
  overflow: hidden;
}

.sidebar-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ui-text-dimmed);
  margin: 0 0 1rem;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-nav a {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: var(--ui-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
}

.sidebar-nav a:hover {
  background: var(--ui-bg-elevated);
  color: var(--ui-text);
}

.app-main {
  flex: 1;
  padding: 2rem;
}

.main-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.main-description {
  color: var(--ui-text-muted);
  margin: 0 0 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  padding: 1.5rem;
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: 0.75rem;
}

.feature-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.75rem 0 0.5rem;
}

.feature-card p {
  font-size: 0.875rem;
  color: var(--ui-text-muted);
  margin: 0;
  line-height: 1.5;
}

.feature-icon {
  width: 2rem;
  height: 2rem;
  color: var(--ui-primary);
}

.action-area {
  padding: 2rem 0;
}

.app-footer {
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid var(--ui-border);
  color: var(--ui-text-dimmed);
  font-size: 0.875rem;
}
</style>
