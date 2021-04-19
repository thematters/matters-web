import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Toast } from '~/components'

import Toasts from './Toasts'

export default {
  title: 'Components/Toast',
  component: Toast.Instance,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Toasts />
  </MockedProvider>
)

export const All = Template.bind({})
