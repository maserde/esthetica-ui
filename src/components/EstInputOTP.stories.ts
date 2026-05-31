import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstInputOTP from './EstInputOTP.vue'

const meta = {
  title: 'Components/EstInputOTP',
  component: EstInputOTP,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    length: { control: 'number' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onComplete: { action: 'complete' },
  },
  render: (args) => ({
    components: { EstInputOTP },
    setup() {
      return { args }
    },
    template: `<EstInputOTP v-bind="args" />`,
  }),
} satisfies Meta<typeof EstInputOTP>

export default meta
type Story = StoryObj<typeof meta>

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'Verification code', length: 4 },
}

export const WithValue: Story = {
  name: 'With Value',
  args: { label: 'Verification code', modelValue: '1234', length: 4 },
}

export const WithError: Story = {
  name: 'With Error',
  args: { label: 'Verification code', error: 'Invalid code. Please try again.' },
}

export const Disabled: Story = {
  args: { label: 'Verification code', modelValue: '1234', disabled: true },
}

export const SixDigit: Story = {
  name: 'Six Digit',
  args: { label: 'Verification code', length: 6 },
}

// ─── All states overview ──────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstInputOTP },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <EstInputOTP label="Default (4 digits)" :length="4" />
        <EstInputOTP label="With value" model-value="4321" :length="4" />
        <EstInputOTP label="Error state" error="Incorrect code." :length="4" />
        <EstInputOTP label="Disabled" model-value="1234" :disabled="true" :length="4" />
        <EstInputOTP label="Six digit" :length="6" />
      </div>
    `,
  }),
}
