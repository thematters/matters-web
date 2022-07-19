import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG_SEARCH_RESULT } from '../../mocks'

export default {
  title: 'Components/TagDigest/Sidebar',
  component: TagDigest.Sidebar,
} as ComponentMeta<typeof TagDigest.Sidebar>

const Template: ComponentStory<typeof TagDigest.Sidebar> = (args) => (
  <MockedProvider>
    <TagDigest.Sidebar {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  tag: MOCK_TAG_SEARCH_RESULT as any,
}
