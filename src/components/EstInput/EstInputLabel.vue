<script setup lang="ts">
import { inject } from 'vue'
import type { ComputedRef } from 'vue'

const inputId = inject<ComputedRef<string>>('est-input-id')
</script>

<template>
  <label :for="inputId" class="est-input__label">
    <slot />
  </label>
</template>
