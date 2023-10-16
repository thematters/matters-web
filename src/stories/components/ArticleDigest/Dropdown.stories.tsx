import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestDropdown } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestDropdown,
} as ComponentMeta<typeof ArticleDigestDropdown>

const Template: ComponentStory<typeof ArticleDigestDropdown> = (args) => (
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
  bgActiveColor: 'greyLighter',
}
