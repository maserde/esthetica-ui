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
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
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

// ─── Slot variants ────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => ({
    components: { EstInput },
    template: `
      <EstInput label="Email" placeholder="Enter your email" style="width:320px;">
        <template #leading>
          <span class="i-ri-mail-line w-6 h-6 flex-shrink-0" aria-hidden="true" />
        </template>
      </EstInput>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  render: () => ({
    components: { EstInput },
    template: `
      <EstInput label="Password" placeholder="Enter your password" style="width:320px;">
        <template #trailing>
          <button type="button" class="flex items-center flex-shrink-0 bg-transparent border-none p-0 cursor-pointer" aria-label="Show password">
            <span class="i-ri-eye-line w-6 h-6" aria-hidden="true" />
          </button>
        </template>
      </EstInput>
    `,
  }),
}

export const WithBothSlots: Story = {
  name: 'With Both Slots',
  render: () => ({
    components: { EstInput },
    template: `
      <EstInput label="Search" placeholder="Search..." style="width:320px;">
        <template #leading>
          <span class="i-ri-search-line w-6 h-6 flex-shrink-0" aria-hidden="true" />
        </template>
        <template #trailing>
          <button type="button" class="flex items-center flex-shrink-0 bg-transparent border-none p-0 cursor-pointer" aria-label="Clear">
            <span class="i-ri-close-line w-6 h-6" aria-hidden="true" />
          </button>
        </template>
      </EstInput>
    `,
  }),
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
        <EstInput label="With icon" placeholder="Search...">
          <template #leading>
            <span class="i-ri-search-line w-6 h-6 flex-shrink-0" aria-hidden="true" />
          </template>
        </EstInput>
        <EstInput label="Error" model-value="invalid" error="This field is required." />
        <EstInput label="Disabled" placeholder="Disabled" :disabled="true" />
        <EstInput label="Read-only" model-value="read-only value" :readonly="true" />
      </div>
    `,
  }),
}
