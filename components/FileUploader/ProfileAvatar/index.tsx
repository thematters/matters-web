import gql from 'graphql-tag'
import { FC, useState } from 'react'

import { Avatar } from '~/components/Avatar'
import { Mutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'
import ICON_CAMERA from '~/static/icons/camera-white.svg?sprite'

import styles from './styles.css'

/**
 * This component is for uploading avatar in profile editor.
 *
 * Usage:
 *
 * ```jsx
 *   <ProfileAvatarUploader user={user} />
 * ```
 */

interface Props {
  user?: any
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      avatar
    }
  }
`

export const ProfileAvatarUploader: FC<Props> = ({ user }) => {
  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')

  const [error, setError] = useState<'size' | undefined>(undefined)

  const handleChange = (event: any, upload: any, update: any) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file && file.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      setError('size')
      return
    }

    upload({
      variables: {
        input: { file, type: 'avatar', entityType: 'user' }
      }
    })
      .then(({ data }: any) => {
        const {
          singleFileUpload: { id }
        } = data

        if (update) {
          return update({ variables: { input: { avatar: id } } })
        }
      })
      .then((result: any) => {
        setError(undefined)
      })
      .catch((result: any) => {
        // TODO: Handler error
      })
  }

  const Uploader = ({
    upload,
    update
  }: {
    upload: () => {}
    update: () => {}
  }) => (
    <>
      <section className="container">
        <Avatar size="xlarge" user={user} />
        <div className="uploader">
          <div className="button">
            <Icon id={ICON_CAMERA.id} viewBox={ICON_CAMERA.viewBox} />
            <span className="hint">
              <Translate zh_hant="選擇圖片" zh_hans="选择图片" />
            </span>
          </div>
          <input
            className="input"
            type="file"
            name="file"
            accept={acceptTypes}
            multiple={false}
            onChange={(event: any) => handleChange(event, upload, update)}
          />
          <div className="error">
            {error === 'size' && (
              <Translate
                zh_hant="上傳檔案超過 5 MB"
                zh_hans="上传文件超过 5 MB"
              />
            )}
          </div>
        </div>
      </section>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <Mutation mutation={UPDATE_USER_INFO}>
      {update => (
        <Mutation mutation={UPLOAD_FILE}>
          {upload => <Uploader upload={upload} update={update} />}
        </Mutation>
      )}
    </Mutation>
  )
}

export default ProfileAvatarUploader
