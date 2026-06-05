<script setup lang="ts">
import { computed, inject, provide, type Ref } from 'vue'

export interface Props {
  value: string
}

const props = defineProps<Props>()

const activeItems = inject<Ref<string[]>>('est-accordion-active-items')

if (!activeItems) {
  throw new Error('EstAccordionItem must be used within an EstAccordion')
}

const isActive = computed(() => activeItems.value.includes(props.value))

provide('est-accordion-item-value', props.value)
provide('est-accordion-item-active', isActive)
</script>

<template>
  <div class="est-accordion__item" :data-state="isActive ? 'open' : 'closed'">
    <slot />
  </div>
</template>
