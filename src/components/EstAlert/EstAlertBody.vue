<script setup lang="ts">
import { inject, type Ref } from 'vue'

const hasTitle = inject<Ref<boolean>>('est-alert-has-title')
</script>
<template>
  <div
    :class="{
      'est-alert__body': true,
      'est-alert__body--has-title': hasTitle ?? false,
    }"
  >
    <slot />
  </div>
</template>
