import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstTable from './EstTable.vue'
import EstTableHeader from './EstTableHeader.vue'
import EstTableBody from './EstTableBody.vue'
import EstTableRow from './EstTableRow.vue'
import EstTableHead from './EstTableHead.vue'
import EstTableCell from './EstTableCell.vue'
import EstTableEmpty from './EstTableEmpty.vue'
import EstSkeleton from '../EstSkeleton.vue'

const rows = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eve Brown', email: 'eve@example.com', role: 'Viewer', status: 'Pending' },
]

const meta = {
  title: 'Components/EstTable',
  component: EstTable,
  tags: ['autodocs'],
  argTypes: {
    borderless: { control: 'boolean' },
  },
  render: (args) => ({
    components: {
      EstTable,
      EstTableHeader,
      EstTableBody,
      EstTableRow,
      EstTableHead,
      EstTableCell,
    },
    setup() {
      return { args, rows }
    },
    template: `
      <EstTable v-bind="args">
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead>Name</EstTableHead>
            <EstTableHead>Email</EstTableHead>
            <EstTableHead width="120px">Role</EstTableHead>
            <EstTableHead width="100px">Status</EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableRow v-for="row in rows" :key="row.id">
            <EstTableCell>{{ row.name }}</EstTableCell>
            <EstTableCell>{{ row.email }}</EstTableCell>
            <EstTableCell>{{ row.role }}</EstTableCell>
            <EstTableCell>{{ row.status }}</EstTableCell>
          </EstTableRow>
        </EstTableBody>
      </EstTable>
    `,
  }),
} satisfies Meta<typeof EstTable>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
}

export const Striped: Story = {
  args: {},
  render: (args) => ({
    components: { EstTable, EstTableHeader, EstTableBody, EstTableRow, EstTableHead, EstTableCell },
    setup() {
      return { args, rows }
    },
    template: `
      <EstTable v-bind="args">
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead>Name</EstTableHead>
            <EstTableHead>Email</EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableRow v-for="(row, idx) in rows" :key="row.id" :striped="idx % 2 === 1">
            <EstTableCell>{{ row.name }}</EstTableCell>
            <EstTableCell>{{ row.email }}</EstTableCell>
          </EstTableRow>
        </EstTableBody>
      </EstTable>
    `,
  }),
}

export const Hoverable: Story = {
  args: {},
  render: (args) => ({
    components: { EstTable, EstTableHeader, EstTableBody, EstTableRow, EstTableHead, EstTableCell },
    setup() {
      return { args, rows }
    },
    template: `
      <EstTable v-bind="args">
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead>Name</EstTableHead>
            <EstTableHead>Email</EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableRow v-for="row in rows" :key="row.id" hoverable>
            <EstTableCell>{{ row.name }}</EstTableCell>
            <EstTableCell>{{ row.email }}</EstTableCell>
          </EstTableRow>
        </EstTableBody>
      </EstTable>
    `,
  }),
}

export const Borderless: Story = {
  args: { borderless: true },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {},
  render: (args) => ({
    components: {
      EstTable,
      EstTableHeader,
      EstTableBody,
      EstTableRow,
      EstTableHead,
      EstTableCell,
      EstSkeleton,
    },
    setup() {
      return { args }
    },
    template: `
      <EstTable v-bind="args">
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead><EstSkeleton class="h-3.5 w-20" rounded="sm" /></EstTableHead>
            <EstTableHead><EstSkeleton class="h-3.5 w-20" rounded="sm" /></EstTableHead>
            <EstTableHead><EstSkeleton class="h-3.5 w-20" rounded="sm" /></EstTableHead>
            <EstTableHead><EstSkeleton class="h-3.5 w-20" rounded="sm" /></EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableRow v-for="i in 5" :key="i">
            <EstTableCell><EstSkeleton class="h-3.5 w-full max-w-48" rounded="sm" /></EstTableCell>
            <EstTableCell><EstSkeleton class="h-3.5 w-full max-w-48" rounded="sm" /></EstTableCell>
            <EstTableCell><EstSkeleton class="h-3.5 w-full max-w-48" rounded="sm" /></EstTableCell>
            <EstTableCell><EstSkeleton class="h-3.5 w-full max-w-48" rounded="sm" /></EstTableCell>
          </EstTableRow>
        </EstTableBody>
      </EstTable>
    `,
  }),
}

