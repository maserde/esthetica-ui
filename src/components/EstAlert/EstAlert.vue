<script setup lang="ts">
import { provide, toRef } from 'vue'
import EstCard from '@/components/EstCard/EstCard.vue'

export type AlertVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  variant?: AlertVariant
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'success',
  dismissible: true,
})

const emit = defineEmits<{
  dismiss: []
}>()

provide('est-alert-variant', toRef(props, 'variant'))
</script>

<template>
  <EstCard :variant="props.variant">
    <div class="est-alert__inner" role="alert">
      <slot />
      <button
        v-if="props.dismissible"
        type="button"
        class="est-alert__close"
        aria-label="Dismiss alert"
        @click="emit('dismiss')"
      >
        <span class="i-ri-close-line w-[1.4em] h-[1.4em]" aria-hidden="true" />
      </button>
    </div>
  </EstCard>
</template>

<style scoped src="./EstAlert.css" />
