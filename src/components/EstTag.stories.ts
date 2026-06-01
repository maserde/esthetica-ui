import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstTag from './EstTag.vue'

const meta = {
  title: 'Components/EstTag',
  component: EstTag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    type: { control: 'select', options: ['primary', 'secondary'] },
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

export const Info: Story = {
  args: { variant: 'info' },
}

export const Success: Story = {
  args: { variant: 'success' },
}

export const Warning: Story = {
  args: { variant: 'warning' },
}

export const Danger: Story = {
  args: { variant: 'danger' },
}

// ── Type stories ──────────────────────────────────────────────────

export const Secondary: Story = {
  args: { type: 'secondary' },
}

export const Primary: Story = {
  args: { type: 'primary' },
}

// ── All overview ──────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstTag },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <EstTag variant="info" type="secondary">Confirmed</EstTag>
          <EstTag variant="success" type="secondary">Sent</EstTag>
          <EstTag variant="warning" type="secondary">On-hold</EstTag>
          <EstTag variant="danger" type="secondary">Error</EstTag>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <EstTag variant="info" type="primary">Info</EstTag>
          <EstTag variant="success" type="primary">Success</EstTag>
          <EstTag variant="warning" type="primary">Warning</EstTag>
          <EstTag variant="danger" type="primary">Danger</EstTag>
        </div>
      </div>
    `,
  }),
}
