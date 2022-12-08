import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestConcise } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest/Concise',
  component: ArticleDigestConcise,
} as ComponentMeta<typeof ArticleDigestConcise>

const Template: ComponentStory<typeof ArticleDigestConcise> = (args) => (
  <MockedProvider>
    <ArticleDigestConcise {...args} />
  </MockedProvider>
)

export const Concise = Template.bind({})
Concise.args = {
  article: MOCK_ARTILCE,
}
