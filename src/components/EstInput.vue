<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

export interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: undefined,
  placeholder: undefined,
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

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="est-input" :aria-disabled="disabled || undefined">
    <label v-if="label" :for="inputId" class="est-input__label">
      {{ label }}
    </label>

    <div
      class="est-input__wrapper"
      :class="{
        'est-input__wrapper--error': !!error,
        'est-input__wrapper--disabled': disabled,
        'est-input__wrapper--readonly': readonly,
      }"
    >
      <slot name="leading" />

      <input
        v-bind="$attrs"
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="!!error"
        class="est-input__field"
        @input="handleInput"
      />

      <slot name="trailing" />
    </div>

    <p v-if="error" class="est-input__error" role="alert">
      <span class="i-ri-error-warning-line w-4 h-4" aria-hidden="true" />
      <span>{{ error }}</span>
    </p>
  </div>
</template>

<style scoped src="./EstInput.css" />
