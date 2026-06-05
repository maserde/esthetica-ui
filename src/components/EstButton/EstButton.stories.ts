import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstButton from './EstButton.vue'

const meta = {
  title: 'Components/EstButton',
  component: EstButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outlined', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  render: (args) => ({
    components: { EstButton },
    setup() {
      return { args }
    },
    template: `<EstButton v-bind="args">{{ args.default ?? 'Button' }}</EstButton>`,
  }),
} satisfies Meta<typeof EstButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { color: 'primary', default: 'Primary' },
}

export const Secondary: Story = {
  args: { color: 'secondary', default: 'Secondary' },
}

export const Outlined: Story = {
  args: { variant: 'outlined', default: 'Outlined' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', default: 'Ghost' },
}

export const Danger: Story = {
  args: { color: 'danger', default: 'Danger' },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', default: 'Small' },
}

export const Medium: Story = {
  args: { size: 'md', default: 'Medium' },
}

export const Large: Story = {
  args: { size: 'lg', default: 'Large' },
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { EstButton },
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <EstButton size="sm">Small</EstButton>
        <EstButton size="md">Medium</EstButton>
        <EstButton size="lg">Large</EstButton>
      </div>
    `,
  }),
}

// ─── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, default: 'Saving…' },
}

export const Disabled: Story = {
  args: { disabled: true, default: 'Disabled' },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <EstButton color="primary">Default</EstButton>
        <EstButton color="primary" loading>Loading</EstButton>
        <EstButton color="primary" disabled>Disabled</EstButton>
      </div>
    `,
  }),
}

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => ({
    components: { EstButton },
    template: `
      <EstButton color="primary">
        <template #leading>
          <span class="i-ri-add-line w-[1em] h-[1em]" aria-hidden="true" />
        </template>
        Add item
      </EstButton>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  render: () => ({
    components: { EstButton },
    template: `
      <EstButton variant="outlined">
        Export
        <template #trailing>
          <span class="i-ri-download-line w-[1em] h-[1em]" aria-hidden="true" />
        </template>
      </EstButton>
    `,
  }),
}

export const AllIcons: Story = {
  name: 'All Icons',
  render: () => ({
    components: { EstButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <EstButton>
          <template #leading><span class="i-ri-add-line w-[1em] h-[1em]" aria-hidden="true" /></template>
          Add item
        </EstButton>
        <EstButton variant="outlined">
          Export
          <template #trailing><span class="i-ri-download-line w-[1em] h-[1em]" aria-hidden="true" /></template>
        </EstButton>
        <EstButton color="secondary">
          <template #leading><span class="i-ri-search-line w-[1em] h-[1em]" aria-hidden="true" /></template>
          Search
          <template #trailing><span class="i-ri-arrow-right-line w-[1em] h-[1em]" aria-hidden="true" /></template>
        </EstButton>
      </div>
    `,
  }),
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <EstButton color="primary">Primary</EstButton>
        <EstButton color="secondary">Secondary</EstButton>
        <EstButton variant="outlined">Outlined</EstButton>
        <EstButton variant="ghost">Ghost</EstButton>
        <EstButton color="danger">Danger</EstButton>
      </div>
    `,
  }),
}
