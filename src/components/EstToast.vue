<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import EstAlert from './EstAlert.vue'

export type ToastVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'success',
  duration: 5000,
  dismissible: true,
  modelValue: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  dismiss: []
}>()

const isVisible = ref(props.modelValue)
const isLeaving = ref(false)
const progress = ref(100)

let timer: ReturnType<typeof setTimeout> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

const PROGRESS_UPDATE_MS = 50

function startTimer() {
  clearTimers()

  if (props.duration <= 0) return

  const startTime = Date.now()

  progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.max(0, 100 - (elapsed / props.duration) * 100)
  }, PROGRESS_UPDATE_MS)

  timer = setTimeout(() => {
    handleDismiss()
  }, props.duration)
}

function clearTimers() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

function handleDismiss() {
  clearTimers()
  isLeaving.value = true

  setTimeout(() => {
    isVisible.value = false
    emit('update:modelValue', false)
    emit('dismiss')
  }, 300)
}

const progressBarClass = computed(() => `est-toast__progress-bar--${props.variant}`)

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      isVisible.value = true
      isLeaving.value = false
      progress.value = 100
      startTimer()
    } else {
      handleDismiss()
    }
  },
)

onMounted(() => {
  if (isVisible.value) {
    startTimer()
  }
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <Transition name="est-toast">
    <div
      v-if="isVisible"
      :class="{
        'est-toast': true,
        'est-toast--leaving': isLeaving,
      }"
      role="alert"
      aria-live="assertive"
    >
      <EstAlert :variant="variant" :dismissible="dismissible" @dismiss="handleDismiss">
        <template v-if="$slots.title" #title>
          <slot name="title" />
        </template>
        <slot />
      </EstAlert>

      <div v-if="props.duration > 0" class="est-toast__progress-track">
        <div
          :class="['est-toast__progress-bar', progressBarClass]"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped src="./EstToast.css" />
