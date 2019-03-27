import { Quill } from 'react-quill'

const Embed = Quill.import('blots/embed')

class Mention extends Embed {
  static create(value: { displayName: string; userName: string }) {
    const node = super.create(value) as HTMLElement

    node.setAttribute('href', `/@${value.userName}`)
    node.setAttribute('target', '_blank')
    node.textContent = `@${value.displayName}`

    return node
  }

  static value(domNode: HTMLElement) {
    const embed = domNode.querySelector('span')

    const value: { displayName?: string; userName?: string } = {}

    if (embed) {
      value.displayName = embed.innerHTML.replace('@', '')
    }

    value.userName = (domNode.getAttribute('href') || '').replace('/@', '')

    return value
  }
}

Mention.blotName = 'mention'
Mention.tagName = 'a'
Mention.className = 'mention'

Quill.register('formats/mention', Mention)

export default Mention
