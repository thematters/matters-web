import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { CollectionDigestFeed } from '~/components'

import { MOCK_COLLECTION } from '../../mocks'

export default {
  title: 'Components/CollectionDigest',
  component: CollectionDigestFeed,
} as ComponentMeta<typeof CollectionDigestFeed>

const Template: ComponentStory<typeof CollectionDigestFeed> = (args) => (
  <MockedProvider>
    <CollectionDigestFeed {...args} />
  </MockedProvider>
)

export const Feed = Template.bind({})
Feed.args = {
  collection: {
    ...MOCK_COLLECTION,
  },
}
