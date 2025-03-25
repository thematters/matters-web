import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

export default {
  title: 'Components/TagDigest/Bookmark',
  component: TagDigest.Bookmark,
} as ComponentMeta<typeof TagDigest.Bookmark>

const Template: ComponentStory<typeof TagDigest.Bookmark> = (args) => (
  <MockedProvider>
    <TagDigest.Bookmark {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  tag: MOCK_TAG as any,
}

export const HasFollow = Template.bind({})
HasFollow.args = {
  tag: {
    ...MOCK_TAG,
    isFollower: true,
  } as any,
}

export const LongTagName = Template.bind({})
LongTagName.args = {
  tag: {
    ...MOCK_TAG,
    content:
      'LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName',
  } as any,
}
