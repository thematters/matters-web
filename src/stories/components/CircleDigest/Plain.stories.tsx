import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { CircleDigest } from '~/components'

import { MOCK_CIRCLE } from '../../mocks'

export default {
  title: 'Components/CircleDigest',
  component: CircleDigest.Plain,
} as ComponentMeta<typeof CircleDigest.Plain>

const Template: ComponentStory<typeof CircleDigest.Plain> = (args) => (
  <MockedProvider>
    <CircleDigest.Plain {...args} />
  </MockedProvider>
)

export const Plain = Template.bind({})
Plain.args = {
  circle: MOCK_CIRCLE,
}
