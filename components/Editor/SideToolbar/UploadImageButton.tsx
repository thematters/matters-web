import React from 'react'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import {
  ACCEPTED_UPLOAD_TYPES,
  ADD_TOAST,
  TEXT,
  UPLOAD_FILE_SIZE_LIMIT
} from '~/common/enums'
import ICON_EDITOR_IMAGE from '~/static/icons/editor-image.svg?sprite'
import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'

import styles from './styles.css'

type Upload = (input: {
  file?: any
  url?: string
}) => Promise<{
  id: string
  path: string
}>

interface UploadImageButtonProps {
  quill: Quill | null
  upload: Upload
  uploading: boolean
  setExpanded: (expanded: boolean) => void
}

const acceptTypes = ACCEPTED_UPLOAD_TYPES.join(',')

const UploadImageButton = ({
  quill,
  setExpanded,
  upload,
  uploading
}: UploadImageButtonProps) => {
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

    if (file && file.size > UPLOAD_FILE_SIZE_LIMIT) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="上傳檔案請勿超過 5 MB"
                zh_hans="上传档案请勿超过 5 MB"
              />
            )
          }
        })
      )
      return
    }

    try {
      const { id, path } = await upload({ file })
      insertImage(path, id)
      setExpanded(false)
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
    }
  }

  return (
    <label className="upload-image-container">
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
