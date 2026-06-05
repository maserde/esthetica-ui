<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import type { Ref } from 'vue'
import EstInput from '../EstInput/EstInput.vue'
import EstInputField from '../EstInput/EstInputField.vue'

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
  <div class="est-pagination__info">
    <span class="est-pagination__info-text">Showing page</span>
    <EstInput v-model="pageInputValue">
      <EstInputField
        type="text"
        inputmode="numeric"
        aria-label="Current page"
        @blur="handlePageInputChange"
        @keydown="handlePageInputKeydown"
      />
    </EstInput>
    <span class="est-pagination__info-text">of {{ totalPages }}</span>
  </div>
</template>
