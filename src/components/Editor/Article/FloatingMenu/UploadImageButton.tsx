import { Editor } from '@matters/matters-editor'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconEditorImage } from '@/public/static/icons/editor-image.svg'
import { ACCEPTED_UPLOAD_IMAGE_TYPES, ASSET_TYPE } from '~/common/enums'
import { getFileType, validateImage } from '~/common/utils'
import { Icon, toast } from '~/components'

import styles from './styles.module.css'

export type UploadImageButtonProps = {
  editor: Editor
  upload: (input: {
    file?: File
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
  const intl = useIntl()
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
          message: (
            <FormattedMessage defaultMessage="Image uploaded" id="TcTp+J" />
          ),
        })
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
      title={intl.formatMessage({
        defaultMessage: 'Insert image',
        id: 'Pv2PlK',
      })}
    >
      <Icon icon={IconEditorImage} size={32} />

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={intl.formatMessage({
            defaultMessage: 'Insert image',
            id: 'Pv2PlK',
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
