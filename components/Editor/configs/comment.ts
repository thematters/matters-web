import * as config from './default'

export const modules = {
  ...config.modules,
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['blockquote', { list: 'ordered' }, { list: 'bullet' }, 'link']
  ]
}

export const formats = config.formats
