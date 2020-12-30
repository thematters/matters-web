import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { AvatarUploader, AvatarUploaderProps } from '~/components'

import { MOCK_USER } from '../../mocks'

export default {
  title: 'Components/Uploader/Avatar',
  component: AvatarUploader,
} as Meta

const Template: Story<AvatarUploaderProps> = (args) => (
  <MockedProvider>
    <AvatarUploader {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  hasBorder: true,
  onUpload: (assetId) => alert({ assetId }),
}

export const Replace = Template.bind({})
Replace.args = {
  user: MOCK_USER,
  hasBorder: true,
  onUpload: (assetId) => alert({ assetId }),
}
