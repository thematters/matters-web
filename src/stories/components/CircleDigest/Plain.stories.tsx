import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CircleDigest } from '~/components'
import { CircleDigestPlainProps } from '~/components/CircleDigest/Plain'

import { MOCK_CIRCLE } from '../../mocks'

export default {
  title: 'Components/CircleDigest',
  component: CircleDigest.Plain,
} as Meta

const Template: Story<CircleDigestPlainProps> = (args) => (
  <MockedProvider>
    <CircleDigest.Plain {...args} />
  </MockedProvider>
)

export const Plain = Template.bind({})
Plain.args = {
  circle: MOCK_CIRCLE,
}
