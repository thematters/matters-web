import gql from 'graphql-tag'
import { FC, useState } from 'react'

import { Mutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import Cover from '~/components/UserProfile/Cover'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'
import ICON_CAMERA from '~/static/icons/camera-white.svg?sprite'

import styles from './styles.css'

/**
 * This component is for uploading profile cover.
 *
 * Usage:
 *
 * ```jsx
 *   <ProfileCoverUploader user={user} />
 * ```
 */

interface Props {
  user: any
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoCover($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      info {
        profileCover
      }
    }
  }
`

export const ProfileCoverUploader: FC<Props> = ({ user }) => {
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
        input: { file, type: 'profileCover', entityType: 'user' }
      }
    })
      .then(({ data }: any) => {
        const {
          singleFileUpload: { id }
        } = data

        if (update) {
          return update({ variables: { input: { profileCover: id } } })
        }
      })
      .then((result: any) => {
        setError(undefined)
      })
      .catch((result: any) => {
        // TODO: error handler
      })
  }

  const removeCover = (event: any, update: any) => {
    event.stopPropagation()

    if (!update || !user.info.profileCover) {
      return
    }

    update({ variables: { input: { profileCover: null } } })
      .then((result: any) => {
        setError(undefined)
      })
      .catch((result: any) => {
        // TODO: error handler
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
      <div className="container">
        <Cover cover={user.info.profileCover} />
        <div className="uploader">
          <div className="buttons">
            <button type="button" className="button">
              <label>
                <Icon id={ICON_CAMERA.id} viewBox={ICON_CAMERA.viewBox} />
                <span className="upload">
                  <Translate zh_hant="選擇圖片" zh_hans="选择图片" />
                </span>
                <input
                  className="input"
                  type="file"
                  name="file"
                  accept={acceptTypes}
                  multiple={false}
                  onChange={(event: any) => handleChange(event, upload, update)}
                />
              </label>
            </button>
            {user.info.profileCover && (
              <button
                type="button"
                className="button remove"
                onClick={(event: any) => removeCover(event, update)}
              >
                <Translate zh_hant="刪除" zh_hans="删除" />
              </button>
            )}
            <div className="error">
              {error === 'size' && (
                <Translate
                  zh_hant="上傳檔案超過 5 MB"
                  zh_hans="上传文件超过 5 MB"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <Mutation mutation={UPDATE_USER_INFO}>
      {(update: any) => (
        <Mutation mutation={UPLOAD_FILE}>
          {(upload: any) => <Uploader upload={upload} update={update} />}
        </Mutation>
      )}
    </Mutation>
  )
}

export default ProfileCoverUploader
