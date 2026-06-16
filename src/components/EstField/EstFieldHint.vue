<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

const error = inject<Ref<string | undefined>>('est-field-error')
</script>

<template>
  <p v-if="!error" class="est-field__hint">
    <slot />
  </p>
</template>
