import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import Tabs from './Tabs'

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = () => (
  <MockedProvider>
    <Tabs />
  </MockedProvider>
)

export const Default = Template.bind({})
