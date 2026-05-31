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
  <EstCard :variant="variant" borderless>
    <div class="est-alert__inner">
      <span
        v-if="variant === 'primary' || variant === 'success'"
        class="i-ri-checkbox-circle-fill"
        :class="{
          'est-alert__icon': true,
          'est-alert__icon--primary': variant === 'primary',
          'est-alert__icon--success': variant === 'success',
        }"
        aria-hidden="true"
      />
      <span
        v-else-if="variant === 'info'"
        class="i-ri-information-fill"
        :class="{ 'est-alert__icon': true, 'est-alert__icon--info': true }"
        aria-hidden="true"
      />
      <span
        v-else
        class="i-ri-error-warning-fill"
        :class="{
          'est-alert__icon': true,
          'est-alert__icon--warning': variant === 'warning',
          'est-alert__icon--danger': variant === 'danger',
        }"
        aria-hidden="true"
      />

      <div class="est-alert__content">
        <div
          v-if="hasTitle"
          :class="{
            'est-alert__title': true,
            'est-alert__title--primary': variant === 'primary',
            'est-alert__title--success': variant === 'success',
            'est-alert__title--info': variant === 'info',
            'est-alert__title--warning': variant === 'warning',
            'est-alert__title--danger': variant === 'danger',
          }"
        >
          <slot name="title" />
        </div>
        <div
          :class="{
            'est-alert__body': true,
            'est-alert__body--primary': variant === 'primary',
            'est-alert__body--success': variant === 'success',
            'est-alert__body--info': variant === 'info',
            'est-alert__body--warning': variant === 'warning',
            'est-alert__body--danger': variant === 'danger',
            'est-alert__body--with-title': hasTitle,
          }"
        >
          <slot />
        </div>
      </div>

      <button
        v-if="dismissible"
        type="button"
        :class="{
          'est-alert__close': true,
          'est-alert__close--primary': variant === 'primary',
          'est-alert__close--success': variant === 'success',
          'est-alert__close--info': variant === 'info',
          'est-alert__close--warning': variant === 'warning',
          'est-alert__close--danger': variant === 'danger',
        }"
        aria-label="Dismiss alert"
        @click="emit('dismiss')"
      >
        <span class="i-ri-close-line w-[18px] h-[18px]" aria-hidden="true" />
      </button>
    </div>
  </EstCard>
</template>

<style scoped src="./EstAlert.css" />
