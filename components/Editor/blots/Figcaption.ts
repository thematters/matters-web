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

    const input = document.createElement('input')
    input.value = value
    input.setAttribute('placeholder', placeholder)
    input.setAttribute('contenteditable', 'false')

    const caption = document.createElement('span')
    caption.textContent = value

    node.appendChild(caption)
    node.appendChild(input)

    return node
  }

  static value(domNode: HTMLElement): any {
    return domNode.textContent
  }

  figcaption: HTMLElement

  constructor(domNode: HTMLElement) {
    super(domNode)

    this.figcaption = domNode
    domNode.addEventListener('change', this.onChange)
  }

  onChange = (e: Event) => {
    e.stopPropagation()

    const caption = this.figcaption.querySelector('span')
    const input = e.target as HTMLInputElement

    if (caption && input) {
      caption.textContent = input.value
    }
  }
}

Figcaption.blotName = 'figcaption'
Figcaption.tagName = 'figcaption'

Quill.register('formats/figcaption', Figcaption)

export default Figcaption
