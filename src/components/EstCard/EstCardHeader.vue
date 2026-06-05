<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

const borderless = inject<Ref<boolean>>('est-card-borderless')
</script>

<template>
  <div
    :class="{
      'est-card__header': true,
      'est-card__header--bordered': !borderless,
    }"
  >
    <slot />
  </div>
</template>
