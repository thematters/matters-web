import gql from 'graphql-tag'
import { useState } from 'react'
import { useMutation } from 'react-apollo'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import Cover from '~/components/UserProfile/Cover'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'
import ICON_CAMERA from '~/static/icons/camera-white.svg?sprite'

import { UpdateUserInfoCover } from './__generated__/UpdateUserInfoCover'
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

export const ProfileCoverUploader: React.FC<Props> = ({ user }) => {
  const [update] = useMutation<UpdateUserInfoCover>(UPDATE_USER_INFO)
  const [upload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const [error, setError] = useState<'size' | undefined>(undefined)
  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      .then(({ data }) => {
        const id = data && data.singleFileUpload.id

        if (update) {
          return update({ variables: { input: { profileCover: id } } })
        }
      })
      .then(result => {
        setError(undefined)
      })
      .catch(result => {
        // TODO: error handler
      })
  }

  const removeCover = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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

  return (
    <section className="container">
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
                onChange={event => handleChange(event)}
              />
            </label>
          </button>
          {user.info.profileCover && (
            <button
              type="button"
              className="button remove"
              onClick={event => removeCover(event)}
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default ProfileCoverUploader
