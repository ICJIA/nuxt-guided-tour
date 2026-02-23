<template>
  <div class="hero">
    <div class="hero-content">
      <div class="hero-badge">
        <UIcon name="i-heroicons-map" class="hero-badge-icon" />
        <span>Nuxt Module</span>
      </div>

      <h1 class="hero-title">nuxt-guided-tour</h1>

      <p class="hero-description">
        A guided tour and onboarding module for Nuxt applications.
        WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.
      </p>

      <div class="hero-install">
        <code class="hero-install-code">npx nuxi module add nuxt-guided-tour</code>
      </div>

      <div class="hero-actions">
        <NuxtLink to="/getting-started">
          <UButton color="primary" size="lg" icon="i-heroicons-arrow-right" trailing>
            Get Started
          </UButton>
        </NuxtLink>
        <NuxtLink to="https://github.com/ICJIA/nuxt-guided-tour" external target="_blank">
          <UButton variant="outline" color="neutral" size="lg" icon="i-simple-icons-github">
            GitHub
          </UButton>
        </NuxtLink>
      </div>

      <div class="hero-features">
        <div class="hero-feature">
          <UIcon name="i-heroicons-cursor-arrow-rays" class="hero-feature-icon" />
          <h3>Step-by-Step</h3>
          <p>Highlight elements and walk users through your UI.</p>
        </div>
        <div class="hero-feature">
          <UIcon name="i-heroicons-key" class="hero-feature-icon" />
          <h3>Accessible</h3>
          <p>WCAG 2.1 AA, ARIA live regions, keyboard navigation.</p>
        </div>
        <div class="hero-feature">
          <UIcon name="i-heroicons-moon" class="hero-feature-icon" />
          <h3>Dark Mode</h3>
          <p>Automatically adapts to light and dark themes.</p>
        </div>
        <div class="hero-feature">
          <UIcon name="i-heroicons-puzzle-piece" class="hero-feature-icon" />
          <h3>Customizable</h3>
          <p>Welcome modal, intro slides, custom styling.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 720px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ui-primary);
  margin-bottom: 1.5rem;
}

.hero-badge-icon {
  width: 1rem;
  height: 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.1;
  background: linear-gradient(135deg, var(--ui-primary) 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--ui-text-muted);
  margin: 0 0 2rem;
}

.hero-install {
  margin-bottom: 2rem;
}

.hero-install-code {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9375rem;
  color: var(--ui-text);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  text-align: left;
}

.hero-feature {
  padding: 1.25rem;
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: 0.75rem;
}

.hero-feature-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--ui-primary);
  margin-bottom: 0.75rem;
}

.hero-feature h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
}

.hero-feature p {
  font-size: 0.8125rem;
  color: var(--ui-text-muted);
  margin: 0;
  line-height: 1.5;
}
</style>
