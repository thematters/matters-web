import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Charts from './Charts'

const meta = {
  title: 'Components/Charts',
  component: Charts,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof Charts>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  args: {},
}
