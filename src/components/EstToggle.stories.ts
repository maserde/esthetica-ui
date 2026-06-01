import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EstToggle from './EstToggle.vue'

const meta = {
  title: 'Components/EstToggle',
  component: EstToggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    modelValue: { control: 'boolean' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  render: (args) => ({
    components: { EstToggle },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `<EstToggle v-bind="args" v-model="value" />`,
  }),
} satisfies Meta<typeof EstToggle>

export default meta
type Story = StoryObj<typeof meta>

// ── State stories ─────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'Enable feature' },
}

export const Checked: Story = {
  args: { modelValue: true, label: 'Enabled' },
}

// ── Size stories ──────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', label: 'Small toggle' },
}

export const Medium: Story = {
  args: { size: 'md', label: 'Medium toggle' },
}

// ── State stories ─────────────────────────────────────────────────

export const WithDescription: Story = {
  name: 'With Description',
  args: {
    label: 'Notifications',
    description: 'Receive push notifications to your device',
    modelValue: true,
  },
}

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled toggle' },
}

export const DisabledChecked: Story = {
  name: 'Disabled (Checked)',
  args: { disabled: true, modelValue: true, label: 'Disabled (on)' },
}

// ── All sizes overview ────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { EstToggle },
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
          <EstToggle size="sm" v-model="smOff" label="Small (off)" />
          <EstToggle size="sm" v-model="smOn" label="Small (on)" />
        </div>
        <div style="display:flex;align-items:center;gap:24px;">
          <EstToggle size="md" v-model="mdOff" label="Medium (off)" />
          <EstToggle size="md" v-model="mdOn" label="Medium (on)" />
        </div>
      </div>
    `,
  }),
}

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstToggle },
    setup() {
      const off = ref(false)
      const on = ref(true)
      const disabledOff = ref(false)
      const disabledOn = ref(true)
      return { off, on, disabledOff, disabledOn }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <EstToggle v-model="off" label="Off" />
        <EstToggle v-model="on" label="On" />
        <EstToggle v-model="disabledOff" label="Disabled (off)" disabled />
        <EstToggle v-model="disabledOn" label="Disabled (on)" disabled />
      </div>
    `,
  }),
}
