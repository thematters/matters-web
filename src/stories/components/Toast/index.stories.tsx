import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Toast } from '~/components'

import Toasts from './Toasts'

export default {
  title: 'Components/Toast',
  component: Toast.Instance,
} as ComponentMeta<typeof Toast.Instance>

const Template: ComponentStory<typeof Toast.Instance> = () => (
  <MockedProvider>
    <Toasts />
  </MockedProvider>
)

export const All = Template.bind({})
