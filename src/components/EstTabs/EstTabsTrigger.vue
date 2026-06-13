<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

export interface Props {
  value: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const activeTab = inject<Ref<string | undefined>>('est-tabs-active')
const setTab = inject<(value: string) => void>('est-tabs-set')

if (!activeTab || !setTab) {
  throw new Error('EstTabsTrigger must be used within an EstTabs component')
}

const isActive = computed(() => activeTab.value === props.value)

const triggerId = computed(() => `est-tabs-trigger-${props.value}`)
const panelId = computed(() => `est-tabs-panel-${props.value}`)

const handleClick = () => {
  if (props.disabled) return
  setTab(props.value)
}
</script>

<template>
  <button
    :id="triggerId"
    type="button"
    role="tab"
    :aria-selected="isActive"
    :aria-controls="panelId"
    :aria-disabled="disabled"
    :disabled="disabled"
    :class="{
      'est-tabs__trigger': true,
      'est-tabs__trigger--active': isActive,
      'est-tabs__trigger--disabled': disabled,
    }"
    @click="handleClick"
  >
    <span
      :class="{
        'est-tabs__trigger-icon': true,
        'i-ri-record-circle-line': isActive,
        'i-ri-circle-line': !isActive,
      }"
      aria-hidden="true"
    />
    <span class="est-tabs__trigger-label">
      <slot />
    </span>
    <span v-if="$slots.badge" class="est-tabs__trigger-badge">
      <slot name="badge" />
    </span>
  </button>
</template>
