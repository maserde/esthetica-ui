<script setup lang="ts">
export interface Props {
  colspan?: number
}

withDefaults(defineProps<Props>(), {
  colspan: 1,
})
</script>

<template>
  <tr class="est-table__row est-table__row--empty">
    <td :colspan="colspan" class="est-table__empty">
      <slot />
    </td>
  </tr>
</template>
