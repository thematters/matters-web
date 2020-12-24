import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CircleDigest } from '~/components'
import { CircleDigestRichProps } from '~/components/CircleDigest/Rich'

import { MOCK_CIRCLE } from '../mocks'

export default {
  title: 'Components/CircleDigest',
  component: CircleDigest.Rich,
} as Meta

const Template: Story<CircleDigestRichProps> = (args) => (
  <MockedProvider>
    <CircleDigest.Rich {...args} />
  </MockedProvider>
)

export const Rich = Template.bind({})
Rich.args = {
  circle: MOCK_CIRCLE,
  hasFooter: true,
  hasPrice: true,
}
