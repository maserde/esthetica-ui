<script setup lang="ts">
export interface Props {
  as?: string
  href?: string
}

withDefaults(defineProps<Props>(), {
  as: 'a',
  href: undefined,
})
</script>

<template>
  <component :is="as" class="est-breadcrumb__link" :href="href">
    <slot />
  </component>
</template>
