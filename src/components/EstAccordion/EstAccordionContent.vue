<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

const itemValue = inject<string>('est-accordion-item-value')
const isActive = inject<Ref<boolean>>('est-accordion-item-active')

if (itemValue === undefined || !isActive) {
  throw new Error('EstAccordionContent must be used within an EstAccordionItem')
}

const triggerId = computed(() => `est-accordion-trigger-${itemValue}`)
const contentId = computed(() => `est-accordion-content-${itemValue}`)
</script>

<template>
  <div class="est-accordion__content-wrapper">
    <div :id="contentId" role="region" :aria-labelledby="triggerId" class="est-accordion__content">
      <div class="est-accordion__content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
