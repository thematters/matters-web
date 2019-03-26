import { Quill } from 'react-quill'

const Embed = Quill.import('blots/embed')

class Mention extends Embed {
  create(data: any) {
    const node = super.create()
    const denotationChar = document.createElement('a')

    denotationChar.innerHTML = data.denotationChar
    node.appendChild(denotationChar)
    node.innerHTML += data.value

    return this.setDataValues(node, data)
  }

  setDataValues(element: HTMLElement, data: any) {
    const domNode = element
    Object.keys(data).forEach(key => {
      domNode.dataset[key] = data[key]
    })
    return domNode
  }

  value(domNode: HTMLElement) {
    return domNode.dataset
  }
}

Mention.blotName = 'mention'
Mention.tagName = 'a'
Mention.className = 'mention'

export default Mention
