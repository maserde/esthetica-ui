<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

export interface Props {
  value: string
}

const props = withDefaults(defineProps<Props>(), {})

const activeTab = inject<Ref<string | undefined>>('est-tabs-active')

const isActive = computed(() => activeTab?.value === props.value)

const panelId = computed(() => `est-tabs-panel-${props.value}`)
const triggerId = computed(() => `est-tabs-trigger-${props.value}`)
</script>

<template>
  <div
    :id="panelId"
    role="tabpanel"
    :aria-labelledby="triggerId"
    class="est-tabs__content"
    :class="{ 'est-tabs__content--active': isActive }"
    :hidden="!isActive"
  >
    <slot />
  </div>
</template>
