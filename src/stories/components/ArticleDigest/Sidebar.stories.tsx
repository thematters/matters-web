import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ArticleDigestSidebar } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/ArticleDigest',
  component: ArticleDigestSidebar,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ArticleDigestSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Sidebar: Story = {
  args: {
    article: MOCK_ARTILCE,
    titleTextSize: 14,
    hasCover: true,
    bgActiveColor: 'greyLighter',
  },
}
