import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ArticleDigestCard } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/ArticleDigest',
  component: ArticleDigestCard,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ArticleDigestCard>

export default meta
type Story = StoryObj<typeof meta>

export const Card: Story = {
  args: {
    article: MOCK_ARTILCE,
  },
}
