<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'

defineOptions({ inheritAttrs: false })

export interface Props {
  modelValue?: string
  length?: number
  label?: string
  disabled?: boolean
  error?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  length: 4,
  label: undefined,
  disabled: false,
  error: undefined,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)

const digits = ref<string[]>(
  Array.from({ length: props.length }, (_, i) => props.modelValue[i] ?? ''),
)

watch([() => props.modelValue, () => props.length], ([val, len]) => {
  digits.value = Array.from({ length: len as number }, (_, i) => (val as string)[i] ?? '')
})

const inputRefs = ref<(HTMLInputElement | null)[]>([])

function setInputRef(el: Element | ComponentPublicInstance | null, index: number) {
  inputRefs.value[index] = el as HTMLInputElement | null
}

function focusInput(index: number) {
  const el = inputRefs.value[index]
  if (el) {
    el.focus()
    el.select()
  }
}

function emitValue() {
  const value = digits.value.join('')
  emit('update:modelValue', value)
  if (digits.value.every((d) => d !== '')) {
    emit('complete', value)
  }
}

function handleInput(event: Event, index: number) {
  const input = event.target as HTMLInputElement
  const filtered = input.value.replace(/\D/g, '')
  const char = filtered.slice(-1)

  digits.value[index] = char
  input.value = char
  emitValue()

  if (char && index < props.length - 1) {
    nextTick(() => focusInput(index + 1))
  }
}

function handleKeydown(event: KeyboardEvent, index: number) {
  switch (event.key) {
    case 'Backspace':
      event.preventDefault()
      if (digits.value[index] !== '') {
        digits.value[index] = ''
        emitValue()
      } else if (index > 0) {
        digits.value[index - 1] = ''
        emitValue()
        nextTick(() => focusInput(index - 1))
      }
      break
    case 'Delete':
      digits.value[index] = ''
      emitValue()
      break
    case 'ArrowLeft':
      event.preventDefault()
      if (index > 0) focusInput(index - 1)
      break
    case 'ArrowRight':
      event.preventDefault()
      if (index < props.length - 1) focusInput(index + 1)
      break
    case 'ArrowUp':
    case 'ArrowDown':
      event.preventDefault()
      break
  }
}

function handlePaste(event: ClipboardEvent, index: number) {
  event.preventDefault()
  const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '')
  const chars = pasted.slice(0, props.length - index).split('')

  chars.forEach((char, i) => {
    digits.value[index + i] = char
  })

  emitValue()

  const lastFilled = Math.min(index + chars.length, props.length - 1)
  nextTick(() => focusInput(lastFilled))
}

function handleFocus(event: FocusEvent) {
  ;(event.target as HTMLInputElement).select()
}
</script>

<template>
  <div v-bind="$attrs" class="est-otp">
    <label v-if="label" :for="inputId" class="est-otp__label">
      {{ label }}
    </label>

    <div class="est-otp__cells" role="group" :aria-label="label ?? 'One-time code'">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="(el) => setInputRef(el, index)"
        :id="index === 0 ? inputId : undefined"
        type="text"
        inputmode="numeric"
        maxlength="1"
        placeholder="0"
        :value="digit"
        :disabled="disabled"
        :aria-label="`Digit ${index + 1} of ${length}`"
        :aria-invalid="!!error"
        :autocomplete="index === 0 ? 'one-time-code' : 'off'"
        :class="{
          'est-otp__cell': true,
          'est-otp__cell--error': !!error,
        }"
        @input="handleInput($event, index)"
        @keydown="handleKeydown($event, index)"
        @paste="handlePaste($event, index)"
        @focus="handleFocus"
      />
    </div>

    <p v-if="error" class="est-otp__error" role="alert">
      <span class="i-ri-error-warning-line w-4 h-4" aria-hidden="true" />
      <span>{{ error }}</span>
    </p>
  </div>
</template>

<style scoped src="./EstInputOTP.css" />
