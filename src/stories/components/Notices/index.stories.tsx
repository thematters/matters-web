import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import NoticeList from './NoticeList'
import styles from './styles.module.css'

const meta = {
  title: 'Components/Notice',
  component: NoticeList,
} satisfies Meta<typeof NoticeList>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: (args) => (
    <MockedProvider>
      <div className={styles.container}>
        <NoticeList {...args} />
      </div>
    </MockedProvider>
  ),
}
