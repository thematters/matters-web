import { MockedProvider } from '@apollo/react-testing'
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
