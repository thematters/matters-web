import React from 'react'
import ReactQuill, { Quill } from 'react-quill'

import { LanguageConsumer } from '~/components/Language'

import { translate } from '~/common/utils'

import { EditorDraft } from './__generated__/EditorDraft'
import blots from './blots'
import * as config from './config'
import contentStyles from './content.editor.css'
import bubbleStyles from './quill.bubble.css'

const {
  DividerBlot,
  GithubGistBlot,
  ImageBlot,
  PastebinBlot,
  VideoBlot
} = blots

interface UploadResponse {
  singleFileUpload: { id: string; path: string }
}

interface Props {
  upload: (data: string) => Promise<{ data: UploadResponse }>
  submit: any
  draft: EditorDraft
}

interface State {
  content: string
}

export class Editor extends React.Component<Props, State> {
  public quillRef: Quill | null
  public reactQuillRef: ReactQuill | null

  constructor(props: Props) {
    super(props)

    this.quillRef = null // Quill instance
    this.reactQuillRef = null // ReactQuill component

    this.state = {
      content: this.props.draft.content || ''
    }
  }

  public componentDidMount() {
    this.attachQuillRefs()
  }

  public componentDidUpdate() {
    this.attachQuillRefs()
  }

  public attachQuillRefs = () => {
    if (
      !this.reactQuillRef ||
      typeof this.reactQuillRef.getEditor !== 'function'
    ) {
      return
    }
    this.quillRef = this.reactQuillRef.getEditor()
  }

  public registerBlot() {
    Quill.register('formats/image', ImageBlot, true)
    Quill.register('formats/video', VideoBlot, true)
    Quill.register('formats/gist', GithubGistBlot, true)
    Quill.register('formats/pastebin', PastebinBlot, true)
    Quill.register('formats/divider', DividerBlot, true)
  }

  public render() {
    const { draft } = this.props
    const isReadOnly = draft.publishState !== 'unpublished'

    return (
      <>
        <LanguageConsumer>
          {({ lang }) => (
            <ReactQuill
              readOnly={isReadOnly}
              theme="bubble"
              modules={config.modules}
              formats={config.formats}
              ref={el => {
                this.reactQuillRef = el
              }}
              value={this.state.content}
              placeholder={translate({
                zh_hant: '請輸入正文…',
                zh_hans: '请输入正文…',
                lang
              })}
            />
          )}
        </LanguageConsumer>

        <style jsx global>
          {bubbleStyles}
        </style>
        <style jsx global>
          {contentStyles}
        </style>
      </>
    )
  }
}
