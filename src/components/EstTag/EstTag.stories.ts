import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstTag from './EstTag.vue'
import EstTagIcon from './EstTagIcon.vue'
import EstTagLabel from './EstTagLabel.vue'
import EstTagClose from './EstTagClose.vue'

const meta = {
  title: 'Components/EstTag',
  component: EstTag,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'info', 'success', 'warning', 'error'],
    },
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
  render: (args) => ({
    components: { EstTag, EstTagLabel },
    setup() {
      return { args }
    },
    template: `
      <EstTag v-bind="args">
        <EstTagLabel>Content</EstTagLabel>
      </EstTag>
    `,
  }),
} satisfies Meta<typeof EstTag>

export default meta
type Story = StoryObj<typeof meta>

// ── Variant stories ───────────────────────────────────────────────

export const Default: Story = {
  args: { color: 'default' },
}

export const PrimaryColor: Story = {
  args: { color: 'primary' },
}

export const Info: Story = {
  args: { color: 'info' },
}

export const Success: Story = {
  args: { color: 'success' },
}

export const Warning: Story = {
  args: { color: 'warning' },
}

export const ErrorColor: Story = {
  args: { color: 'error' },
}

// ── Type stories ──────────────────────────────────────────────────

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

// ── With Icon & Close ─────────────────────────────────────────────

export const WithIconAndClose: Story = {
  render: (args) => ({
    components: { EstTag, EstTagIcon, EstTagLabel, EstTagClose },
    setup() {
      return { args }
    },
    template: `
      <div style="display:flex;gap:8px;">
        <EstTag v-bind="args" color="success">
          <EstTagIcon />
          <EstTagLabel>Success</EstTagLabel>
        </EstTag>
        <EstTag v-bind="args" color="error">
          <EstTagLabel>Error</EstTagLabel>
          <EstTagClose />
        </EstTag>
        <EstTag v-bind="args" color="info" variant="secondary">
          <EstTagIcon />
          <EstTagLabel>Info</EstTagLabel>
          <EstTagClose />
        </EstTag>
      </div>
    `,
  }),
}

// ── All overview ──────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstTag, EstTagLabel },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <EstTag color="default" variant="secondary"><EstTagLabel>Default</EstTagLabel></EstTag>
          <EstTag color="primary" variant="secondary"><EstTagLabel>Primary</EstTagLabel></EstTag>
          <EstTag color="info" variant="secondary"><EstTagLabel>Confirmed</EstTagLabel></EstTag>
          <EstTag color="success" variant="secondary"><EstTagLabel>Sent</EstTagLabel></EstTag>
          <EstTag color="warning" variant="secondary"><EstTagLabel>On-hold</EstTagLabel></EstTag>
          <EstTag color="error" variant="secondary"><EstTagLabel>Error</EstTagLabel></EstTag>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <EstTag color="default" variant="primary"><EstTagLabel>Default</EstTagLabel></EstTag>
          <EstTag color="primary" variant="primary"><EstTagLabel>Primary</EstTagLabel></EstTag>
          <EstTag color="info" variant="primary"><EstTagLabel>Info</EstTagLabel></EstTag>
          <EstTag color="success" variant="primary"><EstTagLabel>Success</EstTagLabel></EstTag>
          <EstTag color="warning" variant="primary"><EstTagLabel>Warning</EstTagLabel></EstTag>
          <EstTag color="error" variant="primary"><EstTagLabel>Error</EstTagLabel></EstTag>
        </div>
      </div>
    `,
  }),
}
