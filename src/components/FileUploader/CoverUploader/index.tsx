import VisuallyHidden from '@reach/visually-hidden'
import { useState } from 'react'

import {
  Button,
  Cover,
  CoverProps,
  IconCamera24,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  ASSET_TYPE,
  ENTITY_TYPE,
  TEXT,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'

import styles from './styles.css'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'

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
  assetType: ASSET_TYPE.profileCover | ASSET_TYPE.tagCover
  entityId?: string
  entityType: ENTITY_TYPE.user | ENTITY_TYPE.tag
  onUpload: (assetId: string | null) => void
} & CoverProps

export const CoverUploader = ({
  assetType,
  cover: initCover,
  fallbackCover,
  entityId,
  entityType,
  inEditor,
  onUpload,
}: CoverUploaderProps) => {
  const [cover, setCover] = useState<string | undefined | null>(initCover)
  const [upload, { loading }] = useMutation<SingleFileUpload>(UPLOAD_FILE)

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

  return (
    <label className="uploader" htmlFor={fieldId}>
      <Cover cover={cover} fallbackCover={fallbackCover} inEditor={inEditor} />

      <div className="mask">
        {loading ? <Spinner /> : <IconCamera24 color="white" size="xl" />}

        {initCover && (
          <section className="delete">
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

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={TEXT.zh_hant.uploadCover}
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
        />
      </VisuallyHidden>

      <style jsx>{styles}</style>
    </label>
  )
}

export default CoverUploader
