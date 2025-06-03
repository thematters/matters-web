import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { CircleDigest } from '~/components'

import { MOCK_CIRCLE } from '../../mocks'

const meta = {
  title: 'Components/CircleDigest',
  component: CircleDigest.Mini,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof CircleDigest.Mini>

export default meta
type Story = StoryObj<typeof meta>

export const Mini: Story = {
  args: {
    circle: MOCK_CIRCLE,
  },
}
