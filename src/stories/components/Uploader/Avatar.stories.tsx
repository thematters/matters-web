import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { AvatarUploader } from '~/components'

import { MOCK_CIRCLE, MOCK_USER } from '../../mocks'

export default {
  title: 'Components/Uploader',
  component: AvatarUploader,
} as Meta

const Template: Story = () => (
  <MockedProvider>
    <ul>
      {/* User */}
      <li>
        <AvatarUploader hasBorder onUpload={(assetId) => alert({ assetId })} />
      </li>
      <li>
        <AvatarUploader
          user={MOCK_USER}
          hasBorder
          onUpload={(assetId) => alert({ assetId })}
        />
      </li>

      {/* Circle */}
      <li>
        <AvatarUploader
          type="circle"
          onUpload={(assetId) => alert({ assetId })}
          entityId=""
        />
      </li>
      <li>
        <AvatarUploader
          type="circle"
          circle={MOCK_CIRCLE}
          onUpload={(assetId) => alert({ assetId })}
          entityId=""
        />
      </li>

      <style jsx>{`
        li {
          margin-bottom: var(--spacing-base);
        }
      `}</style>
    </ul>
  </MockedProvider>
)

export const Avatar = Template.bind({})
