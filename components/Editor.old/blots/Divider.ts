import Quill from 'quill'

const BlockEmbed = Quill.import('blots/block/embed')

// 自定义创建hr
class Divider extends BlockEmbed {}
Divider.blotName = 'divider'
Divider.tagName = 'hr'

export default Divider
