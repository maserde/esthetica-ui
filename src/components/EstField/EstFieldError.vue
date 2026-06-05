<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

const error = inject<Ref<string | undefined>>('est-field-error')
</script>

<template>
  <p v-if="error" class="est-field__error" role="alert">
    <span class="i-ri-error-warning-line w-[1em] h-[1em]" aria-hidden="true" />
    <span>{{ error }}</span>
  </p>
</template>
