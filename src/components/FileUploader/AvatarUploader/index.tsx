import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useContext, useState } from 'react'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  ASSET_TYPE,
  ENTITY_TYPE,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Avatar,
  AvatarProps,
  CircleAvatar,
  CircleAvatarProps,
  IconCamera24,
  LanguageContext,
  Spinner,
  Translate,
  useMutation,
} from '~/components'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { SingleFileUploadMutation } from '~/gql/graphql'

import styles from './styles.module.css'

export type AvatarUploaderProps = {
  onUpload: (assetId: string) => void
  hasBorder?: boolean

  type?: 'circle'
  entityId?: string
} & (Omit<AvatarProps, 'size'> | Omit<CircleAvatarProps, 'size'>)

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  onUpload,
  hasBorder,

  type,
  entityId,

  ...avatarProps
}) => {
  const { lang } = useContext(LanguageContext)

  const [upload, { loading }] = useMutation<SingleFileUploadMutation>(
    UPLOAD_FILE,
    undefined,
    { showToast: false }
  )
  const [avatar, setAvatar] = useState<string | undefined | null>(
    avatarProps.src
  )

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'avatar-upload-form'

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
                en="upload file exceed 5 MB"
              />
            ),
          },
        })
      )
      return
    }

    try {
      const { data } = await upload({
        variables: {
          input: {
            file,
            type: isCircle ? ASSET_TYPE.circleAvatar : ASSET_TYPE.avatar,
            entityType: isCircle ? ENTITY_TYPE.circle : ENTITY_TYPE.user,
            entityId,
          },
        },
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
            content: <Translate id="failureUploadImage" />,
          },
        })
      )
    }
  }

  const isCircle = type === 'circle'
  const labelClasses = classNames({
    [styles.label]: true,
    [styles['has-border']]: hasBorder,
    [styles.circle]: isCircle,
  })

  return (
    <label className={labelClasses} htmlFor={fieldId}>
      {!isCircle && <Avatar size="xxxl" {...avatarProps} src={avatar} />}
      {isCircle && <CircleAvatar size="xxxl" {...avatarProps} src={avatar} />}

      <div className={styles.mask}>
        {loading ? <Spinner /> : <IconCamera24 color="white" size="lg" />}
      </div>

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={translate({
            zh_hant: '上傳頭像',
            zh_hans: '上传头像',
            en: 'Upload avatar',
            lang,
          })}
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
        />
      </VisuallyHidden>
    </label>
  )
}
