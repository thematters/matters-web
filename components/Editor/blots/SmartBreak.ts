import { Quill } from 'react-quill'

const Break = Quill.import('blots/break')
const Embed = Quill.import('blots/embed')

/**
 * @see {@url https://github.com/quilljs/quill/issues/252}
 */
class SmartBreak extends Break {
  length() {
    return 1
  }
  value() {
    return '\n'
  }
  insertInto(parent: any, ref: any) {
    Embed.prototype.insertInto.call(this, parent, ref)
  }
}

Quill.register('formats/break', SmartBreak)

export default SmartBreak
