import { Quill } from 'react-quill'

const Parchment = Quill.import('parchment')
const BlockEmbed = Quill.import('blots/block/embed')

const ATTRIBUTES = ['alt', 'height', 'width']

// ref: https://github.com/quilljs/quill/blob/develop/formats/image.js
class ImageFigure extends BlockEmbed {
  public static create(value: {
    src?: string
    caption?: string
    id?: string
    assetId?: string
  }) {
    const node = super.create(value)

    const figcaption = Parchment.create('figcaption', value.caption || '')
      .domNode

    const image = document.createElement('img')
    image.setAttribute('src', value.src || '')

    if (value.id) {
      image.setAttribute('id', value.id)
    }

    if (value.assetId) {
      image.setAttribute('asset-id', value.assetId)
    }

    const caption = document.createElement('figcaption')
    caption.innerText = value.caption || ''

    node.appendChild(image)
    node.appendChild(figcaption)

    return node
  }

  static value(domNode: HTMLElement): any {
    const image = domNode.querySelector('img')
    const caption = domNode.querySelector('figcaption')

    return {
      src: image ? image.getAttribute('src') : '',
      caption: caption ? caption.innerText : ''
    }
  }

  static formats(domNode: HTMLElement) {
    const image = domNode.querySelector('img')
    if (!image) {
      return {}
    }

    return ATTRIBUTES.reduce(
      (formats: { [key: string]: string | null }, attribute: string) => {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = image.getAttribute(attribute)
        }
        return formats
      },
      {}
    )
  }

  format(name: string, value: string | number) {
    const image = this.domNode.querySelector('img')
    if (!image) {
      return {}
    }

    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        image.setAttribute(name, value)
      } else {
        image.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

ImageFigure.blotName = 'imageFigure'
ImageFigure.className = 'image'
ImageFigure.tagName = 'figure'

Quill.register('formats/imageFigure', ImageFigure)

export default ImageFigure
