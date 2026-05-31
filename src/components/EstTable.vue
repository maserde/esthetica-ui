<script setup lang="ts">
import { computed, useSlots } from 'vue'
import EstSkeleton from './EstSkeleton.vue'

export interface TableColumn {
  key: string
  label: string
  width?: string
}

export interface Props {
  columns: TableColumn[]
  rows: Record<string, unknown>[]
  loading?: boolean
  skeletonRowCount?: number
  striped?: boolean
  hoverable?: boolean
  borderless?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  skeletonRowCount: 5,
  striped: false,
  hoverable: false,
  borderless: false,
})

const slots = useSlots()

const hasHeaderSlot = computed(() => !!slots.header)
const hasFooterSlot = computed(() => !!slots.footer)

const containerClasses = computed(() => ({
  'est-table': true,
  'est-table--borderless': props.borderless,
}))

function rowClasses(index: number) {
  return {
    'est-table__row': true,
    'est-table__row--striped': props.striped && index % 2 === 1,
    'est-table__row--hoverable': props.hoverable,
  }
}
</script>

<template>
  <div :class="containerClasses" :aria-busy="loading || undefined">
    <div v-if="hasHeaderSlot" class="est-table__slot-header">
      <slot name="header" />
    </div>

    <div v-if="loading" class="est-table__scroll">
      <table class="est-table__table">
        <thead>
          <tr class="est-table__header-row">
            <th
              v-for="column in columns"
              :key="column.key"
              class="est-table__header-cell"
              :style="column.width ? { width: column.width } : undefined"
              scope="col"
            >
              <EstSkeleton class="h-3.5 w-20" rounded="sm" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowIndex in skeletonRowCount" :key="rowIndex" class="est-table__row">
            <td v-for="column in columns" :key="column.key" class="est-table__body-cell">
              <EstSkeleton class="h-3.5 w-full max-w-48" rounded="sm" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="est-table__scroll">
      <table class="est-table__table">
        <thead>
          <tr class="est-table__header-row">
            <th
              v-for="column in columns"
              :key="column.key"
              class="est-table__header-cell"
              :style="column.width ? { width: column.width } : undefined"
              scope="col"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" :class="rowClasses(index)">
            <td v-for="column in columns" :key="column.key" class="est-table__body-cell">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length" class="est-table__empty">
              <slot name="empty">No data available</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="hasFooterSlot" class="est-table__slot-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped src="./EstTable.css" />
