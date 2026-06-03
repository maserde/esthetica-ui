<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Ref } from 'vue'
import type { AlertVariant } from './EstAlert.vue'

const variant = inject<Ref<AlertVariant>>('est-alert-variant')

const VARIANT_ICON: Record<AlertVariant, string> = {
  primary: 'i-ri-checkbox-circle-fill',
  success: 'i-ri-checkbox-circle-fill',
  info: 'i-ri-information-fill',
  warning: 'i-ri-error-warning-fill',
  danger: 'i-ri-error-warning-fill',
}

const iconClass = computed(() => VARIANT_ICON[variant?.value ?? 'success'])
</script>

<template>
  <span class="est-alert__icon" aria-hidden="true">
    <slot>
      <span :class="iconClass" class="w-6 h-6" />
    </slot>
  </span>
</template>
