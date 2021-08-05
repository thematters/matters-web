import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { StackedAreaChart } from '~/components'

import Charts from './Charts'

export default {
  title: 'Components/Charts',
  component: StackedAreaChart,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Charts />
  </MockedProvider>
)

export const All = Template.bind({})
