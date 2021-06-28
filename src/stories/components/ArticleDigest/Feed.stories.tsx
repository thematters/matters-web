import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ArticleDigestFeed } from '~/components'
import { ArticleDigestFeedProps } from '~/components/ArticleDigest/Feed'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest/Feed',
  component: ArticleDigestFeed,
} as Meta

const Template: Story<ArticleDigestFeedProps> = (args) => (
  <MockedProvider>
    <ArticleDigestFeed {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  article: MOCK_ARTILCE,
}

export const InUserArticles = Template.bind({})
InUserArticles.args = {
  article: MOCK_ARTILCE,
  inUserArticles: true,
}
