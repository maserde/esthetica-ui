<script setup lang="ts">
import { useSlots } from 'vue'

export interface Props {
  borderless?: boolean
}

withDefaults(defineProps<Props>(), {
  borderless: false,
})

const slots = useSlots()
</script>

<template>
  <div
    :class="{
      'est-table': true,
      'est-table--borderless': borderless,
    }"
  >
    <div v-if="slots.header" class="est-table__slot-header">
      <slot name="header" />
    </div>

    <div class="est-table__scroll">
      <table class="est-table__table">
        <slot />
      </table>
    </div>

    <div v-if="slots.footer" class="est-table__slot-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped src="./EstTable.css" />
