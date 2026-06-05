<script setup lang="ts">
import { provide, toRef } from 'vue'
import EstSkeleton from '../EstSkeleton.vue'
import { useVariantClasses } from '@/composables/useVariantClasses'

export type CardColor = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  color?: CardColor
  borderless?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  borderless: false,
  loading: false,
})

provide('est-card-color', toRef(props, 'color'))
provide('est-card-borderless', toRef(props, 'borderless'))

const { buildVariant } = useVariantClasses()
</script>

<template>
  <div v-if="loading" aria-busy="true">
    <EstSkeleton class="h-20 w-full" rounded="lg" />
  </div>
  <div
    v-else
    :class="{
      ...buildVariant('est-card', color ?? 'default'),
      'est-card--borderless': borderless,
    }"
  >
    <slot />
  </div>
</template>

<style scoped src="./EstCard.css" />
