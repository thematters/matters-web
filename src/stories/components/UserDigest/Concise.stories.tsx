import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { UserDigest } from '~/components'

import { MOCK_USER } from '../../mocks'

export default {
  title: 'Components/UserDigest',
  component: UserDigest.Concise,
} as ComponentMeta<typeof UserDigest.Concise>

const Template: ComponentStory<typeof UserDigest.Concise> = (args) => (
  <MockedProvider>
    <UserDigest.Concise {...args} />
  </MockedProvider>
)

export const Concise = Template.bind({})
Concise.args = {
  user: MOCK_USER,
  avatarSize: 'xl',
}

export const ConciseTight = Template.bind({})
ConciseTight.args = {
  user: MOCK_USER,
  avatarSize: 'lg',
  nameStyle: 'tight',
}
