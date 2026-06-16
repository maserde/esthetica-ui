<script setup lang="ts">
import { computed, provide, toRef, useId } from 'vue'
import { useVariantClasses } from '@/composables/useVariantClasses'

export type SelectSize = 'lg' | 'md' | 'sm'

export interface Props {
  modelValue?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  id?: string
  size?: SelectSize
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  error: undefined,
  id: undefined,
  size: 'lg',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const { buildVariant } = useVariantClasses()

provide('est-field-id', inputId)
provide('est-field-value', toRef(props, 'modelValue'))
provide('est-field-disabled', toRef(props, 'disabled'))
provide('est-field-readonly', toRef(props, 'readonly'))
provide('est-field-error', toRef(props, 'error'))
provide('est-field-size', toRef(props, 'size'))
provide('est-field-emit', (value: string) => emit('update:modelValue', value))
</script>

<template>
  <div
    class="est-field"
    :class="{ ...buildVariant('est-field-select', size ?? 'lg', false) }"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <slot />
  </div>
</template>

<style scoped src="./EstField.css" />
