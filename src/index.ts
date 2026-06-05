import 'virtual:uno.css'
import './style.css'
export { default as EstButton } from './components/EstButton/EstButton.vue'

export { default as EstSkeleton } from './components/EstSkeleton.vue'
export { default as EstCard } from './components/EstCard/EstCard.vue'
export { default as EstCardHeader } from './components/EstCard/EstCardHeader.vue'
export { default as EstCardBody } from './components/EstCard/EstCardBody.vue'
export { default as EstCardFooter } from './components/EstCard/EstCardFooter.vue'
export { default as EstInput } from './components/EstInput/EstInput.vue'
export { default as EstInputLabel } from './components/EstInput/EstInputLabel.vue'
export { default as EstInputField } from './components/EstInput/EstInputField.vue'
export { default as EstInputError } from './components/EstInput/EstInputError.vue'
export { default as EstInputOTP } from './components/EstInputOTP.vue'
export { default as EstAlert } from './components/EstAlert/EstAlert.vue'
export { default as EstAlertIcon } from './components/EstAlert/EstAlertIcon.vue'
export { default as EstAlertTitle } from './components/EstAlert/EstAlertTitle.vue'
export { default as EstAlertDescription } from './components/EstAlert/EstAlertDescription.vue'
export { default as EstToast } from './components/EstToast.vue'
export { default as EstPagination } from './components/EstPagination/EstPagination.vue'
export { default as EstPaginationInfo } from './components/EstPagination/EstPaginationInfo.vue'
export { default as EstPaginationNav } from './components/EstPagination/EstPaginationNav.vue'
export { default as EstPaginationRows } from './components/EstPagination/EstPaginationRows.vue'
export { default as EstTable } from './components/EstTable.vue'
export { default as EstPasswordMeter } from './components/EstPasswordMeter.vue'
export { default as EstTag } from './components/EstTag.vue'
export { default as EstToggle } from './components/EstToggle.vue'
export { default as EstBreadcrumb } from './components/EstBreadcrumb.vue'

export type {
  Variant as ButtonVariant,
  Size as ButtonSize,
  ButtonType,
  Props as ButtonProps,
} from './components/EstButton/EstButton.vue'
export type { SkeletonRounded, Props as SkeletonProps } from './components/EstSkeleton.vue'
export type { CardVariant, Props as CardProps } from './components/EstCard/EstCard.vue'
export type { Props as InputProps } from './components/EstInput/EstInput.vue'
export type { Props as InputFieldProps } from './components/EstInput/EstInputField.vue'
export type { Props as InputOTPProps } from './components/EstInputOTP.vue'
export type { AlertVariant, Props as AlertProps } from './components/EstAlert/EstAlert.vue'
export type { ToastVariant, Props as ToastProps } from './components/EstToast.vue'
export type { Props as PaginationProps } from './components/EstPagination/EstPagination.vue'
export type { TableColumn, Props as TableProps } from './components/EstTable.vue'
export type { Props as PasswordMeterProps } from './components/EstPasswordMeter.vue'
export type { TagVariant, TagType, Props as TagProps } from './components/EstTag.vue'
export type { ToggleVariant, ToggleSize, Props as ToggleProps } from './components/EstToggle.vue'
export type { BreadcrumbItem, Props as BreadcrumbProps } from './components/EstBreadcrumb.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    EstAlert: (typeof import('./components/EstAlert/EstAlert.vue'))['default']
    EstAlertIcon: (typeof import('./components/EstAlert/EstAlertIcon.vue'))['default']
    EstAlertTitle: (typeof import('./components/EstAlert/EstAlertTitle.vue'))['default']
    EstAlertDescription: (typeof import('./components/EstAlert/EstAlertDescription.vue'))['default']
    EstButton: (typeof import('./components/EstButton/EstButton.vue'))['default']

    EstCard: (typeof import('./components/EstCard/EstCard.vue'))['default']
    EstCardHeader: (typeof import('./components/EstCard/EstCardHeader.vue'))['default']
    EstCardBody: (typeof import('./components/EstCard/EstCardBody.vue'))['default']
    EstCardFooter: (typeof import('./components/EstCard/EstCardFooter.vue'))['default']
    EstInput: (typeof import('./components/EstInput/EstInput.vue'))['default']
    EstInputLabel: (typeof import('./components/EstInput/EstInputLabel.vue'))['default']
    EstInputField: (typeof import('./components/EstInput/EstInputField.vue'))['default']
    EstInputError: (typeof import('./components/EstInput/EstInputError.vue'))['default']
    EstInputOTP: (typeof import('./components/EstInputOTP.vue'))['default']
    EstPagination: (typeof import('./components/EstPagination/EstPagination.vue'))['default']
    EstPaginationInfo: (typeof import('./components/EstPagination/EstPaginationInfo.vue'))['default']
    EstPaginationNav: (typeof import('./components/EstPagination/EstPaginationNav.vue'))['default']
    EstPaginationRows: (typeof import('./components/EstPagination/EstPaginationRows.vue'))['default']
    EstPasswordMeter: (typeof import('./components/EstPasswordMeter.vue'))['default']
    EstSkeleton: (typeof import('./components/EstSkeleton.vue'))['default']
    EstTable: (typeof import('./components/EstTable.vue'))['default']
    EstTag: (typeof import('./components/EstTag.vue'))['default']
    EstToast: (typeof import('./components/EstToast.vue'))['default']
    EstToggle: (typeof import('./components/EstToggle.vue'))['default']
    EstBreadcrumb: (typeof import('./components/EstBreadcrumb.vue'))['default']
  }
}
