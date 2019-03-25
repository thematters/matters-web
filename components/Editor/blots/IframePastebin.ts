import { Quill } from 'react-quill'

import { KEYCODES } from '~/common/enums'

const BlockEmbed = Quill.import('blots/block/embed')

type Purpose = 'video' | 'code'

interface Props {
  purpose: Purpose
  placeholder: string
}

class IFramePastebin extends BlockEmbed {
  public static create(value: Props) {
    const node = super.create(value)
    if (value.purpose) {
      this.purpose = value.purpose
    }
    if (value.placeholder) {
      this.placeholder = value.placeholder
    }
    node.setAttribute('placeholder', value.placeholder || this.placeholder)
    return node
  }

  private get quill() {
    if (!this.scroll || !this.scroll.domNode.parentNode) {
      return null
    }
    return Quill.find(this.scroll.domNode.parentNode)
  }

  constructor(domNode: HTMLElement) {
    super(domNode)
    this.onPaste = this.onPaste.bind(this)
    this.onPress = this.onPress.bind(this)
    domNode.addEventListener('paste', this.onPaste)
    domNode.addEventListener('keydown', this.onPress)
  }

  onPaste(event: ClipboardEvent) {
    event.stopPropagation()
    const windowObject = window as any
    if (windowObject.clipboardData && windowObject.clipboardData.getData) {
      this.url = windowObject.clipboardData.getData('Text')
    } else if (event.clipboardData && event.clipboardData.getData) {
      this.url = event.clipboardData.getData('text/plain')
    }
  }

  onPress(event: KeyboardEvent) {
    event.stopPropagation()
    const key = event.which || event.keyCode
    const ctrl = event.ctrlKey || event.metaKey

    if (ctrl && key === KEYCODES.v) {
      // Capture paste keydown event
    } else if (key === KEYCODES.enter) {
      if (this.url && this.quill) {
        const range = this.quill.getSelection(true)
        this.quill.insertEmbed(range.index, 'video', this.url, 'user')
        this.quill.setSelection(range.index + 1, 0, 'silent')
        this.remove()
      }
    } else {
      // Repalce with normal block
    }
  }
}

IFramePastebin.blotName = 'iframePastebin'
IFramePastebin.className = 'iframe-pastebin'
IFramePastebin.tagName = 'input'

export default IFramePastebin
