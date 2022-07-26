import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import NoticeList from './NoticeList'

export default {
  title: 'Components/Notice',
  component: NoticeList,
} as ComponentMeta<typeof NoticeList>

const Template: ComponentStory<typeof NoticeList> = (args) => (
  <MockedProvider>
    <div>
      <NoticeList {...(args as any)} />

      <style jsx>{`
        div {
          margin: 0 -1rem;
          margin-bottom: var(--spacing-base);
        }
      `}</style>
    </div>
  </MockedProvider>
)

export const All = Template.bind({})
