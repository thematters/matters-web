import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import _omit from 'lodash/omit'
import { useContext, useState } from 'react'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
} from '~/common/enums'
import { translate, validateImage } from '~/common/utils'
import {
  Avatar,
  AvatarProps,
  CircleAvatar,
  CircleAvatarProps,
  IconCamera24,
  LanguageContext,
  Spinner,
  toast,
  Translate,
  useDirectImageUpload,
  useMutation,
} from '~/components'
import {
  DIRECT_IMAGE_UPLOAD,
  DIRECT_IMAGE_UPLOAD_DONE,
} from '~/components/GQL/mutations/uploadFile'
import {
  DirectImageUploadDoneMutation,
  DirectImageUploadMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

export type AvatarUploaderProps = {
  onUploaded: (assetId: string) => void
  onUploadStart: () => void
  onUploadEnd: () => void
  hasBorder?: boolean

  type?: 'circle'
  entityId?: string
} & (Omit<AvatarProps, 'size'> | Omit<CircleAvatarProps, 'size'>)

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  onUploaded,
  onUploadStart,
  onUploadEnd,
  hasBorder,

  type,
  entityId,

  ...avatarProps
}) => {
  const { lang } = useContext(LanguageContext)

  const [upload, { loading }] = useMutation<DirectImageUploadMutation>(
    DIRECT_IMAGE_UPLOAD,
    undefined,
    { showToast: false }
  )
  const [directImageUploadDone] = useMutation<DirectImageUploadDoneMutation>(
    DIRECT_IMAGE_UPLOAD_DONE,
    undefined,
    { showToast: false }
  )
  const { upload: uploadImage, uploading } = useDirectImageUpload()

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

    const isValidImage = await validateImage(file)
    if (!isValidImage) {
      return
    }

    try {
      if (onUploadStart) {
        onUploadStart()
      }

      const variables = {
        input: {
          file,
          type: isCircle ? ASSET_TYPE.circleAvatar : ASSET_TYPE.avatar,
          entityType: isCircle ? ENTITY_TYPE.circle : ENTITY_TYPE.user,
          entityId,
        },
      }
      const { data } = await upload({ variables })
      const { id: assetId, path, uploadURL } = data?.directImageUpload || {}

      if (assetId && path && uploadURL) {
        await uploadImage({ uploadURL, file })

        // (async) mark asset draft as false
        directImageUploadDone({
          variables: {
            ..._omit(variables.input, ['file']),
            draft: false,
            url: path,
          },
        }).catch(console.error)

        setAvatar(path)
        onUploaded(assetId)
      } else {
        throw new Error()
      }
    } catch (e) {
      toast.error({ message: <Translate id="failureUploadImage" /> })
    }

    if (onUploadEnd) {
      onUploadEnd()
    }
  }

  const isCircle = type === 'circle'
  const labelClasses = classNames({
    [styles.label]: true,
    [styles.hasBorder]: hasBorder,
    [styles.circle]: isCircle,
  })

  return (
    <label className={labelClasses} htmlFor={fieldId}>
      {!isCircle && <Avatar size="xxxl" {...avatarProps} src={avatar} />}
      {isCircle && <CircleAvatar size="xxxl" {...avatarProps} src={avatar} />}

      <div className={styles.mask}>
        {loading || uploading ? (
          <Spinner />
        ) : (
          <IconCamera24 color="white" size="lg" />
        )}
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
