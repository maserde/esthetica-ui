<script setup lang="ts">
import { computed, useSlots } from 'vue'
import EstSkeleton from './EstSkeleton.vue'

export type CardVariant = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  variant?: CardVariant
  borderless?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  borderless: false,
  loading: false,
})

const slots = useSlots()

const hasHeaderSlot = computed(() => !!slots.header)
const hasFooterSlot = computed(() => !!slots.footer)
</script>

<template>
  <div v-if="loading" aria-busy="true">
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
    }"
  >
    <div
      v-if="hasHeaderSlot"
      :class="{
        'est-card__header': true,
        'est-card__header--bordered': !borderless,
      }"
    >
      <slot name="header" />
    </div>
    <div class="est-card__body">
      <slot />
    </div>
    <div
      v-if="hasFooterSlot"
      :class="{
        'est-card__footer': true,
        'est-card__footer--bordered': !borderless,
      }"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped src="./EstCard.css" />
