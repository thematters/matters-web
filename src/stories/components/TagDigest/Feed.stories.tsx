import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

export default {
  title: 'Components/TagDigest/Feed',
  component: TagDigest.Feed,
} as ComponentMeta<typeof TagDigest.Feed>

const Template: ComponentStory<typeof TagDigest.Feed> = (args) => (
  <MockedProvider>
    <TagDigest.Feed {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  tag: MOCK_TAG as any,
}
