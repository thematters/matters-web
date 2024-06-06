import { VisuallyHidden } from '@reach/visually-hidden'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
import {
  ACCEPTED_COVER_UPLOAD_IMAGE_TYPES,
  UPLOAD_JOURNAL_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { validateImage } from '~/common/utils'
import { toast } from '~/components'
import { Icon } from '~/components/Icon'

import { Item } from './Item'
import styles from './styles.module.css'

export const JournalAssetsUploader = () => {
  const intl = useIntl()

  const acceptTypes = ACCEPTED_COVER_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'journal-assets-uploader-form'
  const [files, setFiles] = useState<File[]>([])

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file))
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!event.target || !event.target.files) {
      return
    }
    const newFileCount = event.target.files.length
    if (newFileCount + files.length > UPLOAD_JOURNAL_ASSET_COUNT_LIMIT) {
      toast.success({
        message: <FormattedMessage defaultMessage="不能超过3张" id="ZVDsIg" />,
      })
    }

    const newFiles = Array.from(event.target.files).slice(
      0,
      UPLOAD_JOURNAL_ASSET_COUNT_LIMIT - files.length
    )

    const hasInvalidImage = await Promise.all(
      Array.from(files).map((file) => validateImage(file))
    ).then((results) => results.some((result) => !result))
    if (hasInvalidImage) {
      event.target.value = ''
      return
    }

    setFiles([...files, ...newFiles])

    event.target.value = ''
  }

  return (
    <section className={styles.container}>
      {files.map((file, index) => (
        <Item key={index} file={file} removeFile={removeFile} />
      ))}
      {files.length < UPLOAD_JOURNAL_ASSET_COUNT_LIMIT && (
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
      )}
    </section>
  )
}
