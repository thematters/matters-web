import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Form } from '~/components'

import Forms from './Forms'

const meta = {
  title: 'Components/Forms',
  component: Form,
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <MockedProvider>
      <Forms />
    </MockedProvider>
  ),
}
