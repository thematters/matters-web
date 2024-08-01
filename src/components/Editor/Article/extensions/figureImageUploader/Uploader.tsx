import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ASSET_TYPE } from '~/common/enums'
import { validateImage } from '~/common/utils'
import { toast } from '~/components'

import styles from './styles.module.css'

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
  const [previewSrc] = useState(URL.createObjectURL(file))
  const [progress, setProgress] = useState(0)
  const duration = 3000 // 3 seconds
  const intervalTime = 100 // Update every 100ms
  const maxProgress = 99

  const uploadAndReplace = async (file: File) => {
    const mime = await validateImage(file)

    if (!mime) return

    try {
      // read from storage cache to prevent duplicate upload
      // when redo and undo
      const assets = editor.storage.figureImageUploader.assets as {
        [key: string]: string
      }
      let path = assets[previewSrc]

      // upload and update cache
      if (!path) {
        path = (await upload({ file, type: ASSET_TYPE.embed, mime })).path

        editor.storage.figureImageUploader.assets = {
          ...assets,
          [previewSrc]: path,
        }
      }

      // position to insert
      const pos = getPos()

      // delete node view
      deleteNode()

      // insert figure image
      editor
        .chain()
        .insertContentAt(pos, [{ type: 'figureImage', attrs: { src: path } }])
        .run()
    } catch (e) {
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
      <span className={styles.progressIndicator}>{progress}%</span>
    </NodeViewWrapper>
  )
}

export default Uploader
