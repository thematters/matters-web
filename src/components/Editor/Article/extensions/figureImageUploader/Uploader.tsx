import { Editor } from '@tiptap/core'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ASSET_TYPE } from '~/common/enums'
import { validateImage } from '~/common/utils'
import { toast } from '~/components'

import styles from './styles.module.css'

export type StorageAsset = {
  [fileId: string]: {
    previewSrc?: string
    path?: string
  }
}

export const getFileId = (file: File) =>
  `${file.name}-${file.size}-${file.type}-${file.lastModified}`

/**
 * Restore image URL from `previewPath` to `path`
 */
export const restoreImages = (editor: Editor, content: string): string => {
  const assets = editor.storage.figureImageUploader.assets as StorageAsset
  const regex = /src="blob:([^"]+)"/g
  const matches = content.match(regex) || []

  for (const match of matches) {
    const previewSrc = match.replace('src="', '').replace('"', '')
    const assetMap = Object.entries(assets)
    const asset = assetMap.find(([_previewSrc]) => _previewSrc === previewSrc)

    if (asset && asset[1].path) {
      content = content.replace(previewSrc, asset[1].path)
    }
  }

  return content
}

export type UploaderProps = {
  file: File
  upload: (input: {
    file?: File
    url?: string
    type?: ASSET_TYPE.embed | ASSET_TYPE.embedaudio
    mime?: string
  }) => Promise<{
    id: string
    path: string
  }>
}

const Uploader: React.FC<NodeViewProps> = (props) => {
  const { editor, node, deleteNode, getPos } = props
  const { file, upload } = node.attrs as UploaderProps

  const fileId = getFileId(file)
  const assets = editor.storage.figureImageUploader.assets as StorageAsset
  const asset = assets[fileId]
  const [previewSrc] = useState(
    asset ? asset.previewSrc : URL.createObjectURL(file)
  )

  const [progress, setProgress] = useState(0)
  const duration = 3000 // 3 seconds
  const intervalTime = 100 // Update every 100ms
  const maxProgress = 99

  const uploadAndReplace = async (file: File) => {
    const mime = await validateImage(file)

    if (!mime) return

    try {
      if (!asset?.path) {
        // upload and update cache
        const path = (await upload({ file, type: ASSET_TYPE.embed, mime })).path

        // update cache
        const assets = editor.storage.figureImageUploader.assets as StorageAsset
        editor.storage.figureImageUploader.assets = {
          ...assets,
          [fileId]: {
            previewSrc,
            path,
          },
        }
      }

      // position to insert
      const currentPos = editor.state.selection.$from.pos
      const pos = getPos()

      // delete node view
      deleteNode()

      // insert figure image
      editor
        .chain()
        .insertContentAt(pos, [
          {
            type: 'figureImage',
            attrs: {
              // use `previewSrc` to avoid loading image,
              // replaced by `path` before send to server
              // @see {restoreImages}
              src: previewSrc,
            },
          },
        ])
        .setTextSelection(currentPos + 1)
        .run()
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

  // Simulate upload progress
  useEffect(() => {
    const increment = (maxProgress / duration) * intervalTime
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.floor(prevProgress + increment)
        if (newProgress >= maxProgress) {
          clearInterval(intervalId)
          return maxProgress
        }
        return newProgress
      })
    }, intervalTime)

    return () => clearInterval(intervalId)
  }, [])

  // Upload image
  useEffect(() => {
    uploadAndReplace(file)
  }, [])

  return (
    <NodeViewWrapper>
      <img src={previewSrc} alt="Uploading..." />
      <figcaption>
        <br />
      </figcaption>
      <span className={styles.progressIndicator}>{progress}%</span>
    </NodeViewWrapper>
  )
}

export default Uploader
