import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { CollectionDigestFeed } from '~/components'

import { MOCK_COLLECTION } from '../../mocks'

const meta = {
  title: 'Components/CollectionDigest',
  component: CollectionDigestFeed,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof CollectionDigestFeed>

export default meta
type Story = StoryObj<typeof meta>

export const Feed: Story = {
  args: {
    collection: {
      ...MOCK_COLLECTION,
    },
  },
}
