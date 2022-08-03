import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import SplashScreen from '~/components/SplashScreen'

export default {
  title: 'Components/SplashScreen',
  component: SplashScreen,
} as ComponentMeta<typeof SplashScreen>

const Template: ComponentStory<typeof SplashScreen> = () => (
  <MockedProvider>
    <SplashScreen />
  </MockedProvider>
)

export const Default = Template.bind({})
