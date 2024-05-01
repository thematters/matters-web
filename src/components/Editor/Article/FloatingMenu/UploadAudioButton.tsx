import { Editor } from '@matters/matters-editor'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useContext, useState } from 'react'

import { ReactComponent as IconEditorAudio } from '@/public/static/icons/editor-audio.svg'
import {
  ACCEPTED_UPLOAD_AUDIO_TYPES,
  ASSET_TYPE,
  UPLOAD_AUDIO_SIZE_LIMIT,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  LanguageContext,
  Spinner,
  toast,
  Translate,
  withIcon,
} from '~/components'

import styles from './styles.module.css'

export type UploadAudioButtonProps = {
  editor: Editor
  upload: (input: {
    file?: any
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
  const { lang } = useContext(LanguageContext)
  const [uploading, setUploading] = useState(false)

  const acceptTypes = ACCEPTED_UPLOAD_AUDIO_TYPES.join(',')
  const fieldId = 'editor-audio-upload-form'

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
    } catch (e) {
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
    <label
      className={labelClasses}
      htmlFor={fieldId}
      title={translate({
        zh_hant: '插入音訊',
        zh_hans: '插入音频',
        en: 'Insert audio',
        lang,
      })}
    >
      {!uploading && withIcon(IconEditorAudio)({ size: 32 })}
      {uploading && <Spinner size={32} color="greyLight" />}

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={translate({
            zh_hant: '插入音訊',
            zh_hans: '插入音频',
            en: 'Insert audio',
            lang,
          })}
          disabled={uploading}
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
        />
      </VisuallyHidden>
    </label>
  )
}

export default UploadAudioButton
