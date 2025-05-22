import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

const meta = {
  title: 'Components/TagDigest/Concise',
  component: TagDigest.Concise,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof TagDigest.Concise>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tag: MOCK_TAG as any,
    showArticlesNum: true,
  },
}
