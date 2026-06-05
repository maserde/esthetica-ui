<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useVariantClasses } from '@/composables/useVariantClasses'
import EstAlert from './EstAlert/EstAlert.vue'
import EstAlertIcon from './EstAlert/EstAlertIcon.vue'
import EstAlertTitle from './EstAlert/EstAlertTitle.vue'
import EstAlertBody from './EstAlert/EstAlertBody.vue'

export type ToastColor = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface Props {
  color?: ToastColor
  duration?: number
  dismissible?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  duration: 5000,
  dismissible: true,
  modelValue: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  dismiss: []
}>()

const isVisible = ref(props.modelValue)
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
  isVisible.value = false
}

function onAfterLeave() {
  emit('update:modelValue', false)
  emit('dismiss')
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      isVisible.value = true
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

const { buildVariant } = useVariantClasses()
</script>

<template>
  <Transition name="est-toast" @after-leave="onAfterLeave">
    <div
      v-if="isVisible"
      :class="{ ...buildVariant('est-toast', color ?? 'success') }"
      aria-live="assertive"
    >
      <EstAlert :color="color" :dismissible="dismissible" @dismiss="handleDismiss">
        <EstAlertIcon />
        <EstAlertTitle v-if="$slots.title">
          <slot name="title" />
        </EstAlertTitle>
        <EstAlertBody>
          <slot />
        </EstAlertBody>
      </EstAlert>

      <div v-if="props.duration > 0" class="est-toast__progress-track">
        <div class="est-toast__progress-bar" :style="{ width: `${progress}%` }" />
      </div>
    </div>
  </Transition>
</template>

<style scoped src="./EstToast.css" />
