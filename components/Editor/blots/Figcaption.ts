import { Quill } from 'react-quill'

import { getLangFromRoot, langConvert, translate } from '~/common/utils'

const BlockEmbed = Quill.import('blots/block/embed')

class Figcaption extends BlockEmbed {
  static create(value: string) {
    const node = super.create(value)

    const lang = langConvert.html2sys(getLangFromRoot())
    const placeholder = translate({
      zh_hant: '添加說明文字…',
      zh_hans: '添加说明文字…',
      lang
    })

    const textarea = document.createElement('textarea')
    textarea.value = value || ''
    textarea.setAttribute('placeholder', placeholder)

    const caption = document.createElement('span')
    caption.textContent = value || ''

    node.appendChild(caption)
    node.appendChild(textarea)

    return node
  }

  static value(domNode: HTMLElement): any {
    return domNode.textContent
  }

  figcaption: HTMLElement

  constructor(domNode: HTMLElement) {
    super(domNode)

    this.figcaption = domNode

    domNode.addEventListener('keydown', this.onPress)
    domNode.addEventListener('paste', this.onPaste)
    domNode.addEventListener('change', this.onPress)
  }

  onPaste = (event: ClipboardEvent) => {
    event.stopPropagation()
  }

  onPress = (event: Event) => {
    const caption = this.figcaption.querySelector('span')
    const textarea = event.target as HTMLTextAreaElement

    if (caption && textarea) {
      caption.textContent = textarea.value
    }

    textarea.style.height = `${textarea.scrollHeight}px`
  }
}

Figcaption.blotName = 'figcaption'
Figcaption.tagName = 'figcaption'

Quill.register('formats/figcaption', Figcaption)

export default Figcaption
