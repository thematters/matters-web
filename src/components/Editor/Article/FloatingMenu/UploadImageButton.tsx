import { Editor } from '@matters/matters-editor'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useIntl } from 'react-intl'

import { ReactComponent as IconEditorImage } from '@/public/static/icons/editor-image.svg'
import { ACCEPTED_UPLOAD_IMAGE_TYPES } from '~/common/enums'
import { Icon } from '~/components'

import styles from './styles.module.css'

export type UploadImageButtonProps = {
  editor: Editor
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({ editor }) => {
  const intl = useIntl()

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'editor-image-upload-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    const files = event.target?.files

    if (!files || files.length <= 0) {
      return
    }

    editor.commands.insertFigureImageUploaders({
      files: Array.from(files),
    })

    event.target.value = ''
  }

  return (
    <label
      className={styles.uploadButton}
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
          accept={acceptTypes}
          multiple={true}
          onChange={handleChange}
        />
      </VisuallyHidden>
    </label>
  )
}

export default UploadImageButton
