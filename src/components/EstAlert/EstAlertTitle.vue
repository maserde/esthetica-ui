<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'

const setHasTitle = inject<(value: boolean) => void>('est-alert-set-has-title')

onMounted(() => {
  if (setHasTitle) {
    setHasTitle(true)
  }
})

onUnmounted(() => {
  if (setHasTitle) {
    setHasTitle(false)
  }
})
</script>

<template>
  <div class="est-alert__title">
    <slot />
  </div>
</template>
