import React, { useState } from 'react'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  TEXT,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'
import ICON_EDITOR_IMAGE from '~/static/icons/editor-image.svg?sprite'
import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'

import styles from './styles.css'

interface UploadImageButtonProps {
  quill: Quill | null
  upload: DraftAssetUpload
  setExpanded: (expanded: boolean) => void
}

const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')

const UploadImageButton = ({
  quill,
  setExpanded,
  upload
}: UploadImageButtonProps) => {
  const [uploading, setUploading] = useState(false)

  const insertImage = (src: string, assetId: string) => {
    if (quill) {
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'imageFigure', { src, assetId }, 'user')
      quill.setSelection(range.index + 1, 0, 'silent')
    }
  }

  const handleUploadChange = async (event: any) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file && file.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="上傳檔案請勿超過 5 MB"
                zh_hans="上传文件请勿超过 5 MB"
              />
            )
          }
        })
      )
      return
    }

    try {
      setUploading(true)
      const { id, path } = await upload({ file })
      insertImage(path, id)
      setExpanded(false)
      setUploading(false)
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <Translate
                zh_hant={TEXT.zh_hant.uploadImageSuccess}
                zh_hans={TEXT.zh_hans.uploadImageSuccess}
              />
            )
          }
        })
      )
    } catch (e) {
      setExpanded(false)
      setUploading(false)
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant={TEXT.zh_hant.uploadImageFailed}
                zh_hans={TEXT.zh_hans.uploadImageFailed}
              />
            )
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
        aria-label="新增圖片"
        onChange={(event: any) => handleUploadChange(event)}
      />

      <Icon
        id={uploading ? ICON_SPINNER.id : ICON_EDITOR_IMAGE.id}
        viewBox={uploading ? ICON_SPINNER.viewBox : ICON_EDITOR_IMAGE.viewBox}
        size="large"
        className={uploading ? 'u-motion-spin' : 'u-motion-icon-hover'}
      />

      <style jsx>{styles}</style>
    </label>
  )
}

export default UploadImageButton
