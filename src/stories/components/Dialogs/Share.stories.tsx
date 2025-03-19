import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ShareButton, ShareDialog } from '~/components'

export default {
  title: 'Components/Dialogs/Share',
  component: ShareDialog,
} as ComponentMeta<typeof ShareDialog>

const Template: ComponentStory<typeof ShareDialog> = (args) => (
  <MockedProvider>
    <ShareButton iconSize={20} inCard={false} {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
