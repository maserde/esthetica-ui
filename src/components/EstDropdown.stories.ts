import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EstDropdown from './EstDropdown.vue'

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
]

const meta = {
  title: 'Components/EstDropdown',
  component: EstDropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  render: (args) => ({
    components: { EstDropdown },
    setup() {
      const value = ref(args.modelValue ?? null)
      return { args, value }
    },
    template: `<EstDropdown v-bind="args" v-model="value" style="width: 240px;" />`,
  }),
} satisfies Meta<typeof EstDropdown>

export default meta
type Story = StoryObj<typeof meta>

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Select a fruit',
  },
}

// ─── With Value ───────────────────────────────────────────────────────────────

export const WithValue: Story = {
  name: 'With Value',
  args: {
    options: fruitOptions,
    modelValue: 'cherry',
    placeholder: 'Select a fruit',
  },
}

// ─── Size ─────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: {
    options: fruitOptions,
    size: 'sm',
    placeholder: 'Small dropdown',
  },
}

export const Large: Story = {
  args: {
    options: fruitOptions,
    size: 'lg',
    placeholder: 'Large dropdown',
  },
}

// ─── State ────────────────────────────────────────────────────────────────────

export const Error: Story = {
  args: {
    options: fruitOptions,
    error: true,
    placeholder: 'Select a fruit',
  },
}

export const Disabled: Story = {
  args: {
    options: fruitOptions,
    disabled: true,
    placeholder: 'Select a fruit',
  },
}

export const Empty: Story = {
  name: 'No Options',
  args: {
    options: [],
    placeholder: 'Select a fruit',
  },
}

// ─── With Disabled Options ────────────────────────────────────────────────────

export const WithDisabledOptions: Story = {
  name: 'With Disabled Options',
  args: {
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana (out of stock)', value: 'banana', disabled: true },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Durian (out of stock)', value: 'durian', disabled: true },
      { label: 'Fig', value: 'fig' },
    ],
    placeholder: 'Select a fruit',
  },
}

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { EstDropdown },
    setup() {
      const sm = ref(null)
      const md = ref(null)
      const lg = ref(null)
      return { sm, md, lg, fruitOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 240px;">
        <EstDropdown v-model="sm" :options="fruitOptions" size="sm" placeholder="Small" />
        <EstDropdown v-model="md" :options="fruitOptions" size="md" placeholder="Medium (default)" />
        <EstDropdown v-model="lg" :options="fruitOptions" size="lg" placeholder="Large" />
      </div>
    `,
  }),
}

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstDropdown },
    setup() {
      const def = ref(null)
      const withVal = ref('cherry')
      const err = ref(null)
      const dis = ref(null)
      return { def, withVal, err, dis, fruitOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 240px;">
        <EstDropdown v-model="def" :options="fruitOptions" placeholder="Default" />
        <EstDropdown v-model="withVal" :options="fruitOptions" placeholder="With value" />
        <EstDropdown v-model="err" :options="fruitOptions" :error="true" placeholder="Error state" />
        <EstDropdown v-model="dis" :options="fruitOptions" :disabled="true" placeholder="Disabled" />
      </div>
    `,
  }),
}
