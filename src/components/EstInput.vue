<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

export interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  leftIcon?: string
  rightIcon?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'left-icon-click': []
  'right-icon-click': []
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="est-input">
    <label v-if="label" :for="inputId" class="est-input__label">
      {{ label }}
    </label>

    <div class="est-input__wrapper">
      <button
        v-if="leftIcon"
        type="button"
        class="est-input__icon-left"
        :disabled="disabled"
        aria-hidden="true"
        tabindex="-1"
        @click="emit('left-icon-click')"
      >
        <span :class="[leftIcon, 'w-6 h-6']" aria-hidden="true" />
      </button>

      <input
        v-bind="$attrs"
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="!!error"
        :class="{
          'est-input__field': true,
          'est-input__field--with-left-icon': !!leftIcon,
          'est-input__field--with-right-icon': !!rightIcon,
          'est-input__field--error': !!error,
        }"
        @input="handleInput"
      />

      <button
        v-if="rightIcon"
        type="button"
        class="est-input__icon-right"
        :disabled="disabled"
        aria-hidden="true"
        tabindex="-1"
        @click="emit('right-icon-click')"
      >
        <span :class="[rightIcon, 'w-6 h-6']" aria-hidden="true" />
      </button>
    </div>

    <p v-if="error" class="est-input__error" role="alert">
      <span class="i-ri-error-warning-line w-4 h-4" aria-hidden="true" />
      <span>{{ error }}</span>
    </p>
  </div>
</template>

<style scoped src="./EstInput.css" />
