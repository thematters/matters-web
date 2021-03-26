import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { UserDigest } from '~/components'
import { UserDigestBlankProps } from '~/components/UserDigest/Blank'

import { MOCK_BLANK_USER } from '../../mocks'

export default {
  title: 'Components/UserDigest',
  component: UserDigest.Blank,
} as Meta

const Template: Story<UserDigestBlankProps> = (args) => (
  <MockedProvider>
    <UserDigest.Blank {...args} />
  </MockedProvider>
)

export const Blank = Template.bind({})
Blank.args = {
  user: MOCK_BLANK_USER,
  avatarSize: 'xs',
  hasAvatar: true,
}
