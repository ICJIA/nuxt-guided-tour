<script setup lang="ts">
/**
 * SampleTour — Manages the full tour flow (Welcome → Intro → Steps).
 *
 * This component encapsulates all tour logic so your page stays clean.
 * It handles:
 *   1. Auto-starting the welcome modal for first-time visitors
 *   2. Showing intro slides (optional)
 *   3. Running the step-by-step tour
 *   4. Restarting the tour on demand
 */

import { tourConfig, introSlides } from '~/tour.config'

const tour = useTour(tourConfig)

// Flow state: which phase is visible
const showWelcome = ref(false)
const showIntro = ref(false)

// Auto-start: show welcome modal for first-time visitors
onMounted(() => {
  if (tour.autoStart && !tour.hasCompletedTour.value) {
    setTimeout(() => {
      showWelcome.value = true
    }, tour.autoStartDelay)
  }
})

// --- Flow handlers ---

/** User chose "Start" from welcome modal */
function handleWelcomeStart() {
  showWelcome.value = false

  // If we have intro slides, show them first
  if (introSlides.length > 0) {
    showIntro.value = true
  } else {
    // No intro slides — start tour immediately
    tour.start()
  }
}

/** User chose "Skip" from welcome modal */
function handleWelcomeSkip() {
  showWelcome.value = false
  tour.markAsSeen()
}

/** User finished all intro slides */
function handleIntroComplete() {
  showIntro.value = false
  tour.start()
}

/** User skipped from intro slides */
function handleIntroSkip() {
  showIntro.value = false
  tour.markAsSeen()
}

/** Restart the tour from the beginning */
function restartTour() {
  tour.resetCompletion()
  showWelcome.value = true
}

// Expose restart method so parent page can trigger it
defineExpose({ restartTour })
</script>

<template>
  <!-- Phase 1: Welcome Modal -->
  <TourWelcome
    :is-visible="showWelcome"
    title="Welcome to the Sample App!"
    description="This demo shows how nuxt-guided-tour works. Would you like a quick tour of the page?"
    subdescription="The tour highlights each section and explains what it does. Takes about 30 seconds."
    start-label="Show me around"
    skip-label="No thanks"
    @start-tour="handleWelcomeStart"
    @skip-tour="handleWelcomeSkip"
  />

  <!-- Phase 2: Intro Slides (optional) -->
  <TourIntro
    :is-visible="showIntro"
    :slides="introSlides"
    @next="handleIntroComplete"
    @skip="handleIntroSkip"
  />

  <!-- Phase 3: Step-by-Step Tour Overlay -->
  <TourOverlay
    :is-active="tour.isActive.value"
    :current-step="tour.currentStep.value"
    :progress="tour.progress.value"
    @next="tour.next"
    @previous="tour.previous"
    @cancel="tour.cancel"
  />
</template>
