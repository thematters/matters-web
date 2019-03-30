import lineBreakMatcher from '../utils/lineBreakMatcher'
import * as config from './default'

export const modules = {
  ...config.modules,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
    matchers: [['BR', lineBreakMatcher]]
  },
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['blockquote', { list: 'ordered' }, { list: 'bullet' }, 'link']
  ]
}
