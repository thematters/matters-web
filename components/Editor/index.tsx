import React from 'react'
import ReactQuill, { Quill } from 'react-quill'

// import 'tailwindcss/dist/utilities.min.css'

import { EditorDraft } from './__generated__/EditorDraft'
import blots from './blots'
import bubbleStyle from './quill.bubble.css'
import quillStyle from './quill.css'
import Style from './style'
import VideoUrl from './utils/videoUrl'

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
  device: number
  content: string
  showEditor: boolean
  editorChoose: number
  showPublish: boolean
  title: string
  // upstream: Object
  coverAssetId: string
  draftId: string
  tags: string[]
}

const modules = {
  toolbar: [
    [{ header: '1' }],
    ['bold', 'italic', 'strike', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}

export class Editor extends React.Component<Props, State> {
  public ReactQuillRef: HTMLDivElement | null
  public quill: Quill | null
  public ReactQuill: typeof ReactQuill | undefined

  public state = {
    device: 4,
    content: '',
    showEditor: false,
    editorChoose: -1,
    showPublish: false,
    title: '',
    upstream: {
      id: null,
      title: ''
    },
    coverAssetId: '',
    draftId: '',
    tags: []
  }
  constructor(props: Props) {
    super(props)

    this.ReactQuillRef = null // ReactQuill component
    this.quill = null // quill editor

    if (typeof window !== 'undefined') {
      this.ReactQuill = ReactQuill
    }
  }
  public componentDidMount() {
    // const query = this.props.router.asPath.split('?')[1]
    // const upstream = {
    //   id: query[0].split('=')[0] === 'upstreamId' ? query[0].split('=')[1] : '',
    //   title:
    //     query[1].split('=')[0] === 'upstreamTitle'
    //       ? decodeURI(query[1].split('=')[1])
    //       : ''
    // }
    // this.setState({
    //   upstream
    // })
  }

  public onSubmit() {
    if (!this.state.title || !this.state.content) {
      return false
    }
    // const state = this.state
    // const form = {
    //   id: state.draftId ? state.draftId : null,
    //   upstreamId: state.upstream ? state.upstream.id : null,
    //   title: state.title,
    //   content: state.content,
    //   coverAssetId: state.coverAssetId,
    //   tags: state.tags && state.tags.length ? state.tags : null
    // }
    console.log(`this.props
      .putDraftMutation({
        variables: {
          input: form
        }
      })
      .then(data => {
        this.setState({
          draftId: data.data && data.data.putDraft ? data.data.putDraft.id : ''
        })
      })`)
  }

  // 显示编辑器工具
  public onToggleEditorTools() {
    this.setState({
      showEditor: !this.state.showEditor
    })
  }

  // 设置样式
  public onSetStyle(index: number) {
    this.setState({
      editorChoose: this.state.editorChoose === index ? -1 : index
    })
  }

  // 设置默认链接 placeholder
  public onSetDefault() {
    const linkInput = document.querySelectorAll('.ql-tooltip-editor input')

    /* tslint:disable */
    // @ts-ignore
    for (let i = 0; i < linkInput.length; i++) {
      linkInput[i].setAttribute('placeholder', '輸入連結地址')
    }
  }

  // 打开或关闭发布文章
  public onTogglePublish() {
    this.setState({
      showPublish: !this.state.showPublish
    })
  }

  // 设置标题
  public handleTitle(e: any) {
    const value = e.target.value
    this.setState({
      title: value
    })
  }

  // 获取文章ID或草稿ID
  public onFetchArticle() {
    // if (id) {
    //   this.props.client
    //     .query({
    //       query: getArticleQuery,
    //       variables: {
    //         input: { id: data.id }
    //       }
    //     })
    //     .then(data => {
    //       let detail = data.data && data.data.node ? data.data.node : {}
    //       this.setState({
    //         content: data.content,
    //         title: data.title ? data.title : data.draftTitle,
    //         upstream: data.upstream ? data.upstream : {}
    //       })
    //     })
    // }
  }

  // 发布文章
  public onPublish() {
    if (!this.state.draftId) {
      return
    }

    // 发布文章
    // const publishMutate = gql`
    //   mutation PublishArticleMutation($input: PublishArticleInput!) {
    //     data: publishArticle(input: $input) {
    //       id
    //     }
    //   }
    // `

    // this.props.client
    //   .mutate({
    //     mutation: publishMutate,
    //     variables: {
    //       input: {
    //         id: this.state.draftId
    //       }
    //     }
    //   })
    //   .then(res => {
    //     this.onTogglePublish()
    //   })
  }

  // 暂存草稿
  public onSaveDraft() {
    this.onSubmit()
  }

  // 更新 tags
  public updateTags(tagsArray: string[]) {
    this.setState(
      {
        tags: tagsArray
      },
      () => {
        this.onSubmit()
      }
    )
  }

  // // 更新 上游文章
  // public updateUpstream(el) {
  //   this.setState(
  //     {
  //       upstream: el
  //     },
  //     () => this.onSubmit()
  //   )
  // }

  public updateDraft(data: any) {
    const { content, id: draftId, title, tags } = data.node

    this.setState({
      content,
      draftId,
      title,
      tags
      // upstream
    })
  }

  /**
   * quill methods
   */
  public quillChange(content: string) {
    //  delta:any, source, editor
    // console.log('quillChange: ', content, delta, source, editor)
    this.setState({ content })
  }
  public quillChangeSelection(range: any, editor: any) {
    // console.log('quillChangeSelection: ', range, source, editor)
    if (!range) {
      return
    }
    const bounds = editor.getBounds(range)
    this.setMediaBtnPosition(bounds.top + 108)
  }
  // public quillBlur() {
  //   // console.log('quillBlur: ', previousRange, source, editor)
  //   this.onSubmit()
  // }
  // public quillFocus() {
  //   // console.log('quillFocus: ', range, source, editor)
  // }
  // public quillKeyUp(event) {
  //   // console.log('quillKeyUp: ', event)
  // }
  public setMediaBtnPosition(top: number) {
    /* tslint:disable */
    // @ts-ignore
    this.refs.mediaBtn.style.position = 'absolute'
    /* tslint:disable */
    // @ts-ignore
    this.refs.mediaBtn.style.top = `calc(${top}px - .5em)`
  }

  public setQuill(quill: any) {
    if (quill) {
      this.ReactQuillRef = quill
      this.quill = quill.getEditor()
    }
  }

  public getPosition = () => {
    if (!this.quill) {
      return
    }

    const range = this.quill.getSelection()
    const len = this.quill.getLength()
    const position = range ? range.index : len || 0

    return position
  }

  public insertImage(position: any, imgUrl: string) {
    if (!imgUrl) {
      return
    }

    if (this.quill) {
      this.quill.insertEmbed(position, 'image', imgUrl)
    }

    this.setState({
      showEditor: false,
      editorChoose: -1
    })
  }

  public uploadAvatar(e: any) {
    this.updateFile(e.target.files[0])
  }

  // 上传头像
  public updateFile(file: any) {
    console.log('updateFile')
    // const uploadFileMutation = gql`
    //   mutation($input: SingleFileUploadInput!) {
    //     singleFileUpload(input: $input) {
    //       id
    //       path
    //     }
    //   }
    // `

    // return this.props.client
    //   .mutate({
    //     mutation: uploadFileMutation,
    //     variables: {
    //       input: {
    //         file,
    //         type: 'embed'
    //       }
    //     }
    //   })
    //   .then(res => {
    //     const pos = this.getPosition()
    //     const imgUrl = res.data.singleFileUpload.path
    //     this.insertImage(pos, imgUrl)
    //   })
  }

  public videoUpload(url: string) {
    if (this.quill) {
      const range = this.quill.getSelection(true)
      this.quill.insertEmbed(range.index, 'video', url)

      this.setState({
        showEditor: false,
        editorChoose: -1
      })
    }
  }

  public codeUpload(url: string, isIframe = false) {
    // const range = this.quill.getSelection(true)
    // this.quill.insertEmbed(range.index, isIframe ? 'pastebin' : 'gist', url)
    // this.setState({
    //   showEditor: false,
    //   editorChoose: -1
    // })
  }

  // 视频url - keyup.enter event
  public onVideoUrl(e: any) {
    if (e.keyCode === 13) {
      const url = VideoUrl(e.target.value)
      if (url) {
        this.videoUpload(url)
      }
      e.target.value = ''
    }
  }

  public onCodeUrl(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode == 13) {
      const codeObj = {
        url: 'https://pastebin.com/embed_iframe/FfvyTrmN',
        type: 'pastebin'
      }
      // TODO: 正则匹配url
      // const codeObj = codeUrl(e.target.value)
      // 'https://pastebin.com/embed_iframe/FfvyTrmN'
      // 'https://gist.github.com/sammieho1995/fac3bbb632d07551a9a51f1afc35b76e'
      if (codeObj) {
        this.codeUpload(codeObj.url, codeObj.type !== 'gist')
      }
      // e.target.value = ''
    }
  }

  // 分割线
  public insertDivider() {
    if (this.quill) {
      this.onSetStyle(4)

      const pos = this.getPosition() || 0
      this.quill.insertEmbed(pos, 'divider', 'user')

      this.setState({
        showEditor: false,
        editorChoose: -1
      })
    }
  }

  public registerBlot() {
    Quill.register('formats/image', ImageBlot, true)
    Quill.register('formats/video', VideoBlot, true)
    Quill.register('formats/gist', GithubGistBlot, true)
    Quill.register('formats/pastebin', PastebinBlot, true)
    Quill.register('formats/divider', DividerBlot, true)
  }

  public render() {
    const { editorChoose, showEditor } = this.state

    const isWeb = true

    const ReactQuill = this.ReactQuill

    if (ReactQuill) {
      this.registerBlot()
    }
    return (
      <div>
        {/* <HeaderBox
          active="none"
          showPublishButton
          publish={this.onTogglePublish.bind(this)}
        /> */}
        <section
          className="container"
          style={isWeb ? Style.contentBox.pc : Style.contentBox.mobile}
        >
          {/* 左边 */}
          <div className="left-box relative">
            {/* TODO: 提示 */}
            {/* <div style={Style.notice.box}>
                            <strong style={Style.notice.title}>
                                正在等待發佈 (01:24)
                            </strong>
                            <div className="flex items-center justify-between">
                                <div style={Style.notice.notice}>
                                    上鏈後，文章不可刪改，永久保存
                                </div>
                                <div style={Style.notice.cancle}>撤銷</div>
                            </div>
                        </div> */}
            {/* <div>
              <input
                placeholder="請輸入標題…"
                style={Style.titleInput}
                value={title}
                onChange={e => {
                  this.handleTitle(e)
                }}
                onBlur={this.onSubmit.bind(this)}
              />
            </div> */}
            <div onClick={this.onSetDefault.bind(this)} id="editor">
              {typeof window !== 'undefined' && ReactQuill ? (
                <ReactQuill
                  theme="bubble"
                  modules={modules}
                  formats={[
                    'header',
                    'font',
                    'size',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'list',
                    'bullet',
                    'indent',
                    'link',
                    'image',
                    'video',
                    'divider',
                    'gist',
                    'pastebin'
                  ]}
                  ref={reactQuillRef => this.setQuill(reactQuillRef)}
                  value={this.state.content}
                  placeholder="請輸入正文..."
                  onChange={
                    (content, delta, source, editor) =>
                      this.quillChange(content) // , delta, source, editor)
                  }
                  onChangeSelection={
                    (range, source, editor) =>
                      this.quillChangeSelection(range, editor) //  source,
                  }
                  onBlur={(previousRange, source, editor) => this.onSubmit()}
                  onFocus={(range, source, editor) =>
                    console.log(`this.quillFocus(range, source, editor)`)
                  }
                />
              ) : (
                <div>loading...</div>
              )}
            </div>

            <iframe id="frame" name="frame" hidden />

            {/* media control bar */}
            <div style={Style.tools.box} ref="mediaBtn">
              <img
                src={require('./assets/icons-editor-add.svg')}
                style={Style.tools.add}
                onClick={this.onToggleEditorTools.bind(this)}
              />
              {showEditor && (
                <div
                  className="flex items-center relative"
                  style={Style.tools.children}
                >
                  {/* close button */}
                  <img
                    src={require('./assets/icons-editor-close.svg')}
                    style={Style.tools.img(1)}
                    onClick={this.onToggleEditorTools.bind(this)}
                  />

                  {/* image */}
                  <label
                    style={Style.tools.img(
                      editorChoose < 0 || editorChoose === 1 ? 1 : 0.5
                    )}
                  >
                    <input
                      type="file"
                      name="file"
                      onChange={e => this.uploadAvatar(e)}
                      accept=".jpg,.png,.jpeg"
                      disabled={false}
                      multiple={false}
                      className="hidden"
                    />
                    <img
                      src={require('./assets/icons-editor-image.svg')}
                      onClick={() => this.onSetStyle(1)}
                    />
                  </label>

                  {/* video */}
                  <img
                    src={require('./assets/icons-editor-video.svg')}
                    onClick={() => this.onSetStyle(2)}
                    style={Style.tools.img(
                      editorChoose < 0 || editorChoose === 2 ? 1 : 0.5
                    )}
                  />

                  {/* audio */}
                  {/* <img
                                        src={require('~/src/assets/svg/icons-editor-audio.svg')}
                                        style={Style.tools.img(
                                            editorChoose < 0 ||
                                            editorChoose === 3
                                                ? 1
                                                : '0.5'
                                        )}
                                        onClick={() => this.onSetStyle(3)}
                                    /> */}

                  {/* hr */}
                  <img
                    src={require('./assets/icons-editor-linebreak.svg')}
                    style={Style.tools.img(
                      editorChoose < 0 || editorChoose === 4 ? 1 : 0.5
                    )}
                    onClick={() => this.insertDivider()}
                  />

                  {/* code */}
                  <img
                    src={require('./assets/icons-editor-code.svg')}
                    style={Style.tools.img(
                      editorChoose < 0 || editorChoose === 5 ? 1 : 0.5
                    )}
                    onClick={() => this.onSetStyle(5)}
                  />

                  {/* input video url */}
                  {editorChoose === 2 && (
                    <input
                      ref="videoInput"
                      placeholder="請粘貼視頻網站的連結（支持 Youtube，Vimeo 和 Youku），然後按回車確認"
                      style={Style.tools.imgBox.input}
                      onKeyUp={e => this.onVideoUrl(e)}
                    />
                  )}

                  {/* input code */}
                  {editorChoose === 5 && (
                    <input
                      ref="codeLinkInput"
                      placeholder="請粘貼代碼網站的連結（支持 Github Gist 和 Pastebin），然後按回車確認"
                      style={Style.tools.imgBox.input}
                      onKeyUp={e => this.onCodeUrl(e)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* 右边 */}
          {/* <MediaQuery
            minWidth={992}
            values={{ deviceWidth: 1600 }}
            style={Style.rightPaddingTop}
          >
            <div className="right-box">
              <MediaQuery minWidth={992} values={{ deviceWidth: 1600 }}>
                <EditorMoreContent
                  updateTags={(e, tagsArray) => this.updateTags(tagsArray)}
                  updateUpstream={(e, stream) => this.updateUpstream(stream)}
                  updateDraft={data => this.updateDraft(data)}
                />
              </MediaQuery>
            </div>
          </MediaQuery> */}
          {/* {showPublish && (
            <ArticlePublishDialog
              close={this.onTogglePublish.bind(this)}
              onPublish={this.onPublish.bind(this)}
              onSaveDraft={this.onSaveDraft.bind(this)}
            />
          )} */}
        </section>
        <style global jsx>
          {bubbleStyle}
        </style>
        <style global jsx>
          {quillStyle}
        </style>
      </div>
    )
  }
}
