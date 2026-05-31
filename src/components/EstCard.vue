<script setup lang="ts">
import { computed, useSlots } from 'vue'
import EstSkeleton from './EstSkeleton.vue'

export type CardVariant = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  variant?: CardVariant
  borderless?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  borderless: false,
  loading: false,
})

const slots = useSlots()

const hasHeaderSlot = computed(() => !!slots.header)
const hasFooterSlot = computed(() => !!slots.footer)

const headerClasses = computed(() => ({
  'est-card__header': true,
  'est-card__header--bordered': !props.borderless,
}))

const footerClasses = computed(() => ({
  'est-card__footer': true,
  'est-card__footer--bordered': !props.borderless,
}))
</script>

<template>
  <div v-if="loading">
    <EstSkeleton class="h-20 w-full" rounded="lg" />
  </div>
  <div
    v-else
    :class="{
      'est-card': true,
      'est-card--default': variant === 'default',
      'est-card--primary': variant === 'primary',
      'est-card--success': variant === 'success',
      'est-card--info': variant === 'info',
      'est-card--warning': variant === 'warning',
      'est-card--danger': variant === 'danger',
      'est-card--borderless': borderless,
      'est-card--with-header': hasHeaderSlot,
    }"
  >
    <div v-if="hasHeaderSlot" :class="headerClasses">
      <slot name="header" />
    </div>
    <div class="est-card__body">
      <slot />
    </div>
    <div v-if="hasFooterSlot" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped src="./EstCard.css" />
