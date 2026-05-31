import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstSkeleton from './EstSkeleton.vue'

const meta = {
  title: 'Components/EstSkeleton',
  component: EstSkeleton,
  tags: ['autodocs'],
  argTypes: {
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
  },
  render: (args) => ({
    components: { EstSkeleton },
    setup() {
      return { args }
    },
    template: `<EstSkeleton v-bind="args" style="width:200px;height:40px;" />`,
  }),
} satisfies Meta<typeof EstSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { rounded: 'md' },
}

export const AllRounded: Story = {
  name: 'All Rounded',
  render: () => ({
    components: { EstSkeleton },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <EstSkeleton rounded="none" style="width:200px;height:20px;" />
        <EstSkeleton rounded="sm" style="width:200px;height:20px;" />
        <EstSkeleton rounded="md" style="width:200px;height:20px;" />
        <EstSkeleton rounded="lg" style="width:200px;height:20px;" />
        <EstSkeleton rounded="full" style="width:200px;height:20px;" />
      </div>
    `,
  }),
}

export const CardSkeleton: Story = {
  name: 'Card Skeleton',
  render: () => ({
    components: { EstSkeleton },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:300px;padding:16px;border:1px solid #e5e7eb;border-radius:8px;">
        <EstSkeleton rounded="lg" style="width:100%;height:120px;" />
        <EstSkeleton rounded="md" style="width:70%;height:16px;" />
        <EstSkeleton rounded="md" style="width:90%;height:12px;" />
        <EstSkeleton rounded="md" style="width:60%;height:12px;" />
      </div>
    `,
  }),
}
