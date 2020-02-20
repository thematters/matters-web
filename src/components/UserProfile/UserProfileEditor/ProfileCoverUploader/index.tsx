import gql from 'graphql-tag'

import { Button, Icon, TextIcon, Translate, useResponsive } from '~/components'
import { useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import Cover from '~/components/UserProfile/Cover'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'

import styles from './styles.css'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import { UpdateUserInfoCover } from './__generated__/UpdateUserInfoCover'

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
  const isMediumUp = useResponsive({ type: 'md-up' })()
  const [update] = useMutation<UpdateUserInfoCover>(UPDATE_USER_INFO)
  const [upload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file?.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="上傳檔案超過 5 MB"
                zh_hans="上传文件超过 5 MB"
              />
            )
          }
        })
      )
      return
    }

    try {
      const { data } = await upload({
        variables: {
          input: { file, type: 'profileCover', entityType: 'user' }
        }
      })
      const id = data?.singleFileUpload.id

      if (update) {
        return update({ variables: { input: { profileCover: id } } })
      }
    } catch (e) {
      // TODO
    }
  }

  const removeCover = async () => {
    if (!update || !user.info.profileCover) {
      return
    }

    try {
      await update({ variables: { input: { profileCover: null } } })
    } catch (e) {
      // TODO
    }
  }

  return (
    <section className="container">
      <Cover cover={user.info.profileCover} />

      <div className="uploader">
        <div className="buttons">
          <Button size={[null, '2rem']} borderColor="white" borderWidth="sm">
            <label htmlFor="upload-input">
              <TextIcon icon={<Icon.Camera color="white" />}>
                {isMediumUp && (
                  <Translate zh_hant="選擇圖片" zh_hans="选择图片" />
                )}
              </TextIcon>

              <input
                id="upload-input"
                className="input"
                type="file"
                name="file"
                accept={acceptTypes}
                multiple={false}
                onChange={event => handleChange(event)}
              />
            </label>
          </Button>

          {user.info.profileCover && (
            <Button
              size={[null, '2rem']}
              spacing={isMediumUp ? [0, 'base'] : [0, 'tight']}
              borderColor="white"
              borderWidth="sm"
              onClick={() => removeCover()}
            >
              <Translate zh_hant="刪除" zh_hans="删除" />
            </Button>
          )}
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default ProfileCoverUploader
