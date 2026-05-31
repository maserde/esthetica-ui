import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstAlert from './EstAlert.vue'

const meta = {
  title: 'Components/EstAlert',
  component: EstAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
    },
    dismissible: { control: 'boolean' },
    onDismiss: { action: 'dismiss' },
  },
  render: (args) => ({
    components: { EstAlert },
    setup() {
      return { args }
    },
    template: `
      <EstAlert v-bind="args" style="width:400px;">
        This is an alert message with useful information.
      </EstAlert>
    `,
  }),
} satisfies Meta<typeof EstAlert>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Success: Story = {
  args: { variant: 'success' },
}

export const Info: Story = {
  args: { variant: 'info' },
}

export const Warning: Story = {
  args: { variant: 'warning' },
}

export const Danger: Story = {
  args: { variant: 'danger' },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  name: 'With Title',
  render: () => ({
    components: { EstAlert },
    template: `
      <EstAlert variant="success" style="width:400px;">
        <template #title>Success!</template>
        Your changes have been saved successfully.
      </EstAlert>
    `,
  }),
}

export const NotDismissible: Story = {
  name: 'Not Dismissible',
  args: { variant: 'info', dismissible: false },
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstAlert },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:400px;">
        <EstAlert variant="primary">
          <template #title>Primary</template>
          A primary alert message.
        </EstAlert>
        <EstAlert variant="success">
          <template #title>Success</template>
          Operation completed successfully.
        </EstAlert>
        <EstAlert variant="info">
          <template #title>Info</template>
          Here is some useful information.
        </EstAlert>
        <EstAlert variant="warning">
          <template #title>Warning</template>
          Please review before proceeding.
        </EstAlert>
        <EstAlert variant="danger">
          <template #title>Danger</template>
          Something went wrong. Please try again.
        </EstAlert>
      </div>
    `,
  }),
}
