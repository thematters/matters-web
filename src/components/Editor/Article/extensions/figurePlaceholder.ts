import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

/**
 * FigurePlaceholder is a extension works with
 * FigureEmbed, FigureImage and FigureAudio extensions,
 * which provides placeholder support for <figcaption>.
 *
 * @see {https://tiptap.dev/api/extensions/placeholder}
 */

export interface PlaceholderOptions {
  emptyNodeClass: string
  placeholder: string
}

const pluginName = 'figurePlaceholder'

export const FigurePlaceholder = Extension.create<PlaceholderOptions>({
  name: pluginName,

  addOptions() {
    return {
      emptyNodeClass: 'is-figure-empty',
      placeholder: 'Write something …',
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(pluginName),
        props: {
          decorations: ({ doc, selection }) => {
            const decorations: Decoration[] = []

            doc.descendants((node, pos) => {
              const isFigure = node.type.name.startsWith('figure')
              if (!isFigure) return

              const isEmpty = !node.isLeaf && !node.childCount
              if (!isEmpty) return

              // focus on the figcaption node
              const isAtFigcaption = selection.$anchor.pos === pos + 1
              if (isAtFigcaption) return

              const decoration = Decoration.node(pos, pos + node.nodeSize, {
                class: this.options.emptyNodeClass,
                'data-figure-placeholder': this.options.placeholder,
              })

              decorations.push(decoration)
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
