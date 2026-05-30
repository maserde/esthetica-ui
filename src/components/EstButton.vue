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

<style scoped>
.est-button {
  @apply relative inline-flex items-center justify-center;
  @apply font-medium leading-none tracking-[0.01em] whitespace-nowrap;
  @apply border-solid border-[1.5px] border-transparent;
  @apply cursor-pointer select-none outline-none no-underline;
  font-family: var(--est-btn-font-family), 'sans-serif';
  border-radius: var(--est-btn-radius);
  transition:
    background-color var(--est-btn-transition-duration) ease,
    border-color var(--est-btn-transition-duration) ease,
    color var(--est-btn-transition-duration) ease,
    box-shadow var(--est-btn-transition-duration) ease,
    opacity var(--est-btn-transition-duration) ease,
    transform var(--est-btn-transition-duration) ease;
  box-shadow:
    0 0 0 0 transparent,
    0 0 0 0 transparent;
}

.est-button--primary:focus-visible,
.est-button--primary:focus:not(:disabled) {
  box-shadow:
    0 0 0 1px var(--est-btn-focus-ring-offset),
    0 0 0 3px var(--est-color-primary);
}

.est-button--outlined:focus-visible,
.est-button--outlined:focus:not(:disabled) {
  box-shadow:
    0 0 0 1px var(--est-btn-focus-ring-offset),
    0 0 0 3px var(--est-btn-outlined-border);
}

.est-button--info:focus-visible,
.est-button--info:focus:not(:disabled) {
  @apply bg-[--est-btn-info-bg-pressed];
  box-shadow:
    0 0 0 1px var(--est-btn-focus-ring-offset),
    0 0 0 3px var(--est-color-info);
}

.est-button--success:focus-visible,
.est-button--success:focus:not(:disabled) {
  @apply bg-[--est-btn-success-bg-pressed];
  box-shadow:
    0 0 0 1px var(--est-btn-focus-ring-offset),
    0 0 0 3px var(--est-color-success);
}

.est-button--warning:focus-visible,
.est-button--warning:focus:not(:disabled) {
  @apply bg-[--est-btn-warning-bg-pressed];
  box-shadow:
    0 0 0 1px var(--est-btn-focus-ring-offset),
    0 0 0 3px var(--est-color-warning);
}

.est-button--danger:focus-visible,
.est-button--danger:focus:not(:disabled) {
  @apply bg-[--est-btn-danger-bg-pressed];
  box-shadow:
    0 0 0 1px var(--est-btn-focus-ring-offset),
    0 0 0 3px var(--est-color-danger);
}

.est-button--secondary:focus-visible,
.est-button--secondary:focus:not(:disabled) {
  box-shadow:
    0 0 0 1px var(--est-btn-focus-ring-offset),
    0 0 0 3px var(--est-btn-outlined-border);
}

.est-button:active:not(:disabled) {
  @apply translate-y-0 scale-[0.98];
  transition-duration: 80ms !important;
}

.est-button__content {
  @apply inline-flex items-center gap-[0.4375em] transition-opacity;
  transition-duration: var(--est-btn-transition-duration, 160ms);
}

.est-button__content--hidden {
  @apply opacity-0;
}

.est-button__icon {
  @apply inline-flex items-center shrink-0;
}

.est-button__spinner {
  @apply absolute top-1/2 left-1/2 w-[1em] h-[1em];
  @apply mt-[-0.5em] ml-[-0.5em];
  animation: est-button-spin 580ms linear infinite;
}

@keyframes est-button-spin {
  to {
    transform: rotate(360deg);
  }
}

.est-button--sm {
  @apply p-[--est-btn-sm-padding] min-h-8;
  font-size: var(--est-btn-sm-font-size);
  border-radius: calc(var(--est-radius) * 0.5);
}

.est-button--md {
  @apply p-[--est-btn-md-padding] min-h-10;
  font-size: var(--est-btn-md-font-size);
}

.est-button--lg {
  @apply p-[--est-btn-lg-padding] min-h-12;
  font-size: var(--est-btn-lg-font-size);
}

.est-button--primary {
  background-color: var(--est-btn-primary-bg, var(--est-color-primary));
  color: var(--est-btn-primary-color, var(--est-color-primary-fg));
}

.est-button--primary:hover:not(:disabled) {
  background-color: var(--est-btn-primary-bg-hover, var(--est-color-primary-hover));
}

.est-button--secondary {
  background-color: var(--est-btn-secondary-bg, var(--est-color-secondary));
  color: var(--est-btn-secondary-color, var(--est-color-secondary-fg));
}

.est-button--secondary:hover:not(:disabled) {
  background-color: var(--est-btn-secondary-bg-hover);
}

.est-button--info {
  background-color: var(--est-btn-info-bg, var(--est-color-info));
  color: var(--est-btn-info-color, var(--est-color-info-fg));
}

.est-button--info:hover:not(:disabled) {
  background-color: var(--est-btn-info-bg-hover, var(--est-color-info-hover));
}

.est-button--success {
  background-color: var(--est-btn-success-bg, var(--est-color-success));
  color: var(--est-btn-success-color, var(--est-color-success-fg));
}

.est-button--success:hover:not(:disabled) {
  background-color: var(--est-btn-success-bg-hover, var(--est-color-success-hover));
}

.est-button--warning {
  background-color: var(--est-btn-warning-bg, var(--est-color-warning));
  color: var(--est-btn-warning-color, var(--est-color-warning-fg));
}

.est-button--warning:hover:not(:disabled) {
  background-color: var(--est-btn-warning-bg-hover, var(--est-color-warning-hover));
}

.est-button--danger {
  background-color: var(--est-btn-danger-bg);
  color: var(--est-btn-danger-color);
}

.est-button--danger:hover:not(:disabled) {
  background-color: var(--est-btn-ghost-bg-hover);
}

.est-button--outlined {
  @apply bg-transparent border-2;
  border-color: var(--est-btn-outlined-border);
  color: var(--est-btn-outlined-color);
}

.est-button--outlined:hover:not(:disabled) {
  background-color: var(--est-btn-outlined-bg-hover);
  border-color: var(--est-btn-outlined-border-hover);
}

.est-button--ghost {
  @apply bg-transparent;
  color: var(--est-btn-ghost-color);
}

.est-button--ghost:hover:not(:disabled) {
  background-color: var(--est-btn-ghost-bg-hover);
}

.est-button--danger {
  background-color: var(--est-btn-danger-bg);
  color: var(--est-btn-danger-color);
}

.est-button--danger:hover:not(:disabled) {
  background-color: var(--est-btn-danger-bg-hover);
}

.est-button--disabled,
.est-button:disabled {
  @apply opacity-[0.42] cursor-not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.est-button--loading {
  @apply cursor-wait;
}
</style>
