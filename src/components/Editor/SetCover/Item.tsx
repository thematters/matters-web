import classNames from 'classnames'
import _omit from 'lodash/omit'
import { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCircleCheckFill2 } from '@/public/static/icons/24px/circle-check-fill-2.svg'
import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import { validateImage } from '~/common/utils'
import {
  DraftDetailStateContext,
  Icon,
  ResponsiveImage,
  Spinner,
  toast,
  useDirectImageUpload,
  useMutation,
  useRoute,
  useUnloadConfirm,
} from '~/components'
import {
  DIRECT_IMAGE_UPLOAD,
  DIRECT_IMAGE_UPLOAD_DONE,
} from '~/components/GQL/mutations/uploadFile'
import {
  DirectImageUploadDoneMutation,
  DirectImageUploadMutation,
} from '~/gql/graphql'

import { EditorAsset } from '.'
import styles from './styles.module.css'

export interface UploadEntity {
  entityId: string
  entityType: ENTITY_TYPE.article | ENTITY_TYPE.draft
}

type ItemProps = {
  asset: EditorAsset
  selected?: EditorAsset
  setSelected: (asset: EditorAsset | undefined) => any
  updateAsset: (asset: EditorAsset) => any
  refetchAssets: () => any
} & UploadEntity

const Item: React.FC<ItemProps> = ({
  asset,
  entityId,
  entityType,
  selected,
  setSelected,
  updateAsset,
  refetchAssets,
}) => {
  const intl = useIntl()

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

  const { isInPath } = useRoute()
  const { createDraft } = useContext(DraftDetailStateContext)

  const uploadAsset = async () => {
    if (!upload || !asset.file) {
      return
    }

    const file = asset.file

    const mime = await validateImage(asset.file)
    if (!mime) {
      return
    }

    try {
      // create draft if not exist
      const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
      if (isInDraftDetail && !entityId) {
        await createDraft({
          onCreate: (newDraftId) => {
            entityId = newDraftId
          },
        })
      }

      const variables = {
        input: {
          file,
          type: ASSET_TYPE.cover,
          entityId,
          entityType,
          mime,
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
        updateAsset({
          draftId: asset.draftId,
          id: assetId,
          path: asset.path,
          type: ASSET_TYPE.cover as any,
          draft: false,
          file: undefined,
        })
        refetchAssets()

        if (data?.directImageUpload) {
          setSelected(data?.directImageUpload)
        }
      } else {
        throw new Error()
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
  }

  useEffect(() => {
    if (asset.draft) {
      uploadAsset()
    }
  }, [])

  useUnloadConfirm({ block: loading || uploading })

  const isSelected = asset.id === selected?.id

  const itemClasses = classNames({
    [styles.item]: true,
    [styles.selected]: isSelected,
  })

  return (
    <>
      <button
        type="button"
        onClick={() => setSelected(isSelected ? undefined : asset)}
        aria-label={intl.formatMessage({
          defaultMessage: `Set as cover`,
          id: 'BNupBu',
        })}
        className={itemClasses}
        disabled={loading || uploading}
      >
        {(loading || uploading) && (
          <div className={styles.loading}>
            <Spinner color="greyLight" size={32} />
          </div>
        )}
        <ResponsiveImage
          url={asset.path}
          width={101}
          height={101}
          smUpWidth={101}
          smUpHeight={101}
        />
        {isSelected && <Icon icon={IconCircleCheckFill2} size={20} />}
      </button>
    </>
  )
}

export default Item
