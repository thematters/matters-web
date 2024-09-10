import { MockedProvider } from '@apollo/client/testing'
import { Meta } from '@storybook/react'
import React, { useState } from 'react'

import { SquareTabs } from '~/components'

export type TabsType = 'ALL' | 'Articles'

export default {
  title: 'Components/SquareTabs',
  component: SquareTabs,
} satisfies Meta<typeof SquareTabs>

export const SquareTabsGroup = () => {
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
}
