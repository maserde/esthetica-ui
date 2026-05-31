import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstTable from './EstTable.vue'
import type { TableColumn } from './EstTable.vue'

const columns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', width: '120px' },
  { key: 'status', label: 'Status', width: '100px' },
]

const rows = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { name: 'Eve Brown', email: 'eve@example.com', role: 'Viewer', status: 'Pending' },
]

const meta = {
  title: 'Components/EstTable',
  component: EstTable,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    borderless: { control: 'boolean' },
    skeletonRowCount: { control: 'number' },
  },
  render: (args) => ({
    components: { EstTable },
    setup() {
      return { args, columns, rows }
    },
    template: `<EstTable v-bind="args" :columns="columns" :rows="rows" />`,
  }),
} satisfies Meta<typeof EstTable>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { columns, rows },
}

export const Striped: Story = {
  args: { columns, rows, striped: true },
}

export const Hoverable: Story = {
  args: { columns, rows, hoverable: true },
}

export const Borderless: Story = {
  args: { columns, rows, borderless: true },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstTable },
    setup() {
      return { columns, rows }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Default</p>
          <EstTable :columns="columns" :rows="rows" />
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Striped</p>
          <EstTable :columns="columns" :rows="rows" striped />
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Hoverable</p>
          <EstTable :columns="columns" :rows="rows" hoverable />
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">Borderless</p>
          <EstTable :columns="columns" :rows="rows" borderless />
        </div>
      </div>
    `,
  }),
}

// ─── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { columns, rows: [], loading: true, skeletonRowCount: 4 },
}

export const Empty: Story = {
  args: { columns, rows: [] },
}

export const WithCustomEmpty: Story = {
  name: 'Custom Empty State',
  args: { columns, rows: [] },
  render: () => ({
    components: { EstTable },
    setup() {
      return { columns }
    },
    template: `
      <EstTable :columns="columns" :rows="[]">
        <template #empty>
          <div style="padding:32px;text-align:center;">
            <p style="font-weight:600;">No results found</p>
            <p style="font-size:0.875rem;color:#6b7280;margin-top:4px;">Try adjusting your search or filter.</p>
          </div>
        </template>
      </EstTable>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  name: 'With Header & Footer',
  args: { columns, rows },
  render: () => ({
    components: { EstTable },
    setup() {
      return { columns, rows }
    },
    template: `
      <EstTable :columns="columns" :rows="rows">
        <template #header>
          <strong>Users</strong>
        </template>
        <template #footer>
          Showing 5 of 5 results
        </template>
      </EstTable>
    `,
  }),
}
