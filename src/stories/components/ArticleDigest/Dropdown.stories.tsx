import { MockedProvider } from '@apollo/client/testing'
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
  titleTextSize: 14,
  spacing: [16, 16],
  bgColor: 'none',
  bgActiveColor: 'greyLighter',
}
