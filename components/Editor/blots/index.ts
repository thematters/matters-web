import { Quill } from 'react-quill'

import DividerBlot from './Divider'
// import GithubGistBlot from './GithubGist'
// import PastebinBlot from './Pastebin'
// import VideoBlot from './Video'

export default {
  DividerBlot,
  register: () => {
    Quill.register(DividerBlot)
  }
}
