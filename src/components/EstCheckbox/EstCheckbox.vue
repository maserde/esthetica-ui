<script setup lang="ts">
import { provide, toRef } from 'vue'
import { useVariantClasses } from '@/composables/useVariantClasses'

export type CheckboxColor = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface Props {
  modelValue?: boolean
  indeterminate?: boolean
  color?: CheckboxColor
  size?: CheckboxSize
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  indeterminate: false,
  color: 'primary',
  size: 'md',
  disabled: false,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { buildVariant } = useVariantClasses()

provide('est-checkbox-model', toRef(props, 'modelValue'))
provide('est-checkbox-indeterminate', toRef(props, 'indeterminate'))
provide('est-checkbox-disabled', toRef(props, 'disabled'))
provide('est-checkbox-id', toRef(props, 'id'))
provide('est-checkbox-update', (value: boolean) => emit('update:modelValue', value))
</script>

<template>
  <label
    :aria-disabled="disabled ? 'true' : undefined"
    :class="{
      ...buildVariant('est-checkbox', color ?? 'primary'),
      ...buildVariant('est-checkbox', size ?? 'md', false),
      'est-checkbox--disabled': disabled,
      'est-checkbox--checked': modelValue && !indeterminate,
      'est-checkbox--indeterminate': indeterminate,
    }"
  >
    <div class="est-checkbox__inner">
      <slot />
    </div>
  </label>
</template>

<style scoped src="./EstCheckbox.css" />
