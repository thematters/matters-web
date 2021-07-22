import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import FollowingFeed from '~/views/Follow/Feed'

import Feed from './Feed'

export default {
  title: 'Components/FollowingFeed',
  component: FollowingFeed,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Feed />
  </MockedProvider>
)

export const All = Template.bind({})
