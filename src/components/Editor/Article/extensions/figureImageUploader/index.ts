import { mergeAttributes, ReactNodeViewRenderer } from '@matters/matters-editor'
import { Node } from '@tiptap/core'

import { ASSET_TYPE } from '~/common/enums'
import { getFileId } from '~/common/utils'

import Uploader, { StorageAsset, UploaderProps } from './Uploader'

export { restoreImages } from './Uploader'

/**
 * FigureImageUploader is a extension to upload image.
 */

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureImageUploader: {
      insertFigureImageUploaders: (options: {
        files: File[]
        pos?: number
      }) => ReturnType
    }
  }
}

export type FigcaptionImageUploaderOptions = {
  upload?: (input: {
    file?: File
    url?: string
    type?: ASSET_TYPE.embed
    mime?: string
  }) => Promise<{
    id: string
    path: string
  }>
  update?: (params: { content: string }) => void
  placeholder?: string
}

const pluginName = 'figureImageUploader'

export const FigureImageUploader = Node.create<FigcaptionImageUploaderOptions>({
  name: pluginName,
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      file: { default: null },
      preview: { default: null },
    } as { [key in keyof UploaderProps]: { default: null } }
  },

  addOptions() {
    return {
      upload: undefined,
      update: undefined,
      placeholder: 'Write something …',
    }
  },

  addStorage() {
    return {
      assets: {},
    }
  },

  parseHTML() {
    return [{ tag: 'figure-image-uploader' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure-image-uploader', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Uploader, {
      className: 'figure-image-uploader',
    })
  },

  addCommands() {
    return {
      insertFigureImageUploaders:
        ({ files, pos, ...restAttrs }) =>
        ({ chain }) => {
          if (!files.length) {
            return true
          }

          const assets = this.editor.storage[pluginName].assets as StorageAsset

          const content = [
            ...files.map((file) => {
              const fileId = getFileId(file)
              const asset = assets[fileId]

              // If asset is already uploaded, insert FigureImage
              if (asset && asset.path && asset.preview) {
                return {
                  type: 'figureImage',
                  attrs: { src: asset.preview },
                  content: [],
                }
              }

              // Otherwise, insert FigureImageUploader
              const preview = URL.createObjectURL(file)
              return {
                type: this.name,
                attrs: { file, preview },
                content: [],
              }
            }),
          ]

          if (!pos) {
            return chain().insertContent(content).focus().run()
          }

          return chain().insertContentAt(pos, content).focus().run()
        },
    }
  },
})
