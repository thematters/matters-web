import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestFeed } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest/Feed',
  component: ArticleDigestFeed,
} as ComponentMeta<typeof ArticleDigestFeed>

const Template: ComponentStory<typeof ArticleDigestFeed> = (args) => (
  <MockedProvider>
    <ArticleDigestFeed {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  article: MOCK_ARTILCE,
  hasReadTime: true,
  hasDonationCount: true,
}

export const LongTitleFeed = Template.bind({})
LongTitleFeed.args = {
  article: {
    ...MOCK_ARTILCE,
    title: MOCK_ARTILCE.title.repeat(4),
  },
  hasReadTime: true,
}

export const InUserPageFeed = Template.bind({})
InUserPageFeed.args = {
  article: { ...MOCK_ARTILCE, pinned: true, bookmarked: false },
  inUserArticles: true,
  hasAuthor: false,
}

export const Subscribed = Template.bind({})
Subscribed.args = {
  article: { ...MOCK_ARTILCE, pinned: true, bookmarked: true },
  inUserArticles: true,
}
