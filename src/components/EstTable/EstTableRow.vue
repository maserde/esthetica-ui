<script setup lang="ts">
export interface Props {
  striped?: boolean
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  striped: false,
  hoverable: false,
})
</script>

<template>
  <tr
    :class="{
      'est-table__row': true,
      'est-table__row--striped': striped,
      'est-table__row--hoverable': hoverable,
    }"
  >
    <slot />
  </tr>
</template>
