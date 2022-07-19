import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Button } from '~/components'

import Buttons from './Buttons'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = () => (
  <MockedProvider>
    <Buttons />
  </MockedProvider>
)

export const All = Template.bind({})
