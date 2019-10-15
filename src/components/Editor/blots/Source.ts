import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class Source extends BlockEmbed {
  static create(value: { src: string; type: string }) {
    const node = super.create(value)
    node.setAttribute('src', value.src)
    node.setAttribute('type', value.type)
    return node
  }

  static value(domNode: HTMLElement): any {
    return {
      src: domNode.getAttribute('src') || '',
      type: domNode.getAttribute('type') || ''
    }
  }
}

Source.blotName = 'source'
Source.tagName = 'source'

Quill.register('formats/source', Source)

export default Source
