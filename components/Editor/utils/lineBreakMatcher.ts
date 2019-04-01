import { Quill } from 'react-quill'

const Delta = Quill.import('delta')

const lineBreakMatcher = (node: HTMLElement, delta: any) => {
  return node.classList.contains('smart-break')
    ? new Delta().insert({
        smartBreak: false
      })
    : delta
}

export default lineBreakMatcher
