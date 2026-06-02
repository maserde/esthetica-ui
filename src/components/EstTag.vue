<script setup lang="ts">
import { useVariantClasses } from '@/composables/useVariantClasses'

export type TagVariant = 'info' | 'success' | 'warning' | 'danger'
export type TagType = 'primary' | 'secondary'

export interface Props {
  variant?: TagVariant
  type?: TagType
}

withDefaults(defineProps<Props>(), {
  variant: 'success',
  type: 'secondary',
})

const { buildVariant } = useVariantClasses()
</script>

<template>
  <span
    :class="{
      ...buildVariant('est-tag', variant ?? 'success'),
      'est-tag--primary': type === 'primary',
    }"
  >
    <slot />
  </span>
</template>

<style scoped src="./EstTag.css" />
