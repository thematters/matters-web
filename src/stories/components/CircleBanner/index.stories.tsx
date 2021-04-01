import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import CircleBanner from '~/views/Home/CircleBanner'

export default {
  title: 'Components/CircleBanner',
  component: CircleBanner,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <CircleBanner />
  </MockedProvider>
)

export const Default = Template.bind({})
