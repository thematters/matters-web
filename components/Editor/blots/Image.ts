import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

// ImageBlot
class ImageBlot extends BlockEmbed {
  public static create(value: any) {
    const node = super.create()
    node.setAttribute('src', value)
    node.setAttribute('width', '100%')
    return node
  }

  public static value(node: HTMLElement) {
    return {
      url: node.getAttribute('src')
    }
  }
}
ImageBlot.blotName = 'image'
ImageBlot.tagName = 'img'

export default ImageBlot
