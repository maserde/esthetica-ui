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
    template: `<EstTag v-bind="args">TAG</EstTag>`,
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
          <EstTag variant="info" type="secondary">INFO</EstTag>
          <EstTag variant="success" type="secondary">SUCCESS</EstTag>
          <EstTag variant="warning" type="secondary">WARNING</EstTag>
          <EstTag variant="danger" type="secondary">DANGER</EstTag>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <EstTag variant="info" type="primary">INFO</EstTag>
          <EstTag variant="success" type="primary">SUCCESS</EstTag>
          <EstTag variant="warning" type="primary">WARNING</EstTag>
          <EstTag variant="danger" type="primary">DANGER</EstTag>
        </div>
      </div>
    `,
  }),
}
