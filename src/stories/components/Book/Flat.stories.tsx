import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Book } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/Book/Flat',
  component: Book.Flat,
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof Book.Flat>

export default meta
type Story = StoryObj<typeof meta>

export const Collection: Story = {
  args: {
    title: MOCK_ARTILCE.title,
    type: 'collection',
  },
}

export const CollectionTitleMd: Story = {
  args: {
    title: 'Qui amet anim',
    type: 'collection',
  },
}

export const CollectionTitleShort: Story = {
  args: {
    title: 'Short',
    type: 'collection',
  },
}

export const Article: Story = {
  args: {
    title: MOCK_ARTILCE.title,
    type: 'article',
  },
}

export const ArticleTitleMd: Story = {
  args: {
    title: 'Qui amet anim',
    type: 'article',
  },
}

export const ArticleTitleShort: Story = {
  args: {
    title: 'Short',
    type: 'article',
  },
}
