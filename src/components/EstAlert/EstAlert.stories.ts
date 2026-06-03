import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstAlert from './EstAlert.vue'
import EstAlertIcon from './EstAlertIcon.vue'
import EstAlertTitle from './EstAlertTitle.vue'
import EstAlertDescription from './EstAlertDescription.vue'

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
    components: { EstAlert, EstAlertIcon, EstAlertDescription },
    setup() {
      return { args }
    },
    template: `
      <EstAlert v-bind="args" style="width:400px;">
        <EstAlertIcon />
        <EstAlertDescription>This is an alert message with useful information.</EstAlertDescription>
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
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertDescription },
    template: `
      <EstAlert variant="success" style="width:400px;">
        <EstAlertIcon />
        <EstAlertTitle>Success!</EstAlertTitle>
        <EstAlertDescription>Your changes have been saved successfully.</EstAlertDescription>
      </EstAlert>
    `,
  }),
}

export const NotDismissible: Story = {
  name: 'Not Dismissible',
  args: { variant: 'info', dismissible: false },
}

export const CustomIcon: Story = {
  name: 'Custom Icon',
  render: () => ({
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertDescription },
    template: `
      <EstAlert variant="warning" style="width:400px;">
        <EstAlertIcon>
          <span class="i-ri-alarm-warning-fill w-6 h-6" />
        </EstAlertIcon>
        <EstAlertTitle>Custom Icon</EstAlertTitle>
        <EstAlertDescription>Use the default slot on EstAlertIcon to provide a custom icon.</EstAlertDescription>
      </EstAlert>
    `,
  }),
}

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertDescription },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:400px;">
        <EstAlert variant="success">
          <EstAlertIcon />
          <EstAlertTitle>With Title</EstAlertTitle>
          <EstAlertDescription>An alert with a title and body text.</EstAlertDescription>
        </EstAlert>
        <EstAlert variant="info" :dismissible="false">
          <EstAlertIcon />
          <EstAlertDescription>Not dismissible — no close button shown.</EstAlertDescription>
        </EstAlert>
      </div>
    `,
  }),
}

// ─── All Variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertDescription },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:400px;">
        <EstAlert variant="primary">
          <EstAlertIcon />
          <EstAlertTitle>Primary</EstAlertTitle>
          <EstAlertDescription>A primary alert message.</EstAlertDescription>
        </EstAlert>
        <EstAlert variant="success">
          <EstAlertIcon />
          <EstAlertTitle>Success</EstAlertTitle>
          <EstAlertDescription>Operation completed successfully.</EstAlertDescription>
        </EstAlert>
        <EstAlert variant="info">
          <EstAlertIcon />
          <EstAlertTitle>Info</EstAlertTitle>
          <EstAlertDescription>Here is some useful information.</EstAlertDescription>
        </EstAlert>
        <EstAlert variant="warning">
          <EstAlertIcon />
          <EstAlertTitle>Warning</EstAlertTitle>
          <EstAlertDescription>Please review before proceeding.</EstAlertDescription>
        </EstAlert>
        <EstAlert variant="danger">
          <EstAlertIcon />
          <EstAlertTitle>Danger</EstAlertTitle>
          <EstAlertDescription>Something went wrong. Please try again.</EstAlertDescription>
        </EstAlert>
      </div>
    `,
  }),
}
