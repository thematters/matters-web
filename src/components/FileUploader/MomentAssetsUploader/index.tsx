import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage, useIntl } from 'react-intl'

import IconCirclePlus from '@/public/static/icons/24px/circle-plus.svg'
import IconImage from '@/public/static/icons/24px/image.svg'
import {
  ACCEPTED_MOMENT_ASSETS_UPLOAD_IMAGE_TYPES,
  ADD_MOMENT_ASSETS,
  UPLOAD_MOMENT_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { getValidFiles } from '~/common/utils'
import { Icon, toast, useEventListener } from '~/components'

import { Item } from './Item'
import styles from './styles.module.css'

export type MomentAsset = {
  id: string
  file: File
  uploaded: boolean
  path: string
  assetId?: string
}

type MomentAssetsUploaderProps = {
  assets: MomentAsset[]
  updateAssets: (assets: MomentAsset[]) => void
  fieldId?: string
  isInPage?: boolean
}

export const MomentAssetsUploader: React.FC<MomentAssetsUploaderProps> = ({
  assets: _assets,
  updateAssets,
  fieldId: _fieldId,
  isInPage,
}) => {
  const intl = useIntl()

  const { visuallyHiddenProps } = useVisuallyHidden()

  const [assets, setAssets] = useState<MomentAsset[]>(_assets)

  useEffect(() => {
    setAssets(_assets)
  }, [_assets])

  useEffect(() => {
    updateAssets(assets)
  }, [assets])

  const addAssets = useCallback(
    async (files: File[]) => {
      const newAssets = await Promise.all(
        files.map(async (file) => {
          return {
            id: crypto.randomUUID(),
            file,
            uploaded: false,
            path: URL.createObjectURL(file),
          }
        })
      )

      setAssets((prevAssets) => [...prevAssets, ...newAssets])
    },
    [assets]
  )

  const removeAsset = useCallback(
    (asset: MomentAsset) => {
      URL.revokeObjectURL(asset.path)
      setAssets(assets.filter((a) => a.id !== asset.id))
    },
    [assets]
  )

  const onUploaded = useCallback(
    (asset: MomentAsset, assetId: string, path: string) => {
      setAssets(
        assets.map((a) =>
          a.id === asset.id
            ? { ...a, assetId: assetId, uploaded: true, path }
            : a
        )
      )
    },
    [assets]
  )

  const handleFileUpload = useCallback(
    async (files: File[]) => {
      const newFileCount = files.length
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

      const validFiles = await getValidFiles(
        Array.from(files).slice(
          0,
          UPLOAD_MOMENT_ASSET_COUNT_LIMIT - assets.length
        )
      )

      addAssets(validFiles)
    },
    [assets.length, addAssets]
  )

  useEventListener(
    ADD_MOMENT_ASSETS,
    async (payload: { [key: string]: any }) => {
      if (payload.files) {
        handleFileUpload(payload.files as File[])
      }
    }
  )

  const acceptTypes = ACCEPTED_MOMENT_ASSETS_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = _fieldId || 'moment-assets-uploader-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (event.target.files) {
      handleFileUpload(Array.from(event.target.files))
    }

    event.target.value = ''
  }

  const FileInput = (
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
      {...visuallyHiddenProps}
    />
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

          {FileInput}
        </label>
      )}
    </section>
  )
}
