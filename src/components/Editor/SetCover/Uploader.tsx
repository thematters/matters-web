import classNames from 'classnames'
import _omit from 'lodash/omit'
import { useContext, useId } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage, useIntl } from 'react-intl'

import IconCamera from '@/public/static/icons/24px/camera.svg'
import {
  ACCEPTED_COVER_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
} from '~/common/enums'
import { validateImage } from '~/common/utils'
import {
  DraftDetailStateContext,
  Icon,
  Spinner,
  TextIcon,
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
  AssetFragment,
  DirectImageUploadDoneMutation,
  DirectImageUploadMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

export interface UploadEntity {
  entityId: string
  entityType: ENTITY_TYPE.article | ENTITY_TYPE.draft
}

type UploaderProps = {
  setSelected: (asset: AssetFragment) => any
  refetchAssets: () => any
} & UploadEntity

const Uploader: React.FC<UploaderProps> = ({
  entityId,
  entityType,
  setSelected,
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

  const acceptTypes = ACCEPTED_COVER_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = useId()

  const { visuallyHiddenProps } = useVisuallyHidden()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    const mime = await validateImage(file)
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

  const labelClasses = classNames({
    [styles.uploader]: true,
    'u-area-disable': loading || uploading,
  })

  useUnloadConfirm({ block: loading || uploading })

  return (
    <label className={labelClasses} htmlFor={fieldId}>
      <h3>
        <TextIcon
          icon={<Icon icon={IconCamera} />}
          color="green"
          size={14}
          weight="medium"
          spacing={8}
        >
          <FormattedMessage defaultMessage="Upload Cover" id="QvPc1q" />
        </TextIcon>

        {(loading || uploading) && <Spinner color="greyLight" />}
      </h3>

      <p>
        <FormattedMessage
          defaultMessage="Recommended square image."
          id="CxYcYR"
        />
      </p>

      <input
        id={fieldId}
        type="file"
        name="file"
        aria-label={intl.formatMessage({
          defaultMessage: 'Upload Cover',
          id: 'QvPc1q',
        })}
        accept={acceptTypes}
        multiple={false}
        onChange={handleChange}
        {...visuallyHiddenProps}
      />
    </label>
  )
}

export default Uploader
