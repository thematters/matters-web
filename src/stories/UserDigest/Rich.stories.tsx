import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { UserDigest } from '~/components'
import { UserDigestRichProps } from '~/components/UserDigest/Rich'

import { PLACEHOLDER_USER } from '../placeholders'

export default {
  title: 'Components/UserDigest',
  component: UserDigest.Rich,
} as Meta

const Template: Story<UserDigestRichProps> = (args) => (
  <MockedProvider>
    <UserDigest.Rich {...args} />
  </MockedProvider>
)

export const Rich = Template.bind({})
Rich.args = {
  user: PLACEHOLDER_USER,
  size: 'sm',
  spacing: [0, 0],
  bgColor: 'none',
}
