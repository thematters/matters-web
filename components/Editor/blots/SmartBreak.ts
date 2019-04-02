import { Quill } from 'react-quill'

const Embed = Quill.import('blots/embed')

/**
 * @see {@url https://github.com/quilljs/quill/issues/252}
 */
class SmartBreak extends Embed {}

SmartBreak.blotName = 'smartBreak'
SmartBreak.className = 'smart'
SmartBreak.tagName = 'br'

Quill.register('formats/smartBreak', SmartBreak)

export default SmartBreak
