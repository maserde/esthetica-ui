import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EstAccordion from './EstAccordion.vue'
import EstAccordionItem from './EstAccordionItem.vue'
import EstAccordionTrigger from './EstAccordionTrigger.vue'
import EstAccordionContent from './EstAccordionContent.vue'

const meta = {
  title: 'Components/EstAccordion',
  component: EstAccordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
  },
  render: (args) => ({
    components: { EstAccordion, EstAccordionItem, EstAccordionTrigger, EstAccordionContent },
    setup() {
      const activeItems = ref(args.modelValue ?? (args.type === 'multiple' ? [] : ''))
      return { args, activeItems }
    },
    template: `
      <EstAccordion v-bind="args" v-model="activeItems">
        <EstAccordionItem value="item-1">
          <EstAccordionTrigger>Is it accessible?</EstAccordionTrigger>
          <EstAccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </EstAccordionContent>
        </EstAccordionItem>
        <EstAccordionItem value="item-2">
          <EstAccordionTrigger>Is it styled?</EstAccordionTrigger>
          <EstAccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </EstAccordionContent>
        </EstAccordionItem>
        <EstAccordionItem value="item-3">
          <EstAccordionTrigger>Is it animated?</EstAccordionTrigger>
          <EstAccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </EstAccordionContent>
        </EstAccordionItem>
      </EstAccordion>
    `,
  }),
} satisfies Meta<typeof EstAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
}
