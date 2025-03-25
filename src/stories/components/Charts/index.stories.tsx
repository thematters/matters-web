import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { StackedAreaChart } from '~/components'

import Charts from './Charts'

export default {
  title: 'Components/Charts',
  component: StackedAreaChart,
} as ComponentMeta<typeof StackedAreaChart>

const Template: ComponentStory<typeof StackedAreaChart> = () => (
  <MockedProvider>
    <Charts />
  </MockedProvider>
)

export const All = Template.bind({})
