<script setup lang="ts">
import { provide, toRef } from 'vue'
import EstCard from '@/components/EstCard/EstCard.vue'

export type AlertColor = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  color?: AlertColor
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  dismissible: true,
})

const emit = defineEmits<{
  dismiss: []
}>()

provide('est-alert-color', toRef(props, 'color'))
</script>

<template>
  <EstCard :color="props.color">
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
