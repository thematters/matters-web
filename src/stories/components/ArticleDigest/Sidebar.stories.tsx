import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestSidebar } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestSidebar,
} as ComponentMeta<typeof ArticleDigestSidebar>

const Template: ComponentStory<typeof ArticleDigestSidebar> = (args) => (
  <MockedProvider>
    <ArticleDigestSidebar {...args} />
  </MockedProvider>
)

export const Sidebar = Template.bind({})
Sidebar.args = {
  article: MOCK_ARTILCE,
  titleTextSize: 14,
  hasCover: true,
  bgActiveColor: 'greyLighter',
}
