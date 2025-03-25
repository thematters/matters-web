import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TextIcon } from '~/components'

import TextIcons from './TextIcons'

export default {
  title: 'Components/TextIcon',
  component: TextIcon,
} as ComponentMeta<typeof TextIcon>

const Template: ComponentStory<typeof TextIcon> = () => (
  <MockedProvider>
    <TextIcons />
  </MockedProvider>
)

export const All = Template.bind({})
