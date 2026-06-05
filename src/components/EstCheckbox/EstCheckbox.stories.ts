import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EstCheckbox from './EstCheckbox.vue'
import EstCheckboxBox from './EstCheckboxBox.vue'
import EstCheckboxLabel from './EstCheckboxLabel.vue'
import EstCheckboxDescription from './EstCheckboxDescription.vue'

const meta = {
  title: 'Components/EstCheckbox',
  component: EstCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    components: { EstCheckbox, EstCheckboxBox, EstCheckboxLabel },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstCheckbox v-bind="args" v-model="value">
        <EstCheckboxBox />
        <EstCheckboxLabel>{{ args.default ?? 'Checkbox label' }}</EstCheckboxLabel>
      </EstCheckbox>
    `,
  }),
} satisfies Meta<typeof EstCheckbox>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: { modelValue: true },
  render: (args) => ({
    components: { EstCheckbox, EstCheckboxBox, EstCheckboxLabel },
    setup() {
      const value = ref(args.modelValue ?? true)
      return { args, value }
    },
    template: `
      <EstCheckbox v-bind="args" v-model="value">
        <EstCheckboxBox />
        <EstCheckboxLabel>Checked</EstCheckboxLabel>
      </EstCheckbox>
    `,
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, modelValue: true },
  render: (args) => ({
    components: { EstCheckbox, EstCheckboxBox, EstCheckboxLabel },
    setup() {
      const value = ref(args.modelValue ?? true)
      return { args, value }
    },
    template: `
      <EstCheckbox v-bind="args" v-model="value">
        <EstCheckboxBox />
        <EstCheckboxLabel>Disabled Checked</EstCheckboxLabel>
      </EstCheckbox>
    `,
  }),
}

export const WithDescription: Story = {
  args: {},
  render: (args) => ({
    components: { EstCheckbox, EstCheckboxBox, EstCheckboxLabel, EstCheckboxDescription },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: `
      <EstCheckbox v-bind="args" v-model="value">
        <EstCheckboxBox />
        <EstCheckboxLabel>I agree to the terms and conditions</EstCheckboxLabel>
        <EstCheckboxDescription>You must agree to continue.</EstCheckboxDescription>
      </EstCheckbox>
    `,
  }),
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllColors: Story = {
  name: 'All Colors',
  args: { modelValue: true },
  render: (args) => ({
    components: { EstCheckbox, EstCheckboxBox, EstCheckboxLabel },
    setup() {
      const primary = ref(true)
      const success = ref(true)
      const warning = ref(true)
      const danger = ref(true)
      const info = ref(true)
      return { args, primary, success, warning, danger, info }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <EstCheckbox v-bind="args" v-model="primary" color="primary">
          <EstCheckboxBox />
          <EstCheckboxLabel>Primary</EstCheckboxLabel>
        </EstCheckbox>
        <EstCheckbox v-bind="args" v-model="success" color="success">
          <EstCheckboxBox />
          <EstCheckboxLabel>Success</EstCheckboxLabel>
        </EstCheckbox>
        <EstCheckbox v-bind="args" v-model="warning" color="warning">
          <EstCheckboxBox />
          <EstCheckboxLabel>Warning</EstCheckboxLabel>
        </EstCheckbox>
        <EstCheckbox v-bind="args" v-model="danger" color="danger">
          <EstCheckboxBox />
          <EstCheckboxLabel>Danger</EstCheckboxLabel>
        </EstCheckbox>
        <EstCheckbox v-bind="args" v-model="info" color="info">
          <EstCheckboxBox />
          <EstCheckboxLabel>Info</EstCheckboxLabel>
        </EstCheckbox>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  args: { modelValue: true },
  render: (args) => ({
    components: { EstCheckbox, EstCheckboxBox, EstCheckboxLabel },
    setup() {
      const sm = ref(true)
      const md = ref(true)
      const lg = ref(true)
      return { args, sm, md, lg }
    },
    template: `
      <div style="display:flex;align-items:center;gap:24px;">
        <EstCheckbox v-bind="args" v-model="sm" size="sm">
          <EstCheckboxBox />
          <EstCheckboxLabel>Small</EstCheckboxLabel>
        </EstCheckbox>
        <EstCheckbox v-bind="args" v-model="md" size="md">
          <EstCheckboxBox />
          <EstCheckboxLabel>Medium</EstCheckboxLabel>
        </EstCheckbox>
        <EstCheckbox v-bind="args" v-model="lg" size="lg">
          <EstCheckboxBox />
          <EstCheckboxLabel>Large</EstCheckboxLabel>
        </EstCheckbox>
      </div>
    `,
  }),
}
