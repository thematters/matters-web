import { Editor } from '@matters/matters-editor'
import { useId } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { useIntl } from 'react-intl'

import { ReactComponent as IconEditorImage } from '@/public/static/icons/editor-image.svg'
import { ACCEPTED_UPLOAD_IMAGE_TYPES, BREAKPOINTS } from '~/common/enums'
import { Icon, Tooltip, useMediaQuery } from '~/components'

import styles from './styles.module.css'

export type UploadImageButtonProps = {
  editor: Editor
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({ editor }) => {
  const intl = useIntl()
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = useId()

  const { visuallyHiddenProps } = useVisuallyHidden()

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
    <Tooltip
      content={intl.formatMessage({
        defaultMessage: 'Image',
        id: 'G4KR8j',
        description: 'src/components/Editor',
      })}
      placement="top"
      disabled={!isMdUp}
    >
      <label className={styles.uploadButton} htmlFor={fieldId}>
        <Icon icon={IconEditorImage} size={32} />

        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={intl.formatMessage({
            defaultMessage: 'Image',
            id: 'G4KR8j',
            description: 'src/components/Editor',
          })}
          accept={acceptTypes}
          multiple={true}
          onChange={handleChange}
          {...visuallyHiddenProps}
        />
      </label>
    </Tooltip>
  )
}

export default UploadImageButton
