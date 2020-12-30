import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CoverUploader, CoverUploaderProps } from '~/components'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { ASSET_TYPE, ENTITY_TYPE } from '@/src/common/enums'

export default {
  title: 'Components/Uploader/Cover',
  component: CoverUploader,
} as Meta

const Template: Story<CoverUploaderProps> = (args) => (
  <MockedProvider>
    <CoverUploader {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  assetType: ASSET_TYPE.profileCover,
  entityType: ENTITY_TYPE.user,
  onUpload: (assetId) => alert({ assetId }),
  fallbackCover: IMAGE_COVER,
}

export const Replace = Template.bind({})
Replace.args = {
  assetType: ASSET_TYPE.profileCover,
  entityType: ENTITY_TYPE.user,
  onUpload: (assetId) => alert({ assetId }),
  cover: 'https://source.unsplash.com/512x512?cover',
}
