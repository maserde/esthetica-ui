<script setup lang="ts">
export type SkeletonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface Props {
  rounded?: SkeletonRounded
}

const props = withDefaults(defineProps<Props>(), {
  rounded: 'md',
})
</script>

<template>
  <div
    :class="{
      'est-skeleton': true,
      'est-skeleton--none': props.rounded === 'none',
      'est-skeleton--sm': props.rounded === 'sm',
      'est-skeleton--md': props.rounded === 'md',
      'est-skeleton--lg': props.rounded === 'lg',
      'est-skeleton--full': props.rounded === 'full',
    }"
    aria-hidden="true"
  />
</template>

<style scoped src="./EstSkeleton.css" />
