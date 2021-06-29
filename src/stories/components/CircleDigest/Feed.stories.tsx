import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CircleDigest } from '~/components'
import { CircleDigestFeedProps } from '~/components/CircleDigest/Feed'

import { MOCK_CIRCLE } from '../../mocks'

export default {
  title: 'Components/CircleDigest',
  component: CircleDigest.Feed,
} as Meta

const Template: Story<CircleDigestFeedProps> = (args) => (
  <MockedProvider>
    <CircleDigest.Feed {...args} />
  </MockedProvider>
)

export const Feed = Template.bind({})
Feed.args = {
  circle: MOCK_CIRCLE,
}
