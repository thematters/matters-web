import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import Tabs from './Tabs'

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Tabs />
  </MockedProvider>
)

export const Default = Template.bind({})
