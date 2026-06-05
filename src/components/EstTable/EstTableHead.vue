<script setup lang="ts">
export interface Props {
  width?: string
  colspan?: number | string
  rowspan?: number | string
}

withDefaults(defineProps<Props>(), {
  width: undefined,
  colspan: undefined,
  rowspan: undefined,
})
</script>

<template>
  <th
    class="est-table__header-cell"
    :style="width ? { width } : undefined"
    :colspan="colspan"
    :rowspan="rowspan"
    scope="col"
  >
    <slot />
  </th>
</template>
