<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { BreadcrumbItem } from './EstBreadcrumb.vue'

export interface Props {
  items?: BreadcrumbItem[]
}

withDefaults(defineProps<Props>(), {
  items: () => [],
})

const isOpen = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLUListElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (
    triggerRef.value &&
    !triggerRef.value.contains(target) &&
    menuRef.value &&
    !menuRef.value.contains(target)
  ) {
    close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    triggerRef.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <li role="presentation" class="est-breadcrumb__item">
    <div class="est-breadcrumb__ellipsis-wrapper">
      <button
        ref="triggerRef"
        type="button"
        class="est-breadcrumb__ellipsis-trigger"
        :aria-expanded="isOpen"
        aria-label="Show hidden pages"
        @click="toggle"
        @keydown="handleKeydown"
      >
        <slot>…</slot>
      </button>

      <ul
        v-if="isOpen && items && items.length > 0"
        ref="menuRef"
        class="est-breadcrumb__ellipsis-menu"
        role="menu"
      >
        <li
          v-for="item in items"
          :key="item.label"
          role="menuitem"
          class="est-breadcrumb__ellipsis-option"
        >
          <a
            v-if="item.href"
            :href="item.href"
            class="est-breadcrumb__ellipsis-link"
            @click="close"
          >
            {{ item.label }}
          </a>
          <span v-else class="est-breadcrumb__ellipsis-text">
            {{ item.label }}
          </span>
        </li>
      </ul>
    </div>
  </li>
</template>
