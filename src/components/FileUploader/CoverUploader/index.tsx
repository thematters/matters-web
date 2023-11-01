import { VisuallyHidden } from '@reach/visually-hidden'
import _omit from 'lodash/omit'
import { useContext, useState } from 'react'

import {
  ACCEPTED_COVER_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
} from '~/common/enums'
import { translate, validateImage } from '~/common/utils'
import {
  Book,
  Cover,
  CoverProps,
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
  type?: 'circle' | 'collection'

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

    const isValidImage = await validateImage(file)
    if (!isValidImage) {
      return
    }

    try {
      if (onUploadStart) {
        onUploadStart()
      }

      const variables = {
        input: { file, type: assetType, entityId, entityType },
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

  const Mask = () => (
    <div className={styles.mask}>
      {loading || uploading ? (
        <Spinner />
      ) : (
        <IconCamera24 color="white" size="xl" />
      )}
    </div>
  )

  const isCircle = type === 'circle'
  const isCollection = type === 'collection'

  return (
    <label className={styles.label} htmlFor={fieldId}>
      {!isCircle && !isCollection && (
        <Cover cover={cover} fallbackCover={fallbackCover} inEditor={inEditor}>
          <Mask />
        </Cover>
      )}
      {isCircle && (
        <Cover cover={cover} fallbackCover={fallbackCover} inEditor={inEditor}>
          <Mask />
        </Cover>
      )}
      {isCollection && (
        <section className={styles.collection}>
          <section className={styles.collectionContent}>
            {
              <Book
                title={bookTitle || ''}
                cover={cover}
                articleCount={bookArticleCount}
                hasMask
                loading={loading}
              />
            }
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
