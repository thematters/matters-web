import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ArticleDigestNotice } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/ArticleDigest',
  component: ArticleDigestNotice,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ArticleDigestNotice>

export default meta
type Story = StoryObj<typeof meta>

export const Notice: Story = {
  args: {
    article: MOCK_ARTILCE,
  },
}
