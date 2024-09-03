import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

export default {
  title: 'Components/TagDigest/Rich',
  component: TagDigest.Rich,
} as ComponentMeta<typeof TagDigest.Rich>

const Template: ComponentStory<typeof TagDigest.Rich> = (args) => (
  <MockedProvider>
    <TagDigest.Rich {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  tag: MOCK_TAG as any,
}

export const HasFollow = Template.bind({})
HasFollow.args = {
  tag: MOCK_TAG as any,
  hasDesc: true,
  hasFollow: true,
}
