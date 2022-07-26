import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import CircleBanner from '~/views/Home/CircleBanner'

export default {
  title: 'Components/CircleBanner',
  component: CircleBanner,
} as ComponentMeta<typeof CircleBanner>

const Template: ComponentStory<typeof CircleBanner> = () => (
  <MockedProvider>
    <CircleBanner />
  </MockedProvider>
)

export const Default = Template.bind({})
