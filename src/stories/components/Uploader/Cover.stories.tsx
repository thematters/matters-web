import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'
import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import { CoverUploader } from '~/components'

import styles from './styles.module.css'

export default {
  title: 'Components/Uploader',
  component: CoverUploader,
} as ComponentMeta<typeof CoverUploader>

const Template: ComponentStory<typeof CoverUploader> = () => (
  <MockedProvider>
    <ul className={styles.coverContainer}>
      {/* User & Tag */}
      <li>
        <CoverUploader
          assetType={ASSET_TYPE.profileCover}
          entityType={ENTITY_TYPE.user}
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
          onReset={() => null}
          fallbackCover={IMAGE_COVER.src}
        />
      </li>
      <li>
        <CoverUploader
          assetType={ASSET_TYPE.profileCover}
          entityType={ENTITY_TYPE.user}
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
          onReset={() => null}
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
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
          onReset={() => null}
          fallbackCover={CIRCLE_COVER}
        />
      </li>
      <li>
        <CoverUploader
          type="circle"
          assetType={ASSET_TYPE.circleCover}
          entityType={ENTITY_TYPE.circle}
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
          onReset={() => null}
          fallbackCover={CIRCLE_COVER}
          cover="https://source.unsplash.com/512x512?circle-cover"
        />
      </li>
    </ul>
  </MockedProvider>
)

export const Cover = Template.bind({})
