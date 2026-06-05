<script setup lang="ts">
import { useVariantClasses } from '@/composables/useVariantClasses'

export type Variant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outlined'
  | 'ghost'
export type Size = 'sm' | 'md' | 'lg'
export type ButtonType = 'button' | 'submit' | 'reset'

export interface Props {
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  type?: ButtonType
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

const { buildVariant } = useVariantClasses()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :class="{
      ...buildVariant('est-button', variant ?? 'primary'),
      ...buildVariant('est-button', size ?? 'md', false),
      'est-button--loading': loading,
      'est-button--disabled': disabled,
    }"
    @click="handleClick"
  >
    <span class="est-button__content" :class="{ 'est-button__content--hidden': loading }">
      <slot name="leading" />
      <slot />
      <slot name="trailing" />
    </span>

    <span
      v-if="loading"
      class="i-ri-loader-4-line text-lg est-button__spinner"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped src="./EstButton.css" />
