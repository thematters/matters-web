import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { AvatarUploader } from '~/components'

import { MOCK_CIRCLE, MOCK_USER } from '../../mocks'
import styles from './styles.module.css'

const meta = {
  title: 'Components/Uploader',
  component: AvatarUploader,
} satisfies Meta<typeof AvatarUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Avatar: Partial<Story> = {
  render: () => (
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
  ),
}
