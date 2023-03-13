import { Node } from '@tiptap/core'
import { PluginKey } from '@tiptap/pm/state'
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion'

export * from './suggestion'

/**
 * Mention extension
 *
 * @see {https://tiptap.dev/api/nodes/mention}
 *
 * ```html
 * <a
 *  class="mention"
 *  href="LINK"
 *  data-display-name="DISPLAYNAME"
 *  data-user-name="USERNAME"
 *  >
 *   <span>@USERNAME</span>
 * </a>
 * ```
 */

export type MentionOptions = {
  suggestion: Omit<SuggestionOptions, 'editor'>
}

export const MentionPluginKey = new PluginKey('mention')

export const Mention = Node.create<MentionOptions>({
  name: 'mention',

  addOptions() {
    return {
      suggestion: {
        char: '@',
        pluginKey: MentionPluginKey,
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter
          const overrideSpace = nodeAfter?.text?.startsWith(' ')

          if (overrideSpace) {
            range.to += 1
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: 'text',
                text: ' ',
              },
            ])
            .run()

          window.getSelection()?.collapseToEnd()
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from)
          const type = state.schema.nodes[this.name]
          const allow = !!$from.parent.type.contentMatch.matchType(type)

          return allow
        },
      },
    }
  },

  group: 'inline',

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      userName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-user-name'),
        renderHTML: (attributes) => {
          if (!attributes.userName) {
            return {}
          }

          return {
            'data-user-name': attributes.userName,
          }
        },
      },

      displayName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-display-name'),
        renderHTML: (attributes) => {
          if (!attributes.displayName) {
            return {}
          }

          return {
            'data-display-name': attributes.displayName,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a',
        attrs: { class: 'mention' },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'a',
      {
        class: 'mention',
        href: '/' + this.options.suggestion.char + node.attrs.userName,
        'data-user-name': node.attrs.userName,
        'data-display-name': node.attrs.displayName,
      },
      ['span', `@${node.attrs.displayName ?? node.attrs.userName}`],
    ]
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false
          const { selection } = state
          const { empty, anchor } = selection

          if (!empty) {
            return false
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true
              tr.insertText(
                this.options.suggestion.char || '',
                pos,
                pos + node.nodeSize
              )

              return false
            }
          })

          return isMention
        }),
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
