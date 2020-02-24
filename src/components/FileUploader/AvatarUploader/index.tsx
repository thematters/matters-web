import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import { useState } from 'react'

import { Avatar, AvatarProps, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { Icon } from '~/components/Icon'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'

import styles from './styles.css'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'

export type AvatarUploaderProps = {
  onUpload: (assetId: string) => void
  hasBorder?: boolean
} & AvatarProps

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  onUpload,
  hasBorder,
  ...avatarProps
}) => {
  const [upload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const [avatar, setAvatar] = useState<string>()

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
        variables: { input: { file, type: 'avatar', entityType: 'user' } }
      })
      const id = data?.singleFileUpload.id
      const path = data?.singleFileUpload.path

      if (id && path) {
        setAvatar(path)
        onUpload(id)
      } else {
        throw new Error()
      }
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="uploadImageFailed" />
          }
        })
      )
    }
  }

  const labelClass = classNames({
    'has-border': hasBorder
  })

  return (
    <label className={labelClass} htmlFor="avatar-input">
      <Avatar size="xxl" {...avatarProps} src={avatarProps.src || avatar} />

      <div className="mask">
        <Icon.CameraMedium size="lg" color="white" />
      </div>

      <VisuallyHidden>
        <input
          id="avatar-input"
          type="file"
          name="file"
          aria-label="上傳頭像"
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
        />
      </VisuallyHidden>

      <style jsx>{styles}</style>
    </label>
  )
}
