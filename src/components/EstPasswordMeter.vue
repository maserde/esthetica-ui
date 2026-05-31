<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  password?: string
}

const props = withDefaults(defineProps<Props>(), {
  password: '',
})

const hasMinLength = computed(() => props.password.length >= 8)
const hasUpperCase = computed(() => /[A-Z]/.test(props.password))
const hasLowerCase = computed(() => /[a-z]/.test(props.password))
const hasSpecialChar = computed(() => /[@#$!]/.test(props.password))

const passedCount = computed(
  () =>
    [hasMinLength.value, hasUpperCase.value, hasLowerCase.value, hasSpecialChar.value].filter(
      Boolean,
    ).length,
)

const strengthLabel = computed(() => {
  if (props.password.length === 0) return ''
  if (passedCount.value <= 1) return 'Weak Password'
  if (passedCount.value === 2) return 'Fair Password'
  if (passedCount.value === 3) return 'Good Password'
  return 'Strong Password'
})

const strengthModifier = computed(() => {
  if (props.password.length === 0 || passedCount.value === 0) return ''
  if (passedCount.value <= 1) return 'weak'
  if (passedCount.value === 2) return 'fair'
  if (passedCount.value === 3) return 'good'
  return 'strong'
})

const requirements = computed(() => [
  { label: 'Contain at least 8 characters', met: hasMinLength.value },
  { label: '1 upper case character', met: hasUpperCase.value },
  { label: '1 lower case character', met: hasLowerCase.value },
  { label: '1 special character (@,#,$,!)', met: hasSpecialChar.value },
])
</script>

<template>
  <div class="est-password-meter">
    <div class="est-password-meter__strength">
      <div class="est-password-meter__bars">
        <div
          v-for="index in 4"
          :key="index"
          class="est-password-meter__bar"
          :class="
            index <= passedCount && password.length > 0
              ? `est-password-meter__bar--${strengthModifier}`
              : 'est-password-meter__bar--empty'
          "
        />
      </div>
      <span
        v-if="password.length > 0"
        class="est-password-meter__label"
        :class="`est-password-meter__label--${strengthModifier}`"
      >
        {{ strengthLabel }}
      </span>
    </div>

    <ul class="est-password-meter__requirements">
      <li v-for="req in requirements" :key="req.label" class="est-password-meter__requirement">
        <span
          class="i-ri-checkbox-circle-line est-password-meter__req-icon"
          :class="
            req.met ? 'est-password-meter__req-icon--met' : 'est-password-meter__req-icon--unmet'
          "
          aria-hidden="true"
        />
        <span
          class="est-password-meter__req-label"
          :class="
            req.met ? 'est-password-meter__req-label--met' : 'est-password-meter__req-label--unmet'
          "
        >
          {{ req.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped src="./EstPasswordMeter.css" />
