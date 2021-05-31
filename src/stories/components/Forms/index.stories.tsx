import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Form } from '~/components'

import Forms from './Forms'

export default {
  title: 'Components/Forms',
  component: Form,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Forms />
  </MockedProvider>
)

export const All = Template.bind({})
