import type { Meta, StoryObj } from '@storybook/react'

import IconTable from './IconTable'

const meta = {
  title: 'Components/Icons',
  component: IconTable,
} satisfies Meta<typeof IconTable>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  args: {
    size: 32,
    color: 'black',
  },
}
