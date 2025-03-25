import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { UserDigest } from '~/components'

import { MOCK_USER } from '../../mocks'

export default {
  title: 'Components/UserDigest',
  component: UserDigest.Rich,
} as ComponentMeta<typeof UserDigest.Rich>

const Template: ComponentStory<typeof UserDigest.Rich> = (args) => (
  <MockedProvider>
    <UserDigest.Rich {...args} />
  </MockedProvider>
)

export const Rich = Template.bind({})
Rich.args = {
  user: MOCK_USER,
  size: 'sm',
  spacing: [0, 0],
  bgColor: 'none',
}
