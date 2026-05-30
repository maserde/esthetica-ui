<script setup lang="ts">
export type Variant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'danger'
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
      'base-button': true,
      'base-button--primary': variant === 'primary',
      'base-button--secondary': variant === 'secondary',
      'base-button--outlined': variant === 'outlined',
      'base-button--ghost': variant === 'ghost',
      'base-button--danger': variant === 'danger',
      'base-button--sm': size === 'sm',
      'base-button--md': size === 'md',
      'base-button--lg': size === 'lg',
      'base-button--loading': loading,
      'base-button--disabled': disabled,
    }"
    @click="handleClick"
  >
    <span
      class="base-button__content"
      :class="{ 'base-button__content--hidden': loading }"
    >
      <span v-if="$slots.leading" class="base-button__icon">
        <slot name="leading" />
      </span>
      <slot />
      <span v-if="$slots.trailing" class="base-button__icon">
        <slot name="trailing" />
      </span>
    </span>

    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
  </button>
</template>

<style scoped>
@reference "../style.css";

.base-button {
  /* Theming hooks — override these in consuming apps */
  --_btn-font: var(--btn-font-family, var(--font-sans));
  --_btn-radius: var(--btn-radius, var(--radius-md, 0.375rem));
  --_btn-duration: var(--btn-transition-duration, 160ms);

  /* Primary */
  --_btn-primary-bg: var(--btn-primary-bg, var(--color-stone-900));
  --_btn-primary-bg-hover: var(--btn-primary-bg-hover, var(--color-stone-800));
  --_btn-primary-color: var(--btn-primary-color, var(--color-stone-50));
  --_btn-primary-shadow: var(--btn-primary-shadow,
    0 1px 3px 0 rgb(28 25 23 / 0.4),
    0 1px 2px -1px rgb(28 25 23 / 0.4));
  --_btn-primary-shadow-hover: var(--btn-primary-shadow-hover,
    0 4px 12px -2px rgb(28 25 23 / 0.45));

  /* Secondary */
  --_btn-secondary-bg: var(--btn-secondary-bg, var(--color-stone-200));
  --_btn-secondary-bg-hover: var(--btn-secondary-bg-hover, var(--color-stone-300));
  --_btn-secondary-color: var(--btn-secondary-color, var(--color-stone-900));

  /* Outlined */
  --_btn-outlined-border: var(--btn-outlined-border, var(--color-stone-400));
  --_btn-outlined-border-hover: var(--btn-outlined-border-hover, var(--color-stone-900));
  --_btn-outlined-color: var(--btn-outlined-color, var(--color-stone-900));
  --_btn-outlined-bg-hover: var(--btn-outlined-bg-hover, var(--color-stone-50));

  /* Ghost */
  --_btn-ghost-color: var(--btn-ghost-color, var(--color-stone-700));
  --_btn-ghost-bg-hover: var(--btn-ghost-bg-hover, var(--color-stone-100));

  /* Danger */
  --_btn-danger-bg: var(--btn-danger-bg, var(--color-rose-700));
  --_btn-danger-bg-hover: var(--btn-danger-bg-hover, var(--color-rose-800));
  --_btn-danger-color: var(--btn-danger-color, var(--color-white));
  --_btn-danger-shadow: var(--btn-danger-shadow,
    0 1px 3px 0 rgb(190 18 60 / 0.35),
    0 1px 2px -1px rgb(190 18 60 / 0.35));
  --_btn-danger-shadow-hover: var(--btn-danger-shadow-hover,
    0 4px 12px -2px rgb(190 18 60 / 0.4));
}

.base-button {
  @apply relative inline-flex items-center justify-center;
  @apply font-medium leading-none tracking-[0.01em] whitespace-nowrap;
  @apply border-[1.5px] border-transparent;
  @apply cursor-pointer select-none outline-none no-underline;
  font-family: var(--_btn-font), sans-serif;
  border-radius: var(--_btn-radius);
  transition:
    background-color var(--_btn-duration) ease,
    border-color var(--_btn-duration) ease,
    color var(--_btn-duration) ease,
    box-shadow var(--_btn-duration) ease,
    opacity var(--_btn-duration) ease,
    transform var(--_btn-duration) cubic-bezier(0.34, 1.56, 0.64, 1);
}

.base-button:focus-visible {
  @apply outline-2 outline-offset-[3px];
  outline-color: var(--btn-focus-ring, var(--color-stone-900));
}

.base-button:active:not(:disabled) {
  @apply translate-y-0 scale-[0.98];
  transition-duration: 80ms !important;
}

.base-button__content {
  @apply inline-flex items-center gap-[0.4375em] transition-opacity;
  transition-duration: var(--_btn-duration);
}

.base-button__content--hidden {
  @apply opacity-0;
}

.base-button__icon {
  @apply inline-flex items-center shrink-0;
}

.base-button__spinner {
  @apply absolute top-1/2 left-1/2 w-[1em] h-[1em];
  @apply mt-[-0.5em] ml-[-0.5em];
  @apply border-[1.5px] border-current border-t-transparent rounded-full;
  animation: base-button-spin 580ms linear infinite;
}

@keyframes base-button-spin {
  to { transform: rotate(360deg); }
}


.base-button--sm {
  @apply py-1.5 px-3.25 text-[0.8125rem] min-h-8;
}

.base-button--md {
  @apply py-2.25 px-4.75 text-[0.9375rem] min-h-10;
}

.base-button--lg {
  @apply py-3 px-6.5 text-[1.0625rem] min-h-12;
}

.base-button--primary {
  background-color: var(--_btn-primary-bg);
  color: var(--_btn-primary-color);
  box-shadow: var(--_btn-primary-shadow);
}
.base-button--primary:hover:not(:disabled) {
  @apply -translate-y-px;
  background-color: var(--_btn-primary-bg-hover);
  box-shadow: var(--_btn-primary-shadow-hover);
}

.base-button--secondary {
  background-color: var(--_btn-secondary-bg);
  color: var(--_btn-secondary-color);
}
.base-button--secondary:hover:not(:disabled) {
  @apply -translate-y-px;
  background-color: var(--_btn-secondary-bg-hover);
}

.base-button--outlined {
  @apply bg-transparent;
  border-color: var(--_btn-outlined-border);
  color: var(--_btn-outlined-color);
}
.base-button--outlined:hover:not(:disabled) {
  @apply -translate-y-px;
  background-color: var(--_btn-outlined-bg-hover);
  border-color: var(--_btn-outlined-border-hover);
  box-shadow: 0 2px 8px -2px rgb(28 25 23 / 0.12);
}

.base-button--ghost {
  @apply bg-transparent;
  color: var(--_btn-ghost-color);
}
.base-button--ghost:hover:not(:disabled) {
  background-color: var(--_btn-ghost-bg-hover);
}

.base-button--danger {
  background-color: var(--_btn-danger-bg);
  color: var(--_btn-danger-color);
  box-shadow: var(--_btn-danger-shadow);
}
.base-button--danger:hover:not(:disabled) {
  @apply -translate-y-px;
  background-color: var(--_btn-danger-bg-hover);
  box-shadow: var(--_btn-danger-shadow-hover);
}

.base-button--disabled,
.base-button:disabled {
  @apply opacity-[0.42] cursor-not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.base-button--loading {
  @apply cursor-wait;
}
</style>
