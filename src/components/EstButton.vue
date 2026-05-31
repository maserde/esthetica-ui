<script setup lang="ts">
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
      'est-button': true,
      'est-button--primary': variant === 'primary',
      'est-button--secondary': variant === 'secondary',
      'est-button--info': variant === 'info',
      'est-button--success': variant === 'success',
      'est-button--warning': variant === 'warning',
      'est-button--danger': variant === 'danger',
      'est-button--outlined': variant === 'outlined',
      'est-button--ghost': variant === 'ghost',
      'est-button--sm': size === 'sm',
      'est-button--md': size === 'md',
      'est-button--lg': size === 'lg',
      'est-button--loading': loading,
      'est-button--disabled': disabled,
    }"
    @click="handleClick"
  >
    <span class="est-button__content" :class="{ 'est-button__content--hidden': loading }">
      <span v-if="$slots.leading" class="est-button__icon">
        <slot name="leading" />
      </span>
      <slot />
      <span v-if="$slots.trailing" class="est-button__icon">
        <slot name="trailing" />
      </span>
    </span>

    <span
      v-if="loading"
      class="i-ri-loader-4-line text-lg est-button__spinner"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped src="./EstButton.css" />
