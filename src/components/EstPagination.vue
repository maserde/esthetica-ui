<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import EstInput from './EstInput.vue'
import EstButton from './EstButton.vue'

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

const pageInputValue = ref(String(props.currentPage))
const isRowsDropdownOpen = ref(false)

watch(
  () => props.currentPage,
  (newPage) => {
    pageInputValue.value = String(newPage)
  },
)

function handlePageInputChange() {
  const parsed = parseInt(pageInputValue.value, 10)
  if (!isNaN(parsed) && parsed >= 1 && parsed <= props.totalPages) {
    emit('update:currentPage', parsed)
  } else {
    pageInputValue.value = String(props.currentPage)
  }
}

function handlePageInputKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    handlePageInputChange()
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

function handleRowsPerPageChange(rows: number) {
  emit('update:rowsPerPage', rows)
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

const isPrevDisabled = computed(() => props.currentPage <= 1)
const isNextDisabled = computed(() => props.currentPage >= props.totalPages)

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []

  pages.push(1)

  if (current <= 3) {
    pages.push(2, 3)
    pages.push('ellipsis')
    pages.push(total - 2, total - 1, total)
  } else if (current >= total - 2) {
    pages.push('ellipsis')
    pages.push(total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push('ellipsis')
    pages.push(current - 1, current, current + 1)
    pages.push('ellipsis')
    pages.push(total)
  }

  return pages
})
</script>

<template>
  <div class="est-pagination">
    <div class="est-pagination__info">
      <span class="est-pagination__info-text">Showing page</span>
      <EstInput
        v-model="pageInputValue"
        type="text"
        inputmode="numeric"
        aria-label="Current page"
        @blur="handlePageInputChange"
        @keydown="handlePageInputKeydown"
      />
      <span class="est-pagination__info-text">of {{ totalPages }}</span>
    </div>

    <div class="est-pagination__nav" role="navigation" aria-label="Page navigation">
      <EstButton
        class="est-pagination__nav-btn"
        :disabled="isPrevDisabled"
        aria-label="Previous page"
        @click="goToPage(props.currentPage - 1)"
      >
        <span class="i-ri-arrow-left-s-line w-[1em] h-[1em]" aria-hidden="true" />
      </EstButton>

      <template v-for="(page, index) in visiblePages" :key="index">
        <span v-if="page === 'ellipsis'" class="est-pagination__ellipsis" aria-hidden="true"
          >…</span
        >
        <EstButton
          v-else
          class="est-pagination__page-btn"
          :class="{ 'est-pagination__page-btn--active': currentPage === page }"
          :aria-current="currentPage === page ? 'page' : undefined"
          @click="goToPage(page)"
        >
          {{ page }}
        </EstButton>
      </template>

      <EstButton
        class="est-pagination__nav-btn"
        :disabled="isNextDisabled"
        aria-label="Next page"
        @click="goToPage(props.currentPage + 1)"
      >
        <span class="i-ri-arrow-right-s-line w-[1em] h-[1em]" aria-hidden="true" />
      </EstButton>
    </div>

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
  </div>
</template>

<style scoped src="./EstPagination.css" />
