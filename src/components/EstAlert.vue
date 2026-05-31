<script setup lang="ts">
import { computed, useSlots } from 'vue'
import EstCard from './EstCard.vue'

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

const slots = useSlots()

const hasTitle = computed(() => !!slots.title)

const ICON_MAP: Record<AlertVariant, string> = {
  primary: 'i-ri-checkbox-circle-fill',
  success: 'i-ri-checkbox-circle-fill',
  info: 'i-ri-information-fill',
  warning: 'i-ri-error-warning-fill',
  danger: 'i-ri-error-warning-fill',
}

const iconClass = computed(() => ICON_MAP[props.variant])
</script>

<template>
  <EstCard :variant="variant" borderless>
    <div class="est-alert__inner">
      <span
        :class="['est-alert__icon', `est-alert__icon--${variant}`, iconClass, 'w-6 h-6']"
        aria-hidden="true"
      />

      <div class="est-alert__content">
        <div v-if="hasTitle" :class="['est-alert__title', `est-alert__title--${variant}`]">
          <slot name="title" />
        </div>
        <div
          :class="[
            'est-alert__body',
            `est-alert__body--${variant}`,
            { 'est-alert__body--with-title': hasTitle },
          ]"
        >
          <slot />
        </div>
      </div>

      <button
        v-if="dismissible"
        type="button"
        :class="['est-alert__close', `est-alert__close--${variant}`]"
        aria-label="Dismiss alert"
        @click="emit('dismiss')"
      >
        <span class="i-ri-close-line" style="width: 18px; height: 18px" aria-hidden="true" />
      </button>
    </div>
  </EstCard>
</template>

<style scoped src="./EstAlert.css" />
