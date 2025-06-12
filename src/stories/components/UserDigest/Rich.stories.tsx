import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { UserDigest } from '~/components'

import { MOCK_USER } from '../../mocks'

const meta = {
  title: 'Components/UserDigest',
  component: UserDigest.Rich,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof UserDigest.Rich>

export default meta
type Story = StoryObj<typeof meta>

export const Rich: Story = {
  args: {
    user: MOCK_USER,
    size: 'sm',
    spacing: [0, 0],
    bgColor: 'none',
  },
}
