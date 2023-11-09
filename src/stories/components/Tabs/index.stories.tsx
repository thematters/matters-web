import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Tabs } from '~/components'

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = () => (
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

export const Default = Template.bind({})
