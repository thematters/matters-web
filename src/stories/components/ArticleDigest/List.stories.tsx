import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestList } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestList,
} as ComponentMeta<typeof ArticleDigestList>

const Template: ComponentStory<typeof ArticleDigestList> = (args) => (
  <MockedProvider>
    <ArticleDigestList {...args} />
  </MockedProvider>
)

export const List = Template.bind({})
List.args = {
  article: MOCK_ARTILCE,
}
