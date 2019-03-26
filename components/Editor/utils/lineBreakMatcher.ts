import { Quill } from 'react-quill'

const Delta = Quill.import('delta')

const lineBreakMatcher = () => {
  const newDelta = new Delta()
  newDelta.insert({ break: '' })
  return newDelta
}

export default lineBreakMatcher
