import { Quill } from 'react-quill'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  TEXT,
  UPLOAD_IMAGE_SIZE_LIMIT
} from '~/common/enums'
import { translate } from '~/common/utils'

class ImageDrop {
  quill: Quill
  language: Language
  onImageDrop: (file: any) => Promise<{ id: string; path: string }>

  constructor(quill: Quill, options: any) {
    this.quill = quill
    this.language = options.language
    this.onImageDrop = options.onImageDrop
    this.insertImage = this.insertImage.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFiles = this.handleFiles.bind(this)
    this.quill.root.addEventListener('drop', this.handleDrop, false)
  }

  async handleDrop(event: any) {
    event.preventDefault()
    event.stopPropagation()
    if (
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0
    ) {
      if (event.dataTransfer.files.length > 1) {
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'red',
              content: translate({
                zh_hant: '請一次上傳一個檔案',
                zh_hans: '请一次上传一个文件',
                lang: this.language
              })
            }
          })
        )
        return undefined
      }
      const file = event.dataTransfer.files[0]
      if (file && file.size > UPLOAD_IMAGE_SIZE_LIMIT) {
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'red',
              content: translate({
                zh_hant: '上傳檔案請勿超過 5 MB',
                zh_hans: '上传文件请勿超过 5 MB',
                lang: this.language
              })
            }
          })
        )
        return undefined
      }
      const assets = await this.handleFiles(file)
      assets.forEach(({ id, path }: { [key: string]: any }) =>
        this.insertImage(path, id)
      )
    }
  }

  async handleFiles(file: any): Promise<any[]> {
    if (file && file.type && ACCEPTED_UPLOAD_IMAGE_TYPES.includes(file.type)) {
      try {
        const asset = await this.onImageDrop(file)
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: translate({
                zh_hant: TEXT.zh_hant.uploadImageSuccess,
                zh_hans: TEXT.zh_hans.uploadImageSuccess,
                lang: this.language
              })
            }
          })
        )
        return [asset]
      } catch (error) {
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'red',
              content: translate({
                zh_hant: TEXT.zh_hant.uploadImageFailed,
                zh_hans: TEXT.zh_hans.uploadImageFailed,
                lang: this.language
              })
            }
          })
        )
      }
    }
    return []
  }

  insertImage(src: string, assetId: string) {
    if (this.quill) {
      const selection = this.quill.getSelection()
      const index = selection ? selection.index : this.quill.getLength()
      this.quill.insertEmbed(index, 'imageFigure', { src, assetId }, 'user')
      this.quill.setSelection(index + 1, 0, 'silent')
    }
  }
}

Quill.register('modules/imageDrop', ImageDrop)

export default ImageDrop
