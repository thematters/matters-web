import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Book } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/Book/Article',
  component: Book.Article,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof Book.Article>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {
  args: {
    title: MOCK_ARTILCE.title,
  },
}

export const TitleMdOnly: Story = {
  args: {
    title: 'Qui amet anima',
  },
}

export const TitleShortOnly: Story = {
  args: {
    title: 'Short',
  },
}

export const TitleAndCover: Story = {
  args: {
    title: MOCK_ARTILCE.title,
    cover: MOCK_ARTILCE.cover,
  },
}

export const TitleMdAndCover: Story = {
  args: {
    title: 'Qui amet anima',
    cover: MOCK_ARTILCE.cover,
  },
}

export const TitleShortAndCover: Story = {
  args: {
    title: 'Short',
    cover: MOCK_ARTILCE.cover,
  },
}

export const TitleAndDescription: Story = {
  args: {
    title: MOCK_ARTILCE.title,
    description: MOCK_ARTILCE.summary,
  },
}

export const TitleMdAndDescription: Story = {
  args: {
    title: 'Qui amet anima',
    description: MOCK_ARTILCE.summary,
  },
}

export const TitleShortAndDescription: Story = {
  args: {
    title: 'Short',
    description: MOCK_ARTILCE.summary,
  },
}
