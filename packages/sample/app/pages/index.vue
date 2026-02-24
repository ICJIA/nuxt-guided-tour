<script setup lang="ts">
/**
 * Sample Home Page
 *
 * This page demonstrates how to add data-tour attributes to your HTML elements.
 * Each data-tour value matches a step ID in tour.config.ts.
 *
 * The key pattern is:
 *   1. Add data-tour="step-id" to any element you want to highlight
 *   2. Define a step in tour.config.ts with target: '[data-tour="step-id"]'
 *   3. Include the SampleTour component to manage the flow
 */

const tourComponent = ref<InstanceType<typeof SampleTour> | null>(null)

function restartTour() {
  tourComponent.value?.restartTour()
}
</script>

<template>
  <div class="sample-app">
    <!--
      STEP 1: Header
      data-tour="header" marks this element as a tour target.
      The tour.config.ts step with id:"header" will highlight this element.
    -->
    <header data-tour="header" class="sample-header">
      <div class="header-inner">
        <h1 class="logo">SampleApp</h1>
        <nav class="header-nav">
          <a href="#" data-tour="nav-home">Home</a>
          <a href="#" data-tour="nav-about">About</a>
          <a href="#" data-tour="nav-contact">Contact</a>
          <!--
            TourTrigger: A pre-built button to restart the tour.
            You can place this anywhere in your UI.
          -->
          <TourTrigger
            label="Tour"
            icon="i-heroicons-question-mark-circle"
            variant="soft"
            color="primary"
            size="sm"
            @click="restartTour"
          />
        </nav>
      </div>
    </header>

    <!--
      STEP 2: Hero Section
      data-tour="hero" makes this a tour target.
    -->
    <section data-tour="hero" class="sample-hero">
      <h2 class="hero-title">Build Amazing Apps</h2>
      <p class="hero-description">
        This is a sample Nuxt application demonstrating the nuxt-guided-tour module.
        Every element with a <code>data-tour</code> attribute can be highlighted in the guided tour.
      </p>
    </section>

    <!-- Launch Tour Card -->
    <section class="tour-launch-section">
      <div class="tour-launch-card" role="button" tabindex="0" @click="restartTour" @keydown.enter="restartTour">
        <UIcon name="i-heroicons-play-circle" class="tour-launch-icon" />
        <h3 class="tour-launch-title">Take the Guided Tour</h3>
        <p class="tour-launch-description">
          See how nuxt-guided-tour highlights elements, navigates steps, and provides an accessible onboarding experience.
        </p>
      </div>
    </section>

    <!--
      STEP 3: Features Grid
      data-tour="features" marks the entire grid as one tour target.
      You could also put data-tour on individual cards for more granular steps.
    -->
    <section data-tour="features" class="sample-features">
      <h3 class="section-title">Features</h3>
      <div class="features-grid">
        <div class="feature-card">
          <UIcon name="i-heroicons-bolt" class="feature-icon" />
          <h4>Fast</h4>
          <p>Lightning-fast performance with Nuxt 3 and Vue 3.</p>
        </div>
        <div class="feature-card">
          <UIcon name="i-heroicons-shield-check" class="feature-icon" />
          <h4>Accessible</h4>
          <p>WCAG 2.1 AA compliant with full keyboard and screen reader support.</p>
        </div>
        <div class="feature-card">
          <UIcon name="i-heroicons-puzzle-piece" class="feature-icon" />
          <h4>Customizable</h4>
          <p>Every component accepts props for full customization.</p>
        </div>
      </div>
    </section>

    <!--
      STEP 4: Call to Action
      data-tour="cta" on a button element.
    -->
    <section class="sample-cta-section">
      <UButton
        data-tour="cta"
        color="primary"
        size="xl"
        icon="i-heroicons-rocket-launch"
        @click="restartTour"
      >
        Get Started
      </UButton>
    </section>

    <!--
      STEP 5: Footer
      data-tour="footer" marks the footer.
    -->
    <footer data-tour="footer" class="sample-footer">
      <p>nuxt-guided-tour sample site &mdash; MIT License</p>
      <p class="footer-hint">
        View <code>tour.config.ts</code> to see how these tour steps are defined.
      </p>
    </footer>

    <!--
      SampleTour: The component that manages the entire tour flow.
      It renders the Welcome modal, Intro slides, and Tour overlay.
    -->
    <SampleTour ref="tourComponent" />
  </div>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sample-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--ui-bg);
  color: var(--ui-text);
}

/* Header */
.sample-header {
  background: var(--ui-bg-elevated);
  border-bottom: 1px solid var(--ui-border);
  padding: 0 1.5rem;
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, var(--ui-primary) 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.header-nav a {
  color: var(--ui-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.header-nav a:hover {
  color: var(--ui-text);
}

/* Hero */
.sample-hero {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 640px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.1;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--ui-text-muted);
  margin: 0;
}

.hero-description code {
  padding: 0.125rem 0.375rem;
  background: var(--ui-bg-elevated);
  border-radius: 0.25rem;
  font-size: 0.9em;
}

/* Tour Launch Card */
.tour-launch-section {
  display: flex;
  justify-content: center;
  padding: 0 2rem 3rem;
}

.tour-launch-card {
  max-width: 420px;
  width: 100%;
  padding: 2rem;
  background: var(--ui-bg-elevated);
  border: 2px solid var(--ui-primary);
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.tour-launch-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.tour-launch-card:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}

.tour-launch-icon {
  width: 3rem;
  height: 3rem;
  color: var(--ui-primary);
  margin-bottom: 0.75rem;
}

.tour-launch-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.tour-launch-description {
  font-size: 0.875rem;
  color: var(--ui-text-muted);
  margin: 0;
  line-height: 1.6;
}

/* Features */
.sample-features {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.5rem;
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: 0.75rem;
  text-align: center;
}

.feature-icon {
  width: 2rem;
  height: 2rem;
  color: var(--ui-primary);
  margin-bottom: 0.75rem;
}

.feature-card h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.feature-card p {
  font-size: 0.875rem;
  color: var(--ui-text-muted);
  margin: 0;
  line-height: 1.5;
}

/* CTA */
.sample-cta-section {
  text-align: center;
  padding: 2rem 2rem 4rem;
}

/* Footer */
.sample-footer {
  margin-top: auto;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid var(--ui-border);
  color: var(--ui-text-dimmed);
  font-size: 0.875rem;
}

.sample-footer p {
  margin: 0.25rem 0;
}

.footer-hint code {
  padding: 0.125rem 0.375rem;
  background: var(--ui-bg-elevated);
  border-radius: 0.25rem;
  font-size: 0.9em;
}
</style>
