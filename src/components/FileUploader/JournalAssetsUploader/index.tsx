import { VisuallyHidden } from '@reach/visually-hidden'
// import { useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
import {
  ACCEPTED_COVER_UPLOAD_IMAGE_TYPES,
  // UPLOAD_JOURNAL_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { Icon } from '~/components/Icon'

import styles from './styles.module.css'

export const JournalAssetsUploader = () => {
  const intl = useIntl()

  const acceptTypes = ACCEPTED_COVER_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'journal-assets-uploader-form'
  // const [files, setFiles] = useState<File[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!event.target || !event.target.files) {
      return
    }
    // const newFiles = Array.from(event.target.files).slice(
    //   0,
    //   UPLOAD_JOURNAL_ASSET_COUNT_LIMIT
    // )
    event.target.value = ''
  }

  return (
    <label className={styles.label} htmlFor={fieldId}>
      <div className={styles.addAssetButton}>
        <Icon icon={IconCirclePlus} size={32} color="greyDarker" />
      </div>

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={intl.formatMessage({
            defaultMessage: 'Upload Journal Asset',
            id: 'pIj6ZF',
          })}
          accept={acceptTypes}
          multiple={true}
          onChange={handleChange}
        />
      </VisuallyHidden>
    </label>
  )
}
