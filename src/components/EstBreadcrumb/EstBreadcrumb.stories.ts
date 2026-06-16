import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstBreadcrumb from './EstBreadcrumb.vue'
import EstBreadcrumbList from './EstBreadcrumbList.vue'
import EstBreadcrumbItem from './EstBreadcrumbItem.vue'
import EstBreadcrumbLink from './EstBreadcrumbLink.vue'
import EstBreadcrumbPage from './EstBreadcrumbPage.vue'
import EstBreadcrumbSeparator from './EstBreadcrumbSeparator.vue'
import EstBreadcrumbEllipsis from './EstBreadcrumbEllipsis.vue'

const meta = {
  title: 'Components/EstBreadcrumb',
  component: EstBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'info', 'success', 'warning', 'danger'],
    },
    separator: { control: 'text' },
  },
  render: (args) => ({
    components: {
      EstBreadcrumb,
      EstBreadcrumbList,
      EstBreadcrumbItem,
      EstBreadcrumbLink,
      EstBreadcrumbPage,
      EstBreadcrumbSeparator,
      EstBreadcrumbEllipsis,
    },
    setup() {
      return { args }
    },
    template: `
      <!-- If args.items is provided, it uses auto-wrapper, else it uses slots for composite demo -->
      <EstBreadcrumb v-bind="args">
        <template v-if="!args.items">
          <EstBreadcrumbList>
            <EstBreadcrumbItem>
              <EstBreadcrumbLink href="/">Home</EstBreadcrumbLink>
            </EstBreadcrumbItem>
            <EstBreadcrumbSeparator />
            <EstBreadcrumbItem>
              <EstBreadcrumbLink href="/products">Products</EstBreadcrumbLink>
            </EstBreadcrumbItem>
            <EstBreadcrumbSeparator />
            <EstBreadcrumbItem>
              <EstBreadcrumbPage>Details</EstBreadcrumbPage>
            </EstBreadcrumbItem>
          </EstBreadcrumbList>
        </template>
      </EstBreadcrumb>
    `,
  }),
} satisfies Meta<typeof EstBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
  },
}

export const Collapsed: Story = {
  name: 'Collapsed (> 3 Items)',
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Products', href: '/category/sub/products' },
      { label: 'Details' },
    ],
  },
}

export const ManualSlots: Story = {
  args: {
    separator: '',
  },

  name: 'Manual Slots',

  render: () => ({
    components: {
      EstBreadcrumb,
      EstBreadcrumbList,
      EstBreadcrumbItem,
      EstBreadcrumbLink,
      EstBreadcrumbPage,
      EstBreadcrumbSeparator,
      EstBreadcrumbEllipsis,
    },
    template: `
      <EstBreadcrumb>
        <EstBreadcrumbList>
          <EstBreadcrumbItem>
            <EstBreadcrumbLink href="/">
              <span class="i-ri-home-3-line est-breadcrumb__icon" aria-hidden="true" />
            </EstBreadcrumbLink>
          </EstBreadcrumbItem>
          <EstBreadcrumbSeparator />
          <EstBreadcrumbItem>
            <EstBreadcrumbEllipsis />
          </EstBreadcrumbItem>
          <EstBreadcrumbSeparator />
          <EstBreadcrumbItem>
            <EstBreadcrumbLink href="/category/sub/products">Products</EstBreadcrumbLink>
          </EstBreadcrumbItem>
          <EstBreadcrumbSeparator />
          <EstBreadcrumbItem>
            <EstBreadcrumbPage>Details</EstBreadcrumbPage>
          </EstBreadcrumbItem>
        </EstBreadcrumbList>
      </EstBreadcrumb>
    `,
  }),
}

export const AllColors: Story = {
  name: 'All Colors',
  render: () => ({
    components: {
      EstBreadcrumb,
      EstBreadcrumbList,
      EstBreadcrumbItem,
      EstBreadcrumbLink,
      EstBreadcrumbSeparator,
      EstBreadcrumbPage,
    },
    setup() {
      const colors = ['primary', 'neutral', 'info', 'success', 'warning', 'danger']
      return { colors }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <EstBreadcrumb v-for="color in colors" :key="color" :color="color">
          <EstBreadcrumbList>
            <EstBreadcrumbItem>
              <EstBreadcrumbLink href="/">Home</EstBreadcrumbLink>
            </EstBreadcrumbItem>
            <EstBreadcrumbSeparator />
            <EstBreadcrumbItem>
              <EstBreadcrumbLink href="/products">Products</EstBreadcrumbLink>
            </EstBreadcrumbItem>
            <EstBreadcrumbSeparator />
            <EstBreadcrumbItem>
              <EstBreadcrumbPage>{{ color.charAt(0).toUpperCase() + color.slice(1) }} Details</EstBreadcrumbPage>
            </EstBreadcrumbItem>
          </EstBreadcrumbList>
        </EstBreadcrumb>
      </div>
    `,
  }),
}
