<script setup lang="ts">
import { provide, toRef } from 'vue'

export interface Props {
  currentPage?: number
  totalPages?: number
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
  rowsPerPage: 10,
  rowsPerPageOptions: () => [5, 10, 25, 50],
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'update:rowsPerPage': [rows: number]
}>()

provide('est-pagination-current-page', toRef(props, 'currentPage'))
provide('est-pagination-total-pages', toRef(props, 'totalPages'))
provide('est-pagination-rows-per-page', toRef(props, 'rowsPerPage'))
provide('est-pagination-rows-options', toRef(props, 'rowsPerPageOptions'))
provide('est-pagination-emit-page', (page: number) => emit('update:currentPage', page))
provide('est-pagination-emit-rows', (rows: number) => emit('update:rowsPerPage', rows))
</script>

<template>
  <div class="est-pagination">
    <slot />
  </div>
</template>

<style scoped src="./EstPagination.css" />
