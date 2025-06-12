import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { CircleDigest } from '~/components'

import { MOCK_CIRCLE } from '../../mocks'

const meta = {
  title: 'Components/CircleDigest',
  component: CircleDigest.Plain,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof CircleDigest.Plain>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {
  args: {
    circle: MOCK_CIRCLE,
  },
}
