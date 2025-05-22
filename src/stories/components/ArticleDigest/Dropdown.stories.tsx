import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ArticleDigestDropdown } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/ArticleDigest',
  component: ArticleDigestDropdown,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ArticleDigestDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Dropdown: Story = {
  args: {
    article: MOCK_ARTILCE,
    titleTextSize: 14,
    spacing: [16, 16],
    bgColor: 'none',
    bgActiveColor: 'greyLighter',
  },
}
