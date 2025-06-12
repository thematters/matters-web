import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import SegmentedTabs from './Tabs'

const meta = {
  title: 'Components/SegmentedTabs',
  component: SegmentedTabs,
} satisfies Meta<typeof SegmentedTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MockedProvider>
      <SegmentedTabs />
    </MockedProvider>
  ),
}
