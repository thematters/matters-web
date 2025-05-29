import classNames from 'classnames'
import _omit from 'lodash/omit'
import { useEffect, useId, useState } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage, useIntl } from 'react-intl'

import IconCamera from '@/public/static/icons/24px/camera.svg'
import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
} from '~/common/enums'
import { validateImage } from '~/common/utils'
import {
  Avatar,
  AvatarProps,
  CircleAvatar,
  CircleAvatarProps,
  Icon,
  SpinnerBlock,
  toast,
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
  onUploaded: (assetId: string, path: string) => void
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
  const intl = useIntl()

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

  const [localSrc, setLocalSrc] = useState<string | undefined>(undefined)

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = useId()

  const { visuallyHiddenProps } = useVisuallyHidden()

  useEffect(() => {
    return () => {
      if (localSrc) {
        URL.revokeObjectURL(localSrc)
      }
    }
  }, [])

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    const mime = await validateImage(file, true)
    if (!mime) {
      return
    }

    try {
      if (onUploadStart) {
        onUploadStart()
      }

      if (localSrc) {
        URL.revokeObjectURL(localSrc)
      }

      setLocalSrc(URL.createObjectURL(file))

      const variables = {
        input: {
          file,
          type: isCircle ? ASSET_TYPE.circleAvatar : ASSET_TYPE.avatar,
          entityType: isCircle ? ENTITY_TYPE.circle : ENTITY_TYPE.user,
          entityId,
          mime,
        },
      }
      const { data } = await upload({
        variables: _omit(variables, ['input.file']),
      })
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
        onUploaded(assetId, path)
      } else {
        throw new Error()
      }
    } catch {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Failed to upload, please try again."
            id="qfi4cg"
          />
        ),
      })
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
      {!isCircle && (
        <Avatar size={72} {...avatarProps} src={localSrc || avatar} />
      )}
      {isCircle && (
        <CircleAvatar size={72} {...avatarProps} src={localSrc || avatar} />
      )}

      <div className={styles.mask}>
        {loading || uploading ? (
          <SpinnerBlock />
        ) : (
          <Icon icon={IconCamera} color="white" size={32} />
        )}
      </div>

      <input
        id={fieldId}
        type="file"
        name="file"
        aria-label={intl.formatMessage({
          defaultMessage: 'Upload avatar',
          id: 'mqa6CF',
        })}
        accept={acceptTypes}
        multiple={false}
        onChange={handleChange}
        {...visuallyHiddenProps}
      />
    </label>
  )
}
