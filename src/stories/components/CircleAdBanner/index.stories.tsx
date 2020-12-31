import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CircleAdBanner } from '~/components/CircleAdBanner'

export default {
  title: 'Components/CircleAdBanner',
  component: CircleAdBanner,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <CircleAdBanner />
  </MockedProvider>
)

export const Default = Template.bind({})
