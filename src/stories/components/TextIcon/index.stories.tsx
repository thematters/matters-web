import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { TextIcon } from '~/components'

import TextIcons from './TextIcons'

export default {
  title: 'Components/TextIcon',
  component: TextIcon,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <TextIcons />
  </MockedProvider>
)

export const All = Template.bind({})
