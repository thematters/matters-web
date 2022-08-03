import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ShareButton, ShareDialog } from '~/components'

export default {
  title: 'Components/Share',
  component: ShareDialog,
} as ComponentMeta<typeof ShareDialog>

const Template: ComponentStory<typeof ShareDialog> = (args) => (
  <MockedProvider>
    {/* @ts-ignore */}
    <ShareButton iconSize="md-s" inCard={false} {...args} />
  </MockedProvider>
)

export const Dialog = Template.bind({})
