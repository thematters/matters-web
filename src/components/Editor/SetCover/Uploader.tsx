import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ASSET_TYPE,
  ENTITY_TYPE,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  IconCamera16,
  IconSpinner16,
  LanguageContext,
  TextIcon,
  toast,
  Translate,
  useMutation,
  useUnloadConfirm,
} from '~/components'
import { updateDraftAssets } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { AssetFragment, SingleFileUploadMutation } from '~/gql/graphql'

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

  const [upload, { loading }] = useMutation<SingleFileUploadMutation>(
    UPLOAD_FILE,
    {
      update: (cache, { data }) => {
        if (data?.singleFileUpload) {
          updateDraftAssets({
            cache,
            id: entityId,
            asset: data.singleFileUpload,
          })
        }
      },
    },
    { showToast: false }
  )

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'editor-cover-upload-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file?.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      toast.error({
        message: (
          <Translate
            zh_hant="上傳檔案超過 5 MB"
            zh_hans="上传文件超过 5 MB"
            en="upload file size exceeds 5 MB"
          />
        ),
      })
      return
    }

    try {
      const { data } = await upload({
        variables: {
          input: {
            file,
            type: ASSET_TYPE.cover,
            entityId,
            entityType,
          },
        },
      })

      refetchAssets()

      if (data?.singleFileUpload) {
        setSelected(data?.singleFileUpload)
      } else {
        throw new Error()
      }

      toast.success({
        message: <Translate id="successUploadImage" />,
      })
    } catch (e) {
      toast.error({
        message: <Translate id="failureUploadImage" />,
      })
    }
  }

  const labelClasses = classNames({
    [styles.uploader]: true,
    'u-area-disable': loading,
  })

  useUnloadConfirm({ block: loading })

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

        {loading && <IconSpinner16 color="greyLight" />}
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
