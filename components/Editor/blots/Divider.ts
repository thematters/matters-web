import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class DividerBlot extends BlockEmbed {}

DividerBlot.blotName = 'divider'
DividerBlot.tagName = 'HR'

export default DividerBlot
