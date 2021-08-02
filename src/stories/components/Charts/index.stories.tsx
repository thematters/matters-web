import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { AreaChart } from '~/components'

import Charts from './Charts'

export default {
  title: 'Components/Charts',
  component: AreaChart,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <Charts />
  </MockedProvider>
)

export const All = Template.bind({})
