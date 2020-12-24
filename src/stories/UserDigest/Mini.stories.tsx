import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { UserDigest } from '~/components'
import { UserDigestMiniProps } from '~/components/UserDigest/Mini'

import { PLACEHOLDER_USER } from '../placeholders'

export default {
  title: 'Components/UserDigest',
  component: UserDigest.Mini,
} as Meta

const Template: Story<UserDigestMiniProps> = (args) => (
  <MockedProvider>
    <UserDigest.Mini {...args} />
  </MockedProvider>
)

export const Mini = Template.bind({})
Mini.args = {
  user: PLACEHOLDER_USER,
  avatarSize: 'xs',
  hasAvatar: true,
  hasDisplayName: true,
  hasUserName: true,
}
