import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ArticleState } from '~/gql/graphql'
import { ArticleDigestArchived } from '~/views/Me/Works/Archived/ArticleDigestArchived'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/ArticleDigest/Archive',
  component: ArticleDigestArchived,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ArticleDigestArchived>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    article: { ...MOCK_ARTILCE, articleState: ArticleState.Archived },
  },
}
