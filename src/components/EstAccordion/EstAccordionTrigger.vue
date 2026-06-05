<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import EstAccordionIcon from './EstAccordionIcon.vue'

const itemValue = inject<string>('est-accordion-item-value')
const isActive = inject<Ref<boolean>>('est-accordion-item-active')
const toggleItem = inject<(value: string) => void>('est-accordion-toggle')

if (itemValue === undefined || !isActive || !toggleItem) {
  throw new Error('EstAccordionTrigger must be used within an EstAccordionItem')
}

const handleClick = () => {
  toggleItem(itemValue)
}

const triggerId = computed(() => `est-accordion-trigger-${itemValue}`)
const contentId = computed(() => `est-accordion-content-${itemValue}`)
</script>

<template>
  <button
    :id="triggerId"
    type="button"
    class="est-accordion__trigger"
    :aria-expanded="isActive"
    :aria-controls="contentId"
    @click="handleClick"
  >
    <slot name="leading" />
    <span class="est-accordion__trigger-title flex-1 text-left">
      <slot />
    </span>
    <slot name="trailing">
      <EstAccordionIcon />
    </slot>
  </button>
</template>
