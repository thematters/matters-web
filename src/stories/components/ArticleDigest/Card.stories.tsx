import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ArticleDigestCard } from '~/components'
import { ArticleDigestCardProps } from '~/components/ArticleDigest/Card'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestCard,
} as Meta

const Template: Story<ArticleDigestCardProps> = (args) => (
  <MockedProvider>
    <ArticleDigestCard {...args} />
  </MockedProvider>
)

export const Card = Template.bind({})
Card.args = {
  article: MOCK_ARTILCE,
}
