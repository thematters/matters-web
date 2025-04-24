import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'

import { MomentAsset, MomentAssetsUploader } from '~/components'

export default {
  title: 'Components/Uploader',
  component: MomentAssetsUploader,
} as ComponentMeta<typeof MomentAssetsUploader>

const Template: ComponentStory<typeof MomentAssetsUploader> = () => {
  const [assets, setAssets] = useState<MomentAsset[]>([])

  const updateAssets = (assets: MomentAsset[]) => {
    setAssets(assets)
  }

  return (
    <MockedProvider>
      <MomentAssetsUploader assets={assets} updateAssets={updateAssets} />
    </MockedProvider>
  )
}

export const MomentAssets = Template.bind({})
