import { Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

/**
 * CaptionLimit extension:
 *
 * @see {https://github.com/ueberdosis/tiptap/issues/629}
 */

type CaptionLimitOptions = {
  maxCaptionLength?: number
}

const pluginName = 'captionLimit'

export const CaptionLimit = Node.create<CaptionLimitOptions>({
  name: pluginName,

  addOptions() {
    return {
      maxCaptionLength: undefined,
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(pluginName),
        filterTransaction: (transaction, state) => {
          // Nothing has changed, ignore it.
          if (!transaction.docChanged || !this.options.maxCaptionLength) {
            return true
          }

          try {
            // skip if not in a figure
            const anchorParent = transaction.selection.$anchor.parent
            const isFigure = anchorParent.type.name.includes('figure')
            if (!isFigure) {
              return true
            }

            // limit figcaption length
            const figcaptionText = anchorParent.content.child(0).text || ''
            if (figcaptionText.length > this.options.maxCaptionLength) {
              return false
            }
          } catch (e) {
            console.error(e)
          }

          return true
        },
      }),
    ]
  },
})
