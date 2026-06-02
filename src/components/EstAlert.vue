<script setup lang="ts">
import { computed, useSlots } from 'vue'
import EstCard from './EstCard.vue'

export type AlertVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  variant?: AlertVariant
  dismissible?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'success',
  dismissible: true,
})

const emit = defineEmits<{
  dismiss: []
}>()

const slots = useSlots()

const hasTitle = computed(() => !!slots.title)
</script>

<template>
  <EstCard :variant="variant" borderless role="alert">
    <div class="est-alert__inner">
      <span
        v-if="variant === 'primary' || variant === 'success'"
        class="i-ri-checkbox-circle-fill est-alert__icon"
        aria-hidden="true"
      />
      <span
        v-else-if="variant === 'info'"
        class="i-ri-information-fill est-alert__icon"
        aria-hidden="true"
      />
      <span v-else class="i-ri-error-warning-fill est-alert__icon" aria-hidden="true" />

      <div class="est-alert__content">
        <div v-if="hasTitle" class="est-alert__title">
          <slot name="title" />
        </div>
        <div
          :class="{
            'est-alert__body': true,
            'est-alert__body--with-title': hasTitle,
          }"
        >
          <slot />
        </div>
      </div>

      <button
        v-if="dismissible"
        type="button"
        class="est-alert__close"
        aria-label="Dismiss alert"
        @click="emit('dismiss')"
      >
        <span class="i-ri-close-line w-[18px] h-[18px]" aria-hidden="true" />
      </button>
    </div>
  </EstCard>
</template>

<style scoped src="./EstAlert.css" />
