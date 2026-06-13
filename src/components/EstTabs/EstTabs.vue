<script setup lang="ts">
import { computed, provide, toRef } from 'vue'

export type TabsVariant = 'default' | 'surface'

export interface Props {
  modelValue?: string
  variant?: TabsVariant
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = computed(() => props.modelValue)

const setTab = (value: string) => {
  emit('update:modelValue', value)
}

provide('est-tabs-active', activeTab)
provide('est-tabs-set', setTab)
provide('est-tabs-variant', toRef(props, 'variant'))
</script>

<template>
  <div
    class="est-tabs"
    :class="{
      'est-tabs--surface': variant === 'surface',
    }"
  >
    <slot />
  </div>
</template>

<style scoped src="./EstTabs.css" />
