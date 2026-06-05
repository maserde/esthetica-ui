<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import type { Ref } from 'vue'
import EstField from '../EstField/EstField.vue'
import EstInput from '../EstField/EstInput.vue'

const currentPage = inject<Ref<number>>('est-pagination-current-page')!
const totalPages = inject<Ref<number>>('est-pagination-total-pages')!
const emitPage = inject<(page: number) => void>('est-pagination-emit-page')!

const pageInputValue = ref(String(currentPage.value))

watch(currentPage, (newPage) => {
  pageInputValue.value = String(newPage)
})

function handlePageInputChange() {
  const parsed = parseInt(pageInputValue.value, 10)
  if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages.value) {
    emitPage(parsed)
  } else {
    pageInputValue.value = String(currentPage.value)
  }
}

function handlePageInputKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    handlePageInputChange()
  }
}
</script>

<template>
  <div class="est-pagination__page-input">
    <span class="est-pagination__page-input-text">Showing page</span>
    <EstField v-model="pageInputValue">
      <EstInput
        type="text"
        inputmode="numeric"
        aria-label="Current page"
        @blur="handlePageInputChange"
        @keydown="handlePageInputKeydown"
      />
    </EstField>
    <span class="est-pagination__page-input-text">of {{ totalPages }}</span>
  </div>
</template>
