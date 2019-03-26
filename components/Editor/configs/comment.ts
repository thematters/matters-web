import { Quill } from 'react-quill'

import Mention from '../modules/mention'
import * as config from './default'

Quill.register('modules/mention', Mention)

export const modules = {
  ...config.modules,
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['blockquote', { list: 'ordered' }, { list: 'bullet' }, 'link']
  ],
  mention: {}
}

export const formats = config.formats
