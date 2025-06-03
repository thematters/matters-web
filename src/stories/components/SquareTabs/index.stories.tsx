import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { SquareTabs } from '~/components'

export type TabsType = 'ALL' | 'Articles'

const meta = {
  title: 'Components/SquareTabs',
  component: SquareTabs,
} satisfies Meta<typeof SquareTabs>

export default meta
type Story = StoryObj<typeof meta>

export const SquareTabsGroup: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<TabsType>('ALL')
    return (
      <MockedProvider>
        <SquareTabs>
          <SquareTabs.Tab
            selected={activeTab === 'ALL'}
            title="All"
            onClick={() => setActiveTab('ALL')}
          />

          <SquareTabs.Tab
            selected={activeTab === 'Articles'}
            title="Articles"
            onClick={() => setActiveTab('Articles')}
          />
        </SquareTabs>
      </MockedProvider>
    )
  },
}
