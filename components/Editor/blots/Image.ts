import Quill from 'quill'

const BlockEmbed = Quill.import('blots/block/embed')

// 自定义创建图片
class ImageBlot extends BlockEmbed {
  public static create(value: any) {
    const node = super.create()
    const imageLength = document.querySelectorAll('#editor figure').length
    node.innerHTML = `
                    <img src="${
                      value.url
                    }" style="width:100%" class="cover-${imageLength}">
                    <figcaption contenteditable="false"></figcaption>
                `
    node.addEventListener('click', () => value.action(`.cover-${imageLength}`))
    const figcaption = node.querySelector('figcaption')
    node.style.margin = 0
    figcaption.style.color = 'rgb(179,179,179)'
    figcaption.style.textAlign = 'center'

    return node
  }

  public static value(node: HTMLElement) {
    return {
      url: node.getAttribute('src')
    }
  }
}
ImageBlot.blotName = 'image'
ImageBlot.tagName = 'figure'

export default ImageBlot
