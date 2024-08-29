import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { MomentDigestFeed } from '~/components'

import { MOCK_MOMENT } from '../../mocks'

export default {
  title: 'Components/MomentDigest/Feed',
  component: MomentDigestFeed,
} as ComponentMeta<typeof MomentDigestFeed>

const Template: ComponentStory<typeof MomentDigestFeed> = (args) => (
  <MockedProvider>
    <MomentDigestFeed {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  moment: MOCK_MOMENT,
}

export const LongContent = Template.bind({})
LongContent.args = {
  moment: {
    ...MOCK_MOMENT,
    content: `<p>This is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content</p>`,
  },
}

export const FollowFeed = Template.bind({})
FollowFeed.args = {
  moment: {
    ...MOCK_MOMENT,
  },
  hasAuthor: true,
  hasCommentedFollowees: true,
}
