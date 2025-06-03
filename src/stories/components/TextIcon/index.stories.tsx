import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TextIcon } from '~/components'

import TextIcons from './TextIcons'

const meta = {
  title: 'Components/TextIcon',
  component: TextIcon,
} satisfies Meta<typeof TextIcon>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <MockedProvider>
      <TextIcons />
    </MockedProvider>
  ),
}
