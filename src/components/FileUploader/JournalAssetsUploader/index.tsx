import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { memo, useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
import { ReactComponent as IconImage } from '@/public/static/icons/24px/image.svg'
import {
  ACCEPTED_COVER_UPLOAD_IMAGE_TYPES,
  UPLOAD_JOURNAL_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { validateImage } from '~/common/utils'
import { toast } from '~/components'
import { Icon } from '~/components/Icon'

import { Item } from './Item'
import styles from './styles.module.css'

export type JournalAsset = {
  id: string
  file: File
  uploaded: boolean
  src: string
}

type JournalAssetsUploaderProps = {
  assets: JournalAsset[]
  addAssets: (files: File[]) => void
  removeAsset: (asset: JournalAsset) => void
  fieldId?: string
  isEditing?: boolean
  onClick?: () => void
}

const handleFileValidation = async (files: File[]): Promise<File[]> => {
  const validFiles = []
  for (const file of files) {
    const isValid = await validateImage(file)
    if (isValid) {
      validFiles.push(file)
    }
  }
  return validFiles
}

export const JournalAssetsUploader = memo(function JournalAssetsUploader({
  fieldId: _fieldId,
  isEditing,
  assets,
  addAssets,
  removeAsset,
  onClick,
}: JournalAssetsUploaderProps) {
  const intl = useIntl()

  const acceptTypes = ACCEPTED_COVER_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = _fieldId || 'journal-assets-uploader-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!event.target || !event.target.files) {
      return
    }
    const newFileCount = event.target.files.length
    if (newFileCount + assets.length > UPLOAD_JOURNAL_ASSET_COUNT_LIMIT) {
      toast.success({
        message: <FormattedMessage defaultMessage="不能超过3张" id="ZVDsIg" />,
      })
    }

    const newFiles = Array.from(event.target.files).slice(
      0,
      UPLOAD_JOURNAL_ASSET_COUNT_LIMIT - assets.length
    )

    const validFiles = await handleFileValidation(newFiles)

    addAssets(validFiles)

    event.target.value = ''
  }

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        onClick()
      }
    },
    [onClick]
  )

  const FileInput = () => (
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
        onClick={handleClick}
      />
    </VisuallyHidden>
  )

  if (!isEditing) {
    return (
      <section className={styles.container}>
        <label className={styles.label} htmlFor={fieldId}>
          <div className={styles.imageButton}>
            <Icon icon={IconImage} size={22} color="greyDarker" />
          </div>

          <FileInput />
        </label>
      </section>
    )
  }

  const imageButtonClasses = classNames(styles.imageButton, styles.editing)

  return (
    <section className={styles.container}>
      {assets.map((asset) => (
        <Item key={asset.id} asset={asset} removeAsset={removeAsset} />
      ))}
      {assets.length < UPLOAD_JOURNAL_ASSET_COUNT_LIMIT && (
        <label className={styles.label} htmlFor={fieldId}>
          {assets.length === 0 && (
            <div className={imageButtonClasses}>
              <Icon icon={IconImage} size={22} color="greyDarker" />
            </div>
          )}
          {assets.length > 0 && (
            <div className={styles.addAssetButton}>
              <Icon icon={IconCirclePlus} size={32} color="greyDarker" />
            </div>
          )}

          <FileInput />
        </label>
      )}
    </section>
  )
})
