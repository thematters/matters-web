import { Quill } from 'react-quill'

import { dom, isSafari } from '~/common/utils'

const Clipboard = Quill.import('modules/clipboard')

class RemadeClipboard extends Clipboard {
  onPaste(event: any) {
    const target = isSafari() ? 'body' : 'html'
    const element = dom.$(target)
    const scrollTop = element ? element.scrollTop || 0 : 0

    super.onPaste(event)

    setTimeout(() => {
      if (element) {
        element.scrollTop = scrollTop
      }
    }, 1)
  }
}

Quill.register('modules/clipboard', RemadeClipboard, true)
