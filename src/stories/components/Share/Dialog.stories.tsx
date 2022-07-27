import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ShareButton, ShareDialog, ShareDialogProps } from '~/components'

export default {
  title: 'Components/Share',
  component: ShareDialog,
} as Meta

const Template: Story<ShareDialogProps> = (args) => (
  <MockedProvider>
    {/* @ts-ignore */}
    <ShareButton iconSize="md-s" inCard={false} {...args} />
  </MockedProvider>
)

export const Dialog = Template.bind({})
