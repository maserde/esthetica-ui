import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstCard from './EstCard.vue'
import EstCardHeader from './EstCardHeader.vue'
import EstCardBody from './EstCardBody.vue'
import EstCardFooter from './EstCardFooter.vue'

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
    components: { EstCard, EstCardBody },
    setup() {
      return { args }
    },
    template: `
      <EstCard v-bind="args" style="width:320px;">
        <EstCardBody>Card content goes here.</EstCardBody>
      </EstCard>
    `,
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
    components: { EstCard, EstCardBody },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <EstCard style="width:200px;">
          <EstCardBody>Default</EstCardBody>
        </EstCard>
        <EstCard style="width:200px;" borderless>
          <EstCardBody>Borderless</EstCardBody>
        </EstCard>
        <EstCard style="width:200px;" loading>
          <EstCardBody>Loading</EstCardBody>
        </EstCard>
      </div>
    `,
  }),
}

// ─── Slots ────────────────────────────────────────────────────────────────────

export const WithHeader: Story = {
  name: 'With Header',
  render: () => ({
    components: { EstCard, EstCardHeader, EstCardBody },
    template: `
      <EstCard style="width:320px;">
        <EstCardHeader>Card Header</EstCardHeader>
        <EstCardBody>Card body content.</EstCardBody>
      </EstCard>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  name: 'With Header & Footer',
  render: () => ({
    components: { EstCard, EstCardHeader, EstCardBody, EstCardFooter },
    template: `
      <EstCard style="width:320px;">
        <EstCardHeader>Card Header</EstCardHeader>
        <EstCardBody>Card body content.</EstCardBody>
        <EstCardFooter>Card Footer</EstCardFooter>
      </EstCard>
    `,
  }),
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { EstCard, EstCardBody },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <EstCard variant="default" style="width:180px;"><EstCardBody>Default</EstCardBody></EstCard>
        <EstCard variant="primary" style="width:180px;"><EstCardBody>Primary</EstCardBody></EstCard>
        <EstCard variant="success" style="width:180px;"><EstCardBody>Success</EstCardBody></EstCard>
        <EstCard variant="info" style="width:180px;"><EstCardBody>Info</EstCardBody></EstCard>
        <EstCard variant="warning" style="width:180px;"><EstCardBody>Warning</EstCardBody></EstCard>
        <EstCard variant="danger" style="width:180px;"><EstCardBody>Danger</EstCardBody></EstCard>
      </div>
    `,
  }),
}
