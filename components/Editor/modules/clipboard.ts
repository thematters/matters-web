import { Quill } from 'react-quill'

const Clipboard = Quill.import('modules/clipboard')

class RemadeClipboard extends Clipboard {
  onPaste(event: any) {
    const html = document.querySelector('html')
    const scrollTop = html ? (html.scrollTop || 0) : 0

    super.onPaste(event)

    setTimeout(() => {
      if (html) {
        html.scrollTop = scrollTop
      }
    }, 1)
  }
}

Quill.register('modules/clipboard', RemadeClipboard, true)
