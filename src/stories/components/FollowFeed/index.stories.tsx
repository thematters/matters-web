import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import FollowFeed from '~/views/Follow/FollowFeed'

import Feed from './Feed'

export default {
  title: 'Components/FollowFeed',
  component: FollowFeed,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Feed />
  </MockedProvider>
)

export const All = Template.bind({})
