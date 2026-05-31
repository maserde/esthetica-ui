import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstInput from './EstInput.vue'

const meta = {
  title: 'Components/EstInput',
  component: EstInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    leftIcon: { control: 'text' },
    rightIcon: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    'onLeft-icon-click': { action: 'left-icon-click' },
    'onRight-icon-click': { action: 'right-icon-click' },
  },
  render: (args) => ({
    components: { EstInput },
    setup() {
      return { args }
    },
    template: `<EstInput v-bind="args" style="width:320px;" />`,
  }),
} satisfies Meta<typeof EstInput>

export default meta
type Story = StoryObj<typeof meta>

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'Email', placeholder: 'Enter your email' },
}

export const WithValue: Story = {
  name: 'With Value',
  args: { label: 'Email', modelValue: 'user@example.com' },
}

export const WithError: Story = {
  name: 'With Error',
  args: { label: 'Email', modelValue: 'bad', error: 'Please enter a valid email address.' },
}

export const Disabled: Story = {
  args: { label: 'Email', placeholder: 'Enter your email', disabled: true },
}

export const Readonly: Story = {
  args: { label: 'Email', modelValue: 'user@example.com', readonly: true },
}

// ─── Icon variants ────────────────────────────────────────────────────────────

export const WithLeftIcon: Story = {
  name: 'With Left Icon',
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    leftIcon: 'i-ri-mail-line',
  },
}

export const WithRightIcon: Story = {
  name: 'With Right Icon',
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    rightIcon: 'i-ri-eye-line',
  },
}

export const WithBothIcons: Story = {
  name: 'With Both Icons',
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: 'i-ri-search-line',
    rightIcon: 'i-ri-close-line',
  },
}

// ─── All states overview ──────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstInput },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
        <EstInput label="Default" placeholder="Placeholder text" />
        <EstInput label="With value" model-value="user@example.com" />
        <EstInput label="With icon" placeholder="Search..." left-icon="i-ri-search-line" />
        <EstInput label="Error" model-value="invalid" error="This field is required." />
        <EstInput label="Disabled" placeholder="Disabled" :disabled="true" />
        <EstInput label="Read-only" model-value="read-only value" :readonly="true" />
      </div>
    `,
  }),
}
