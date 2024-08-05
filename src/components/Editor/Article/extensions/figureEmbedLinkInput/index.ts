import { mergeAttributes, ReactNodeViewRenderer } from '@matters/matters-editor'
import { Node } from '@tiptap/core'

import Input from './Input'

/**
 * FigureEmbedLinkInput is a extension works with FigureEmbed extension,
 * which allows users to input a link inside editor content.
 *
 */

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

  addStorage() {
    return {
      prevSelection: {
        from: 0,
        to: 0,
      },
    }
  },

  addAttributes() {
    return {
      placeholder: {
        default: null,
        // parseHTML: (element) => element.getAttribute('data-placeholder'),
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
        ({ chain, editor }) => {
          // store current selection before insert figureEmbedLinkInput
          editor.storage.figureEmbedLinkInput.prevSelection = {
            from: editor.state.selection.from,
            to: editor.state.selection.to,
          }

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
