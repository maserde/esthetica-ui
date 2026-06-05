import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstBreadcrumb from './EstBreadcrumb.vue'

const meta = {
  title: 'Components/EstBreadcrumb',
  component: EstBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    maxVisible: { control: { type: 'number', min: 2, max: 10 } },
    separator: { control: 'text' },
    onNavigate: { action: 'navigate' },
  },
  render: (args) => ({
    components: { EstBreadcrumb },
    setup() {
      return { args }
    },
    template: `<EstBreadcrumb v-bind="args" />`,
  }),
} satisfies Meta<typeof EstBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

// ── Default (3 items — no collapse) ──────────────────────────────

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
  },
}

// ── With Icon (icon-only first item) ─────────────────────────────

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
  },
}

// ── Collapsed (5 items — shows ellipsis before last) ─────────────

export const Collapsed: Story = {
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

// ── Two Items ────────────────────────────────────────────────────

export const TwoItems: Story = {
  name: 'Two Items',
  args: {
    items: [{ label: 'Home', href: '/', icon: 'i-ri-home-3-line' }, { label: 'Products' }],
  },
}

// ── Single Item ──────────────────────────────────────────────────

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items: [{ label: 'Home' }],
  },
}

// ── Four Items (collapsed: first 2 + … + last 1) ────────────────

export const FourItems: Story = {
  name: 'Four Items (Collapsed)',
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
      { label: 'Category', href: '/category' },
      { label: 'Products', href: '/category/products' },
      { label: 'Details' },
    ],
  },
}

// ── Custom Separator ─────────────────────────────────────────────

export const CustomSeparator: Story = {
  name: 'Custom Separator',
  args: {
    separator: '›',
    items: [
      { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
  },
}

// ── All Variations Overview ──────────────────────────────────────

export const AllVariations: Story = {
  name: 'All Variations',
  render: () => ({
    components: { EstBreadcrumb },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Single item</p>
          <EstBreadcrumb :items="[{ label: 'Home' }]" />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Two items with icon</p>
          <EstBreadcrumb :items="[
            { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
            { label: 'Products' },
          ]" />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Three items (max visible, no collapse)</p>
          <EstBreadcrumb :items="[
            { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]" />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Four items (🏠 / Category / … / Details)</p>
          <EstBreadcrumb :items="[
            { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
            { label: 'Category', href: '/category' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]" />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Six items (deeply collapsed)</p>
          <EstBreadcrumb :items="[
            { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
            { label: 'Shop', href: '/shop' },
            { label: 'Category', href: '/shop/category' },
            { label: 'Subcategory', href: '/shop/category/sub' },
            { label: 'Products', href: '/shop/category/sub/products' },
            { label: 'Product Detail' },
          ]" />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Custom separator (›)</p>
          <EstBreadcrumb separator="›" :items="[
            { label: 'Home', href: '/', icon: 'i-ri-home-3-line' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]" />
        </div>
      </div>
    `,
  }),
}
