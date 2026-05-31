import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstCard from './EstCard.vue'

const meta = {
  title: 'Components/EstCard',
  component: EstCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'info', 'warning', 'danger'],
    },
    borderless: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  render: (args) => ({
    components: { EstCard },
    setup() {
      return { args }
    },
    template: `<EstCard v-bind="args" style="width:320px;">Card content goes here.</EstCard>`,
  }),
} satisfies Meta<typeof EstCard>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: 'default' },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Success: Story = {
  args: { variant: 'success' },
}

export const Info: Story = {
  args: { variant: 'info' },
}

export const Warning: Story = {
  args: { variant: 'warning' },
}

export const Danger: Story = {
  args: { variant: 'danger' },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const Borderless: Story = {
  args: { borderless: true },
}

export const Loading: Story = {
  args: { loading: true },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstCard },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <EstCard style="width:200px;">Default</EstCard>
        <EstCard style="width:200px;" borderless>Borderless</EstCard>
        <EstCard style="width:200px;" loading>Loading</EstCard>
      </div>
    `,
  }),
}

// ─── Slots ────────────────────────────────────────────────────────────────────

export const WithHeader: Story = {
  name: 'With Header',
  render: () => ({
    components: { EstCard },
    template: `
      <EstCard style="width:320px;">
        <template #header>Card Header</template>
        Card body content.
      </EstCard>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  name: 'With Header & Footer',
  render: () => ({
    components: { EstCard },
    template: `
      <EstCard style="width:320px;">
        <template #header>Card Header</template>
        Card body content.
        <template #footer>Card Footer</template>
      </EstCard>
    `,
  }),
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstCard },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <EstCard variant="default" style="width:180px;">Default</EstCard>
        <EstCard variant="primary" style="width:180px;">Primary</EstCard>
        <EstCard variant="success" style="width:180px;">Success</EstCard>
        <EstCard variant="info" style="width:180px;">Info</EstCard>
        <EstCard variant="warning" style="width:180px;">Warning</EstCard>
        <EstCard variant="danger" style="width:180px;">Danger</EstCard>
      </div>
    `,
  }),
}
