<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const id = inject<Ref<string | undefined>>('est-checkbox-id')
const modelValue = inject<Ref<boolean>>('est-checkbox-model')
const indeterminate = inject<Ref<boolean>>('est-checkbox-indeterminate')
const disabled = inject<Ref<boolean>>('est-checkbox-disabled')
const updateValue = inject<(value: boolean) => void>('est-checkbox-update')

function handleChange(event: Event) {
  if (disabled?.value) return
  const target = event.target as HTMLInputElement
  if (updateValue) {
    updateValue(target.checked)
  }
}
</script>

<template>
  <div class="est-checkbox__box-wrapper">
    <input
      :id="id"
      type="checkbox"
      class="est-checkbox__input"
      :checked="modelValue"
      :disabled="disabled"
      v-bind="$attrs"
      @change="handleChange"
    />
    <div class="est-checkbox__box" aria-hidden="true">
      <span v-if="indeterminate" class="est-checkbox__icon i-ri-subtract-fill" />
      <span v-else-if="modelValue" class="est-checkbox__icon i-ri-check-fill" />
    </div>
  </div>
</template>
