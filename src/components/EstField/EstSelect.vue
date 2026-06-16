<script setup lang="ts">
import { inject } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { SelectSize } from './EstField.vue'

defineOptions({ inheritAttrs: false })

export interface Option {
  value: string
  label: string
  disabled?: boolean
}

export interface Props {
  placeholder?: string
  options?: Option[]
  icon?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: undefined,
  options: () => [],
  icon: undefined,
})

const inputId = inject<ComputedRef<string>>('est-field-id')
const modelValue = inject<Ref<string>>('est-field-value')
const disabled = inject<Ref<boolean>>('est-field-disabled')
const readonly = inject<Ref<boolean>>('est-field-readonly')
const error = inject<Ref<string | undefined>>('est-field-error')
const size = inject<Ref<SelectSize>>('est-field-size')
const emitUpdate = inject<(value: string) => void>('est-field-emit')

function handleChange(event: Event) {
  emitUpdate?.((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div
    class="est-field__wrapper est-field__wrapper--select"
    :class="{
      'est-field__wrapper--error': !!error,
      'est-field__wrapper--disabled': disabled,
      'est-field__wrapper--readonly': readonly,
      'est-field__wrapper--select-lg': size === 'lg',
      'est-field__wrapper--select-md': size === 'md',
      'est-field__wrapper--select-sm': size === 'sm',
    }"
  >
    <slot name="leading">
      <span v-if="icon" class="est-field__select-icon" aria-hidden="true">
        <span :class="icon" class="w-5 h-5" />
      </span>
    </slot>

    <select
      v-bind="$attrs"
      :id="inputId"
      :value="modelValue"
      :disabled="disabled"
      :aria-invalid="!!error"
      :aria-readonly="readonly || undefined"
      class="est-field__field est-field__select"
      :class="{ 'est-field__select--placeholder': !modelValue }"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled hidden>{{ placeholder }}</option>
      <slot />
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <slot name="trailing">
      <span class="est-field__select-chevron" aria-hidden="true">
        <span class="i-ri-arrow-down-s-line w-5 h-5" />
      </span>
    </slot>
  </div>
</template>
