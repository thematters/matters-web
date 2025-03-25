import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticleDigestNotice } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/ArticleDigest',
  component: ArticleDigestNotice,
} as ComponentMeta<typeof ArticleDigestNotice>

const Template: ComponentStory<typeof ArticleDigestNotice> = (args) => (
  <MockedProvider>
    <ArticleDigestNotice {...args} />
  </MockedProvider>
)

export const Notice = Template.bind({})
Notice.args = {
  article: MOCK_ARTILCE,
}
