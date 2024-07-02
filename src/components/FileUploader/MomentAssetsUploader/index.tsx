import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
import { ReactComponent as IconImage } from '@/public/static/icons/24px/image.svg'
import {
  ACCEPTED_MOMENT_ASSETS_UPLOAD_IMAGE_TYPES,
  UPLOAD_MOMENT_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { validateImage } from '~/common/utils'
import { Icon, toast } from '~/components'

import { Item } from './Item'
import styles from './styles.module.css'

export type MomentAsset = {
  id: string
  file: File
  uploaded: boolean
  src: string
}

type MomentAssetsUploaderProps = {
  // assets: MomentAsset[]
  // addAssets: (files: File[]) => void
  // removeAsset: (asset: MomentAsset) => void
  fieldId?: string
  isInPage?: boolean
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

export const MomentAssetsUploader: React.FC<MomentAssetsUploaderProps> = ({
  // assets,
  // addAssets,
  // removeAsset,
  fieldId: _fieldId,
  isInPage,
}) => {
  const intl = useIntl()

  const [assets, setAssets] = useState<MomentAsset[]>([])

  const addAssets = useCallback(
    async (files: File[]) => {
      const newFiles = Array.from(files).slice(
        0,
        UPLOAD_MOMENT_ASSET_COUNT_LIMIT - assets.length
      )

      const newAssets = await Promise.all(
        newFiles.map(async (file) => {
          // const { width, height } = await getImageDimensions(file)
          return {
            id: crypto.randomUUID(),
            file,
            uploaded: false,
            src: URL.createObjectURL(file),
            // width,
            // height,
          }
        })
      )

      setTimeout(() => {
        setAssets((prevAssets) => [...prevAssets, ...newAssets])
      }, 500)
    },
    [assets]
  )

  const removeAsset = useCallback(
    (asset: MomentAsset) => {
      URL.revokeObjectURL(asset.src)
      setAssets(assets.filter((a) => a.id !== asset.id))
    },
    [assets]
  )

  const onUploaded = useCallback(
    (asset: MomentAsset, path: string) => {
      setAssets(
        assets.map((a) =>
          a.id === asset.id ? { ...a, uploaded: true, src: path } : a
        )
      )
    },
    [assets]
  )

  const acceptTypes = ACCEPTED_MOMENT_ASSETS_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = _fieldId || 'moment-assets-uploader-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!event.target || !event.target.files) {
      return
    }
    const newFileCount = event.target.files.length
    if (newFileCount + assets.length > UPLOAD_MOMENT_ASSET_COUNT_LIMIT) {
      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="Up to 3 images can be uploaded"
            id="p9gEZh"
          />
        ),
      })
    }

    const newFiles = Array.from(event.target.files).slice(
      0,
      UPLOAD_MOMENT_ASSET_COUNT_LIMIT - assets.length
    )

    const validFiles = await handleFileValidation(newFiles)

    addAssets(validFiles)

    event.target.value = ''
  }

  const FileInput = () => (
    <VisuallyHidden>
      <input
        id={fieldId}
        type="file"
        name="file"
        aria-label={intl.formatMessage({
          defaultMessage: 'Upload Moment Assets',
          id: 'Xq7h6o',
        })}
        accept={acceptTypes}
        multiple={true}
        onChange={handleChange}
        // onClick={handleClick}
      />
    </VisuallyHidden>
  )

  const imageButtonClasses = classNames(styles.imageButton, styles.editing)

  return (
    <section className={styles.container}>
      {assets.map((asset) => (
        <Item
          key={asset.id}
          asset={asset}
          removeAsset={removeAsset}
          onUploaded={onUploaded}
        />
      ))}
      {assets.length < UPLOAD_MOMENT_ASSET_COUNT_LIMIT && (
        <label className={styles.label} htmlFor={fieldId}>
          {!isInPage && (
            <>
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
            </>
          )}
          {isInPage && (
            <div className={styles.addAssetButton}>
              <Icon icon={IconCirclePlus} size={32} color="greyDarker" />
            </div>
          )}

          <FileInput />
        </label>
      )}
    </section>
  )
}
