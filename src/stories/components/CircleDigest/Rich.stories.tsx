import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { CircleDigest } from '~/components'

import { MOCK_CIRCLE } from '../../mocks'

const meta = {
  title: 'Components/CircleDigest/Rich',
  component: CircleDigest.Rich,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof CircleDigest.Rich>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    circle: MOCK_CIRCLE,
    hasFooter: true,
    hasPrice: true,
  },
}

export const Simple: Story = {
  args: {
    circle: MOCK_CIRCLE,
    hasFooter: false,
    hasPrice: false,
    hasOwner: false,
  },
}
