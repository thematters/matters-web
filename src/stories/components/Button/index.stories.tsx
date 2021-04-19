import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Button } from '~/components'

import Buttons from './Buttons'

export default {
  title: 'Components/Button',
  component: Button,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Buttons />
  </MockedProvider>
)

export const All = Template.bind({})
