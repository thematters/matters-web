import Quill from 'quill'

const Inline = Quill.import('blots/inline')

// 自定义创建link
class Link extends Inline {
  public static create(value: any) {
    const parent = document.getElementById('editor')
    let childLength = (parent && parent.querySelectorAll('a').length) || 0
    const node = super.create()
    node.setAttribute('href', value)
    node.setAttribute('target', '_blank')
    node.setAttribute('class', 'links')
    node.setAttribute('data-id', ++childLength)
    node.setAttribute('style', 'text-decoration: underline')
    node.setAttribute('id', 'link_' + childLength)

    node.addEventListener('click', (e: Event) => {
      const width = node.offsetWidth
      const scrollTop = document.body.scrollTop
      const parentTop = parent && parent.offsetTop
      const parentLeft = (parent && parent.offsetLeft) || 0
      const left = node.offsetLeft
      const px = window.devicePixelRatio
      const isAndroid =
        navigator.userAgent.indexOf('Android') > -1 ||
        navigator.userAgent.indexOf('Adr') > -1

      const params = {
        link: value,
        index: node.getAttribute('data-id'),
        x: width / 2 + parentLeft + left,
        y: parentTop + node.offsetTop
      }

      console.log(`_this.jumpToLink('onTextLinkMenu', JSON.stringify(params))`)
      e.preventDefault()
      return false
    })
    return node
  }

  public static formats(node: HTMLElement) {
    return node.getAttribute('href')
  }
}
Link.blotName = 'link'
Link.tagName = 'a'

export default Link
