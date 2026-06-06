<script setup lang="ts">
import { useVariantClasses } from '@/composables/useVariantClasses'

export type TagColor = 'default' | 'info' | 'success' | 'warning' | 'danger'
export type TagVariant = 'primary' | 'secondary'

export interface Props {
  color?: TagColor
  variant?: TagVariant
}

withDefaults(defineProps<Props>(), {
  color: 'default',
  variant: 'primary',
})

const { buildVariant } = useVariantClasses()
</script>

<template>
  <span
    :class="{
      ...buildVariant('est-tag', color ?? 'default'),
      'est-tag--secondary': variant === 'secondary',
    }"
  >
    <slot />
  </span>
</template>

<style scoped src="./EstTag.css" />
