import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { TourConfig, TourStep, TourProgress, UseTourReturn } from '../types'

/**
 * Creates a built-in ARIA live region announcer.
 * Reuses existing `#nuxt-guided-tour-announcer` if present.
 */
function createBuiltInAnnouncer(): (message: string, priority?: 'polite' | 'assertive') => void {
  let el: HTMLElement | null = null

  function getOrCreate(): HTMLElement {
    if (el && document.body.contains(el)) return el

    el = document.getElementById('nuxt-guided-tour-announcer') as HTMLElement | null
    if (el) return el

    el = document.createElement('div')
    el.id = 'nuxt-guided-tour-announcer'
    el.setAttribute('aria-live', 'polite')
    el.setAttribute('aria-atomic', 'true')
    el.setAttribute('role', 'status')
    // Visually hidden but accessible to screen readers
    Object.assign(el.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0'
    })
    document.body.appendChild(el)
    return el
  }

  return (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof document === 'undefined') return
    const announcer = getOrCreate()
    announcer.setAttribute('aria-live', priority)
    // Clear then set to trigger re-announcement
    announcer.textContent = ''
    requestAnimationFrame(() => {
      announcer.textContent = message
    })
  }
}

/**
 * Creates a tour instance with the provided configuration.
 */
export function useTour(config: TourConfig): UseTourReturn {
  const { steps, version, autoStart, autoStartDelay, storageKeyPrefix } = config

  const storageKey = `${storageKeyPrefix}-v${version}`

  // State
  const currentStepIndex = ref(-1)
  const isActive = computed(() => currentStepIndex.value >= 0)
  const hasCompletedTour = useLocalStorage(storageKey, false)

  // Track previously focused element for focus restoration
  let previouslyFocused: HTMLElement | null = null

  // Use custom announce or built-in announcer
  const announce = config.announce ?? createBuiltInAnnouncer()

  const currentStep = computed<TourStep | null>(() => {
    if (currentStepIndex.value < 0 || currentStepIndex.value >= steps.length) {
      return null
    }
    return steps[currentStepIndex.value] ?? null
  })

  const progress = computed<TourProgress>(() => ({
    current: currentStepIndex.value + 1,
    total: steps.length,
    percentage: steps.length > 0
      ? Math.round(((currentStepIndex.value + 1) / steps.length) * 100)
      : 0
  }))

  function getStepById(id: string): TourStep | undefined {
    return steps.find(s => s.id === id)
  }

  function getStepIndex(id: string): number {
    return steps.findIndex(s => s.id === id)
  }

  /**
   * Highlight the current target element.
   * Detects overflow:hidden and sets data-tour-overflow for outline-based highlighting.
   */
  function highlightTarget(): void {
    const step = currentStep.value
    if (!step) return

    const el = document.querySelector(step.target) as HTMLElement | null
    if (el && step.highlight !== false) {
      el.setAttribute('data-tour-active', 'true')

      // Detect overflow:hidden and mark for outline-based highlight
      const style = window.getComputedStyle(el)
      if (style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') {
        el.setAttribute('data-tour-overflow', 'true')
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }

  function clearHighlight(): void {
    document.querySelectorAll('[data-tour-active]').forEach(el => {
      el.removeAttribute('data-tour-active')
      el.removeAttribute('data-tour-overflow')
    })
  }

  function restoreFocus(): void {
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      setTimeout(() => {
        previouslyFocused?.focus()
      }, 50)
    }
  }

  function announceStep(): void {
    const step = currentStep.value
    if (step) {
      const message = `Tour step ${progress.value.current} of ${progress.value.total}: ${step.title}. ${step.content}`
      announce(message)
    }
  }

  function start(): void {
    previouslyFocused = document.activeElement as HTMLElement
    currentStepIndex.value = 0
    nextTick(() => {
      highlightTarget()
      announceStep()
    })
  }

  function next(): void {
    clearHighlight()
    if (currentStepIndex.value < steps.length - 1) {
      currentStepIndex.value++
      nextTick(() => {
        highlightTarget()
        announceStep()
      })
    } else {
      complete()
    }
  }

  function previous(): void {
    if (currentStepIndex.value > 0) {
      clearHighlight()
      currentStepIndex.value--
      nextTick(() => {
        highlightTarget()
        announceStep()
      })
    }
  }

  function goToStep(index: number): void {
    if (index >= 0 && index < steps.length) {
      clearHighlight()
      currentStepIndex.value = index
      nextTick(() => {
        highlightTarget()
        announceStep()
      })
    }
  }

  function markAsSeen(): void {
    hasCompletedTour.value = true
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, 'true')
      } catch {
        // localStorage may be unavailable
      }
    }
  }

  function resetCompletion(): void {
    hasCompletedTour.value = false
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey)
      } catch {
        // localStorage may be unavailable
      }
    }
  }

  function cancel(): void {
    clearHighlight()
    markAsSeen()
    currentStepIndex.value = -1
    restoreFocus()
    announce('Tour cancelled. You can restart it anytime from the Tour button.')
  }

  function complete(): void {
    clearHighlight()
    markAsSeen()
    currentStepIndex.value = -1
    restoreFocus()
    announce('Tour complete!')
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (!isActive.value) return

    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        cancel()
        break
      case 'ArrowRight':
        if (!['INPUT', 'BUTTON', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) {
          event.preventDefault()
          next()
        }
        break
      case 'ArrowLeft':
        if (!['INPUT', 'BUTTON', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) {
          event.preventDefault()
          previous()
        }
        break
    }
  }

  // Development mode validation
  if (process.dev) {
    onMounted(() => {
      setTimeout(() => {
        for (const step of steps) {
          const el = document.querySelector(step.target)
          if (!el) {
            console.warn(`[nuxt-guided-tour] Missing target for step "${step.id}": ${step.target}`)
          }
        }
      }, 1000)
    })
  }

  return {
    steps,
    version,
    autoStart,
    autoStartDelay,
    currentStepIndex,
    currentStep,
    isActive,
    hasCompletedTour,
    progress,
    start,
    next,
    previous,
    cancel,
    complete,
    goToStep,
    getStepById,
    getStepIndex,
    handleKeydown,
    markAsSeen,
    resetCompletion
  }
}
