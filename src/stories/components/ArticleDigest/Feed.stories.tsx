import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ArticleDigestFeed } from '~/components'
import { ArticleDigestFeedProps } from '~/components/ArticleDigest/Feed'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestFeed,
} as Meta

const Template: Story<ArticleDigestFeedProps> = (args) => (
  <MockedProvider>
    <ArticleDigestFeed {...args} />
  </MockedProvider>
)

export const Feed = Template.bind({})
Feed.args = {
  article: MOCK_ARTILCE,
}

export const FeedWithCircle = Template.bind({})
FeedWithCircle.args = {
  article: MOCK_ARTILCE,
  hasCircle: true,
}
