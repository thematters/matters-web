import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestArchive } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest/Archive',
  component: ArticleDigestArchive,
} as ComponentMeta<typeof ArticleDigestArchive>

const Template: ComponentStory<typeof ArticleDigestArchive> = (args) => (
  <MockedProvider>
    <ArticleDigestArchive {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  article: { ...MOCK_ARTILCE, articleState: 'archived' as any },
}
