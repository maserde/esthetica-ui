<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Ref } from 'vue'
import type { AlertColor } from './EstAlert.vue'

const color = inject<Ref<AlertColor>>('est-alert-color')

const COLOR_ICON: Record<AlertColor, string> = {
  default: 'i-ri-checkbox-circle-fill',
  primary: 'i-ri-checkbox-circle-fill',
  success: 'i-ri-checkbox-circle-fill',
  info: 'i-ri-information-fill',
  warning: 'i-ri-error-warning-fill',
  danger: 'i-ri-error-warning-fill',
}

const iconClass = computed(() => COLOR_ICON[color?.value ?? 'default'])
</script>

<template>
  <span class="est-alert__icon" aria-hidden="true">
    <slot>
      <span :class="iconClass" class="w-6 h-6" />
    </slot>
  </span>
</template>
