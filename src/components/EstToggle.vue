<script setup lang="ts">
import { useVariantClasses } from '@/composables/useVariantClasses'

export type ToggleSize = 'sm' | 'md'

export interface Props {
  modelValue?: boolean
  disabled?: boolean
  label?: string
  description?: string
  size?: ToggleSize
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  label: '',
  description: '',
  size: 'md',
})

const { buildVariant } = useVariantClasses()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleToggle() {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <label
    :aria-disabled="disabled || undefined"
    :class="{
      ...buildVariant('est-toggle', size ?? 'md'),
      'est-toggle--has-description': !!description,
      'est-toggle--disabled': disabled,
    }"
  >
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
    <span v-if="label || description || $slots.default" class="est-toggle__content">
      <span v-if="label || $slots.default" class="est-toggle__label">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="description" class="est-toggle__description">
        {{ description }}
      </span>
    </span>
  </label>
</template>

<style scoped src="./EstToggle.css" />
