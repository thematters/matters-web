import { Quill } from 'react-quill'

import DividerBlot from './Divider'
import IFrameClipboard from './IFrameClipboard'
import ImageFigure from './ImageFigure'
import Pastebin from './Pastebin'
import Video from './Video'

export default {
  DividerBlot,
  register: () => {
    Quill.register('formats/divider', DividerBlot)
    Quill.register('formats/imageFigure', ImageFigure)
    Quill.register('formats/iframeClipboard', IFrameClipboard)
    Quill.register('formats/pastebin', Pastebin)
    Quill.register('formats/video', Video)
  }
}
