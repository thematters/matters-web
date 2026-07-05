import { ApolloError } from '@apollo/client'
import _omit from 'lodash/omit'
import { memo, useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconCircleTimesFill from '@/public/static/icons/24px/circle-times-fill.svg'
import IconWarn from '@/public/static/icons/24px/warn.svg'
import { ERROR_CODES } from '~/common/enums'
import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums/file'
import { validateImage } from '~/common/utils'
import { useDirectImageUpload, useMutation, ViewerContext } from '~/components'
import { getErrorCodes } from '~/components/GQL'
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
  onUploaded: (asset: MomentAsset, assetId: string, path: string) => void
}

type UploadedAsset = {
  assetId: string
  path: string
}

const UploadErrorMessage = ({ error }: { error?: Error }) => {
  const [code] = getErrorCodes(error as ApolloError)

  if (code === ERROR_CODES.ACTION_LIMIT_EXCEEDED) {
    return <FormattedMessage defaultMessage="Too Frequent" id="WHd6DD" />
  }

  if (error) {
    return <FormattedMessage defaultMessage="Upload Failed" id="/BZiQv" />
  }

  return <FormattedMessage defaultMessage="Unknown Error" id="tQV8l8" />
}

export const Item = memo(function Item({
  asset,
  removeAsset,
  onUploaded,
}: ItemProps) {
  const viewer = useContext(ViewerContext)
  const [hoverAction, setHoverAction] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [deleted, setDeleted] = useState(false)

  const [uploadedAsset, setUploadedAsset] = useState<UploadedAsset | undefined>(
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
    if (deleted || !uploadedAsset) {
      return
    }

    if (uploadedAsset) {
      onUploaded(asset, uploadedAsset.assetId, uploadedAsset.path)
    }
  }, [deleted, uploadedAsset])

  useEffect(() => {
    const uploadAsset = async () => {
      if (asset.uploaded || !upload) {
        return
      }

      const { file } = asset
      if (!(file instanceof File)) {
        setError(new Error('Moment asset upload file is missing'))
        return
      }

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
          }).catch((error) => {
            console.error('[MomentAssetsUploader] direct upload done failed', {
              error,
              assetId,
              path,
            })
          })

          setUploadedAsset({ assetId, path })
        } else {
          throw new Error()
        }
      } catch (e) {
        setError(e as Error)
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
            <UploadErrorMessage error={error} />
          </span>
        </div>
      )}
      {!error && (
        <ResponsiveImage
          url={asset.path}
          width={72}
          height={72}
          smUpWidth={72}
          smUpHeight={72}
        />
      )}
    </div>
  )
})
