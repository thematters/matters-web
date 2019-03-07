import { Quill } from 'react-quill'

import DividerBlot from './Divider'
import ImageFigure from './ImageFigure'
// import GithubGistBlot from './GithubGist'
// import PastebinBlot from './Pastebin'
// import VideoBlot from './Video'

export default {
  DividerBlot,
  register: () => {
    Quill.register('formats/divider', DividerBlot)
    Quill.register('formats/imageFigure', ImageFigure)
  }
}
