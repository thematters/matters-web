import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import _omit from 'lodash/omit'
import { useContext, useState } from 'react'

import { ReactComponent as IconCamera } from '@/public/static/icons/24px/camera.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import {
  ACCEPTED_COVER_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
} from '~/common/enums'
import { translate, validateImage } from '~/common/utils'
import {
  Book,
  Button,
  Cover,
  CoverProps,
  Icon,
  LanguageContext,
  SpinnerBlock,
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
  onUploaded: (assetId: string | null) => void
  onUploadStart: () => void
  onUploadEnd: () => void
  type?: 'circle' | 'collection' | 'userProfile'

  bookTitle?: string
  bookArticleCount?: number
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
  type,
  bookTitle,
  bookArticleCount,
}: CoverUploaderProps) => {
  const { lang } = useContext(LanguageContext)

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

  const acceptTypes = ACCEPTED_COVER_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'cover-upload-form'

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

  const removeCover = (event: any) => {
    event.preventDefault()
    setCover(undefined)
    onUploaded(null)
  }

  const Mask = () => (
    <div className={styles.mask}>
      {loading || uploading ? (
        <SpinnerBlock />
      ) : (
        <Icon icon={IconCamera} color="white" size="xl" />
      )}
    </div>
  )

  const UserProfileMask = () => {
    const maskClasses = classNames({
      [styles.mask]: true,
      [styles.emptyMask]: !cover,
    })
    return (
      <div className={maskClasses}>
        {loading || uploading ? (
          <SpinnerBlock color={cover ? 'greyLight' : 'white'} />
        ) : (
          <section className={styles.userProfileCover}>
            <Icon icon={IconCamera} color="white" size="lg" />
            {cover && (
              <Button onClick={removeCover}>
                <Icon icon={IconTimes} color="white" size="lg" />
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
        <Cover cover={cover} fallbackCover={fallbackCover} inEditor={inEditor}>
          <Mask />
        </Cover>
      )}
      {isUserProfile && (
        <Cover cover={cover} inEditor={inEditor}>
          <UserProfileMask />
        </Cover>
      )}
      {isCollection && (
        <section className={styles.collection}>
          <section className={styles.collectionContent}>
            <Book.Collection
              title={bookTitle || ''}
              cover={cover}
              hasMask
              loading={loading}
            />
          </section>
        </section>
      )}

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={translate({ id: 'uploadCover', lang })}
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
        />
      </VisuallyHidden>
    </label>
  )
}

export default CoverUploader
