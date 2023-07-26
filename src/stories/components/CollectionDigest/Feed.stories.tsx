import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { CollectionDigest } from '~/components'

import { MOCK_COLLECTION } from '../../mocks'

export default {
  title: 'Components/CollectionDigest',
  component: CollectionDigest.Feed,
} as ComponentMeta<typeof CollectionDigest.Feed>

const Template: ComponentStory<typeof CollectionDigest.Feed> = (args) => (
  <MockedProvider>
    <CollectionDigest.Feed {...args} />
  </MockedProvider>
)

export const Feed = Template.bind({})
Feed.args = {
  collection: {
    ...MOCK_COLLECTION,
  },
}
