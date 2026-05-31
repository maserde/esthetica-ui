import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstToast from './EstToast.vue'

const meta = {
  title: 'Components/EstToast',
  component: EstToast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
    },
    duration: { control: 'number' },
    dismissible: { control: 'boolean' },
    modelValue: { control: 'boolean' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onDismiss: { action: 'dismiss' },
  },
  render: (args) => ({
    components: { EstToast },
    setup() {
      return { args }
    },
    template: `
      <EstToast v-bind="args">
        This is a toast notification.
      </EstToast>
    `,
  }),
} satisfies Meta<typeof EstToast>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Success: Story = {
  args: { variant: 'success', modelValue: true, duration: 0 },
}

export const Primary: Story = {
  args: { variant: 'primary', modelValue: true, duration: 0 },
}

export const Info: Story = {
  args: { variant: 'info', modelValue: true, duration: 0 },
}

export const Warning: Story = {
  args: { variant: 'warning', modelValue: true, duration: 0 },
}

export const Danger: Story = {
  args: { variant: 'danger', modelValue: true, duration: 0 },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  name: 'With Title',
  render: () => ({
    components: { EstToast },
    template: `
      <EstToast variant="success" :model-value="true" :duration="0">
        <template #title>Saved successfully</template>
        Your changes have been saved.
      </EstToast>
    `,
  }),
}

export const WithProgress: Story = {
  name: 'With Progress Bar',
  args: { variant: 'info', modelValue: true, duration: 5000 },
}

export const NotDismissible: Story = {
  name: 'Not Dismissible',
  args: { variant: 'warning', modelValue: true, duration: 0, dismissible: false },
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstToast },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <EstToast variant="primary" :model-value="true" :duration="0">Primary toast</EstToast>
        <EstToast variant="success" :model-value="true" :duration="0">Success toast</EstToast>
        <EstToast variant="info" :model-value="true" :duration="0">Info toast</EstToast>
        <EstToast variant="warning" :model-value="true" :duration="0">Warning toast</EstToast>
        <EstToast variant="danger" :model-value="true" :duration="0">Danger toast</EstToast>
      </div>
    `,
  }),
}
