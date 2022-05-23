import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import { useContext } from 'react'

import {
  IconCamera16,
  IconSpinner16,
  LanguageContext,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import updateDraftAssets from '~/components/GQL/updates/draftAssets'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  ASSET_TYPE,
  ENTITY_TYPE,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'
import { translate } from '~/common/utils'

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
  const { lang } = useContext(LanguageContext)

  const [upload, { loading }] = useMutation<SingleFileUpload>(
    UPLOAD_FILE,
    {
      update: (cache, { data }) => {
        if (data?.singleFileUpload) {
          updateDraftAssets({
            cache,
            id: entityId,
            asset: data.singleFileUpload,
          })
        }
      },
    },
    { showToast: false }
  )

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
                en="upload file size exceeds 5 MB"
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

      refetchAssets()

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
      <h3>
        <TextIcon
          icon={<IconCamera16 />}
          color="green"
          size="sm"
          weight="md"
          spacing="xtight"
        >
          <Translate id="uploadCover" />
        </TextIcon>

        {loading && <IconSpinner16 color="grey-light" />}
      </h3>

      <p>
        <Translate
          zh_hant="上傳一張圖片用作封面，建議尺寸：1600 x 900 像素"
          zh_hans="上传一张图片用作封面，建议尺寸：1600 x 900 像素"
          en="Upload an image as cover. Suggested image size: 1600 x 900 pixels"
        />
      </p>

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

      <style jsx>{styles}</style>
    </label>
  )
}

export default Uploader
