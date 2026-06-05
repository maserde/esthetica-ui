<script setup lang="ts">
export interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'span',
})
</script>

<template>
  <component
    :is="as"
    class="est-breadcrumb__page"
    aria-current="page"
    role="link"
    aria-disabled="true"
  >
    <slot />
  </component>
</template>
