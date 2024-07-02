import _omit from 'lodash/omit'
import { memo, useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCircleTimesFill } from '@/public/static/icons/24px/circle-times-fill.svg'
import { ReactComponent as IconWarn } from '@/public/static/icons/24px/warn.svg'
import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums/file'
import { validateImage } from '~/common/utils'
import { useDirectImageUpload, useMutation, ViewerContext } from '~/components'
import {
  DIRECT_IMAGE_UPLOAD,
  DIRECT_IMAGE_UPLOAD_DONE,
} from '~/components/GQL/mutations/uploadFile'
import { Icon } from '~/components/Icon'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { Spinner } from '~/components/Spinner'
import {
  DirectImageUploadDoneMutation,
  DirectImageUploadMutation,
} from '~/gql/graphql'

import { MomentAsset } from '.'
import styles from './styles.module.css'

type ItemProps = {
  asset: MomentAsset
  removeAsset: (asset: MomentAsset) => void
  onUploaded: (asset: MomentAsset, path: string) => void
}

export const Item = memo(function Item({
  asset,
  removeAsset,
  onUploaded,
}: ItemProps) {
  const viewer = useContext(ViewerContext)
  const [hoverAction, setHoverAction] = useState(false)
  const [error, setError] = useState<any>(undefined)
  const [deleted, setDeleted] = useState(false)
  const [uploadedPath, setUploadedPath] = useState<string | undefined>(
    undefined
  )

  const [upload, { loading }] = useMutation<DirectImageUploadMutation>(
    DIRECT_IMAGE_UPLOAD,
    undefined,
    { showToast: false }
  )

  const [directImageUploadDone] = useMutation<DirectImageUploadDoneMutation>(
    DIRECT_IMAGE_UPLOAD_DONE,
    undefined,
    { showToast: false }
  )

  const { upload: uploadImage, uploading } = useDirectImageUpload()

  useEffect(() => {
    if (deleted || !uploadedPath) {
      return
    }

    if (uploadedPath) {
      onUploaded(asset, uploadedPath)
    }
  }, [deleted, uploadedPath])

  useEffect(() => {
    const uploadAsset = async () => {
      if (asset.uploaded || !upload) {
        return
      }

      const { file } = asset

      const mime = await validateImage(file)
      if (!mime) {
        return
      }

      try {
        const variables = {
          input: {
            file,
            mime,
            type: ASSET_TYPE.moment,
            entityId: viewer.id,
            entityType: ENTITY_TYPE.user,
          },
        }

        const { data } = await upload({
          variables: _omit(variables, ['input.file']),
        })

        const { id: assetId, path, uploadURL } = data?.directImageUpload || {}

        if (assetId && path && uploadURL) {
          await uploadImage({ uploadURL, file })

          // (async) mark asset draft as false
          directImageUploadDone({
            variables: {
              ..._omit(variables.input, ['file']),
              draft: false,
              url: path,
            },
          }).catch(console.error)

          setUploadedPath(path)
        } else {
          throw new Error()
        }
      } catch (e) {
        setError(e)
      }
    }

    uploadAsset()
  }, [])

  return (
    <div className={styles.item}>
      <div
        className={styles.action}
        onClick={() => {
          setDeleted(true)
          removeAsset(asset)
        }}
        onMouseEnter={() => setHoverAction(true)}
        onMouseLeave={() => setHoverAction(false)}
      >
        {(loading || uploading) && !hoverAction && (
          <Spinner color="greyDarker" size={24} />
        )}
        {((!loading && !uploading) || hoverAction) && (
          <Icon icon={IconCircleTimesFill} color="greyDarker" size={24} />
        )}
      </div>
      {error && (
        <div className={styles.error}>
          <Icon icon={IconWarn} color="red" size={24} />
          <span>
            <FormattedMessage defaultMessage="Unknown Error" id="tQV8l8" />
          </span>
        </div>
      )}
      {!error && (
        <ResponsiveImage
          url={asset.src}
          width={72}
          height={72}
          smUpWidth={72}
          smUpHeight={72}
          objectFix="cover"
        />
      )}
    </div>
  )
})
