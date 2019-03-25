import { Quill } from 'react-quill'

import DividerBlot from './Divider'
import IFramePastebin from './IFramePastebin'
import ImageFigure from './ImageFigure'
import VideoBlot from './Video'

// import GithubGistBlot from './GithubGist'
// import PastebinBlot from './Pastebin'

export default {
  DividerBlot,
  register: () => {
    Quill.register('formats/divider', DividerBlot)
    Quill.register('formats/imageFigure', ImageFigure)
    Quill.register('formats/iframePastebin', IFramePastebin)
    Quill.register('formats/video', VideoBlot)
  }
}
