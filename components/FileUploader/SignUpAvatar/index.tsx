import { FC, useState } from 'react'

import { Avatar } from '~/components/Avatar'
import { Mutation } from '~/components/GQL'
import MUTATION_UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { Icon } from '~/components/Icon'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'
import { translate } from '~/common/utils'
import ICON_CAMERA from '~/static/icons/camera-green.svg?sprite'

import styles from './styles.css'

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
  uploadCallback: (field: string, value: any, validate?: boolean) => {}
}

export const SignUpAvatarUploader: FC<Props> = ({
  field,
  lang,
  uploadCallback
}) => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  const [error, setError] = useState<'size' | undefined>(undefined)

  const avatarText = translate({
    zh_hant: '選擇圖片',
    zh_hans: '选择图片',
    lang
  })

  const avatarHint = translate({
    zh_hant: '上傳圖片作為大頭照 (5 MB 內)',
    zh_hans: '上传图片作为头像 (5 MB 內)',
    lang
  })

  const sizeError = translate({
    zh_hant: '上傳檔案超過 5 MB',
    zh_hans: '上传文件超过 5 MB',
    lang
  })

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')

  const handleChange = (event: any, upload: any) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return undefined
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file && file.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      setError('size')
      return undefined
    }

    upload({
      variables: { input: { file, type: 'avatar', entityType: 'user' } }
    })
      .then(({ data }: any) => {
        const {
          singleFileUpload: { id, path }
        } = data
        setAvatar(path)
        setError(undefined)

        if (uploadCallback) {
          uploadCallback(field, id, false)
        }
      })
      .catch((result: any) => {
        // TODO: Handler error
      })
  }

  const Uploader = ({ upload }: any) => (
    <>
      <section className="container">
        <Avatar size="large" src={avatar} />
        <div className="upload">
          <div className="wrapper">
            <Icon
              id={ICON_CAMERA.id}
              viewBox={ICON_CAMERA.viewBox}
              style={{ width: 24, height: 24, marginRight: '0.25rem' }}
            />
            {avatarText}
            <input
              className="input"
              type="file"
              name="file"
              accept={acceptTypes}
              multiple={false}
              onChange={(event: any) => handleChange(event, upload)}
            />
          </div>
          <div className="hint">{avatarHint}</div>
          <div className="error">{error === 'size' && sizeError}</div>
        </div>
      </section>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <Mutation mutation={MUTATION_UPLOAD_FILE}>
      {upload => <Uploader upload={upload} />}
    </Mutation>
  )
}
