import { Editor } from '@matters/matters-editor'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useContext, useState } from 'react'

import { ReactComponent as IconEditorMenuImage } from '@/public/static/icons/32px/editor-menu-image.svg'
import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  IconSpinner16,
  LanguageContext,
  toast,
  Translate,
  withIcon,
} from '~/components'

import styles from './styles.module.css'

export type UploadImageButtonProps = {
  editor: Editor
  upload: (input: {
    file?: any
    url?: string
    type?: ASSET_TYPE.embed | ASSET_TYPE.embedaudio
  }) => Promise<{
    id: string
    path: string
  }>
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({
  editor,
  upload,
}) => {
  const { lang } = useContext(LanguageContext)
  const [uploading, setUploading] = useState(false)

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'editor-image-upload-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const files = event.target.files

    const hasExceedLimit = Array.from(files).some(
      (file) => file.size > UPLOAD_IMAGE_SIZE_LIMIT
    )
    if (hasExceedLimit) {
      toast.error({
        message: (
          <Translate
            zh_hant="上傳檔案超過 5 MB"
            zh_hans="上传文件超过 5 MB"
            en="upload file size exceeds 5 MB"
          />
        ),
      })

      event.target.value = ''
      return
    }

    try {
      setUploading(true)

      for (const file of files) {
        const { path } = await upload({ file, type: ASSET_TYPE.embed })
        editor.chain().focus().setFigureImage({ src: path }).run()
        toast.success({
          message: <Translate id="successUploadImage" />,
        })
      }
    } catch (e) {
      toast.error({
        message: <Translate id="failureUploadImage" />,
      })
    }

    event.target.value = ''
    setUploading(false)
  }

  const labelClasses = classNames({
    [styles.uploadButton]: true,
    'u-area-disable': uploading,
  })

  return (
    <label
      className={labelClasses}
      htmlFor={fieldId}
      title={translate({
        zh_hant: '插入圖片',
        zh_hans: '插入图片',
        en: 'Insert image',
        lang,
      })}
    >
      {!uploading && withIcon(IconEditorMenuImage)({ size: 'lg' })}
      {uploading && <IconSpinner16 size="lg" color="greyLight" />}

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={translate({
            zh_hant: '插入圖片',
            zh_hans: '插入图片',
            en: 'Insert image',
            lang,
          })}
          disabled={uploading}
          accept={acceptTypes}
          multiple={true}
          onChange={handleChange}
        />
      </VisuallyHidden>
    </label>
  )
}

export default UploadImageButton
