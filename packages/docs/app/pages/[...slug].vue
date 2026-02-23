<script setup lang="ts">
const route = useRoute()
const path = computed(() => {
  const slug = route.params.slug
  if (Array.isArray(slug)) {
    return '/' + slug.join('/')
  }
  return slug ? '/' + slug : '/'
})
</script>

<template>
  <ContentRenderer :path="path" class="docs-content prose dark:prose-invert max-w-none" />
</template>

<style>
.docs-content {
  line-height: 1.7;
}

.docs-content h1 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 1rem;
}

.docs-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ui-border);
}

.docs-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
}

.docs-content pre {
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

.docs-content code:not(pre code) {
  padding: 0.125rem 0.375rem;
  background: var(--ui-bg-elevated);
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.docs-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.docs-content th,
.docs-content td {
  padding: 0.5rem 1rem;
  border: 1px solid var(--ui-border);
  text-align: left;
  font-size: 0.875rem;
}

.docs-content th {
  background: var(--ui-bg-elevated);
  font-weight: 600;
}
</style>
