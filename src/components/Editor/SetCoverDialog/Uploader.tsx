import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'

import { IconCamera, IconSpinner, TextIcon, Translate } from '~/components'
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

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'

export interface UploadEntity {
  entityId: string
  entityType: ENTITY_TYPE.article | ENTITY_TYPE.draft
}

type UploaderProps = {
  setSelected: (asset: Asset) => any
  refetchAssets: () => any
} & UploadEntity

const Uploader: React.FC<UploaderProps> = ({
  entityId,
  entityType,
  setSelected,
  refetchAssets,
}) => {
  const [upload, { loading }] = useMutation<SingleFileUpload>(UPLOAD_FILE)

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'editor-cover-upload-form'

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
          input: {
            file,
            type: ASSET_TYPE.cover,
            entityId,
            entityType,
          },
        },
      })

      await refetchAssets()

      if (data?.singleFileUpload) {
        setSelected(data?.singleFileUpload)
      } else {
        throw new Error()
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: <Translate id="successUploadImage" />,
          },
        })
      )
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

  const labelClasses = classNames({
    uploader: true,
    'u-area-disable': loading,
  })

  return (
    <label className={labelClasses} htmlFor={fieldId}>
      <div>
        <h3>
          <TextIcon
            icon={<IconCamera />}
            color="green"
            size="sm"
            weight="md"
            spacing="xtight"
          >
            <Translate id="uploadCover" />
          </TextIcon>
        </h3>

        <p>
          <Translate
            zh_hant="上傳一張圖片用作封面，建議尺寸：1600 x 900 像素"
            zh_hans="上传一张图片用作封面，建议尺寸：1600 x 900 像素"
          />
        </p>

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
      </div>

      {loading && <IconSpinner color="grey-light" size="md" />}

      <style jsx>{styles}</style>
    </label>
  )
}

export default Uploader
