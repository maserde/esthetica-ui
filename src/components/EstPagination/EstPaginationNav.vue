<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Ref } from 'vue'
import EstButton from '../EstButton/EstButton.vue'

const currentPage = inject<Ref<number>>('est-pagination-current-page')!
const totalPages = inject<Ref<number>>('est-pagination-total-pages')!
const emitPage = inject<(page: number) => void>('est-pagination-emit-page')!

const isPrevDisabled = computed(() => currentPage.value <= 1)
const isNextDisabled = computed(() => currentPage.value >= totalPages.value)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value

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

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emitPage(page)
  }
}
</script>

<template>
  <div class="est-pagination__nav" role="navigation" aria-label="Page navigation">
    <EstButton
      class="est-pagination__nav-btn"
      :disabled="isPrevDisabled"
      aria-label="Previous page"
      @click="goToPage(currentPage - 1)"
    >
      <span class="i-ri-arrow-left-s-line w-[1em] h-[1em]" aria-hidden="true" />
    </EstButton>

    <template v-for="(page, index) in visiblePages" :key="index">
      <span v-if="page === 'ellipsis'" class="est-pagination__ellipsis" aria-hidden="true">…</span>
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
      @click="goToPage(currentPage + 1)"
    >
      <span class="i-ri-arrow-right-s-line w-[1em] h-[1em]" aria-hidden="true" />
    </EstButton>
  </div>
</template>
