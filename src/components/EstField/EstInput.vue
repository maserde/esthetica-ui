<script setup lang="ts">
import { inject } from 'vue'
import type { ComputedRef, Ref } from 'vue'

defineOptions({ inheritAttrs: false })

export interface Props {
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: undefined,
})

const inputId = inject<ComputedRef<string>>('est-field-id')
const modelValue = inject<Ref<string>>('est-field-value')
const disabled = inject<Ref<boolean>>('est-field-disabled')
const readonly = inject<Ref<boolean>>('est-field-readonly')
const error = inject<Ref<string | undefined>>('est-field-error')
const emitUpdate = inject<(value: string) => void>('est-field-emit')

function handleInput(event: Event) {
  emitUpdate?.((event.target as HTMLInputElement).value)
}
</script>

<template>
  <div
    class="est-field__wrapper"
    :class="{
      'est-field__wrapper--error': !!error,
      'est-field__wrapper--disabled': disabled,
      'est-field__wrapper--readonly': readonly,
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
      class="est-field__field"
      @input="handleInput"
    />

    <slot name="trailing" />
  </div>
</template>
