import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

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
  tag: MOCK_TAG as any,
}
