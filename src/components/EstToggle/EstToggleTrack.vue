<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

const modelValue = inject<Ref<boolean>>('est-toggle-model')
const disabled = inject<Ref<boolean>>('est-toggle-disabled')
const updateValue = inject<(value: boolean) => void>('est-toggle-update')

function handleToggle() {
  if (disabled?.value) return
  if (updateValue && modelValue) {
    updateValue(!modelValue.value)
  }
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="disabled || undefined"
    :disabled="disabled"
    :class="{
      'est-toggle__track': true,
      'est-toggle__track--checked': modelValue,
      'est-toggle__track--disabled': disabled,
    }"
    @click.stop="handleToggle"
  >
    <span
      :class="{
        'est-toggle__thumb': true,
        'est-toggle__thumb--checked': modelValue,
        'est-toggle__thumb--disabled': disabled,
      }"
    />
  </button>
</template>
