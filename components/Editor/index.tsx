// import 'normalize.css'
import React from 'react'

// import 'tailwindcss/dist/utilities.min.css'
import { EditorDraft } from './__generated__/EditorDraft'
import blots from './blots'
import EditorTools from './EditorTools'
import './quill.css'
import Style from './style'
// import content from './quill.css'
// import native from './utils/native'

declare global {
  interface Window {
    editor: any
  }
}

interface UploadResponse {
  singleFileUpload: { id: string; path: string }
}

interface Props {
  upload: (data: string) => Promise<{ data: UploadResponse }>
  submit: any
  draft: EditorDraft
}
interface State {
  quill: any
  range: any
  formatType?: string
  histories: any[]
  historyStep: number
  openRedoOrUndo: boolean
  // keyboardHeight: number
  toolsMode: number
  toolsContentMode: number
  title: string
  upstream?: { id?: string; title?: string } | null
  coverAssetId: string | number | null
}

const TOOLBAR_ONE = 1
const TOOLBAR_TWO = 2

const { CustomBlot, DividerBlot, ImageBlot, LinkBlot } = blots // RecordBlot

export class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      quill: null,
      range: null,
      formatType: '',
      histories: [] as any[],
      historyStep: 0,
      openRedoOrUndo: false,
      toolsMode: TOOLBAR_ONE,
      toolsContentMode: 0,
      // 表单提交
      title: '',
      coverAssetId: null
    }
  }

  public componentDidMount() {
    window.editor = this

    const quill = this.initQuill()
    this.setState({ quill })
  }

  public initQuill() {
    // this.onGetAppToken()
    const Quill = require('quill')
    const Delta = Quill.import('delta')
    const SizeStyle = Quill.import('attributors/style/size')
    const AlignStyle = Quill.import('attributors/style/align')

    Quill.register(SizeStyle, true)
    Quill.register(AlignStyle, true)

    Quill.register(CustomBlot)
    Quill.register(LinkBlot)
    Quill.register(DividerBlot)
    Quill.register(ImageBlot)
    // Quill.register(RecordBlot)

    require('quill/dist/quill.core.css')
    // 初始化quill
    const editor = new Quill('#editor', {
      placeholder: '请输入正文',
      modules: {
        history: {
          delay: 0,
          maxStack: 500,
          userOnly: true
        }
      }
    }) // as Quill & { history: any } // using history module
    // 監聽文字選擇
    editor.on('selection-change', (range: any) => {
      if (range) {
        if (range.length !== 0) {
          this.setState({
            range,
            toolsMode: TOOLBAR_TWO
          })
        } else {
          if (editor.hasFocus()) {
            this.setState({
              toolsContentMode: 0
            })
          }
          this.setState({
            toolsMode: TOOLBAR_ONE
          })
        }
      }
    })
    // 監聽文字修改
    let change = new Delta()
    editor.on('text-change', (delta: any, oldDelta: any, source: any) => {
      // 设置自动保存
      change = change.compose(delta)
      // 設置歷史操作
      if (!this.state.openRedoOrUndo) {
        this.state.histories.push(oldDelta.ops[0])
        this.setHistoryStep()
      }
      if (source === 'api') {
        console.log('An API call triggered this change.')
      } else if (source === 'user') {
        // 判斷是否是人為刪除選中樣式，如是：刪除樣式並清空選中
        if (
          editor.getLength() >= 1 &&
          delta.ops &&
          delta.ops.length > 0 &&
          delta.ops[0].delete
        ) {
          this.setFormatStyle()
          editor.history.clear()
          this.setState({
            range: null,
            histories: [],
            historyStep: 0
          })
        }
        this.setState({
          openRedoOrUndo: false
        })
        console.log('A user action triggered this change.')
      }
    })

    // 设置自动保存
    setInterval(() => {
      if (change.length() > 0) {
        console.log('Saving changes', change)
        this.onSaveCommit()
        change = new Delta()
      }
    }, 2 * 1000)

    return editor
  }

  public componentWillReceiveProps() {
    this.forceUpdate(() => {
      console.log('props', this.props.draft)
      if (this.props.draft && this.props.draft != null) {
        const { draft } = this.props
        this.setState({
          title: draft.title || '',
          upstream: draft.upstream
          // data.upstream && data.upstream != null
          //   ? data.upstream
          //   : {
          //       id: undefined,
          //       title: ''
          //     }
        })

        if (this.state.quill !== null) {
          // @ts-ignore
          this.state.quill.container.firstChild.innerHTML = data.content
        }
      }
    })
  }

  // 统一提交
  public onSaveCommit() {
    if (!this.state.title) {
      return false
    }
    const form = {
      id: this.props.draft.id ? this.props.draft.id : null,
      upstreamId: this.state.upstream ? this.state.upstream.id : null,
      title: this.state.title,
      content:
        // @ts-ignore
        this.state.quill && this.state.quill.container.firstChild.innerHTML,
      coverAssetId: this.state.coverAssetId
    }
    this.props.submit(form)
  }

  // 跳转app页面
  // public jumpToLink(fn: string, params: any) {
  //   native.call(fn, params)
  // }

  // 设置token
  public onGetAppToken() {
    // if (!window.native) {
    return false
    // }
    // const token = window.native.getToken()
    // if (token) {
    //   localStorage.setItem('token', token)
    // }
  }

  // app调用删除音频
  // public deleteVoice(params: any) {
  //   if (typeof params === 'string') {
  //     params = JSON.parse(params)
  //   }
  //   let data = params.data
  //   if (typeof params.data === 'string') {
  //     data = JSON.parse(params.data)
  //   }
  //   const parent = document.querySelector('.record')
  //   const el = document.getElementById('frame_' + data.index)
  //   parent.removeChild(el)
  // }

  // 設置歷史索引值
  public setHistoryStep() {
    this.setState({
      historyStep: this.state.histories.length
    })
  }

  // 判斷字體樣式
  public onClickMark(event: Event, type: string): void {
    switch (type) {
      case 'heading-one':
        this.setFormatStyle('heading-one', {
          bold: true,
          size: '32px'
        })
        break
      case 'heading-two':
        this.setFormatStyle('heading-two', {
          bold: true,
          size: '18px'
        })
        break
      case 'heading-three':
        this.setFormatStyle('heading-three', {
          bold: true,
          size: '10px'
        })
        break
      case 'heading-normal':
        this.setFormatStyle('heading-normal', {
          bold: false,
          size: false
        })
        break
      case 'quote-custom':
        this.setFormatStyle('quote-custom', {
          custom: true
        })
        break
      case 'bold':
        this.setFormatStyle('bold', {
          bold: true
        })
        break
      case 'italic':
        this.setFormatStyle('italic', {
          italic: true
        })
        break
      case 'through-line':
        this.setFormatStyle('through-line', {
          strike: true
        })
        break
      case 'underlined':
        this.setFormatStyle('underlined', {
          underline: true
        })
        break
      case 'quote':
        this.setFormatStyle(
          'quote',
          {
            blockquote: true
          },
          true
        )
        break
      case 'set-line':
        this.setFormatStyle(
          'set-line',
          {
            divider: true
          },
          true
        )
        break
      case 'bulleted-list':
        this.setFormatStyle(
          'bulleted-list',
          {
            list: 'bullet'
          },
          true
        )
        break
      case 'numbered-list':
        this.setFormatStyle(
          'numbered-list',
          {
            list: 'ordered'
          },
          true
        )
        break
      case 'link':
        this.setFormatStyle(
          'link',
          {
            link: prompt('添加鏈接')
          },
          true
        )
        break

      default:
        break
    }
  }
  public isArray(object: any) {
    return object && typeof object === 'object' && object.constructor === Array
  }

  public compareObj(objA: any, objB: any, flag: boolean = true): boolean {
    for (const key in objA) {
      if (objA.hasOwnProperty(key)) {
        if (!flag) {
          break
        }
        if (!objB.hasOwnProperty(key)) {
          flag = false
          break
        }
        if (!this.isArray(objA[key])) {
          if (objB[key] !== objA[key]) {
            flag = false
            break
          }
        } else {
          if (!this.isArray(objB[key])) {
            flag = false
            break
          }
          const oA = objA[key]
          const oB = objB[key]
          if (oA.length !== oB.length) {
            flag = false
            break
          }
          for (const k in oA) {
            if (oA.hasOwnProperty(k)) {
              if (!flag) {
                break
              }
              flag = this.compareObj(oA[k], oB[k], flag)
            }
          }
        }
      }
    }
    return flag
  }

  // 設置字體樣式
  public setFormatStyle(
    type?: string,
    option: any = {},
    isBlock: boolean = false
  ): void {
    const quill = this.state.quill
    const range = this.state.range
    let emptyStyle = false
    if (!range && JSON.stringify(option) !== '{}') {
      return alert('請選擇文字')
    }
    if (!range) {
      return
    }

    const oldStyle = quill.getFormat(range)
    // 判斷是否有傳樣式
    if (!type || JSON.stringify(option) === '{}') {
      quill.removeFormat(range.index, range.length)
    } else {
      // 獲取文字上的舊樣式，判斷是否有，如有就清除樣式
      const style = quill.getFormat(range.index, range.length)
      emptyStyle = JSON.stringify(style) === '{}'
      // 判斷是否是切換樣式，如是：修改樣式
      if (
        emptyStyle ||
        (this.state.histories.length > 0 && !this.compareObj(oldStyle, option))
      ) {
        // 判断是否是块级样式
        if (isBlock) {
          quill.format(Object.keys(option)[0], Object.values(option)[0])
        } else {
          quill.formatText(range.index, range.length, option)
        }
      } else {
        quill.removeFormat(range.index, range.length)
      }
    }
    // 判斷是否是切換新的樣式，否就判斷時候有舊樣式
    const formatType =
      this.state.histories.length > 0 && this.compareObj(oldStyle, option)
        ? emptyStyle
          ? type
          : ''
        : type

    this.setState({
      formatType
    })
  }
  // 設置歷史計數值
  public changeHistoryStep(type: string) {
    let index = this.state.historyStep
    const quill = this.state.quill
    switch (type) {
      case 'undo':
        if (index <= 0) {
          return
        }
        index--
        quill.history.undo()
        break
      case 'redo':
        if (index >= this.state.histories.length) {
          return
        }
        index++
        quill.history.redo()
        break
      default:
        break
    }

    this.setState({
      historyStep: index,
      openRedoOrUndo: true
    })
  }

  // 设置标题
  public handleTitle(e: any) {
    const value = e.target.value
    this.setState({
      title: value
    })
    e.target.style.height = e.target.scrollTop + e.target.scrollHeight + 'px'
  }

  // 取消编辑
  public cancelEdit() {
    if (this.props.draft) {
      // 草稿上传成功
      console.log(`this.jumpToLink('onEditorCancle')`)
    } else {
      // 草稿未上传成功
      console.log(`this.jumpToLink('showDraftNotSavedTipView')`)
    }
  }

  // 获取native上游
  // public setLinkToUpstreamArticle(params) {
  //   const data = JSON.parse(params)
  //   this.setState({
  //     upstream: data
  //   })
  //   this.onSaveCommit()
  // }

  // 设置录音
  public onSetRecord(data: any) {
    const quill = this.state.quill
    const range = this.state.range ? this.state.range : quill.getSelection(true)
    // data = {
    //     id: 1,
    //     title: '撒打算',
    //     duration: '00:00:01',
    //     src: 'http://www.w3school.com.cn/i/horse.ogg'
    // }
    quill.insertEmbed(range.index, 'record', data, 'user')
    quill.setSelection(range.index + 2, 'silent')
    quill.insertText(range.index, '\n', 'user')
    quill.blur()
  }

  // 编辑录音
  // public updateVoice(params) {
  //   if (typeof params === 'string') {
  //     params = JSON.parse(params)
  //   }
  //   let data = params.data
  //   if (typeof params.data === 'string') {
  //     data = JSON.parse(params.data)
  //   }
  //   const el = document.getElementById('frame_' + data.index)
  //   const dom = el.contentWindow.document.body
  //   dom.querySelector('h2').innerText = data.title
  // }

  // app调用编辑链接
  // public updateLink(params) {
  //   if (typeof params === 'string') {
  //     params = JSON.parse(params)
  //   }
  //   let data = params.data
  //   if (typeof params.data === 'string') {
  //     data = JSON.parse(params.data)
  //   }
  //   const el = document.getElementById('link_' + data.index)
  //   el.setAttribute('src', data.link)
  // }

  // app调用移除链接
  // public deleteLink() {
  //   const range = this.state.range
  //   this.state.quill.formatText(range.index, range.length, { link: false })
  // }

  // 获取上传图片
  public async setPhotoResource(params: any) {
    // 设置图片
    if (typeof params === 'string') {
      params = JSON.parse(params)
    }
    let array = params.data
    if (typeof array === 'string') {
      array = JSON.parse(array)
    }
    for (const i of array) {
      const value = await this.props.upload(
        'data:image/png;base64,' + array[i].image
      )

      if (value.data && value.data.singleFileUpload) {
        if (i === 0) {
          this.setState({ coverAssetId: value.data.singleFileUpload.id })
        }
        this.onSetPhotos(value.data.singleFileUpload)
      }
    }
  }

  // 设置图片
  public onSetPhotos(data: UploadResponse['singleFileUpload']) {
    const quill = this.state.quill
    const range = this.state.range ? this.state.range : quill.getSelection(true)

    quill.insertEmbed(range.index + 1, 'image', {
      url: data.path,
      action: (className: string) => {
        const figcaption = document.querySelector(className)
        const el =
          figcaption &&
          figcaption.nextSibling &&
          (figcaption.nextSibling.nextSibling as HTMLElement)
        const desc = el && el.innerText
        const json = {
          image: data.path,
          className,
          desc
        }
        console.log(
          `this.jumpToLink('onPhotoPreview', ${JSON.stringify(json)})`
        )
      }
    })
    quill.setSelection(range.index, 'silent')
  }

  // 点击下一步
  public onNextStep() {
    const state = this.state
    if (state.title !== '' && (state.quill && state.quill.getContents())) {
      console.log(`this.jumpToLink('onAddTags', this.props.draftId)`)
    }
  }

  // 设置资源ID
  public setAppResourceId() {
    console.log(`this.jumpToLink('onAddTags', this.props.draftId)`)
  }

  // 设置图片描述
  public setPhotoDesc(params: any) {
    // const quill = this.state.quill
    if (typeof params === 'string') {
      params = JSON.parse(params)
    }
    let data = params.data
    if (typeof params.data === 'string') {
      data = JSON.parse(params.data)
    }
    const figcaption = document.querySelector(data.class_name)
    if (figcaption) {
      figcaption.nextSibling.nextSibling.innerText = data.desc
    }
  }

  // 删除上游链接
  public onClearUpstream() {
    this.setState({
      upstream: {
        id: undefined,
        title: ''
      }
    })
    this.onSaveCommit()
  }

  public render() {
    const state = this.state
    const canUndo = state.historyStep >= 1
    const canRedo =
      state.histories && state.historyStep < state.histories.length - 1
    // const canNext =
    //   state.title !== '' && (state.quill && state.quill.getContents())
    return (
      <div>
        <div style={Style.contentBox}>
          {/* <header
                        style={Style.header}
                        className="flex items-center justify-between"
                    >
                        <div onClick={this.cancelEdit.bind(this)}>取消</div>
                        <div className="flex items-center">
                            <div
                                onClick={() => this.jumpToLink('showDraftView')}
                            >
                                草稿
                            </div>
                            <div
                                style={Style.header.next(canNext)}
                                onClick={this.onNextStep.bind(this)}
                            >
                                下一步
                            </div>
                        </div>
                    </header> */}
          <div
            className="flex items-center justify-between"
            style={Style.form.upstreamBox}
          >
            <div className="w-4/5">
              <input
                type="text"
                placeholder="連結上游文章（可選）"
                value={(state.upstream && state.upstream.title) || undefined}
                style={Style.form.input(1.4, 'rgb(179, 179, 179)', false)}
                readOnly
                onClick={() => {
                  console.log(`this.jumpToLink('onSearchArticle')`)
                }}
              />
            </div>
            {state.upstream && state.upstream.title && (
              <div
                style={Style.form.stopLink}
                className="flex-auto"
                onClick={this.onClearUpstream}
              >
                斷開上遊
              </div>
            )}
          </div>
          <div>
            <textarea
              placeholder="请输入标题"
              style={Style.form.input(2.2, 'rgb(51, 51, 51)', true)}
              value={state.title}
              onChange={e => {
                this.handleTitle(e)
              }}
              onClick={() => {
                this.setState({ toolsContentMode: 0 })
              }}
              onBlur={this.onSaveCommit}
            />
            <div id="editor" style={Style.form.textarea}>
              {/* {编辑器挂载} */}
            </div>
          </div>
        </div>
        <EditorTools
          quill={state.quill}
          undo={canUndo}
          redo={canRedo}
          mode={state.toolsMode}
          contentType={state.toolsContentMode}
          format={state.formatType}
          mark={(e: Event, type: string) => {
            this.onClickMark(e, type)
          }}
          changeStep={(type: string) => {
            this.changeHistoryStep(type)
          }}
          setRecord={(data: any) => {
            this.onSetRecord(data)
          }}
        />
        <iframe id="frame" name="frame" hidden />
      </div>
    )
  }
}
