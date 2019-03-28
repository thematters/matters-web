import { Quill } from 'react-quill'

import pastebinUrl from '~/components/Editor/utils/pastebinUrl'
import videoUrl from '~/components/Editor/utils/videoUrl'

import { KEYCODES } from '~/common/enums'

const BlockEmbed = Quill.import('blots/block/embed')

type Purpose = 'video' | 'pastebin'

interface IFrameParams {
  purpose: Purpose
  placeholder: string
}

class IFrameClipboard extends BlockEmbed {
  public static create(value: IFrameParams) {
    const node = super.create(value)
    if (value.purpose) {
      this.purpose = value.purpose
    }
    if (value.placeholder) {
      this.placeholder = value.placeholder
    }
    const input = document.createElement('input')
    input.setAttribute('value', '')
    input.setAttribute('purpose', value.purpose || this.purpose)
    input.setAttribute('placeholder', value.placeholder || this.placeholder)
    node.setAttribute('contenteditable', 'false')
    node.appendChild(input)
    return node
  }

  constructor(domNode: HTMLElement) {
    super(domNode)
    const input = domNode.querySelector('input')
    const { purpose, placeholder } = this.value(input)
    this.purpose = purpose
    this.placeholder = placeholder
    this.insertIFrame = this.insertIFrame.bind(this)
    this.convertToText = this.convertToText.bind(this)
    this.replaceWithText = this.replaceWithText.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onPaste = this.onPaste.bind(this)
    this.onPress = this.onPress.bind(this)

    if (input) {
      input.addEventListener('blur', this.onBlur)
      input.addEventListener('paste', this.onPaste)
      input.addEventListener('keydown', this.onPress)
    }
  }

  private get quill() {
    if (!this.scroll || !this.scroll.domNode.parentNode) {
      return null
    }
    return Quill.find(this.scroll.domNode.parentNode)
  }

  value(domNode: HTMLElement | null): { [key: string]: any } {
    return {
      purpose: domNode ? domNode.getAttribute('purpose') || null : null,
      placeholder: domNode ? domNode.getAttribute('placeholder') || null : null
    }
  }

  onBlur(event: any) {
    if (!this.url) {
      this.remove()
    }
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
      if (this.url) {
        const url = this.processUrl(this.purpose, this.url)
        if (url && this.quill) {
          this.insertIFrame(url)
        } else {
          this.convertToText(this.url)
        }
      }
    } else if (!ctrl) {
      this.replaceWithText()
    }
  }

  processUrl(purpose: Purpose, url: string) {
    switch (this.purpose) {
      case 'video': {
        return videoUrl(url)
      }
      case 'pastebin': {
        return pastebinUrl(url)
      }
      default: {
        return ''
      }
    }
  }

  convertToText(url: string) {
    this.replaceWith('text', url)
  }

  insertIFrame(url: string) {
    const range = this.quill.getSelection(true)
    this.quill.insertEmbed(range.index, this.purpose, url, 'user')
    this.quill.setSelection(range.index + 1, 0, 'silent')
    this.remove()
  }

  replaceWithText() {
    const range = this.quill.getSelection(true)
    this.quill.insertEmbed(range.index, 'P', true, 'user')
    this.quill.setSelection(range.index + 1, 0, 'silent')
    this.remove()
  }
}

IFrameClipboard.blotName = 'iframeClipboard'
IFrameClipboard.className = 'iframe-clipboard'
IFrameClipboard.tagName = 'div'

Quill.register('formats/iframeClipboard', IFrameClipboard)

export default IFrameClipboard
