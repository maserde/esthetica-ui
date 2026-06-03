import 'virtual:uno.css'
import './style.css'
export { default as EstButton } from './components/EstButton.vue'
export { default as EstSkeleton } from './components/EstSkeleton.vue'
export { default as EstCard } from './components/EstCard.vue'
export { default as EstInput } from './components/EstInput.vue'
export { default as EstInputOTP } from './components/EstInputOTP.vue'
export { default as EstAlert } from './components/EstAlert.vue'
export { default as EstToast } from './components/EstToast.vue'
export { default as EstPagination } from './components/EstPagination.vue'
export { default as EstTable } from './components/EstTable.vue'
export { default as EstPasswordMeter } from './components/EstPasswordMeter.vue'
export { default as EstTag } from './components/EstTag.vue'
export { default as EstToggle } from './components/EstToggle.vue'

export type {
  Variant as ButtonVariant,
  Size as ButtonSize,
  ButtonType,
  Props as ButtonProps,
} from './components/EstButton.vue'
export type { SkeletonRounded, Props as SkeletonProps } from './components/EstSkeleton.vue'
export type { CardVariant, Props as CardProps } from './components/EstCard.vue'
export type { Props as InputProps } from './components/EstInput.vue'
export type { Props as InputOTPProps } from './components/EstInputOTP.vue'
export type { AlertVariant, Props as AlertProps } from './components/EstAlert.vue'
export type { ToastVariant, Props as ToastProps } from './components/EstToast.vue'
export type { Props as PaginationProps } from './components/EstPagination.vue'
export type { TableColumn, Props as TableProps } from './components/EstTable.vue'
export type { Props as PasswordMeterProps } from './components/EstPasswordMeter.vue'
export type { TagVariant, TagType, Props as TagProps } from './components/EstTag.vue'
export type { ToggleSize, Props as ToggleProps } from './components/EstToggle.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    EstAlert: (typeof import('./components/EstAlert.vue'))['default']
    EstButton: (typeof import('./components/EstButton.vue'))['default']
    EstCard: (typeof import('./components/EstCard.vue'))['default']
    EstInput: (typeof import('./components/EstInput.vue'))['default']
    EstInputOTP: (typeof import('./components/EstInputOTP.vue'))['default']
    EstPagination: (typeof import('./components/EstPagination.vue'))['default']
    EstPasswordMeter: (typeof import('./components/EstPasswordMeter.vue'))['default']
    EstSkeleton: (typeof import('./components/EstSkeleton.vue'))['default']
    EstTable: (typeof import('./components/EstTable.vue'))['default']
    EstTag: (typeof import('./components/EstTag.vue'))['default']
    EstToast: (typeof import('./components/EstToast.vue'))['default']
    EstToggle: (typeof import('./components/EstToggle.vue'))['default']
  }
}
