import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { UserDigest } from '~/components'

import { MOCK_USER } from '../../mocks'

export default {
  title: 'Components/UserDigest',
  component: UserDigest.Mini,
} as ComponentMeta<typeof UserDigest.Mini>

const Template: ComponentStory<typeof UserDigest.Mini> = (args) => (
  <MockedProvider>
    <UserDigest.Mini {...args} />
  </MockedProvider>
)

export const Mini = Template.bind({})
Mini.args = {
  user: MOCK_USER,
  avatarSize: 16,
  hasAvatar: true,
  hasDisplayName: true,
  hasUserName: true,
}
