import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import SegmentedTabs from './Tabs'

export default {
  title: 'Components/SegmentedTabs',
  component: SegmentedTabs,
} as ComponentMeta<typeof SegmentedTabs>

const Template: ComponentStory<typeof SegmentedTabs> = () => (
  <MockedProvider>
    <SegmentedTabs />
  </MockedProvider>
)

export const Default = Template.bind({})
