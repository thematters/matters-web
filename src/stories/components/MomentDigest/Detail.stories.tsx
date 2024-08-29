import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { MomentDigestDetail } from '~/components'

import { MOCK_MOMENT } from '../../mocks'

export default {
  title: 'Components/MomentDigest/Detail',
  component: MomentDigestDetail,
} as ComponentMeta<typeof MomentDigestDetail>

const Template: ComponentStory<typeof MomentDigestDetail> = (args) => (
  <MockedProvider>
    <MomentDigestDetail {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  moment: MOCK_MOMENT,
}

export const WithoutContent = Template.bind({})
WithoutContent.args = {
  moment: {
    ...MOCK_MOMENT,
    content: null,
  },
}

export const WithoutAssets = Template.bind({})
WithoutAssets.args = {
  moment: {
    ...MOCK_MOMENT,
    assets: [],
  },
}

export const LongContent = Template.bind({})
LongContent.args = {
  moment: {
    ...MOCK_MOMENT,
    content: `<p>This is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content\nThis is a content</p>`,
  },
}
