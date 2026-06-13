<script setup lang="ts">
// No props — purely a layout wrapper with ARIA role
</script>

<template>
  <div class="est-tabs__list" role="tablist" aria-label="Tabs">
    <slot />
  </div>
</template>
