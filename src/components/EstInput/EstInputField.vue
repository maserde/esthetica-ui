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

const inputId = inject<ComputedRef<string>>('est-input-id')
const modelValue = inject<Ref<string>>('est-input-value')
const disabled = inject<Ref<boolean>>('est-input-disabled')
const readonly = inject<Ref<boolean>>('est-input-readonly')
const error = inject<Ref<string | undefined>>('est-input-error')
const emitUpdate = inject<(value: string) => void>('est-input-emit')

function handleInput(event: Event) {
  emitUpdate?.((event.target as HTMLInputElement).value)
}
</script>

<template>
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
</template>
