<script setup lang="ts">
import { provide, toRef } from 'vue'
import { useVariantClasses } from '@/composables/useVariantClasses.ts'
import EstCard from '@/components/EstCard.vue'

export type AlertVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  variant?: AlertVariant
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'success',
  dismissible: true,
})

const emit = defineEmits<{
  dismiss: []
}>()

provide('est-alert-variant', toRef(props, 'variant'))

const { buildVariant } = useVariantClasses()
</script>

<template>
  <EstCard :variant="props.variant" role="alert">
    <div :class="{ ...buildVariant('est-alert__inner', props.variant ?? 'primary') }">
      <slot />
      <button
        v-if="props.dismissible"
        type="button"
        class="est-alert__close"
        aria-label="Dismiss alert"
        @click="emit('dismiss')"
      >
        <span class="i-ri-close-line w-[1.4em] h-[1.4em]" aria-hidden="true" />
      </button>
    </div>
  </EstCard>
</template>

<style scoped src="EstAlert.css" />
