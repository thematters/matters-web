import { mergeAttributes, ReactNodeViewRenderer } from '@matters/matters-editor'
import { Node } from '@tiptap/core'

import Input from './Input'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureEmbedLinkInput: {
      addFigureEmbedLinkInput: (options: { placeholder: string }) => ReturnType
    }
  }
}

const pluginName = 'figureEmbedLinkInput'

export const FigureEmbedLinkInput = Node.create({
  name: pluginName,
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      placeholder: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-placeholder'),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure-embed-link-input',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure-embed-link-input', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Input)
  },

  addCommands() {
    return {
      addFigureEmbedLinkInput:
        (attrs) =>
        ({ chain }) => {
          return chain()
            .insertContent([
              {
                type: this.name,
                attrs,
                content: [],
              },
            ])
            .run()
        },
    }
  },
})
