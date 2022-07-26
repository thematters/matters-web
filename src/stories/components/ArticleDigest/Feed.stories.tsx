import { MockedProvider } from '@apollo/react-testing'
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
}

export const Sticky = Template.bind({})
Sticky.args = {
  article: { ...MOCK_ARTILCE, sticky: true },
  inUserArticles: true,
}

export const Archived = Template.bind({})
Archived.args = {
  article: { ...MOCK_ARTILCE, articleState: 'archived' as any },
  inUserArticles: true,
}
