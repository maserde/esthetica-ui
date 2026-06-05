<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import EstButton from '../EstButton/EstButton.vue'

const rowsPerPage = inject<Ref<number>>('est-pagination-rows-per-page')!
const rowsPerPageOptions = inject<Ref<number[]>>('est-pagination-rows-options')!
const emitRows = inject<(rows: number) => void>('est-pagination-emit-rows')!

const isRowsDropdownOpen = ref(false)

function handleRowsPerPageChange(rows: number) {
  emitRows(rows)
  isRowsDropdownOpen.value = false
}

function toggleRowsDropdown() {
  isRowsDropdownOpen.value = !isRowsDropdownOpen.value
}

function handleDropdownBlur(event: FocusEvent) {
  const relatedTarget = event.relatedTarget as HTMLElement | null
  if (!relatedTarget || !relatedTarget.closest('.est-pagination__rows-dropdown')) {
    isRowsDropdownOpen.value = false
  }
}
</script>

<template>
  <div class="est-pagination__rows">
    <span class="est-pagination__rows-label">Rows per page</span>
    <div class="est-pagination__rows-dropdown" tabindex="0" @blur="handleDropdownBlur">
      <EstButton
        class="est-pagination__rows-trigger"
        :aria-expanded="isRowsDropdownOpen"
        aria-haspopup="listbox"
        @click="toggleRowsDropdown"
      >
        {{ rowsPerPage }}
        <template #trailing>
          <span
            class="i-ri-arrow-down-s-line w-[1em] h-[1em] est-pagination__rows-chevron"
            :class="{ 'est-pagination__rows-chevron--open': isRowsDropdownOpen }"
            aria-hidden="true"
          />
        </template>
      </EstButton>
      <div v-if="isRowsDropdownOpen" class="est-pagination__rows-menu" role="listbox">
        <EstButton
          v-for="option in rowsPerPageOptions"
          :key="option"
          class="est-pagination__rows-option"
          :class="{ 'est-pagination__rows-option--active': rowsPerPage === option }"
          role="option"
          :aria-selected="rowsPerPage === option"
          @mousedown.prevent="handleRowsPerPageChange(option)"
        >
          {{ option }}
        </EstButton>
      </div>
    </div>
  </div>
</template>
