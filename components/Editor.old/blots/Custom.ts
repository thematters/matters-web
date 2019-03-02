import Quill from 'quill'

const Inline = Quill.import('blots/inline')

// 自定义创建样式：quote-custom
class CustomBlot extends Inline {
  public static create(url: string) {
    const node = super.create()
    // Sanitize url if desired
    node.setAttribute(
      'style',
      'color: rgb(159, 129, 68);font-size: 1.6rem;line-height: 3.2rem;'
    )
    // Okay to set other non-format related attributes
    return node
  }

  public static formats(node: HTMLElement) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('style')
  }
}
CustomBlot.blotName = 'custom'
CustomBlot.tagName = 'div'

export default CustomBlot
