import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import Wall from '@/src/views/ArticleDetail/Wall/Visitor'

export default {
  title: 'Components/Wall',
  component: Wall,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Wall show />
  </MockedProvider>
)

export const Default = Template.bind({})
