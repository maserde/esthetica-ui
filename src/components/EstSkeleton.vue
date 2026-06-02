<script setup lang="ts">
import { useVariantClasses } from '@/composables/useVariantClasses'

export type SkeletonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface Props {
  rounded?: SkeletonRounded
}

withDefaults(defineProps<Props>(), {
  rounded: 'md',
})

const { buildVariant } = useVariantClasses()
</script>

<template>
  <div :class="{ ...buildVariant('est-skeleton', rounded ?? 'md') }" aria-hidden="true" />
</template>

<style scoped src="./EstSkeleton.css" />
