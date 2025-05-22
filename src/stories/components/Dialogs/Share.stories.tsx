import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ShareDialog } from '~/components'

export default {
  title: 'Components/Dialogs/Share',
  component: ShareDialog,
} as ComponentMeta<typeof ShareDialog>

const Template: ComponentStory<typeof ShareDialog> = (args) => (
  <MockedProvider>
    <ShareDialog {...args}>
      {({ openDialog }) => (
        <button onClick={openDialog}>Open Share Dialog</button>
      )}
    </ShareDialog>
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Example Title',
  path: '/example-path',
}
