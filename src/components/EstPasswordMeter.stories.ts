import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstPasswordMeter from './EstPasswordMeter.vue'

const meta = {
  title: 'Components/EstPasswordMeter',
  component: EstPasswordMeter,
  tags: ['autodocs'],
  argTypes: {
    password: { control: 'text' },
  },
  render: (args) => ({
    components: { EstPasswordMeter },
    setup() {
      return { args }
    },
    template: `<EstPasswordMeter v-bind="args" style="width:360px;" />`,
  }),
} satisfies Meta<typeof EstPasswordMeter>

export default meta
type Story = StoryObj<typeof meta>

// ─── Strength levels ──────────────────────────────────────────────────────────

export const Empty: Story = {
  args: { password: '' },
}

export const Weak: Story = {
  args: { password: 'abc' },
}

export const Fair: Story = {
  args: { password: 'Abcdefg' },
}

export const Good: Story = {
  args: { password: 'Abcdefg1' },
}

export const Strong: Story = {
  args: { password: 'Abcdefg1!' },
}

// ─── All states overview ──────────────────────────────────────────────────────

export const AllLevels: Story = {
  name: 'All Strength Levels',
  render: () => ({
    components: { EstPasswordMeter },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:360px;">
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Empty</p>
          <EstPasswordMeter password="" />
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Weak ("abc")</p>
          <EstPasswordMeter password="abc" />
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Fair ("Abcdefg")</p>
          <EstPasswordMeter password="Abcdefg" />
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Good ("Abcdefg1")</p>
          <EstPasswordMeter password="Abcdefg1" />
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Strong ("Abcdefg1!")</p>
          <EstPasswordMeter password="Abcdefg1!" />
        </div>
      </div>
    `,
  }),
}
