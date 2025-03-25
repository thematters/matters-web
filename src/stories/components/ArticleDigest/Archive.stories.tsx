import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestArchived } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest/Archive',
  component: ArticleDigestArchived,
} as ComponentMeta<typeof ArticleDigestArchived>

const Template: ComponentStory<typeof ArticleDigestArchived> = (args) => (
  <MockedProvider>
    <ArticleDigestArchived {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  article: { ...MOCK_ARTILCE, articleState: 'archived' as any },
}
