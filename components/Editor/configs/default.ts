import { Quill } from 'react-quill'

import { KEYCODES } from '~/common/enums'

import '../blots'
// import '../modules/focus'
import '../modules/mention'
import lineBreakMatcher from '../utils/lineBreakMatcher'

const Parchment = Quill.import('parchment')

export const modules = {
  // focus: true,
  toolbar: [
    [{ header: '2' }, 'bold', 'italic', 'strike', 'underline'],
    ['blockquote', { list: 'ordered' }, { list: 'bullet' }, 'link']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
    matchers: [['BR', lineBreakMatcher]]
  },
  keyboard: {
    bindings: {
      tab: {
        key: KEYCODES.tab,
        handler() {
          return false
        }
      },
      handleEnter: {
        key: KEYCODES.enter,
        handler(range: any, context: any) {
          // @ts-ignore
          const quill = this.quill
          if (range.length > 0) {
            // Remove characters in selected range
            // So we do not trigger `text-change`
            quill.scroll.deleteAt(range.index, range.length)
          }

          const lineFormats = Object.keys(context.format).reduce(
            (lf: any, format) => {
              if (
                Parchment.query(format, Parchment.Scope.BLOCK) &&
                !Array.isArray(context.format[format])
              ) {
                lf[format] = context.format[format]
              }
              return lf
            },
            {}
          ) as any
          const previousChar = quill.getText(range.index - 1, 1)

          // Earlier scroll.deleteAt might have messed up our selection,
          // so insertText's built in selection preservation is not reliable
          quill.insertText(range.index, '\n', lineFormats, 'user')

          if (previousChar === '' || previousChar === '\n') {
            quill.setSelection(range.index + 2, 'silent')
          } else {
            quill.setSelection(range.index + 1, 'silent')
          }

          Object.keys(context.format).forEach(name => {
            if (lineFormats[name] != null) {
              return
            }
            if (Array.isArray(context.format[name])) {
              return
            }
            if (name === 'link') {
              return
            }
            quill.format(name, context.format[name], 'user')
          })
        }
      },
      linebreak: {
        key: KEYCODES.enter,
        shiftKey: true,
        handler(range: any) {
          // @ts-ignore
          const quill = this.quill
          const currentLeaf = quill.getLeaf(range.index)[0]
          const nextLeaf = quill.getLeaf(range.index + 1)[0]

          quill.insertEmbed(range.index, 'smartBreak', true, 'user')

          // Insert a second break if:
          // At the end of the editor, OR next leaf has a different parent (<p>)
          if (nextLeaf === null || currentLeaf.parent !== nextLeaf.parent) {
            quill.insertEmbed(range.index, 'smartBreak', true, 'user')
          }

          // Now that we've inserted a line break, move the cursor forward
          quill.setSelection(range.index + 1, 'silent')
        }
      }
    }
  }
}
