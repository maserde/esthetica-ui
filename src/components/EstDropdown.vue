<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, useId } from 'vue'
import { useVariantClasses } from '@/composables/useVariantClasses'

export type DropdownSize = 'sm' | 'md' | 'lg'

export interface DropdownOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface Props {
  modelValue?: string | number | null
  options?: DropdownOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  size?: DropdownSize
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  placeholder: 'Select an option',
  disabled: false,
  error: false,
  size: 'md',
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const { buildVariant } = useVariantClasses()
const generatedId = useId()
const dropdownId = computed(() => props.id ?? generatedId)

const isOpen = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLUListElement | null>(null)
const highlightedIndex = ref(-1)

const selectedOption = computed(() => props.options.find((opt) => opt.value === props.modelValue))

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    highlightedIndex.value = props.options.findIndex((opt) => opt.value === props.modelValue)
  }
}

function close() {
  isOpen.value = false
  highlightedIndex.value = -1
}

function selectOption(option: DropdownOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  close()
  triggerRef.value?.focus()
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (
    triggerRef.value &&
    !triggerRef.value.contains(target) &&
    menuRef.value &&
    !menuRef.value.contains(target)
  ) {
    close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      isOpen.value = true
      highlightedIndex.value = props.options.findIndex((opt) => opt.value === props.modelValue)
      if (highlightedIndex.value === -1) highlightedIndex.value = 0
    }
    return
  }

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault()
      const nextIndex = findNextEnabledIndex(highlightedIndex.value, 1)
      if (nextIndex !== -1) highlightedIndex.value = nextIndex
      break
    }
    case 'ArrowUp': {
      event.preventDefault()
      const prevIndex = findNextEnabledIndex(highlightedIndex.value, -1)
      if (prevIndex !== -1) highlightedIndex.value = prevIndex
      break
    }
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (highlightedIndex.value >= 0 && highlightedIndex.value < props.options.length) {
        const opt = props.options[highlightedIndex.value]
        if (opt) selectOption(opt)
      }
      break
    case 'Escape':
      event.preventDefault()
      close()
      triggerRef.value?.focus()
      break
    case 'Home':
      event.preventDefault()
      highlightedIndex.value = findNextEnabledIndex(-1, 1)
      break
    case 'End':
      event.preventDefault()
      highlightedIndex.value = findNextEnabledIndex(props.options.length, -1)
      break
  }
}

function findNextEnabledIndex(current: number, direction: 1 | -1): number {
  let index = current + direction
  while (index >= 0 && index < props.options.length) {
    if (!props.options[index]?.disabled) return index
    index += direction
  }
  return -1
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div
    :class="{
      ...buildVariant('est-dropdown', size ?? 'md'),
      'est-dropdown--disabled': disabled,
      'est-dropdown--open': isOpen,
    }"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <button
      :id="dropdownId"
      ref="triggerRef"
      type="button"
      class="est-dropdown__trigger"
      :class="{
        'est-dropdown__trigger--error': error,
      }"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="`${dropdownId}-menu`"
      :disabled="disabled"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span v-if="selectedOption" class="est-dropdown__value">
        {{ selectedOption.label }}
      </span>
      <span v-else class="est-dropdown__placeholder">
        {{ placeholder }}
      </span>
      <span class="i-ri-arrow-down-s-line est-dropdown__icon w-[1em] h-[1em]" aria-hidden="true" />
    </button>

    <ul
      v-if="isOpen"
      :id="`${dropdownId}-menu`"
      ref="menuRef"
      role="listbox"
      class="est-dropdown__menu"
      :aria-activedescendant="
        highlightedIndex >= 0 ? `${dropdownId}-option-${highlightedIndex}` : undefined
      "
    >
      <li v-if="options.length === 0" class="est-dropdown__empty">No options</li>
      <li
        v-for="(option, index) in options"
        :id="`${dropdownId}-option-${index}`"
        :key="option.value"
        role="option"
        class="est-dropdown__option"
        :class="{
          'est-dropdown__option--active': option.value === modelValue,
          'est-dropdown__option--highlighted': index === highlightedIndex,
        }"
        :aria-selected="option.value === modelValue"
        :aria-disabled="option.disabled ? 'true' : undefined"
        @click="selectOption(option)"
        @mouseenter="highlightedIndex = index"
      >
        <span class="est-dropdown__value">{{ option.label }}</span>
        <span
          v-if="option.value === modelValue"
          class="i-ri-check-line est-dropdown__check w-[1em] h-[1em]"
          aria-hidden="true"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped src="./EstDropdown.css" />
