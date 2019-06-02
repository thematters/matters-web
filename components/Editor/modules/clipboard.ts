import { Quill } from 'react-quill'

import { dom, isSafari } from '~/common/utils'

const Delta = Quill.import('delta')

const CodeBlock = Quill.import('formats/code')

const Clipboard = Quill.import('modules/clipboard')

/**
 * Override Clipboard due to pasting cause browser scroll to top. And
 * it seems no solution for this bug at this moment.
 *
 * @see: https://github.com/quilljs/quill/issues/1374
 */
class RemadeClipboard extends Clipboard {
  onPaste(event: any) {
    if (event.defaultPrevented || !this.quill.isEnabled()) {
      return undefined
    }
    // store scroll position
    const target = isSafari() ? 'body' : 'html'
    const element = dom.$(target)
    const scrollTop = element ? element.scrollTop || 0 : 0

    // parse and concat data
    const range = this.quill.getSelection(true)
    event.preventDefault()
    event.stopPropagation()

    const formats = this.quill.getFormat(this.quill.selection.savedRange.index)
    const html = event.clipboardData.getData('text/html')
    const text = event.clipboardData.getData('text/plain')

    let delta = new Delta().retain(range.index)
    if (formats[CodeBlock.blotName]) {
      delta.insert(text, {
        [CodeBlock.blotName]: formats[CodeBlock.blotName]
      })
    } else if (!html) {
      delta.insert(text)
    } else {
      const pasteDelta = this.convert(html)
      delta = delta.concat(pasteDelta)
    }
    delta.delete(range.length)
    this.quill.updateContents(delta, 'user')
    this.quill.setSelection(delta.length() - range.length, 'silent')

    // re-apply stored scroll position
    element.scrollTop = scrollTop
  }
}

Quill.register('modules/clipboard', RemadeClipboard, true)
