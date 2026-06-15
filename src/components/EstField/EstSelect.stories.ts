import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstField from './EstField.vue'
import EstLabel from './EstLabel.vue'
import EstSelect from './EstSelect.vue'
import EstFieldError from './EstFieldError.vue'
import EstFieldHint from './EstFieldHint.vue'

const meta = {
  title: 'Components/EstSelect',
  component: EstSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    options: { control: 'object' },
  },
  render: (args) => ({
    components: { EstField, EstLabel, EstSelect, EstFieldError, EstFieldHint },
    setup() {
      return { args }
    },
    template: `
      <EstField style="width:320px;">
        <EstLabel>
          Label
          <span style="color: var(--est-color-danger-background-color);">*</span>
          <span class="i-ri-information-line" style="width:1em;height:1em;vertical-align:middle;color:var(--est-color-neutral-400);" aria-label="More info" />
        </EstLabel>
        <EstSelect v-bind="args" />
        <EstFieldHint>This is a hint text to help user.</EstFieldHint>
        <EstFieldError />
      </EstField>
    `,
  }),
} satisfies Meta<typeof EstSelect>

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
]

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    options: sampleOptions,
    icon: 'i-ri-mail-line',
  },
}

export const WithValue: Story = {
  name: 'With Value',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldHint },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField model-value="design" style="width:320px;">
        <EstLabel>Label</EstLabel>
        <EstSelect :options="options" icon="i-ri-mail-line" />
        <EstFieldHint>This is a hint text to help user.</EstFieldHint>
      </EstField>
    `,
  }),
}

export const WithError: Story = {
  name: 'With Error',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldError },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField error="Please select an option." style="width:320px;">
        <EstLabel>Label</EstLabel>
        <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
        <EstFieldError />
      </EstField>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { EstField, EstLabel, EstSelect },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField :disabled="true" style="width:320px;">
        <EstLabel>Label</EstLabel>
        <EstSelect placeholder="Disabled" :options="options" icon="i-ri-mail-line" />
      </EstField>
    `,
  }),
}

export const Readonly: Story = {
  render: () => ({
    components: { EstField, EstLabel, EstSelect },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField model-value="engineering" :readonly="true" style="width:320px;">
        <EstLabel>Label</EstLabel>
        <EstSelect :options="options" icon="i-ri-mail-line" />
      </EstField>
    `,
  }),
}

export const WithoutLeadingIcon: Story = {
  name: 'Without Leading Icon',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldHint },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField style="width:320px;">
        <EstLabel>
          Label
          <span style="color: var(--est-color-danger-background-color);">*</span>
        </EstLabel>
        <EstSelect placeholder="Placeholder" :options="options" />
        <EstFieldHint>This is a hint text to help user.</EstFieldHint>
      </EstField>
    `,
  }),
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeLarge: Story = {
  name: 'Size: Large',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldHint },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField size="lg" style="width:320px;">
        <EstLabel>Label</EstLabel>
        <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
        <EstFieldHint>This is a hint text to help user.</EstFieldHint>
      </EstField>
    `,
  }),
}

export const SizeMedium: Story = {
  name: 'Size: Medium',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldHint },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField size="md" style="width:320px;">
        <EstLabel>Label</EstLabel>
        <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
        <EstFieldHint>This is a hint text to help user.</EstFieldHint>
      </EstField>
    `,
  }),
}

export const SizeSmall: Story = {
  name: 'Size: Small',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldHint },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <EstField size="sm" style="width:320px;">
        <EstLabel>Label</EstLabel>
        <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
        <EstFieldHint>This is a hint text to help user.</EstFieldHint>
      </EstField>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldHint },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:320px;">
        <EstField size="lg">
          <EstLabel>Large</EstLabel>
          <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
          <EstFieldHint>Hint text for large select.</EstFieldHint>
        </EstField>
        <EstField size="md">
          <EstLabel>Medium</EstLabel>
          <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
          <EstFieldHint>Hint text for medium select.</EstFieldHint>
        </EstField>
        <EstField size="sm">
          <EstLabel>Small</EstLabel>
          <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
          <EstFieldHint>Hint text for small select.</EstFieldHint>
        </EstField>
      </div>
    `,
  }),
}

// ─── All states overview ──────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstField, EstLabel, EstSelect, EstFieldError, EstFieldHint },
    setup() {
      return { options: sampleOptions }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
        <EstField>
          <EstLabel>Default</EstLabel>
          <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
          <EstFieldHint>This is a hint text to help user.</EstFieldHint>
        </EstField>
        <EstField model-value="design">
          <EstLabel>With value</EstLabel>
          <EstSelect :options="options" icon="i-ri-mail-line" />
        </EstField>
        <EstField>
          <EstLabel>Without icon</EstLabel>
          <EstSelect placeholder="Select..." :options="options" />
          <EstFieldHint>This is a hint text to help user.</EstFieldHint>
        </EstField>
        <EstField error="This field is required.">
          <EstLabel>Error</EstLabel>
          <EstSelect placeholder="Select an option" :options="options" icon="i-ri-mail-line" />
          <EstFieldError />
        </EstField>
        <EstField :disabled="true">
          <EstLabel>Disabled</EstLabel>
          <EstSelect placeholder="Disabled" :options="options" icon="i-ri-mail-line" />
        </EstField>
        <EstField model-value="engineering" :readonly="true">
          <EstLabel>Read-only</EstLabel>
          <EstSelect :options="options" icon="i-ri-mail-line" />
        </EstField>
      </div>
    `,
  }),
}
