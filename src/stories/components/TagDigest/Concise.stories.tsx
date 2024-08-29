import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TagDigest } from '~/components'

import { MOCK_TAG } from '../../mocks'

export default {
  title: 'Components/TagDigest/Concise',
  component: TagDigest.Concise,
} as ComponentMeta<typeof TagDigest.Concise>

const Template: ComponentStory<typeof TagDigest.Concise> = (args) => (
  <MockedProvider>
    <TagDigest.Concise {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  tag: MOCK_TAG as any,
  showArticlesNum: true,
}
