import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Book } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/Book/Collection',
  component: Book.Collection,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof Book.Collection>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {
  args: {
    title: MOCK_ARTILCE.title,
  },
}

export const TitleMdOnly: Story = {
  args: {
    title: 'Qui amet anim',
  },
}

export const TitleLgOnly: Story = {
  args: {
    title: 'Short',
  },
}

export const Cover: Story = {
  args: {
    title: MOCK_ARTILCE.title,
    cover: MOCK_ARTILCE.cover,
  },
}
