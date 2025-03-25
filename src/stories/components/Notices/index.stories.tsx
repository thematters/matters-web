import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import NoticeList from './NoticeList'
import styles from './styles.module.css'

export default {
  title: 'Components/Notice',
  component: NoticeList,
} as ComponentMeta<typeof NoticeList>

const Template: ComponentStory<typeof NoticeList> = (args) => (
  <MockedProvider>
    <div className={styles.container}>
      <NoticeList {...(args as any)} />
    </div>
  </MockedProvider>
)

export const All = Template.bind({})
