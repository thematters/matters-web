import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { CircleDigest } from '~/components'

import { MOCK_CIRCLE } from '../../mocks'

export default {
  title: 'Components/CircleDigest/Rich',
  component: CircleDigest.Rich,
} as ComponentMeta<typeof CircleDigest.Rich>

const Template: ComponentStory<typeof CircleDigest.Rich> = (args) => (
  <MockedProvider>
    <CircleDigest.Rich {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  circle: MOCK_CIRCLE,
  hasFooter: true,
  hasPrice: true,
}

export const Simple = Template.bind({})
Simple.args = {
  circle: MOCK_CIRCLE,
  hasFooter: false,
  hasPrice: false,
  hasOwner: false,
}
