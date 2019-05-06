import { KEYCODES } from '~/common/enums'

import '../blots'
import '../modules/imageDrop'
import '../modules/mention'
import lineBreakMatcher from '../utils/lineBreakMatcher'

export const modules = {
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

export const foramts = [
  // inline
  'bold',
  'code',
  'italic',
  'link',
  'strike',
  'script',
  'underline',

  // block
  'header',
  'blockquote',
  'list',
  'code-block',

  // custom
  'divider',
  'embedClipboard',
  'embedCode',
  'embedVideo',
  'figcaption',
  'imageFigure',
  'audioFigure',
  'mention',
  'smartBreak'
]
