import { VisuallyHidden } from '@reach/visually-hidden'
import { useContext, useState } from 'react'

import {
  ACCEPTED_COLLECTION_UPLOAD_IMAGE_TYPES,
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Book,
  Cover,
  CoverProps,
  IconCamera24,
  LanguageContext,
  Spinner,
  toast,
  Translate,
  useMutation,
} from '~/components'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { SingleFileUploadMutation } from '~/gql/graphql'

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
  const [upload, { loading }] = useMutation<SingleFileUploadMutation>(
    UPLOAD_FILE,
    undefined,
    { showToast: false }
  )

  const acceptTypes =
    type === 'collection'
      ? ACCEPTED_COLLECTION_UPLOAD_IMAGE_TYPES.join(',')
      : ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'cover-upload-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file?.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      toast.error({
        message: (
          <Translate
            zh_hant="上傳檔案超過 5 MB"
            zh_hans="上传文件超过 5 MB"
            en="upload file exceed 5 MB"
          />
        ),
      })

      return
    }

    try {
      if (onUploadStart) {
        onUploadStart()
      }

      const { data } = await upload({
        variables: {
          input: { file, type: assetType, entityId, entityType },
        },
      })
      const id = data?.singleFileUpload.id
      const path = data?.singleFileUpload.path

      if (id && path) {
        setCover(path)
        onUploaded(id)
      } else {
        throw new Error()
      }
    } catch (e) {
      toast.error({
        message: <Translate id="failureUploadImage" />,
      })
    }

    if (onUploadEnd) {
      onUploadEnd()
    }
  }

  const Mask = () => (
    <div className={styles.mask}>
      {loading ? <Spinner /> : <IconCamera24 color="white" size="xl" />}
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
