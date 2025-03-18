import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { CircleDigest } from '~/components'

import { MOCK_CIRCLE } from '../../mocks'

export default {
  title: 'Components/CircleDigest',
  component: CircleDigest.Mini,
} as ComponentMeta<typeof CircleDigest.Mini>

const Template: ComponentStory<typeof CircleDigest.Mini> = (args) => (
  <MockedProvider>
    <CircleDigest.Mini {...args} />
  </MockedProvider>
)

export const Mini = Template.bind({})
Mini.args = {
  circle: MOCK_CIRCLE,
}
