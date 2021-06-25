import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import FollowHead from '~/views/Follow/FollowFeed/FollowHead'

import Heads from './Heads'

export default {
  title: 'Components/FollowFeed/Head',
  component: FollowHead,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Heads />
  </MockedProvider>
)

export const All = Template.bind({})
