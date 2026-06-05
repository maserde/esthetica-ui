import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EstToggle from './EstToggle.vue'
import EstToggleTrack from './EstToggleTrack.vue'
import EstToggleLabel from './EstToggleLabel.vue'
import EstToggleDescription from './EstToggleDescription.vue'
import EstButton from '../EstButton/EstButton.vue'

const meta = {
  title: 'Components/EstToggle',
  component: EstToggle,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'success', 'info', 'warning', 'error'] },
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    modelValue: { control: 'boolean' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstToggle v-bind="args" v-model="value">
        <EstToggleTrack />
        <EstToggleLabel>Label</EstToggleLabel>
      </EstToggle>
    `,
  }),
} satisfies Meta<typeof EstToggle>

export default meta
type Story = StoryObj<typeof meta>

// ── Variant overview ──────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const primary = ref(true)
      const success = ref(true)
      const info = ref(true)
      const warning = ref(true)
      const error = ref(true)
      return { primary, success, info, warning, error }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <EstToggle v-model="primary" color="primary">
          <EstToggleTrack />
          <EstToggleLabel>Primary</EstToggleLabel>
        </EstToggle>
        <EstToggle v-model="success" color="success">
          <EstToggleTrack />
          <EstToggleLabel>Success</EstToggleLabel>
        </EstToggle>
        <EstToggle v-model="info" color="info">
          <EstToggleTrack />
          <EstToggleLabel>Info</EstToggleLabel>
        </EstToggle>
        <EstToggle v-model="warning" color="warning">
          <EstToggleTrack />
          <EstToggleLabel>Warning</EstToggleLabel>
        </EstToggle>
        <EstToggle v-model="error" color="error">
          <EstToggleTrack />
          <EstToggleLabel>Error</EstToggleLabel>
        </EstToggle>
      </div>
    `,
  }),
}

// ── Size stories ──────────────────────────────────────────────────

export const Small: Story = {
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstToggle size="sm" v-bind="args" v-model="value">
        <EstToggleTrack />
        <EstToggleLabel>Small toggle</EstToggleLabel>
      </EstToggle>
    `,
  }),
}

export const Medium: Story = {
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstToggle size="md" v-bind="args" v-model="value">
        <EstToggleTrack />
        <EstToggleLabel>Medium toggle</EstToggleLabel>
      </EstToggle>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const smOff = ref(false)
      const smOn = ref(true)
      const mdOff = ref(false)
      const mdOn = ref(true)
      return { smOff, smOn, mdOff, mdOn }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;align-items:center;gap:24px;">
          <EstToggle size="sm" v-model="smOff">
            <EstToggleTrack />
            <EstToggleLabel>Small (off)</EstToggleLabel>
          </EstToggle>
          <EstToggle size="sm" v-model="smOn">
            <EstToggleTrack />
            <EstToggleLabel>Small (on)</EstToggleLabel>
          </EstToggle>
        </div>
        <div style="display:flex;align-items:center;gap:24px;">
          <EstToggle size="md" v-model="mdOff">
            <EstToggleTrack />
            <EstToggleLabel>Medium (off)</EstToggleLabel>
          </EstToggle>
          <EstToggle size="md" v-model="mdOn">
            <EstToggleTrack />
            <EstToggleLabel>Medium (on)</EstToggleLabel>
          </EstToggle>
        </div>
      </div>
    `,
  }),
}

// ── State stories ─────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstToggle v-bind="args" v-model="value">
        <EstToggleTrack />
        <EstToggleLabel>Enable feature</EstToggleLabel>
      </EstToggle>
    `,
  }),
}

export const Checked: Story = {
  args: { modelValue: true },
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const value = ref(args.modelValue ?? true)
      return { args, value }
    },
    template: `
      <EstToggle v-bind="args" v-model="value">
        <EstToggleTrack />
        <EstToggleLabel>Enabled</EstToggleLabel>
      </EstToggle>
    `,
  }),
}

export const WithDescription: Story = {
  name: 'With Description',
  args: { modelValue: true },
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel, EstToggleDescription },
    setup() {
      const value = ref(args.modelValue ?? true)
      return { args, value }
    },
    template: `
      <EstToggle v-bind="args" v-model="value" style="align-items: flex-start;">
        <EstToggleTrack style="margin-top: 2px;" />
        <div style="display:flex;flex-direction:column;gap:4px;">
          <EstToggleLabel>Notifications</EstToggleLabel>
          <EstToggleDescription>Receive push notifications to your device</EstToggleDescription>
        </div>
      </EstToggle>
    `,
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstToggle v-bind="args" v-model="value">
        <EstToggleTrack />
        <EstToggleLabel>Disabled toggle</EstToggleLabel>
      </EstToggle>
    `,
  }),
}

export const DisabledChecked: Story = {
  name: 'Disabled (Checked)',
  args: { disabled: true, modelValue: true },
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const value = ref(args.modelValue ?? true)
      return { args, value }
    },
    template: `
      <EstToggle v-bind="args" v-model="value">
        <EstToggleTrack />
        <EstToggleLabel>Disabled (on)</EstToggleLabel>
      </EstToggle>
    `,
  }),
}

// ── Layout variants ───────────────────────────────────────────────

export const ReversedLayout: Story = {
  name: 'Reversed Layout',
  render: (args) => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel, EstToggleDescription },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstToggle v-bind="args" v-model="value" style="width: 320px; justify-content: space-between;">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <EstToggleLabel>Airplane Mode</EstToggleLabel>
          <EstToggleDescription>Disable all network connections</EstToggleDescription>
        </div>
        <EstToggleTrack />
      </EstToggle>
    `,
  }),
}

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel },
    setup() {
      const off = ref(false)
      const on = ref(true)
      const disabledOff = ref(false)
      const disabledOn = ref(true)
      return { off, on, disabledOff, disabledOn }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <EstToggle v-model="off">
          <EstToggleTrack />
          <EstToggleLabel>Off</EstToggleLabel>
        </EstToggle>
        <EstToggle v-model="on">
          <EstToggleTrack />
          <EstToggleLabel>On</EstToggleLabel>
        </EstToggle>
        <EstToggle v-model="disabledOff" disabled>
          <EstToggleTrack />
          <EstToggleLabel>Disabled (off)</EstToggleLabel>
        </EstToggle>
        <EstToggle v-model="disabledOn" disabled>
          <EstToggleTrack />
          <EstToggleLabel>Disabled (on)</EstToggleLabel>
        </EstToggle>
      </div>
    `,
  }),
}

export const UpdatingValue: Story = {
  name: 'Toggle Controls',
  render: () => ({
    components: { EstToggle, EstToggleTrack, EstToggleLabel, EstButton },
    setup() {
      const value = ref(true)
      const handleResetValue = () => {
        value.value = false
      }
      return { value, handleResetValue }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <EstToggle v-model="value">
          <EstToggleTrack />
          <EstToggleLabel>Toggle A</EstToggleLabel>
        </EstToggle>
        <EstButton @click="handleResetValue" class="max-w-32">Reset State</EstButton>
      </div>
    `,
  }),
}
