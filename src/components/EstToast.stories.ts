import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstToast from './EstToast.vue'

const meta = {
  title: 'Components/EstToast',
  component: EstToast,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'info', 'warning', 'danger'],
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

export const Default: Story = {
  args: { color: 'default', modelValue: true, duration: 0 },
}

export const Success: Story = {
  args: { color: 'success', modelValue: true, duration: 0 },
}

export const Primary: Story = {
  args: { color: 'primary', modelValue: true, duration: 0 },
}

export const Info: Story = {
  args: { color: 'info', modelValue: true, duration: 0 },
}

export const Warning: Story = {
  args: { color: 'warning', modelValue: true, duration: 0 },
}

export const Danger: Story = {
  args: { color: 'danger', modelValue: true, duration: 0 },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  name: 'With Title',
  render: () => ({
    components: { EstToast },
    template: `
      <EstToast color="success" :model-value="true" :duration="0">
        <template #title>Saved successfully</template>
        Your changes have been saved.
      </EstToast>
    `,
  }),
}

export const WithProgress: Story = {
  name: 'With Progress Bar',
  args: { color: 'info', modelValue: true, duration: 5000 },
}

export const NotDismissible: Story = {
  name: 'Not Dismissible',
  args: { color: 'warning', modelValue: true, duration: 0, dismissible: false },
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstToast },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <EstToast color="default" :model-value="true" :duration="0">Default toast</EstToast>
        <EstToast color="primary" :model-value="true" :duration="0">Primary toast</EstToast>
        <EstToast color="success" :model-value="true" :duration="0">Success toast</EstToast>
        <EstToast color="info" :model-value="true" :duration="0">Info toast</EstToast>
        <EstToast color="warning" :model-value="true" :duration="0">Warning toast</EstToast>
        <EstToast color="danger" :model-value="true" :duration="0">Danger toast</EstToast>
      </div>
    `,
  }),
}
