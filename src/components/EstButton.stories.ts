import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstButton from './EstButton.vue'

const PlusIcon = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M8 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H6.5v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8V2.75Z" fill="currentColor"/>
</svg>`

const DownloadIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M7 1.75a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3A.75.75 0 1 1 4.53 5.97L6.25 7.69V2.5A.75.75 0 0 1 7 1.75ZM1.75 11.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>`

const meta = {
  title: 'Components/EstButton',
  component: EstButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'outlined', 'ghost'],
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
    components: { EstButton: EstButton },
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
  args: { variant: 'primary', default: 'Primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', default: 'Secondary' },
}

export const Outlined: Story = {
  args: { variant: 'outlined', default: 'Outlined' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', default: 'Ghost' },
}

export const Danger: Story = {
  args: { variant: 'danger', default: 'Danger' },
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
    components: { EstButton: EstButton },
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
    components: { EstButton: EstButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <EstButton variant="primary">Default</EstButton>
        <EstButton variant="primary" loading>Loading</EstButton>
        <EstButton variant="primary" disabled>Disabled</EstButton>
      </div>
    `,
  }),
}

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => ({
    components: { EstButton: EstButton },
    template: `
      <EstButton variant="primary">
        <template #leading>
          ${PlusIcon}
        </template>
        Add item
      </EstButton>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  render: () => ({
    components: { EstButton: EstButton },
    template: `
      <EstButton variant="outlined">
        Export
        <template #trailing>
          ${DownloadIcon}
        </template>
      </EstButton>
    `,
  }),
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstButton: EstButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <EstButton variant="primary">Primary</EstButton>
        <EstButton variant="secondary">Secondary</EstButton>
        <EstButton variant="outlined">Outlined</EstButton>
        <EstButton variant="ghost">Ghost</EstButton>
        <EstButton variant="danger">Danger</EstButton>
      </div>
    `,
  }),
}
