import gql from 'graphql-tag'
import { useState } from 'react'

import { Icon, Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import { useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'

import styles from './styles.css'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import { UpdateUserInfoAvatar } from './__generated__/UpdateUserInfoAvatar'

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
  mutation UpdateUserInfoAvatar($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      avatar
    }
  }
`

export const ProfileAvatarUploader: React.FC<Props> = ({ user }) => {
  const [update] = useMutation<UpdateUserInfoAvatar>(UPDATE_USER_INFO)
  const [upload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const [error, setError] = useState<'size' | undefined>(undefined)
  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file?.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      setError('size')
      return
    }

    try {
      const { data } = await upload({
        variables: {
          input: { file, type: 'avatar', entityType: 'user' }
        }
      })
      const id = data?.singleFileUpload.id

      if (update) {
        return update({ variables: { input: { avatar: id } } })
      }
      setError(undefined)
    } catch (e) {
      // TODO
    }
  }

  return (
    <section className="container">
      <Avatar size="xxl" user={user} />

      <div className="uploader">
        <div className="button">
          <Icon.Camera size="md" />
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
          onChange={event => handleChange(event)}
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default ProfileAvatarUploader
