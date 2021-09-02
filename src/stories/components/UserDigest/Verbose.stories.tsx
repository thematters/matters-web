import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { UserDigest } from '~/components'
import { UserDigestVerboseProps } from '~/components/UserDigest/Verbose'

import { MOCK_USER } from '../../mocks'

export default {
  title: 'Components/UserDigest',
  component: UserDigest.Rich,
} as Meta

const Template: Story<UserDigestVerboseProps> = (args) => (
  <MockedProvider>
    <UserDigest.Verbose {...args} />
  </MockedProvider>
)

export const Verbose = Template.bind({})
Verbose.args = {
  user: MOCK_USER,
  size: 'sm',
  spacing: [0, 0],
  bgColor: 'none',
}
