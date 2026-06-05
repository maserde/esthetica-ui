<script setup lang="ts">
import { computed } from 'vue'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

export interface Props {
  items?: BreadcrumbItem[]
  maxVisible?: number
  separator?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  maxVisible: 3,
  separator: '/',
})

const emit = defineEmits<{
  navigate: [item: BreadcrumbItem, index: number]
}>()

const visibleItems = computed(() => {
  const all = props.items
  const max = props.maxVisible

  if (all.length <= max) {
    return { before: all, collapsed: false, after: [] as BreadcrumbItem[] }
  }

  // Show first (max - 1) items, then ellipsis, then last 1 item
  const before: BreadcrumbItem[] = all.slice(0, max - 1)
  const after: BreadcrumbItem[] = [all[all.length - 1]!]

  return { before, collapsed: true, after }
})

function handleNavigate(item: BreadcrumbItem, originalIndex: number, event: MouseEvent) {
  emit('navigate', item, originalIndex)
  if (!item.href) {
    event.preventDefault()
  }
}

function getOriginalIndex(item: BreadcrumbItem): number {
  return props.items.indexOf(item)
}

function isLastItem(item: BreadcrumbItem): boolean {
  return props.items[props.items.length - 1] === item
}
</script>

<template>
  <nav class="est-breadcrumb" aria-label="Breadcrumb">
    <ol class="est-breadcrumb__list">
      <!-- Before items -->
      <template v-for="item in visibleItems.before" :key="'b-' + item.label">
        <li class="est-breadcrumb__item">
          <a
            v-if="item.href && !isLastItem(item)"
            class="est-breadcrumb__link"
            :class="{ 'est-breadcrumb__link--icon-only': !!item.icon }"
            :href="item.href"
            :aria-label="item.icon ? item.label : undefined"
            @click="handleNavigate(item, getOriginalIndex(item), $event)"
          >
            <span
              v-if="item.icon"
              :class="{ [item.icon]: true, 'est-breadcrumb__icon': true }"
              aria-hidden="true"
            />
            <span v-else>{{ item.label }}</span>
          </a>
          <span
            v-else
            class="est-breadcrumb__text"
            :class="{ 'est-breadcrumb__text--current': isLastItem(item) }"
            :aria-current="isLastItem(item) ? 'page' : undefined"
          >
            <span
              v-if="item.icon"
              :class="{ [item.icon]: true, 'est-breadcrumb__icon': true }"
              aria-hidden="true"
            />
            <span v-else>{{ item.label }}</span>
          </span>
        </li>

        <li v-if="!isLastItem(item)" class="est-breadcrumb__item" aria-hidden="true">
          <span class="est-breadcrumb__separator">{{ separator }}</span>
        </li>
      </template>

      <!-- Ellipsis -->
      <template v-if="visibleItems.collapsed">
        <li class="est-breadcrumb__item">
          <span class="est-breadcrumb__ellipsis" aria-hidden="true">…</span>
        </li>

        <li class="est-breadcrumb__item" aria-hidden="true">
          <span class="est-breadcrumb__separator">{{ separator }}</span>
        </li>
      </template>

      <!-- After items (last item when collapsed) -->
      <template v-for="(item, idx) in visibleItems.after" :key="'a-' + item.label">
        <li class="est-breadcrumb__item">
          <a
            v-if="item.href && !isLastItem(item)"
            class="est-breadcrumb__link"
            :class="{ 'est-breadcrumb__link--icon-only': !!item.icon }"
            :href="item.href"
            :aria-label="item.icon ? item.label : undefined"
            @click="handleNavigate(item, getOriginalIndex(item), $event)"
          >
            <span
              v-if="item.icon"
              :class="{ [item.icon]: true, 'est-breadcrumb__icon': true }"
              aria-hidden="true"
            />
            <span v-else>{{ item.label }}</span>
          </a>
          <span
            v-else
            class="est-breadcrumb__text"
            :class="{ 'est-breadcrumb__text--current': isLastItem(item) }"
            :aria-current="isLastItem(item) ? 'page' : undefined"
          >
            <span
              v-if="item.icon"
              :class="{ [item.icon]: true, 'est-breadcrumb__icon': true }"
              aria-hidden="true"
            />
            <span v-else>{{ item.label }}</span>
          </span>
        </li>

        <li
          v-if="idx < visibleItems.after.length - 1"
          class="est-breadcrumb__item"
          aria-hidden="true"
        >
          <span class="est-breadcrumb__separator">{{ separator }}</span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<style scoped src="./EstBreadcrumb.css" />
