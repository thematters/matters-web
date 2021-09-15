import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CircleDigest } from '~/components'
import { CircleDigestRichProps } from '~/components/CircleDigest/Rich'

import { MOCK_CIRCLE } from '../../mocks'

export default {
  title: 'Components/CircleDigest/Rich',
  component: CircleDigest.Rich,
} as Meta

const Template: Story<CircleDigestRichProps> = (args) => (
  <MockedProvider>
    <CircleDigest.Rich {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  circle: MOCK_CIRCLE,
  hasFooter: true,
  hasSubscribe: true,
}

export const Simple = Template.bind({})
Simple.args = {
  circle: MOCK_CIRCLE,
  hasFooter: false,
  hasSubscribe: false,
}
