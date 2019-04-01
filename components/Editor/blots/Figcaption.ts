import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class Figcaption extends BlockEmbed {
  static create(value: { src?: string; caption?: string }) {
    const node = super.create(value)
    node.setAttribute('contenteditable', 'true')
    node.textContent = value
    return node
  }

  static value(domNode: HTMLElement): any {
    return domNode.textContent
  }

  constructor(domNode: HTMLElement) {
    super(domNode)
    domNode.addEventListener('change', this.onPress)
  }

  onPress = (event: Event) => {
    event.stopPropagation()
  }
}

Figcaption.blotName = 'figcaption'
Figcaption.tagName = 'figcaption'

Quill.register('formats/figcaption', Figcaption)

export default Figcaption
