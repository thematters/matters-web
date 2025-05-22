import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ArticleDigestList } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/ArticleDigest',
  component: ArticleDigestList,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ArticleDigestList>

export default meta
type Story = StoryObj<typeof meta>

export const List: Story = {
  args: {
    article: MOCK_ARTILCE,
  },
}
