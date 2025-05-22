import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { MomentAsset, MomentAssetsUploader } from '~/components'

const meta: Meta<typeof MomentAssetsUploader> = {
  title: 'Components/Uploader',
  component: MomentAssetsUploader,
}

export default meta
type Story = StoryObj<typeof MomentAssetsUploader>

export const MomentAssets: Story = {
  render: () => {
    const [assets, setAssets] = useState<MomentAsset[]>([])

    const updateAssets = (assets: MomentAsset[]) => {
      setAssets(assets)
    }

    return (
      <MockedProvider>
        <MomentAssetsUploader assets={assets} updateAssets={updateAssets} />
      </MockedProvider>
    )
  },
}
