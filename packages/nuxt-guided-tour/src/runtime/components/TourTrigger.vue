<script setup lang="ts">
/**
 * Tour Trigger Component
 * Reusable button to manually start or restart the tour.
 */

withDefaults(defineProps<{
  label?: string
  icon?: string
  variant?: 'solid' | 'soft' | 'ghost' | 'outline' | 'link'
  color?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconOnly?: boolean
  tooltip?: string
}>(), {
  label: 'Take a tour',
  icon: 'i-heroicons-question-mark-circle',
  variant: 'ghost',
  color: 'neutral',
  size: 'sm',
  iconOnly: false,
  tooltip: 'Start the guided tour'
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <UTooltip
    :text="tooltip"
    :content="{ side: 'bottom', sideOffset: 8 }"
  >
    <UButton
      :icon="icon"
      :variant="variant"
      :color="color"
      :size="size"
      :aria-label="iconOnly ? label : undefined"
      :square="iconOnly"
      @click="emit('click')"
    >
      <template v-if="!iconOnly">
        {{ label }}
      </template>
    </UButton>
  </UTooltip>
</template>
