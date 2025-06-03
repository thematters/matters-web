import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { MomentDigestFeed } from '~/components'

import { MOCK_MOMENT } from '../../mocks'

const meta = {
  title: 'Components/MomentDigest/Feed',
  component: MomentDigestFeed,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof MomentDigestFeed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    moment: MOCK_MOMENT,
  },
}

export const LongContent: Story = {
  args: {
    moment: {
      ...MOCK_MOMENT,
      content: `<p>This is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content</p>`,
    },
  },
}

export const FollowFeed: Story = {
  args: {
    moment: {
      ...MOCK_MOMENT,
    },
    hasAuthor: true,
    hasCommentedFollowees: true,
  },
}
