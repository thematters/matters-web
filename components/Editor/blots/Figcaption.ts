import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class Figcaption extends BlockEmbed {
  static create(value: { caption?: string; placeholder?: string }) {
    const node = super.create(value)

    const input = document.createElement('input')
    input.value = value.caption || ''
    input.setAttribute('placeholder', value.placeholder || '添加說明文字…')
    input.setAttribute('contenteditable', 'false')

    const caption = document.createElement('span')
    caption.textContent = value.caption || ''

    node.appendChild(caption)
    node.appendChild(input)

    return node
  }

  static value(domNode: HTMLElement): any {
    return {
      caption: domNode.textContent
    }
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
