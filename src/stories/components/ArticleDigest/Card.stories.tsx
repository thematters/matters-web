import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestCard } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestCard,
} as ComponentMeta<typeof ArticleDigestCard>

const Template: ComponentStory<typeof ArticleDigestCard> = (args) => (
  <MockedProvider>
    <ArticleDigestCard {...args} />
  </MockedProvider>
)

export const Card = Template.bind({})
Card.args = {
  article: MOCK_ARTILCE,
}
