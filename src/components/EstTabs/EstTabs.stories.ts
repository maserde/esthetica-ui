import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EstTabs from './EstTabs.vue'
import EstTabsList from './EstTabsList.vue'
import EstTabsTrigger from './EstTabsTrigger.vue'
import EstTabsContent from './EstTabsContent.vue'

const meta = {
  title: 'Components/EstTabs',
  component: EstTabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'surface'] },
  },
} satisfies Meta<typeof EstTabs>

export default meta
type Story = StoryObj<typeof meta>

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => ({
    components: { EstTabs, EstTabsList, EstTabsTrigger, EstTabsContent },
    setup() {
      const active = ref('overview')
      return { active }
    },
    template: `
      <EstTabs v-model="active">
        <EstTabsList>
          <EstTabsTrigger value="overview">
            Overview
            <template #badge>3</template>
          </EstTabsTrigger>
          <EstTabsTrigger value="analytics">
            Analytics
            <template #badge>7</template>
          </EstTabsTrigger>
          <EstTabsTrigger value="reports">
            Reports
          </EstTabsTrigger>
        </EstTabsList>
        <EstTabsContent value="overview">
          <p style="color: var(--est-color-neutral-700); font-size: 0.875rem;">
            Overview panel content goes here.
          </p>
        </EstTabsContent>
        <EstTabsContent value="analytics">
          <p style="color: var(--est-color-neutral-700); font-size: 0.875rem;">
            Analytics panel content goes here.
          </p>
        </EstTabsContent>
        <EstTabsContent value="reports">
          <p style="color: var(--est-color-neutral-700); font-size: 0.875rem;">
            Reports panel content goes here.
          </p>
        </EstTabsContent>
      </EstTabs>
    `,
  }),
}

// ─── With badge (matches design reference) ───────────────────────────────────

export const WithBadge: Story = {
  name: 'With Badge',
  render: () => ({
    components: { EstTabs, EstTabsList, EstTabsTrigger, EstTabsContent },
    setup() {
      const active = ref('tabs')
      return { active }
    },
    template: `
      <EstTabs v-model="active">
        <EstTabsList>
          <EstTabsTrigger value="tabs">
            Tabs
            <template #badge>2</template>
          </EstTabsTrigger>
          <EstTabsTrigger value="other">
            Other
            <template #badge>5</template>
          </EstTabsTrigger>
        </EstTabsList>
      </EstTabs>
    `,
  }),
}

// ─── Without badge ────────────────────────────────────────────────────────────

export const WithoutBadge: Story = {
  name: 'Without Badge',
  render: () => ({
    components: { EstTabs, EstTabsList, EstTabsTrigger },
    setup() {
      const active = ref('account')
      return { active }
    },
    template: `
      <EstTabs v-model="active">
        <EstTabsList>
          <EstTabsTrigger value="account">Account</EstTabsTrigger>
          <EstTabsTrigger value="password">Password</EstTabsTrigger>
          <EstTabsTrigger value="settings">Settings</EstTabsTrigger>
        </EstTabsList>
      </EstTabs>
    `,
  }),
}

// ─── Disabled tab ─────────────────────────────────────────────────────────────

export const WithDisabledTab: Story = {
  name: 'With Disabled Tab',
  render: () => ({
    components: { EstTabs, EstTabsList, EstTabsTrigger, EstTabsContent },
    setup() {
      const active = ref('active')
      return { active }
    },
    template: `
      <EstTabs v-model="active">
        <EstTabsList>
          <EstTabsTrigger value="active">
            Active
            <template #badge>4</template>
          </EstTabsTrigger>
          <EstTabsTrigger value="disabled" :disabled="true">
            Disabled
            <template #badge>2</template>
          </EstTabsTrigger>
          <EstTabsTrigger value="another">Another</EstTabsTrigger>
        </EstTabsList>
        <EstTabsContent value="active">
          <p style="color: var(--est-color-neutral-700); font-size: 0.875rem;">Active tab content.</p>
        </EstTabsContent>
        <EstTabsContent value="another">
          <p style="color: var(--est-color-neutral-700); font-size: 0.875rem;">Another tab content.</p>
        </EstTabsContent>
      </EstTabs>
    `,
  }),
}

// ─── All states side-by-side ──────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { EstTabs, EstTabsList, EstTabsTrigger },
    setup() {
      const active = ref('active-tab')
      return { active }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <p style="font-size:0.75rem;color:var(--est-color-neutral-500);margin:0;">
          First tab = inactive, second tab = active
        </p>
        <EstTabs v-model="active">
          <EstTabsList>
            <EstTabsTrigger value="inactive-tab">
              Tabs
              <template #badge>2</template>
            </EstTabsTrigger>
            <EstTabsTrigger value="active-tab">
              Tabs
              <template #badge>2</template>
            </EstTabsTrigger>
          </EstTabsList>
        </EstTabs>
      </div>
    `,
  }),
}

// ─── Both variants side-by-side ──────────────────────────────────────────────

export const Variants: Story = {
  name: 'Variants',
  render: () => ({
    components: { EstTabs, EstTabsList, EstTabsTrigger },
    setup() {
      const active1 = ref('active-tab')
      const active2 = ref('active-tab')
      return { active1, active2 }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div>
          <p style="font-size:0.75rem;color:var(--est-color-neutral-500);margin:0 0 8px;">variant="default" — list bg neutral-100, inactive bg neutral-100, active bg white</p>
          <EstTabs v-model="active1" variant="default">
            <EstTabsList>
              <EstTabsTrigger value="inactive-tab">
                Tabs
                <template #badge>2</template>
              </EstTabsTrigger>
              <EstTabsTrigger value="active-tab">
                Tabs
                <template #badge>2</template>
              </EstTabsTrigger>
            </EstTabsList>
          </EstTabs>
        </div>
        <div>
          <p style="font-size:0.75rem;color:var(--est-color-neutral-500);margin:0 0 8px;">variant="surface" — list bg white, inactive bg white, active bg neutral-100</p>
          <EstTabs v-model="active2" variant="surface">
            <EstTabsList>
              <EstTabsTrigger value="inactive-tab">
                Tabs
                <template #badge>2</template>
              </EstTabsTrigger>
              <EstTabsTrigger value="active-tab">
                Tabs
                <template #badge>2</template>
              </EstTabsTrigger>
            </EstTabsList>
          </EstTabs>
        </div>
      </div>
    `,
  }),
}
