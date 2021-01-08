import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import NoticeList from './NoticeList'

export default {
  title: 'Components/Notice',
  component: NoticeList,
} as Meta

const Template: Story = (args) => (
  <MockedProvider>
    <NoticeList {...args} />
  </MockedProvider>
)

export const All = Template.bind({})
