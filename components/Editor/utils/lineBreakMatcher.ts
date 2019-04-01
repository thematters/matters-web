import { Quill } from 'react-quill'

const Delta = Quill.import('delta')

const lineBreakMatcher = (node: HTMLElement, delta: any) => {
  return node.classList.contains('inline')
    ? new Delta().insert({
        smartBreak: false
      })
    : delta
}

export default lineBreakMatcher
