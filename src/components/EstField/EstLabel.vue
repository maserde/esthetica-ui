<script setup lang="ts">
import { inject } from 'vue'
import type { ComputedRef } from 'vue'

const inputId = inject<ComputedRef<string>>('est-field-id')
</script>

<template>
  <label :for="inputId" class="est-field__label">
    <slot />
  </label>
</template>
