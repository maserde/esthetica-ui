<script setup lang="ts">
import { useVariantClasses } from '@/composables/useVariantClasses'
import { provide, toRef } from 'vue'

export type TagColor = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
export type TagVariant = 'primary' | 'secondary'

export interface Props {
  color?: TagColor
  variant?: TagVariant
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  variant: 'primary',
})

const { buildVariant } = useVariantClasses()

provide('est-tag-color', toRef(props, 'color'))
</script>

<template>
  <span
    :class="{
      ...buildVariant('est-tag', color ?? 'default'),
      'est-tag--secondary': variant === 'secondary',
    }"
  >
    <span class="est-tag__inner">
      <slot />
    </span>
  </span>
</template>

<style scoped src="./EstTag.css" />
