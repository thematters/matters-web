import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CircleDigest } from '~/components'
import { CircleDigestMiniProps } from '~/components/CircleDigest/Mini'

import { MOCK_CIRCLE } from '../mocks'

export default {
  title: 'Components/CircleDigest',
  component: CircleDigest.Mini,
} as Meta

const Template: Story<CircleDigestMiniProps> = (args) => (
  <MockedProvider>
    <CircleDigest.Mini {...args} />
  </MockedProvider>
)

export const Mini = Template.bind({})
Mini.args = {
  circle: MOCK_CIRCLE,
}
