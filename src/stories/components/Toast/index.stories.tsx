import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Toaster } from '~/components'

import Toasts from './Toasts'

const meta = {
  title: 'Components/Toast',
  component: Toaster,
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <MockedProvider>
      <>
        <Toasts />
        <Toaster />
      </>
    </MockedProvider>
  ),
}
