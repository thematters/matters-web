import { MockedProvider } from '@apollo/client/testing'
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
  hasPrice: true,
}

export const Simple = Template.bind({})
Simple.args = {
  circle: MOCK_CIRCLE,
  avatarSize: 'xl',
  hasFooter: false,
  hasPrice: false,
  hasOwner: false,
}
