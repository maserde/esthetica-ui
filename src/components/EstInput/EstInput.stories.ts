import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstInput from './EstInput.vue'
import EstInputLabel from './EstInputLabel.vue'
import EstInputField from './EstInputField.vue'
import EstInputError from './EstInputError.vue'
import EstButton from '../EstButton/EstButton.vue'

const meta = {
  title: 'Components/EstInput',
  component: EstInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  render: (args) => ({
    components: { EstInput, EstInputLabel, EstInputField, EstInputError },
    setup() {
      return { args }
    },
    template: `
      <EstInput v-bind="args" style="width:320px;">
        <EstInputLabel>Email</EstInputLabel>
        <EstInputField placeholder="Type your text here" />
        <EstInputError />
      </EstInput>
    `,
  }),
} satisfies Meta<typeof EstInput>

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
    components: { EstInput, EstInputLabel, EstInputField, EstInputError },
    template: `
      <EstInput style="width:320px;">
        <EstInputLabel>Email</EstInputLabel>
        <EstInputField placeholder="Enter your email">
          <template #leading>
            <span class="i-ri-mail-line text-[--est-color-neutral-500] w-4 h-6 flex-shrink-0" aria-hidden="true" />
          </template>
        </EstInputField>
        <EstInputError />
      </EstInput>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  render: () => ({
    components: { EstInput, EstInputLabel, EstInputField, EstInputError },
    template: `
      <EstInput style="width:320px;">
        <EstInputLabel>Password</EstInputLabel>
        <EstInputField placeholder="Enter your password">
          <template #trailing>
            <button type="button" class="flex items-center flex-shrink-0 bg-transparent border-none p-0 cursor-pointer" aria-label="Show password">
              <span class="i-ri-eye-line text-[--est-color-neutral-500] w-4 h-6" aria-hidden="true" />
            </button>
          </template>
        </EstInputField>
        <EstInputError />
      </EstInput>
    `,
  }),
}

export const WithBothSlots: Story = {
  name: 'With Both Slots',
  render: () => ({
    components: { EstInput, EstInputLabel, EstInputField, EstInputError },
    template: `
      <EstInput style="width:320px;">
        <EstInputLabel>Search</EstInputLabel>
        <EstInputField placeholder="Search...">
          <template #leading>
            <span class="i-ri-search-line text-[--est-color-neutral-500] w-4 h-6 flex-shrink-0" aria-hidden="true" />
          </template>
          <template #trailing>
            <button type="button" class="flex items-center flex-shrink-0 bg-transparent border-none p-0 cursor-pointer" aria-label="Clear">
              <span class="i-ri-close-line text-[--est-color-neutral-500] w-4 h-6" aria-hidden="true" />
            </button>
          </template>
        </EstInputField>
        <EstInputError />
      </EstInput>
    `,
  }),
}

export const WithButton: Story = {
  name: 'With Button',
  render: () => ({
    components: { EstInput, EstInputLabel, EstInputField, EstButton },
    template: `
      <div class="flex items-end gap-2">
        <EstInput style="width:320px;">
          <EstInputLabel>Search</EstInputLabel>
          <EstInputField placeholder="Search..." />
        </EstInput>
        <EstButton>Submit</EstButton>
      </div>
    `,
  }),
}

// ─── All states overview ──────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstInput, EstInputLabel, EstInputField, EstInputError },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
        <EstInput>
          <EstInputLabel>Default</EstInputLabel>
          <EstInputField placeholder="Placeholder text" />
        </EstInput>
        <EstInput model-value="user@example.com">
          <EstInputLabel>With value</EstInputLabel>
          <EstInputField />
        </EstInput>
        <EstInput>
          <EstInputLabel>With icon</EstInputLabel>
          <EstInputField placeholder="Search...">
            <template #leading>
              <span class="i-ri-search-line text-[--est-color-neutral-500] w-4 h-4 flex-shrink-0" aria-hidden="true" />
            </template>
          </EstInputField>
        </EstInput>
        <EstInput model-value="invalid" error="This field is required.">
          <EstInputLabel>Error</EstInputLabel>
          <EstInputField />
          <EstInputError />
        </EstInput>
        <EstInput :disabled="true">
          <EstInputLabel>Disabled</EstInputLabel>
          <EstInputField placeholder="Disabled" />
        </EstInput>
        <EstInput model-value="read-only value" :readonly="true">
          <EstInputLabel>Read-only</EstInputLabel>
          <EstInputField />
        </EstInput>
      </div>
    `,
  }),
}
