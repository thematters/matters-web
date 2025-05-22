import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ShareDialog } from '~/components'

const meta = {
  title: 'Components/Dialogs/Share',
  component: ShareDialog,
  render: (args) => (
    <MockedProvider>
      <ShareDialog {...args}>
        {({ openDialog }) => (
          <button onClick={openDialog}>Open Share Dialog</button>
        )}
      </ShareDialog>
    </MockedProvider>
  ),
} satisfies Meta<typeof ShareDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Example Title',
    path: '/example-path',
    children: ({ openDialog }) => (
      <button onClick={openDialog}>Open Share Dialog</button>
    ),
  },
}
