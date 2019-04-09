import * as config from './default'

export const modules = {
  ...config.modules,
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['blockquote', { list: 'ordered' }, { list: 'bullet' }, 'link']
  ]
}

export const foramts = [
  // inline
  'bold',
  'italic',
  'underline',

  // block
  'blockquote',
  'list',
  'link',

  // custom
  'mention',
  'smartBreak'
]
