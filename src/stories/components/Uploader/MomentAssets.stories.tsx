import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { MomentAssetsUploader } from '~/components'

export default {
  title: 'Components/Uploader',
  component: MomentAssetsUploader,
} as ComponentMeta<typeof MomentAssetsUploader>

const Template: ComponentStory<typeof MomentAssetsUploader> = () => (
  <MockedProvider>
    <MomentAssetsUploader />
  </MockedProvider>
)

export const MomentAssets = Template.bind({})
