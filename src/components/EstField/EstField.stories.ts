import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstField from './EstField.vue'
import EstLabel from './EstLabel.vue'
import EstInput from './EstInput.vue'
import EstFieldError from './EstFieldError.vue'
import EstButton from '../EstButton/EstButton.vue'

const meta = {
  title: 'Components/EstField',
  component: EstField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  render: (args) => ({
    components: { EstField, EstLabel, EstInput, EstFieldError },
    setup() {
      return { args }
    },
    template: `
      <EstField v-bind="args" style="width:320px;">
        <EstLabel>Email</EstLabel>
        <EstInput placeholder="Type your text here" />
        <EstFieldError />
      </EstField>
    `,
  }),
} satisfies Meta<typeof EstField>

export default meta
type Story = StoryObj<typeof meta>

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { modelValue: '' },
}

export const WithValue: Story = {
  name: 'With Value',
  args: { modelValue: 'user@example.com' },
}

export const WithError: Story = {
  name: 'With Error',
  args: { modelValue: 'bad', error: 'Please enter a valid email address.' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Readonly: Story = {
  args: { modelValue: 'user@example.com', readonly: true },
}

// ─── Slot variants ────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => ({
    components: { EstField, EstLabel, EstInput, EstFieldError },
    template: `
      <EstField style="width:320px;">
        <EstLabel>Email</EstLabel>
        <EstInput placeholder="Enter your email">
          <template #leading>
            <span class="i-ri-mail-line text-[--est-color-neutral-500] w-4 h-6 flex-shrink-0" aria-hidden="true" />
          </template>
        </EstInput>
        <EstFieldError />
      </EstField>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  render: () => ({
    components: { EstField, EstLabel, EstInput, EstFieldError },
    template: `
      <EstField style="width:320px;">
        <EstLabel>Password</EstLabel>
        <EstInput placeholder="Enter your password">
          <template #trailing>
            <button type="button" class="flex items-center flex-shrink-0 bg-transparent border-none p-0 cursor-pointer" aria-label="Show password">
              <span class="i-ri-eye-line text-[--est-color-neutral-500] w-4 h-6" aria-hidden="true" />
            </button>
          </template>
        </EstInput>
        <EstFieldError />
      </EstField>
    `,
  }),
}

export const WithBothSlots: Story = {
  name: 'With Both Slots',
  render: () => ({
    components: { EstField, EstLabel, EstInput, EstFieldError },
    template: `
      <EstField style="width:320px;">
        <EstLabel>Search</EstLabel>
        <EstInput placeholder="Search...">
          <template #leading>
            <span class="i-ri-search-line text-[--est-color-neutral-500] w-4 h-6 flex-shrink-0" aria-hidden="true" />
          </template>
          <template #trailing>
            <button type="button" class="flex items-center flex-shrink-0 bg-transparent border-none p-0 cursor-pointer" aria-label="Clear">
              <span class="i-ri-close-line text-[--est-color-neutral-500] w-4 h-6" aria-hidden="true" />
            </button>
          </template>
        </EstInput>
        <EstFieldError />
      </EstField>
    `,
  }),
}

export const WithButton: Story = {
  name: 'With Button',
  render: () => ({
    components: { EstField, EstLabel, EstInput, EstButton },
    template: `
      <div class="flex items-end gap-2">
        <EstField style="width:320px;">
          <EstLabel>Search</EstLabel>
          <EstInput placeholder="Search..." />
        </EstField>
        <EstButton>Submit</EstButton>
      </div>
    `,
  }),
}

// ─── All states overview ──────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstField, EstLabel, EstInput, EstFieldError },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
        <EstField>
          <EstLabel>Default</EstLabel>
          <EstInput placeholder="Placeholder text" />
        </EstField>
        <EstField model-value="user@example.com">
          <EstLabel>With value</EstLabel>
          <EstInput />
        </EstField>
        <EstField>
          <EstLabel>With icon</EstLabel>
          <EstInput placeholder="Search...">
            <template #leading>
              <span class="i-ri-search-line text-[--est-color-neutral-500] w-4 h-4 flex-shrink-0" aria-hidden="true" />
            </template>
          </EstInput>
        </EstField>
        <EstField model-value="invalid" error="This field is required.">
          <EstLabel>Error</EstLabel>
          <EstInput />
          <EstFieldError />
        </EstField>
        <EstField :disabled="true">
          <EstLabel>Disabled</EstLabel>
          <EstInput placeholder="Disabled" />
        </EstField>
        <EstField model-value="read-only value" :readonly="true">
          <EstLabel>Read-only</EstLabel>
          <EstInput />
        </EstField>
      </div>
    `,
  }),
}
