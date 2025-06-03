import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Wall from '~/views/ArticleDetail/Wall/Visitor'

const meta = {
  title: 'Components/Wall',
  component: Wall,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof Wall>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    show: true,
  },
}
