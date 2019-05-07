import React, { useState } from 'react'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import {
  ACCEPTED_UPLOAD_AUDIO_TYPES,
  UPLOAD_AUDIO_SIZE_LIMIT
} from '~/common/enums'
import ICON_EDITOR_AUDIO from '~/static/icons/editor-audio.svg?sprite'
import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'

import styles from './styles.css'

interface UploadAudioButtonProps {
  quill: Quill | null
  upload: Upload
  setExpanded: (expanded: boolean) => void
}

const acceptTypes = ACCEPTED_UPLOAD_AUDIO_TYPES.join(',')

const UploadAudioButton = ({
  quill,
  setExpanded,
  upload
}: UploadAudioButtonProps) => {
  const [uploading, setUploading] = useState(false)

  const insertAudio = ({
    src,
    fileName,
    mimeType,
    assetId
  }: {
    src: string
    fileName: string
    mimeType: string
    assetId: string
  }) => {
    if (quill) {
      const range = quill.getSelection(true)
      quill.insertEmbed(
        range.index,
        'audioFigure',
        { sources: [{ src, type: mimeType, assetId }], fileName },
        'user'
      )
      quill.setSelection(range.index + 1, 0, 'silent')
    }
  }

  const handleUploadChange = async (event: any) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    const fileName = file.name.split('.')[0]
    const mimeType = file.type
    event.target.value = ''

    if (file && file.size > UPLOAD_AUDIO_SIZE_LIMIT) {
      window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="上傳檔案請勿超過 100 MB"
                zh_hans="上传文件请勿超过 100 MB"
              />
            )
          }
        })
      )
      return
    }

    try {
      setUploading(true)
      const { id: assetId, path } = await upload({ file })
      insertAudio({ src: path, fileName, mimeType, assetId })
      setExpanded(false)
      setUploading(false)
      window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            color: 'green',
            content: <Translate zh_hant="音頻上傳成功" zh_hans="音频上传成功" />
          }
        })
      )
    } catch (e) {
      setExpanded(false)
      setUploading(false)
      window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            color: 'red',
            content: <Translate zh_hant="音頻上傳失敗" zh_hans="音频上传失败" />
          }
        })
      )
      console.error(e)
    }
  }

  return (
    <label className="upload-container">
      <input
        className="input"
        type="file"
        accept={acceptTypes}
        multiple={false}
        aria-label="新增音頻"
        onChange={(event: any) => handleUploadChange(event)}
      />
      <Icon
        id={uploading ? ICON_SPINNER.id : ICON_EDITOR_AUDIO.id}
        viewBox={uploading ? ICON_SPINNER.viewBox : ICON_EDITOR_AUDIO.viewBox}
        size="large"
        className={uploading ? 'u-motion-spin' : 'u-motion-icon-hover'}
      />
      <style jsx>{styles}</style>
    </label>
  )
}

export default UploadAudioButton
