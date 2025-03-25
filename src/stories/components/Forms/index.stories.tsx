import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Form } from '~/components'

import Forms from './Forms'

export default {
  title: 'Components/Forms',
  component: Form,
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = () => (
  <MockedProvider>
    <Forms />
  </MockedProvider>
)

export const All = Template.bind({})
