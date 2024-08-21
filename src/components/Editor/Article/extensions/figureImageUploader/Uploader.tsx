import { Editor } from '@tiptap/core'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  ASSET_TYPE,
  INPUT_DEBOUNCE,
  MAX_FIGURE_CAPTION_LENGTH,
} from '~/common/enums'
import { validateImage } from '~/common/utils'
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

export const getFileId = (file: File) =>
  `${file.name}-${file.size}-${file.type}-${file.lastModified}`

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
  const duration = 3000 // 3 seconds
  const intervalTime = 100 // Update every 100ms
  const maxProgress = 99
  let intervalId: number

  const uploadImage = async (file: File) => {
    if (!upload) return

    const mime = await validateImage(file)
    if (!mime) return

    try {
      const assets = editor.storage.figureImageUploader.assets as StorageAsset
      const asset = assets[fileId]

      if (!asset?.path) {
        const path = (await upload({ file, type: ASSET_TYPE.embed, mime })).path

        // update cache
        editor.storage.figureImageUploader.assets[fileId] = {
          ...asset,
          preview,
          path,
        }

        // trigger update
        debounceUpdate()
      }

      if (progressRef.current) {
        progressRef.current.remove()
        clearInterval(intervalId)
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

  // Simulate upload progress
  useEffect(() => {
    const increment = Math.round((maxProgress / duration) * intervalTime)
    let progress = 0

    intervalId = window.setInterval(() => {
      const newProgress = progress + increment
      if (progressRef.current && newProgress <= maxProgress) {
        progress = newProgress
        progressRef.current.innerText = `${progress}%`
      }
    }, intervalTime)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    uploadImage(file)
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
