import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import SplashScreen from '~/components/SplashScreen'

export default {
  title: 'Components/SplashScreen',
  component: SplashScreen,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <SplashScreen />
  </MockedProvider>
)

export const Default = Template.bind({})
