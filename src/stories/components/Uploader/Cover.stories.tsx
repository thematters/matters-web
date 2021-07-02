import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CoverUploader } from '~/components'

import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'

import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'
import IMAGE_COVER from '@/public/static/images/profile-cover.png'

export default {
  title: 'Components/Uploader',
  component: CoverUploader,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <ul>
      {/* User & Tag */}
      <li>
        <CoverUploader
          assetType={ASSET_TYPE.profileCover}
          entityType={ENTITY_TYPE.user}
          onUpload={(assetId) => alert({ assetId })}
          fallbackCover={IMAGE_COVER.src}
        />
      </li>
      <li>
        <CoverUploader
          assetType={ASSET_TYPE.profileCover}
          entityType={ENTITY_TYPE.user}
          onUpload={(assetId) => alert({ assetId })}
          fallbackCover={IMAGE_COVER.src}
          cover="https://source.unsplash.com/512x512?cover"
        />
      </li>

      {/* Circle */}
      <li>
        <CoverUploader
          type="circle"
          assetType={ASSET_TYPE.circleCover}
          entityType={ENTITY_TYPE.circle}
          onUpload={(assetId) => alert({ assetId })}
          fallbackCover={CIRCLE_COVER}
        />
      </li>
      <li>
        <CoverUploader
          type="circle"
          assetType={ASSET_TYPE.circleCover}
          entityType={ENTITY_TYPE.circle}
          onUpload={(assetId) => alert({ assetId })}
          fallbackCover={CIRCLE_COVER}
          cover="https://source.unsplash.com/512x512?circle-cover"
        />
      </li>

      <style jsx>{`
        li {
          margin: 0 -1rem;
          margin-bottom: var(--spacing-base);
        }
      `}</style>
    </ul>
  </MockedProvider>
)

export const Cover = Template.bind({})
