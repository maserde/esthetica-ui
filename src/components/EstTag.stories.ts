import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstTag from './EstTag.vue'

const meta = {
  title: 'Components/EstTag',
  component: EstTag,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['default', 'info', 'success', 'warning', 'danger'] },
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
  render: (args) => ({
    components: { EstTag },
    setup() {
      return { args }
    },
    template: `<EstTag v-bind="args">Content</EstTag>`,
  }),
} satisfies Meta<typeof EstTag>

export default meta
type Story = StoryObj<typeof meta>

// ── Variant stories ───────────────────────────────────────────────

export const Default: Story = {
  args: { color: 'default' },
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

export const Danger: Story = {
  args: { color: 'danger' },
}

// ── Type stories ──────────────────────────────────────────────────

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

// ── All overview ──────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstTag },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <EstTag color="default" variant="secondary">Default</EstTag>
          <EstTag color="info" variant="secondary">Confirmed</EstTag>
          <EstTag color="success" variant="secondary">Sent</EstTag>
          <EstTag color="warning" variant="secondary">On-hold</EstTag>
          <EstTag color="danger" variant="secondary">Error</EstTag>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <EstTag color="default" variant="primary">Default</EstTag>
          <EstTag color="info" variant="primary">Info</EstTag>
          <EstTag color="success" variant="primary">Success</EstTag>
          <EstTag color="warning" variant="primary">Warning</EstTag>
          <EstTag color="danger" variant="primary">Danger</EstTag>
        </div>
      </div>
    `,
  }),
}
