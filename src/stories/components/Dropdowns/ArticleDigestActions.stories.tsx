import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import FooterActions from '~/components/ArticleDigest/Feed/FooterActions'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/Dropdowns/ArticleDigestActions',
  component: FooterActions,
} as ComponentMeta<typeof FooterActions>

const Template: ComponentStory<typeof FooterActions> = (args) => (
  <MockedProvider>
    <FooterActions
      article={MOCK_ARTILCE}
      inUserArticles
      hasExtend
      hasEdit
      hasShare
      hasArchive
      hasBookmark={false}
    />
  </MockedProvider>
)

export const Default = Template.bind({})