export const Empty: Story = {
  args: {},
  render: (args) => ({
    components: {
      EstTable,
      EstTableHeader,
      EstTableBody,
      EstTableRow,
      EstTableHead,
      EstTableEmpty,
    },
    setup() {
      return { args }
    },
    template: `
      <EstTable v-bind="args">
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead>Name</EstTableHead>
            <EstTableHead>Email</EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableEmpty :colspan="2">No data available</EstTableEmpty>
        </EstTableBody>
      </EstTable>
    `,
  }),
}

export const WithCustomEmpty: Story = {
  name: 'Custom Empty State',
  args: {},
  render: (args) => ({
    components: {
      EstTable,
      EstTableHeader,
      EstTableBody,
      EstTableRow,
      EstTableHead,
      EstTableEmpty,
    },
    setup() {
      return { args }
    },
    template: `
      <EstTable v-bind="args">
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead>Name</EstTableHead>
            <EstTableHead>Email</EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableEmpty :colspan="2">
            <div style="padding:32px;text-align:center;">
              <p style="font-weight:600;">No results found</p>
              <p style="font-size:0.875rem;color:#6b7280;margin-top:4px;">Try adjusting your search or filter.</p>
            </div>
          </EstTableEmpty>
        </EstTableBody>
      </EstTable>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  name: 'With Header & Footer',
  args: {},
  render: (args) => ({
    components: { EstTable, EstTableHeader, EstTableBody, EstTableRow, EstTableHead, EstTableCell },
    setup() {
      return { args, rows }
    },
    template: `
      <EstTable v-bind="args">
        <template #header>
          <strong>Users</strong>
        </template>
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead>Name</EstTableHead>
            <EstTableHead>Email</EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableRow v-for="row in rows" :key="row.id">
            <EstTableCell>{{ row.name }}</EstTableCell>
            <EstTableCell>{{ row.email }}</EstTableCell>
          </EstTableRow>
        </EstTableBody>
        <template #footer>
          Showing 5 of 5 results
        </template>
      </EstTable>
    `,
  }),
}

export const WithColspanAndRowspan: Story = {
  name: 'With Colspan & Rowspan',
  args: {},
  render: (args) => ({
    components: { EstTable, EstTableHeader, EstTableBody, EstTableRow, EstTableHead, EstTableCell },
    setup() {
      return { args }
    },
    template: `
      <EstTable v-bind="args">
        <EstTableHeader>
          <EstTableRow>
            <EstTableHead :colspan="2" style="text-align: center;">User Details</EstTableHead>
            <EstTableHead :rowspan="2">Role</EstTableHead>
            <EstTableHead :rowspan="2">Status</EstTableHead>
          </EstTableRow>
          <EstTableRow>
            <EstTableHead>Name</EstTableHead>
            <EstTableHead>Email</EstTableHead>
          </EstTableRow>
        </EstTableHeader>
        <EstTableBody>
          <EstTableRow>
            <EstTableCell>Alice Johnson</EstTableCell>
            <EstTableCell>alice@example.com</EstTableCell>
            <EstTableCell>Admin</EstTableCell>
            <EstTableCell>Active</EstTableCell>
          </EstTableRow>
          <EstTableRow>
            <EstTableCell :colspan="2" style="text-align: center;">No email provided</EstTableCell>
            <EstTableCell>Viewer</EstTableCell>
            <EstTableCell>Inactive</EstTableCell>
          </EstTableRow>
        </EstTableBody>
      </EstTable>
    `,
  }),
}
