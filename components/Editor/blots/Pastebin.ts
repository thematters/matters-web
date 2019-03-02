import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')
// PastebinBlot
class PastebinBlot extends BlockEmbed {
  public static create(url: string) {
    const node = super.create()
    const clientWidth = document.body.clientWidth
    node.setAttribute('src', url)
    node.setAttribute('frameborder', '0')
    node.setAttribute('border', 'none')
    node.setAttribute('width', '100%')
    node.setAttribute('height', clientWidth > 425 ? '500px' : '250px')
    return node
  }

  public static formats(node: HTMLElement) {
    let format = {}
    if (node.hasAttribute('height')) {
      format = { height: node.getAttribute('height') }
    }
    if (node.hasAttribute('width')) {
      format = { width: node.getAttribute('width'), ...format }
    }
    return format
  }

  public static value(node: HTMLElement) {
    return node.getAttribute('src')
  }

  public format(name: string, value: string) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name, value)
      }
    } else {
      super.format(name, value)
    }
  }
}
PastebinBlot.blotName = 'pastebin'
PastebinBlot.tagName = 'iframe'

export default PastebinBlot
