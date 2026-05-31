import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstPagination from './EstPagination.vue'

const meta = {
  title: 'Components/EstPagination',
  component: EstPagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    rowsPerPage: { control: 'number' },
    'onUpdate:currentPage': { action: 'update:currentPage' },
    'onUpdate:rowsPerPage': { action: 'update:rowsPerPage' },
  },
  render: (args) => ({
    components: { EstPagination },
    setup() {
      return { args }
    },
    template: `<EstPagination v-bind="args" />`,
  }),
} satisfies Meta<typeof EstPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { currentPage: 1, totalPages: 10, rowsPerPage: 10 },
}

export const MiddlePage: Story = {
  name: 'Middle Page',
  args: { currentPage: 5, totalPages: 10, rowsPerPage: 10 },
}

export const LastPage: Story = {
  name: 'Last Page',
  args: { currentPage: 10, totalPages: 10, rowsPerPage: 10 },
}

export const FewPages: Story = {
  name: 'Few Pages (≤7)',
  args: { currentPage: 3, totalPages: 5, rowsPerPage: 10 },
}

export const ManyPages: Story = {
  name: 'Many Pages',
  args: { currentPage: 50, totalPages: 200, rowsPerPage: 25 },
}
