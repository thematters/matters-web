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
 *  data-id="ID"
 *  data-display-name="DISPLAYNAME"
 *  data-user-name="USERNAME"
 *  rel="noopener noreferrer nofollow"
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
  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  addOptions() {
    return {
      suggestion: {
        char: '@',
        allowedPrefixes: null,
        pluginKey: MentionPluginKey,
        command: ({ editor, range, props }) => {
          const { $from, $to } = editor.view.state.selection
          const isNewLine = $from.parentOffset === 1
          const nodeBefore = $to.nodeBefore
          const nodeAfter = $to.nodeAfter
          const hasBeforeSpace = nodeBefore?.text?.startsWith(' ')
          const hasAfterSpace = nodeAfter?.text?.startsWith(' ')

          const insertContent = []
          if (!isNewLine && !hasBeforeSpace) {
            insertContent.push({
              type: 'text',
              text: ' ',
            })
          }
          insertContent.push({
            type: this.name,
            attrs: props,
          })
          if (!hasAfterSpace) {
            insertContent.push({
              type: 'text',
              text: ' ',
            })
          }

          editor.chain().focus().insertContentAt(range, insertContent).run()

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

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
      },
      userName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-user-name'),
      },
      displayName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-display-name'),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[class="mention"]',
      },
    ]
  },

  renderHTML({ node }) {
    return [
      'a',
      {
        class: 'mention',
        href: '/' + this.options.suggestion.char + node.attrs.userName,
        'data-id': node.attrs.id,
        'data-user-name': node.attrs.userName,
        'data-display-name': node.attrs.displayName,
        ref: 'noopener noreferrer nofollow',
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
