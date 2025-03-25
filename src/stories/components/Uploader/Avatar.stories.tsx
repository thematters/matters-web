import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { AvatarUploader } from '~/components'

import { MOCK_CIRCLE, MOCK_USER } from '../../mocks'
import styles from './styles.module.css'

export default {
  title: 'Components/Uploader',
  component: AvatarUploader,
} as ComponentMeta<typeof AvatarUploader>

const Template: ComponentStory<typeof AvatarUploader> = () => (
  <MockedProvider>
    <ul className={styles.avatarContainer}>
      {/* User */}
      <li>
        <AvatarUploader
          hasBorder
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
        />
      </li>
      <li>
        <AvatarUploader
          user={MOCK_USER}
          hasBorder
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
        />
      </li>

      {/* Circle */}
      <li>
        <AvatarUploader
          type="circle"
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
          entityId=""
        />
      </li>
      <li>
        <AvatarUploader
          type="circle"
          circle={MOCK_CIRCLE}
          onUploaded={(assetId) => alert({ assetId })}
          onUploadStart={() => null}
          onUploadEnd={() => null}
          entityId=""
        />
      </li>
    </ul>
  </MockedProvider>
)

export const Avatar = Template.bind({})
