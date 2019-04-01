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
  private get quill() {
    if (!this.scroll || !this.scroll.domNode.parentNode) {
      return null
    }
    return Quill.find(this.scroll.domNode.parentNode)
  }

  static create(value: IFrameParams) {
    const node = super.create(value)

    node.setAttribute('value', '')
    node.setAttribute('data-purpose', value.purpose)
    node.setAttribute('placeholder', value.placeholder)
    node.setAttribute('contenteditable', 'false')

    return node
  }

  static value(domNode: HTMLElement) {
    return {
      purpose: domNode.getAttribute('data-purpose') || null,
      placeholder: domNode.getAttribute('placeholder') || null
    }
  }

  constructor(domNode: HTMLElement) {
    super(domNode)

    domNode.addEventListener('blur', this.onBlur)
    domNode.addEventListener('paste', this.onPaste)
    domNode.addEventListener('keydown', this.onPress)
    setTimeout(() => {
      domNode.focus()
    })
  }

  onBlur = (event: FocusEvent) => {
    const target = event.currentTarget as HTMLInputElement

    if (!target.value) {
      this.removeBlot()
    } else {
      this.submit(target.value)
    }
  }

  onPaste = (event: ClipboardEvent) => {
    event.stopPropagation()
  }

  onPress = (event: KeyboardEvent) => {
    event.stopPropagation()

    const key = event.which || event.keyCode
    const target = event.currentTarget as HTMLInputElement

    if (!target.value && key !== KEYCODES.enter) {
      return
    }

    // blur to trigger `this.onBlur` to fire `this.submit`
    target.blur()
  }

  removeBlot = () => {
    this.remove()

    if (!this.quill) {
      return
    }

    const range = this.quill.getSelection(true)
    this.quill.setSelection(range.index, 0, 'silent')
  }

  submit = (text: string) => {
    const { iframeClipboard } = this.value()
    let url = ''

    if (!this.quill) {
      return
    }

    if (iframeClipboard.purpose === 'video') {
      url = videoUrl(text)
    } else if (iframeClipboard.purpose === 'pastebin') {
      url = pastebinUrl(text)
    }

    if (url) {
      this.insertIFrame(url)
    } else {
      this.replaceWithText(text)
    }
  }

  insertIFrame = (url: string) => {
    const { iframeClipboard } = this.value()
    const range = this.quill.getSelection(true)
    const blotName = iframeClipboard.purpose
    this.removeBlot()
    this.quill.insertEmbed(range.index, blotName, url, 'user')
    this.quill.setSelection(range.index + 1, 0, 'silent')
  }

  replaceWithText = (text: string) => {
    const range = this.quill.getSelection(true)
    this.removeBlot()
    this.quill.insertText(range.index, text, 'user')
    this.quill.setSelection(range.index + text.length, 0, 'silent')
  }
}

IFrameClipboard.blotName = 'iframeClipboard'
IFrameClipboard.className = 'iframe-clipboard'
IFrameClipboard.tagName = 'input'

Quill.register('formats/iframeClipboard', IFrameClipboard)

export default IFrameClipboard
