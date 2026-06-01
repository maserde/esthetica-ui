<script setup lang="ts">
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
</script>

<template>
  <span
    :class="{
      'est-tag': true,
      'est-tag--info': variant === 'info',
      'est-tag--success': variant === 'success',
      'est-tag--warning': variant === 'warning',
      'est-tag--danger': variant === 'danger',
      'est-tag--primary': type === 'primary',
      'est-tag--secondary': type === 'secondary',
    }"
  >
    <slot />
  </span>
</template>

<style scoped src="./EstTag.css" />
