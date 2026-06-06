<script setup lang="ts">
import { computed, provide } from 'vue'

export type AccordionType = 'single' | 'multiple'

export interface Props {
  modelValue?: string | string[]
  type?: AccordionType
  collapsible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  type: 'single',
  collapsible: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | undefined]
}>()

const activeItems = computed(() => {
  if (props.modelValue === undefined) return []
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

const toggleItem = (itemValue: string) => {
  if (props.type === 'multiple') {
    const current = Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : props.modelValue
        ? [props.modelValue as string]
        : []
    const index = current.indexOf(itemValue)
    if (index === -1) {
      current.push(itemValue)
    } else {
      current.splice(index, 1)
    }
    emit('update:modelValue', current)
  } else {
    // Single mode
    if (props.modelValue === itemValue) {
      if (props.collapsible) {
        emit('update:modelValue', undefined)
      }
    } else {
      emit('update:modelValue', itemValue)
    }
  }
}

provide('est-accordion-active-items', activeItems)
provide('est-accordion-toggle', toggleItem)
</script>

<template>
  <div class="est-accordion">
    <slot />
  </div>
</template>

<style scoped src="./EstAccordion.css" />
