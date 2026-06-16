<script setup lang="ts">
defineEmits<{
  click: [MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    class="est-tag__close"
    aria-label="Close tag"
    @click="$emit('click', $event)"
  >
    <span class="i-ri-close-line w-[1.2em] h-[1.2em]" aria-hidden="true" />
  </button>
</template>
