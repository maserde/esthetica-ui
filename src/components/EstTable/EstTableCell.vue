<script setup lang="ts">
export interface Props {
  colspan?: number | string
  rowspan?: number | string
}

withDefaults(defineProps<Props>(), {
  colspan: undefined,
  rowspan: undefined,
})
</script>

<template>
  <td class="est-table__body-cell" :colspan="colspan" :rowspan="rowspan">
    <slot />
  </td>
</template>
