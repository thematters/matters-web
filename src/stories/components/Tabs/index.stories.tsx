import { MockedProvider } from '@apollo/client/testing'
import { Meta } from '@storybook/react'
import React from 'react'

import { Tabs } from '~/components'

export default {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export const TabsGroup = () => (
  <MockedProvider>
    <Tabs>
      <Tabs.Tab selected count={5} href="#1">
        作品
      </Tabs.Tab>
      <Tabs.Tab count={1} href="#2">
        選集
      </Tabs.Tab>
    </Tabs>
  </MockedProvider>
)
