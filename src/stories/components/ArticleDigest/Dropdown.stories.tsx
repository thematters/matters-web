import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ArticleDigestDropdown } from '~/components'
import { ArticleDigestDropdownProps } from '~/components/ArticleDigest/Dropdown'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestDropdown,
} as Meta

const Template: Story<ArticleDigestDropdownProps> = (args) => (
  <MockedProvider>
    <ArticleDigestDropdown {...args} />
  </MockedProvider>
)

export const Dropdown = Template.bind({})
Dropdown.args = {
  article: MOCK_ARTILCE,
  titleTextSize: 'sm',
  spacing: ['base', 'base'],
  bgColor: 'none',
  bgActiveColor: 'grey-lighter',
}
