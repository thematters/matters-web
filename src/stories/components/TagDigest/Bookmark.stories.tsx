import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

const meta = {
  title: 'Components/TagDigest/Bookmark',
  component: TagDigest.Bookmark,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof TagDigest.Bookmark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tag: MOCK_TAG as any,
  },
}

export const HasFollow: Story = {
  args: {
    tag: {
      ...MOCK_TAG,
      isFollower: true,
    } as any,
  },
}

export const LongTagName: Story = {
  args: {
    tag: {
      ...MOCK_TAG,
      content:
        'LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName LongTagName',
    } as any,
  },
}
