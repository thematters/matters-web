import { Editor } from '@matters/matters-editor'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useContext, useState } from 'react'

import { ReactComponent as IconEditorImage } from '@/public/static/icons/editor-image.svg'
import { ACCEPTED_UPLOAD_IMAGE_TYPES, ASSET_TYPE } from '~/common/enums'
import { getFileType, translate, validateImage } from '~/common/utils'
import {
  LanguageContext,
  Spinner,
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
    mime?: string
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

    const hasInvalidImage = await Promise.all(
      Array.from(files).map((file) => validateImage(file))
    ).then((results) => results.some((result) => !result))
    if (hasInvalidImage) {
      event.target.value = ''
      return
    }

    try {
      setUploading(true)

      for (const file of files) {
        const mime = (await getFileType(file))!.mime
        const { path } = await upload({ file, type: ASSET_TYPE.embed, mime })
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
      {!uploading && withIcon(IconEditorImage)({ size: 'lg' })}
      {uploading && <Spinner size="lg" color="greyLight" />}

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
