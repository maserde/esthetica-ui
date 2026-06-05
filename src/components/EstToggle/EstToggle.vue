<script setup lang="ts">
import { provide, toRef } from 'vue'
import { useVariantClasses } from '@/composables/useVariantClasses'

export type ToggleSize = 'sm' | 'md'
export type ToggleColor = 'primary' | 'success' | 'info' | 'warning' | 'error'

export interface Props {
  modelValue?: boolean
  disabled?: boolean
  size?: ToggleSize
  color?: ToggleColor
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
  color: 'primary',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { buildVariant } = useVariantClasses()

provide('est-toggle-model', toRef(props, 'modelValue'))
provide('est-toggle-disabled', toRef(props, 'disabled'))
provide('est-toggle-update', (value: boolean) => emit('update:modelValue', value))
</script>

<template>
  <label
    :aria-disabled="disabled || undefined"
    :class="{
      ...buildVariant('est-toggle', color ?? 'primary'),
      ...buildVariant('est-toggle', size ?? 'md', false),
      'est-toggle--disabled': disabled,
    }"
  >
    <div class="est-toggle__inner">
      <slot />
    </div>
  </label>
</template>

<style scoped src="./EstToggle.css" />
