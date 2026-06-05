<script setup lang="ts">
import { computed, provide, toRef, useId } from 'vue'

export interface Props {
  modelValue?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  error: undefined,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)

provide('est-input-id', inputId)
provide('est-input-value', toRef(props, 'modelValue'))
provide('est-input-disabled', toRef(props, 'disabled'))
provide('est-input-readonly', toRef(props, 'readonly'))
provide('est-input-error', toRef(props, 'error'))
provide('est-input-emit', (value: string) => emit('update:modelValue', value))
</script>

<template>
  <div class="est-input" :aria-disabled="disabled || undefined">
    <slot />
  </div>
</template>

<style scoped src="./EstInput.css" />
