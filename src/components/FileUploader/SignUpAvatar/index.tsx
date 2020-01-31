import { useState } from 'react'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import { useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'

import styles from './styles.css'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'

/**
 * This component is for uploading avatar during sign up process.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpAvatarUploader
 *     field=""
 *     lang={lang}
 *     uploadCallback={callback}
 *   />
 * ```
 */

interface Props {
  field: string
  lang: Language
  uploadCallback: (
    field: any,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
}

export const SignUpAvatarUploader: React.FC<Props> = ({
  field,
  lang,
  uploadCallback
}) => {
  const [upload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const [avatar, setAvatar] = useState<string>()
  const [error, setError] = useState<'size'>()

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
        variables: { input: { file, type: 'avatar', entityType: 'user' } }
      })
      const id = data?.singleFileUpload.id
      const path = data?.singleFileUpload.path

      setAvatar(path)
      setError(undefined)

      if (uploadCallback) {
        uploadCallback(field, id)
      }
    } catch (e) {
      // TODO
    }
  }

  return (
    <section className="container">
      <div className="avatar">
        <Avatar size="xxl" src={avatar} />
      </div>
      <div className="upload">
        <div className="wrapper">
          <Translate zh_hant="選擇圖片" zh_hans="选择图片" />

          <input
            className="input"
            type="file"
            name="file"
            accept={acceptTypes}
            multiple={false}
            onChange={event => handleChange(event)}
          />
        </div>
        <div className="hint">
          <Translate
            zh_hant="上傳圖片作為大頭照 (5 MB 內)"
            zh_hans="上传图片作为头像 (5 MB 內)"
          />
        </div>
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
