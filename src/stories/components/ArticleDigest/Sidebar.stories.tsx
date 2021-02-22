import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ArticleDigestSidebar } from '~/components'
import { ArticleDigestSidebarProps } from '~/components/ArticleDigest/Sidebar'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestSidebar,
} as Meta

const Template: Story<ArticleDigestSidebarProps> = (args) => (
  <MockedProvider>
    <ArticleDigestSidebar {...args} />
  </MockedProvider>
)

export const Sidebar = Template.bind({})
Sidebar.args = {
  article: MOCK_ARTILCE,
  titleTextSize: 'sm',
  hasCover: true,
  bgActiveColor: 'grey-lighter',
}
