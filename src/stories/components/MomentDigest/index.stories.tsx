import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { MomentDigest } from '~/components'

import { MOCK_MOMENT } from '../../mocks'

export default {
  title: 'Components/MomentDigest',
  component: MomentDigest,
} as ComponentMeta<typeof MomentDigest>

const Template: ComponentStory<typeof MomentDigest> = (args) => (
  <MockedProvider>
    <MomentDigest {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  moment: MOCK_MOMENT,
}
