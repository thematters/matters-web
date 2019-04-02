import { Quill } from 'react-quill'

/**
 * https://github.com/afconsult/quill-mention
 */
class Focus {
  quill: any
  focusClass = 'focused-blot'

  constructor(quill: Quill) {
    this.quill = quill
    this.removeHighlighting()
    this.quill.on('selection-change', (range: any) => {
      this.highlightBlot(range)
    })
  }

  removeHighlighting = () => {
    this.quill.container
      .querySelectorAll('.' + this.focusClass)
      .forEach((blot: any) => {
        if (blot && blot.classList) {
          blot.classList.remove(this.focusClass)
        }
      })
  }

  highlightBlot = (range: any) => {
    this.removeHighlighting()
    if (range && range.index !== undefined) {
      const [line] = this.quill.getLine(range.index)
      if (line && line.domNode) {
        line.domNode.classList.add(this.focusClass)
      }
    }
  }
}

Quill.register('modules/focus', Focus)

export default Focus
