<script setup lang="ts">
import { computed } from 'vue'
import EstBreadcrumbList from './EstBreadcrumbList.vue'
import EstBreadcrumbItem from './EstBreadcrumbItem.vue'
import EstBreadcrumbLink from './EstBreadcrumbLink.vue'
import EstBreadcrumbPage from './EstBreadcrumbPage.vue'
import EstBreadcrumbSeparator from './EstBreadcrumbSeparator.vue'
import EstBreadcrumbEllipsis from './EstBreadcrumbEllipsis.vue'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

export interface Props {
  ariaLabel?: string
  items?: BreadcrumbItem[]
  separator?: string
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'breadcrumb',
  items: undefined,
  separator: '/',
})

const visibleItems = computed(() => {
  if (!props.items || props.items.length === 0) return null
  const all = props.items

  if (all.length <= 3) {
    return { before: all, collapsed: false, after: [] as BreadcrumbItem[] }
  }

  // If > 3, show first two, then ellipsis, then the last one
  const before = [all[0]!, all[1]!]
  const after = [all[all.length - 1]!]

  return { before, collapsed: true, after }
})

function isLastItem(item: BreadcrumbItem): boolean {
  if (!props.items) return false
  return props.items[props.items.length - 1] === item
}
</script>

<template>
  <nav class="est-breadcrumb" :aria-label="ariaLabel">
    <slot>
      <EstBreadcrumbList v-if="visibleItems">
        <!-- Before items -->
        <template v-for="(item, idx) in visibleItems.before" :key="'b-' + idx">
          <EstBreadcrumbItem>
            <EstBreadcrumbLink
              v-if="item.href && !isLastItem(item)"
              :href="item.href"
              :class="{ 'est-breadcrumb__link--icon-only': !!item.icon }"
              :aria-label="item.icon ? item.label : undefined"
            >
              <span
                v-if="item.icon"
                :class="[item.icon, 'est-breadcrumb__icon']"
                aria-hidden="true"
              />
              <span v-else>{{ item.label }}</span>
            </EstBreadcrumbLink>

            <EstBreadcrumbPage v-else :aria-label="item.icon ? item.label : undefined">
              <span
                v-if="item.icon"
                :class="[item.icon, 'est-breadcrumb__icon']"
                aria-hidden="true"
              />
              <span v-else>{{ item.label }}</span>
            </EstBreadcrumbPage>
          </EstBreadcrumbItem>

          <EstBreadcrumbSeparator
            v-if="idx < visibleItems.before.length - 1 || visibleItems.collapsed"
          >
            {{ separator }}
          </EstBreadcrumbSeparator>
        </template>

        <!-- Ellipsis -->
        <template v-if="visibleItems.collapsed">
          <EstBreadcrumbItem>
            <EstBreadcrumbEllipsis />
          </EstBreadcrumbItem>
          <EstBreadcrumbSeparator>
            {{ separator }}
          </EstBreadcrumbSeparator>
        </template>

        <!-- After items -->
        <template v-for="(item, idx) in visibleItems.after" :key="'a-' + idx">
          <EstBreadcrumbItem>
            <EstBreadcrumbLink
              v-if="item.href && !isLastItem(item)"
              :href="item.href"
              :class="{ 'est-breadcrumb__link--icon-only': !!item.icon }"
              :aria-label="item.icon ? item.label : undefined"
            >
              <span
                v-if="item.icon"
                :class="[item.icon, 'est-breadcrumb__icon']"
                aria-hidden="true"
              />
              <span v-else>{{ item.label }}</span>
            </EstBreadcrumbLink>

            <EstBreadcrumbPage v-else :aria-label="item.icon ? item.label : undefined">
              <span
                v-if="item.icon"
                :class="[item.icon, 'est-breadcrumb__icon']"
                aria-hidden="true"
              />
              <span v-else>{{ item.label }}</span>
            </EstBreadcrumbPage>
          </EstBreadcrumbItem>
          <EstBreadcrumbSeparator v-if="idx < visibleItems.after.length - 1">
            {{ separator }}
          </EstBreadcrumbSeparator>
        </template>
      </EstBreadcrumbList>
    </slot>
  </nav>
</template>

<style scoped src="./EstBreadcrumb.css" />
