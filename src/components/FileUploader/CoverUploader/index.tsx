import { VisuallyHidden } from '@reach/visually-hidden'
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
  Button,
  Cover,
  CoverProps,
  IconCamera24,
  LanguageContext,
  Spinner,
  TextIcon,
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
  entityId?: string
  entityType: ENTITY_TYPE.user | ENTITY_TYPE.tag | ENTITY_TYPE.circle
  onUpload: (assetId: string | null) => void
  type?: 'circle'
} & CoverProps

export const CoverUploader = ({
  assetType,
  cover: initCover,
  fallbackCover,
  entityId,
  entityType,
  inEditor,
  onUpload,
  type,
}: CoverUploaderProps) => {
  const { lang } = useContext(LanguageContext)

  const [cover, setCover] = useState<string | undefined | null>(initCover)
  const [upload, { loading }] = useMutation<SingleFileUploadMutation>(
    UPLOAD_FILE,
    undefined,
    { showToast: false }
  )

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'cover-upload-form'

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
          input: { file, type: assetType, entityId, entityType },
        },
      })
      const id = data?.singleFileUpload.id
      const path = data?.singleFileUpload.path

      if (id && path) {
        setCover(path)
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

  const removeCover = () => {
    setCover(undefined)
    onUpload(null)
  }

  const Mask = () => (
    <div className={styles['mask']}>
      {loading ? <Spinner /> : <IconCamera24 color="white" size="xl" />}

      {initCover && (
        <section className={styles['delete']}>
          <Button
            size={[null, '1.25rem']}
            spacing={[0, 'xtight']}
            borderColor="white"
            borderWidth="sm"
            onClick={removeCover}
          >
            <TextIcon color="white" size="xs">
              <Translate id="delete" />
            </TextIcon>
          </Button>
        </section>
      )}
    </div>
  )

  const isCircle = type === 'circle'

  return (
    <label className={styles.label} htmlFor={fieldId}>
      {!isCircle && (
        <Cover cover={cover} fallbackCover={fallbackCover} inEditor={inEditor}>
          <Mask />
        </Cover>
      )}
      {isCircle && (
        <Cover cover={cover} fallbackCover={fallbackCover} inEditor={inEditor}>
          <Mask />
        </Cover>
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
