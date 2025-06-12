import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ArticleDigestFeed } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/ArticleDigest/Feed',
  component: ArticleDigestFeed,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ArticleDigestFeed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    article: MOCK_ARTILCE,
    hasReadTime: true,
    hasDonationCount: true,
  },
}

export const LongTitleFeed: Story = {
  args: {
    article: {
      ...MOCK_ARTILCE,
      title: MOCK_ARTILCE.title.repeat(4),
    },
    hasReadTime: true,
  },
}

export const InUserPageFeed: Story = {
  args: {
    article: { ...MOCK_ARTILCE, pinned: true, bookmarked: false },
    inUserArticles: true,
    hasAuthor: false,
  },
}

export const Subscribed: Story = {
  args: {
    article: { ...MOCK_ARTILCE, pinned: true, bookmarked: true },
    inUserArticles: true,
  },
}
