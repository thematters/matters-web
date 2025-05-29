import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useId, useState } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { useIntl } from 'react-intl'

import IconEditorAudio from '@/public/static/icons/editor-audio.svg'
import {
  ACCEPTED_UPLOAD_AUDIO_TYPES,
  ASSET_TYPE,
  BREAKPOINTS,
  UPLOAD_AUDIO_SIZE_LIMIT,
} from '~/common/enums'
import {
  Icon,
  Spinner,
  toast,
  Tooltip,
  Translate,
  useMediaQuery,
} from '~/components'

import styles from './styles.module.css'

export type UploadAudioButtonProps = {
  editor: Editor
  upload: (input: {
    file?: File
    url?: string
    type?: ASSET_TYPE.embed | ASSET_TYPE.embedaudio
  }) => Promise<{
    id: string
    path: string
  }>
}

const UploadAudioButton: React.FC<UploadAudioButtonProps> = ({
  editor,
  upload,
}) => {
  const intl = useIntl()
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)
  const [uploading, setUploading] = useState(false)

  const acceptTypes = ACCEPTED_UPLOAD_AUDIO_TYPES.join(',')
  const fieldId = useId()

  const { visuallyHiddenProps } = useVisuallyHidden()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    const fileName = file.name.split('.')[0]
    event.target.value = ''

    if (file?.size > UPLOAD_AUDIO_SIZE_LIMIT) {
      toast.error({
        message: (
          <Translate
            zh_hant="上傳檔案超過 100 MB"
            zh_hans="上传文件超过 100 MB"
            en="upload file size exceeds 100 MB"
          />
        ),
      })

      return
    }

    try {
      setUploading(true)

      const { path } = await upload({ file, type: ASSET_TYPE.embedaudio })

      editor
        .chain()
        .focus()
        .setFigureAudio({ src: path, title: fileName })
        .run()

      toast.success({
        message: (
          <Translate
            zh_hant="音訊上傳成功"
            zh_hans="音频上传成功"
            en="Audio upload successfully"
          />
        ),
      })
    } catch {
      toast.error({
        message: (
          <Translate
            zh_hant="音訊上傳失敗"
            zh_hans="音频上传失败"
            en="Failed to upload, please try again."
          />
        ),
      })
    }

    setUploading(false)
  }

  const labelClasses = classNames({
    [styles.uploadButton]: true,
    'u-area-disable': uploading,
  })

  return (
    <Tooltip
      content={intl.formatMessage({
        defaultMessage: 'Audio',
        id: '6mbNSp',
        description: 'src/components/Editor',
      })}
      placement="top"
      disabled={!isMdUp}
    >
      <label className={labelClasses} htmlFor={fieldId}>
        {!uploading && <Icon icon={IconEditorAudio} size={32} />}
        {uploading && <Spinner size={32} color="greyLight" />}

        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={intl.formatMessage({
            defaultMessage: 'Audio',
            id: '6mbNSp',
            description: 'src/components/Editor',
          })}
          disabled={uploading}
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
          {...visuallyHiddenProps}
        />
      </label>
    </Tooltip>
  )
}

export default UploadAudioButton
