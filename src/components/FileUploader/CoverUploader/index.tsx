import classNames from 'classnames'
import _omit from 'lodash/omit'
import { useEffect, useId, useState } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCamera } from '@/public/static/icons/24px/camera.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import {
  ACCEPTED_COVER_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
} from '~/common/enums'
import { validateImage } from '~/common/utils'
import {
  Book,
  Button,
  Cover,
  CoverProps,
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

/**
 * This shared component is for uploading cover.
 *
 * Usage:
 *
 * ```jsx
 *   <CoverUploader
 *     assetType={assetType}
 *     cover={cover}
 *     fallbackCover={fallbackCover}
 *     entityId={entityId}
 *     entityType={entityType}
 *     inEditor={true || false}
 *     onUpload={onUpload}
 *   />
 * ```
 */

export type CoverUploaderProps = {
  assetType:
    | ASSET_TYPE.profileCover
    | ASSET_TYPE.tagCover
    | ASSET_TYPE.circleCover
    | ASSET_TYPE.collectionCover
  entityId?: string
  entityType:
    | ENTITY_TYPE.user
    | ENTITY_TYPE.tag
    | ENTITY_TYPE.circle
    | ENTITY_TYPE.collection

  onUploaded: (assetId: string, path: string) => void
  onUploadStart: () => void
  onUploadEnd: () => void
  onReset: () => void

  type?: 'circle' | 'collection' | 'userProfile'

  bookTitle?: string
} & CoverProps

export const CoverUploader = ({
  assetType,
  cover: initCover,
  fallbackCover,
  entityId,
  entityType,
  inEditor,

  onUploaded,
  onUploadStart,
  onUploadEnd,
  onReset,

  type,
  bookTitle,
}: CoverUploaderProps) => {
  const intl = useIntl()

  const [cover, setCover] = useState<string | undefined | null>(initCover)
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

  const [localSrc, setLocalSrc] = useState<string | undefined>(undefined)

  const acceptTypes = ACCEPTED_COVER_UPLOAD_IMAGE_TYPES.join(',')
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

    const mime = await validateImage(file)
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
        input: { file, mime, type: assetType, entityId, entityType },
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

        setCover(path)
        onUploaded(assetId, path)
      } else {
        throw new Error()
      }
    } catch (e) {
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

  const removeCover = (event: any) => {
    event.preventDefault()
    setCover(undefined)
    setLocalSrc(undefined)

    if (onReset) {
      onReset()
    }
  }

  const Mask = () => (
    <div className={styles.mask}>
      {loading || uploading ? (
        <SpinnerBlock />
      ) : (
        <Icon icon={IconCamera} color="white" size={48} />
      )}
    </div>
  )

  const UserProfileMask = () => {
    const maskClasses = classNames({
      [styles.mask]: true,
      [styles.emptyMask]: !localSrc && !cover,
    })
    return (
      <div className={maskClasses}>
        {loading || uploading ? (
          <SpinnerBlock color={cover ? 'greyLight' : 'white'} />
        ) : (
          <section className={styles.userProfileCover}>
            <Icon icon={IconCamera} color="white" size={32} />
            {cover && (
              <Button onClick={removeCover}>
                <Icon icon={IconTimes} color="white" size={32} />
              </Button>
            )}
          </section>
        )}
      </div>
    )
  }

  const isCollection = type === 'collection'
  const isUserProfile = type === 'userProfile'

  return (
    <label className={styles.label} htmlFor={fieldId}>
      {!isCollection && !isUserProfile && (
        <Cover
          cover={localSrc || cover}
          fallbackCover={fallbackCover}
          inEditor={inEditor}
        >
          <Mask />
        </Cover>
      )}
      {isUserProfile && (
        <Cover cover={localSrc || cover} inEditor={inEditor}>
          <UserProfileMask />
        </Cover>
      )}
      {isCollection && (
        <section className={styles.collection}>
          <section className={styles.collectionContent}>
            <Book.Collection
              title={bookTitle || ''}
              cover={localSrc || cover}
              hasMask
              loading={loading}
            />
          </section>
        </section>
      )}

      <input
        id={fieldId}
        type="file"
        name="file"
        aria-label={intl.formatMessage({
          defaultMessage: 'Upload Cover',
          id: 'QvPc1q',
        })}
        accept={acceptTypes}
        multiple={false}
        onChange={handleChange}
        {...visuallyHiddenProps}
      />
    </label>
  )
}

export default CoverUploader
