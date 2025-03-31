import { Editor } from '@tiptap/core'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  ASSET_TYPE,
  EDITOR_IMAGE_UPLOAD_PROGRESS,
  INPUT_DEBOUNCE,
  MAX_FIGURE_CAPTION_LENGTH,
} from '~/common/enums'
import { getFileId, validateImage } from '~/common/utils'
import { toast } from '~/components'

import { type FigcaptionImageUploaderOptions } from '.'
import styles from './styles.module.css'

export type StorageAsset = {
  [fileId: string]: {
    preview?: string
    path?: string
    caption?: string
  }
}

export type UploaderProps = {
  file: File
  preview: string
}

/**
 * Restore uploaded to figureImage
 *
 * `<figure-image-uploader preview="blob:..."></figure-image-uploader>`
 *
 * to
 *
 * `<figure class="image"><img src="..." /><figcaption>caption</figcaption></figure>`
 */
export const restoreImages = (editor: Editor, content: string): string => {
  const assets = editor.storage.figureImageUploader.assets as StorageAsset

  const regex =
    /<figure-image-uploader[^>]+ preview="(blob:[^"]+)"><\/figure-image-uploader>/g
  const matches = content.match(regex)

  if (!matches) {
    return content
  }

  matches.forEach((match) => {
    const preview = match.match(/preview="(blob:[^"]+)"/)?.[1]
    const asset = Object.values(assets).find((a) => a.preview === preview)

    if (!asset || !asset.path) {
      return
    }

    const figure = `<figure class="image"><img src="${
      asset.path
    }" /><figcaption>${asset.caption || ''}</figcaption></figure>`

    content = content.replace(match, figure)
  })

  return content
}

const Uploader: React.FC<NodeViewProps> = (props) => {
  const { editor, node, deleteNode, extension } = props
  const { file, preview } = node.attrs as Pick<
    UploaderProps,
    'file' | 'preview'
  >
  const fileId = getFileId(file)
  const { upload, update, placeholder } = extension.options as Pick<
    FigcaptionImageUploaderOptions,
    'upload' | 'update' | 'placeholder'
  >

  const debounceUpdate = useDebouncedCallback(() => {
    if (!update) return

    const content = restoreImages(editor, editor.getHTML())

    update({ content })
  })

  const [caption, setCaption] = useState<string>('')
  const debouncedSetCaption = useDebouncedCallback((value) => {
    // update cache
    const assets = editor.storage.figureImageUploader.assets as StorageAsset
    editor.storage.figureImageUploader.assets[fileId] = {
      ...assets[fileId],
      caption,
    }

    // trigger update
    debounceUpdate()
  }, INPUT_DEBOUNCE)

  const progressRef = useRef<HTMLSpanElement>(null)

  const uploadImage = async (file: File) => {
    if (!upload) return

    const mime = await validateImage(file)
    if (!mime) return

    try {
      const assets = editor.storage.figureImageUploader.assets as StorageAsset
      const asset = assets[fileId]

      if (!asset?.path) {
        const path = (await upload({ file, type: ASSET_TYPE.embed, mime })).path

        progressRef?.current?.remove()

        // update cache
        editor.storage.figureImageUploader.assets[fileId] = {
          ...asset,
          preview,
          path,
        }

        // trigger update
        debounceUpdate()
      }
    } catch (e) {
      console.error(e)

      deleteNode()

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

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const caption = e.target.value

    if (caption.length > MAX_FIGURE_CAPTION_LENGTH) {
      return
    }

    setCaption(caption)
    debouncedSetCaption(caption)
  }

  useEffect(() => {
    uploadImage(file)

    if (progressRef.current) {
      progressRef.current.innerText = '0%'
    }

    const handleProgress = ((event: CustomEvent) => {
      const { fileId: uploadFileId, progress: uploadProgress } = event.detail

      if (!progressRef.current || uploadFileId !== fileId) {
        return
      }

      if (Math.round(uploadProgress) >= 99) {
        progressRef.current.innerText = '99%'
      } else {
        progressRef.current.innerText = `${Math.round(uploadProgress)}%`
      }
    }) as EventListener

    window.addEventListener(EDITOR_IMAGE_UPLOAD_PROGRESS, handleProgress)

    return () => {
      window.removeEventListener(EDITOR_IMAGE_UPLOAD_PROGRESS, handleProgress)
    }
  }, [])

  return (
    <NodeViewWrapper>
      <img src={preview} alt="Uploading..." />
      <figcaption>
        <input
          type="text"
          placeholder={placeholder}
          value={caption}
          onChange={handleCaptionChange}
        />
      </figcaption>
      <span ref={progressRef} className={styles.progressIndicator} />
    </NodeViewWrapper>
  )
}

export default Uploader
