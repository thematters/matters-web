import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import { ACCEPTED_UPLOAD_TYPES, UPLOAD_FILE_SIZE_LIMIT } from '~/common/enums'
import ICON_EDITOR_IMAGE from '~/static/icons/editor-image.svg?sprite'
import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'

import styles from './styles.css'

interface UploadImageButtonProps {
  quill: Quill | null
  onSave: any
  setExpanded: (expanded: boolean) => void
}

const MUTATION_UPLOAD_FILE = gql`
  mutation SingleFileUpload($input: SingleFileUploadInput!) {
    singleFileUpload(input: $input) {
      ... on Asset {
        id
        path
      }
    }
  }
`

const acceptTypes = ACCEPTED_UPLOAD_TYPES.join(',')

const UploadImageButton = ({
  quill,
  onSave,
  setExpanded
}: UploadImageButtonProps) => {
  const insertImage = (src: string) => {
    if (quill) {
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'image', src, 'user')
      quill.setSelection(range.index + 1, 0, 'silent')
    }
  }

  const handleUploadChange = async (event: any, upload: any) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]

    if (file && file.size > UPLOAD_FILE_SIZE_LIMIT) {
      window.dispatchEvent(
        new CustomEvent('addMessage', {
          detail: {
            type: 'error',
            content: (
              <Translate
                zh_hant="上傳檔案請勿超過 1 MB"
                zh_hans="上传档案请勿超过 1 MB"
              />
            )
          }
        })
      )
      return
    }

    try {
      const {
        data: {
          singleFileUpload: { id, path }
        }
      } = await upload({ variables: { input: { file, type: 'embed' } } })
      onSave({ coverAssetId: id })
      insertImage(path)
      window.dispatchEvent(
        new CustomEvent('addMessage', {
          detail: {
            type: 'success',
            content: <Translate zh_hant="圖片上傳成功" zh_hans="图片上传成功" />
          }
        })
      )
    } catch (e) {
      setExpanded(false)
      window.dispatchEvent(
        new CustomEvent('addMessage', {
          detail: {
            type: 'error',
            content: <Translate zh_hant="圖片上傳失敗" zh_hans="图片上传失败" />
          }
        })
      )
    }
  }

  return (
    <Mutation mutation={MUTATION_UPLOAD_FILE}>
      {(upload, { loading }) => (
        <label className="upload-image-container">
          <input
            className="input"
            type="file"
            accept={acceptTypes}
            multiple={false}
            aria-label="新增圖片"
            onChange={(event: any) => handleUploadChange(event, upload)}
          />
          <Icon
            id={loading ? ICON_SPINNER.id : ICON_EDITOR_IMAGE.id}
            viewBox={loading ? ICON_SPINNER.viewBox : ICON_EDITOR_IMAGE.viewBox}
            size="large"
            className={loading ? 'u-motion-spin' : ''}
          />
          <style jsx>{styles}</style>
        </label>
      )}
    </Mutation>
  )
}

export default UploadImageButton
