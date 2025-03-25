import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Toaster } from '~/components'

import Toasts from './Toasts'

export default {
  title: 'Components/Toast',
  component: Toaster,
} as ComponentMeta<typeof Toaster>

const Template: ComponentStory<typeof Toaster> = () => (
  <MockedProvider>
    <>
      <Toasts />
      <Toaster />
    </>
  </MockedProvider>
)

export const All = Template.bind({})
