import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

const meta = {
  title: 'Components/TagDigest/Feed',
  component: TagDigest.Feed,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof TagDigest.Feed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tag: MOCK_TAG,
  },
}

export const LongName: Story = {
  args: {
    tag: {
      ...MOCK_TAG,
      content:
        'Matters.Town 是立足去中心化生態建立的，一個代碼開源、創作者自治的寫作社區。',
    },
  },
}
