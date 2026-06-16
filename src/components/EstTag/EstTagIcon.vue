<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'
import type { TagColor } from './EstTag.vue'

export interface Props {
  icon?: string
}

const props = defineProps<Props>()

const color = inject<Ref<TagColor>>('est-tag-color')

const COLOR_ICON: Record<TagColor, string> = {
  default: 'i-ri-price-tag-3-fill',
  primary: 'i-ri-price-tag-3-fill',
  info: 'i-ri-information-fill',
  success: 'i-ri-checkbox-circle-fill',
  warning: 'i-ri-error-warning-fill',
  error: 'i-ri-error-warning-fill',
}

const iconClass = computed(() => {
  if (props.icon) return props.icon
  return COLOR_ICON[color?.value ?? 'default'] || COLOR_ICON.default
})
</script>

<template>
  <span class="est-tag__icon" aria-hidden="true">
    <span :class="iconClass" class="w-[1em] h-[1em]" />
  </span>
</template>
