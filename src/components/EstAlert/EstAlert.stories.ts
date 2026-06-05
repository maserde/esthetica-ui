import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstAlert from './EstAlert.vue'
import EstAlertIcon from './EstAlertIcon.vue'
import EstAlertTitle from './EstAlertTitle.vue'
import EstAlertBody from './EstAlertBody.vue'

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
    components: { EstAlert, EstAlertIcon, EstAlertBody },
    setup() {
      return { args }
    },
    template: `
      <EstAlert v-bind="args" style="width:400px;">
        <EstAlertIcon />
        <EstAlertBody>This is an alert message with useful information.</EstAlertBody>
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
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertBody },
    template: `
      <EstAlert variant="success" style="width:400px;">
        <EstAlertIcon />
        <EstAlertTitle>Success!</EstAlertTitle>
        <EstAlertBody>Your changes have been saved successfully.</EstAlertBody>
      </EstAlert>
    `,
  }),
}

export const NotDismissible: Story = {
  name: 'Not Dismissible',
  args: { variant: 'info', dismissible: false },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertBody },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:400px;">
        <EstAlert variant="success">
          <EstAlertIcon />
          <EstAlertTitle>With Title</EstAlertTitle>
          <EstAlertBody>An alert with a title and body text.</EstAlertBody>
        </EstAlert>
        <EstAlert variant="info" :dismissible="false">
          <EstAlertIcon />
          <EstAlertBody>Not dismissible — no close button shown.</EstAlertBody>
        </EstAlert>
      </div>
    `,
  }),
}

export const CustomIcon: Story = {
  name: 'Custom Icon',
  render: () => ({
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertBody },
    template: `
      <EstAlert variant="warning" style="width:400px;">
        <EstAlertIcon>
          <span class="i-ri-alarm-warning-fill w-6 h-6" />
        </EstAlertIcon>
        <EstAlertTitle>Custom Icon</EstAlertTitle>
        <EstAlertBody>Use the default slot on EstAlertIcon to provide a custom icon.</EstAlertBody>
      </EstAlert>
    `,
  }),
}

// ─── All Variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstAlert, EstAlertIcon, EstAlertTitle, EstAlertBody },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:400px;">
        <EstAlert variant="primary">
          <EstAlertIcon />
          <EstAlertTitle>Primary</EstAlertTitle>
          <EstAlertBody>A primary alert message.</EstAlertBody>
        </EstAlert>
        <EstAlert variant="success">
          <EstAlertIcon />
          <EstAlertTitle>Success</EstAlertTitle>
          <EstAlertBody>Operation completed successfully.</EstAlertBody>
        </EstAlert>
        <EstAlert variant="info">
          <EstAlertIcon />
          <EstAlertTitle>Info</EstAlertTitle>
          <EstAlertBody>Here is some useful information.</EstAlertBody>
        </EstAlert>
        <EstAlert variant="warning">
          <EstAlertIcon />
          <EstAlertTitle>Warning</EstAlertTitle>
          <EstAlertBody>Please review before proceeding.</EstAlertBody>
        </EstAlert>
        <EstAlert variant="danger">
          <EstAlertIcon />
          <EstAlertTitle>Danger</EstAlertTitle>
          <EstAlertBody>Something went wrong. Please try again.</EstAlertBody>
        </EstAlert>
      </div>
    `,
  }),
}
