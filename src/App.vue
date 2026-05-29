<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './components/BaseButton.vue'

const loading = ref(false)

function simulateLoad() {
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}
</script>

<template>
  <div class="playground">
    <header class="playground__header">
      <p class="playground__eyebrow">esthetica-ui</p>
      <h1 class="playground__title">BaseButton</h1>
    </header>

    <main class="playground__main">
      <!-- Variants -->
      <section class="section">
        <h2 class="section__label">Variants</h2>
        <div class="row">
          <BaseButton variant="primary">Primary</BaseButton>
          <BaseButton variant="secondary">Secondary</BaseButton>
          <BaseButton variant="outlined">Outlined</BaseButton>
          <BaseButton variant="ghost">Ghost</BaseButton>
          <BaseButton variant="danger">Danger</BaseButton>
        </div>
      </section>

      <!-- Sizes -->
      <section class="section">
        <h2 class="section__label">Sizes</h2>
        <div class="row row--align-center">
          <BaseButton size="sm">Small</BaseButton>
          <BaseButton size="md">Medium</BaseButton>
          <BaseButton size="lg">Large</BaseButton>
        </div>
      </section>

      <!-- With icons -->
      <section class="section">
        <h2 class="section__label">With icons</h2>
        <div class="row">
          <BaseButton variant="primary">
            <template #leading>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H6.5v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8V2.75Z" fill="currentColor"/>
              </svg>
            </template>
            Add item
          </BaseButton>

          <BaseButton variant="outlined">
            Export
            <template #trailing>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 1.75a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3A.75.75 0 1 1 4.53 5.97L6.25 7.69V2.5A.75.75 0 0 1 7 1.75ZM1.75 11.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
              </svg>
            </template>
          </BaseButton>

          <BaseButton variant="ghost">
            <template #leading>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7.5 1a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 7.5 1ZM0 7.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
                <path d="M7 4.5a.5.5 0 0 1 1 0V7h2.5a.5.5 0 0 1 0 1H8v2.5a.5.5 0 0 1-1 0V8H4.5a.5.5 0 0 1 0-1H7V4.5Z" fill="currentColor"/>
              </svg>
            </template>
            New
          </BaseButton>
        </div>
      </section>

      <!-- Loading state -->
      <section class="section">
        <h2 class="section__label">Loading</h2>
        <div class="row">
          <BaseButton variant="primary" :loading="loading" @click="simulateLoad">
            {{ loading ? 'Saving…' : 'Save changes' }}
          </BaseButton>
          <BaseButton variant="outlined" loading>Processing</BaseButton>
          <BaseButton variant="danger" loading>Deleting</BaseButton>
        </div>
      </section>

      <!-- Disabled state -->
      <section class="section">
        <h2 class="section__label">Disabled</h2>
        <div class="row">
          <BaseButton variant="primary" disabled>Primary</BaseButton>
          <BaseButton variant="secondary" disabled>Secondary</BaseButton>
          <BaseButton variant="outlined" disabled>Outlined</BaseButton>
          <BaseButton variant="ghost" disabled>Ghost</BaseButton>
          <BaseButton variant="danger" disabled>Danger</BaseButton>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
  background: #fafaf9;
  color: #1c1917;
  min-height: 100vh;
}
</style>

<style scoped>
.playground {
  max-width: 860px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.playground__header {
  margin-bottom: 3.5rem;
}

.playground__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a8a29e;
  margin-bottom: 0.5rem;
}

.playground__title {
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #1c1917;
}

.section {
  padding-bottom: 2.5rem;
  border-bottom: 1px solid #e7e5e4;
  margin-bottom: 2.5rem;
}

.section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section__label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a8a29e;
  margin-bottom: 1.25rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.row--align-center {
  align-items: center;
}
</style>
