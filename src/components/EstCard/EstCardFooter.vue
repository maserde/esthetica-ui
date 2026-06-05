<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

const borderless = inject<Ref<boolean>>('est-card-borderless')
</script>

<template>
  <div
    :class="{
      'est-card__footer': true,
      'est-card__footer--bordered': !borderless,
    }"
  >
    <slot />
  </div>
</template>
