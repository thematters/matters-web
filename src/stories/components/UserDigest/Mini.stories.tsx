import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { UserDigest } from '~/components'

import { MOCK_USER } from '../../mocks'

const meta = {
  title: 'Components/UserDigest',
  component: UserDigest.Mini,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof UserDigest.Mini>

export default meta
type Story = StoryObj<typeof meta>

export const Mini: Story = {
  args: {
    user: MOCK_USER,
    avatarSize: 16,
    hasAvatar: true,
    hasDisplayName: true,
    hasUserName: true,
  },
}
