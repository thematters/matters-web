import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { MomentDigestDetail } from '~/components'

import { MOCK_MOMENT } from '../../mocks'

const meta = {
  title: 'Components/MomentDigest/Detail',
  component: MomentDigestDetail,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof MomentDigestDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    moment: MOCK_MOMENT,
    onClose: () => {},
  },
}

export const WithoutContent: Story = {
  args: {
    moment: {
      ...MOCK_MOMENT,
      content: null,
    },
    onClose: () => {},
  },
}

export const WithoutAssets: Story = {
  args: {
    moment: {
      ...MOCK_MOMENT,
      assets: [],
    },
    onClose: () => {},
  },
}

export const LongContent: Story = {
  args: {
    moment: {
      ...MOCK_MOMENT,
      content: `<p>This is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content</p>`,
    },
    onClose: () => {},
  },
}
