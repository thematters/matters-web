import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { TagDigest } from '~/components'
import { TagDigestFeedProps } from '~/components/TagDigest/Feed'

import { MOCK_TAG_SEARCH_RESULT } from '../../mocks'

export default {
  title: 'Components/TagDigest/Feed',
  component: TagDigest.Feed,
} as Meta

const Template: Story<TagDigestFeedProps> = (args) => (
  <MockedProvider>
    <TagDigest.Feed {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  tag: MOCK_TAG_SEARCH_RESULT as any,
}
