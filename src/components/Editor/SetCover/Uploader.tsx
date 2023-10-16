import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import _omit from 'lodash/omit'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
} from '~/common/enums'
import { sleep, translate, validateImage } from '~/common/utils'
import {
  IconCamera16,
  IconSpinner16,
  LanguageContext,
  TextIcon,
  toast,
  Translate,
  useCreateDraft,
  useDirectImageUpload,
  useMutation,
  useRoute,
  useUnloadConfirm,
} from '~/components'
import { updateDraftAssets } from '~/components/GQL'
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
  const { lang } = useContext(LanguageContext)

  const [upload, { loading }] = useMutation<DirectImageUploadMutation>(
    DIRECT_IMAGE_UPLOAD,
    {
      update: async (cache, { data }) => {
        if (data?.directImageUpload) {
          // FIXME: newly uploaded images will return 404 in a short time
          // https://community.cloudflare.com/t/new-uploaded-images-need-about-10-min-to-display-in-my-website/121568
          await sleep(300)

          updateDraftAssets({
            cache,
            id: entityId,
            asset: data.directImageUpload,
          })
        }
      },
    },
    { showToast: false }
  )
  const [directImageUploadDone] = useMutation<DirectImageUploadDoneMutation>(
    DIRECT_IMAGE_UPLOAD_DONE,
    undefined,
    { showToast: false }
  )
  const { upload: uploadImage, uploading } = useDirectImageUpload()

  const { isInPath } = useRoute()
  const { createDraft } = useCreateDraft()

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'editor-cover-upload-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    const isValidImage = await validateImage(file)
    if (!isValidImage) {
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
        },
      }
      const { data } = await upload({ variables })

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
      toast.error({ message: <Translate id="failureUploadImage" /> })
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
          icon={<IconCamera16 />}
          color="green"
          size="sm"
          weight="md"
          spacing="xtight"
        >
          <Translate id="uploadCover" />
        </TextIcon>

        {(loading || uploading) && <IconSpinner16 color="greyLight" />}
      </h3>

      <p>
        <FormattedMessage defaultMessage="Recommended square image." />
      </p>

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={translate({ id: 'uploadCover', lang })}
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
        />
      </VisuallyHidden>
    </label>
  )
}

export default Uploader
