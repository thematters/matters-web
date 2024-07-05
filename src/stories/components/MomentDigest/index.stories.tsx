import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { MomentDigest } from '~/components'

import { MOCK_MOMENT } from '../../mocks'

export default {
  title: 'Components/MomentDigest',
  component: MomentDigest,
} as ComponentMeta<typeof MomentDigest>

const Template: ComponentStory<typeof MomentDigest> = (args) => (
  <MockedProvider>
    <MomentDigest {...args} />
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
