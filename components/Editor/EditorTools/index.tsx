// import { throws } from 'assert'
import React, { Component } from 'react'

// import native from '../../utils/native'
// import RecordBox from '../RecordBox'
import toolsConfig from './config'
import Style from './style'

const TOOLBAR_ONE = 1
// const TOOLBAR_TWO = 2
const EDITOR_FORMAT_TEXT = 1
const EDITOR_UPLOAD_PLAYER = 2

interface Props {
  quill: any
  undo: boolean
  redo: boolean
  format?: string
  mark: any
  changeStep: any
  mode: number
  contentType: number
  setRecord: any
}
interface State {
  tools: any
  mode: number
  type: number
  record: boolean
}

class EditorTools extends Component<Props, State> {
  public state = {
    tools: toolsConfig.tools,
    mode: this.props.mode,
    type: 0,
    record: false
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.mode !== this.state.mode) {
      this.setState({
        mode: nextProps.mode
      })
    }
    if (nextProps.contentType !== this.state.type) {
      this.setState({
        type: nextProps.contentType
      })
    }
  }

  // native交互
  // public nativeFn(fn: string, params: any) {
  //   native.call(fn, params)
  // }

  // 设置录音数据
  public setRecordData(data: any) {
    this.setState({
      record: false,
      mode: this.props.mode,
      type: 0
    })
    this.props.setRecord(data)
  }

  // 修改操作内容区域显示
  public onHeaderHandle(index: number) {
    switch (index) {
      case 1:
        if (this.state.type === EDITOR_FORMAT_TEXT) {
          this.props.quill.focus()
        }
        this.setState({
          mode: TOOLBAR_ONE,
          type: this.state.type === EDITOR_FORMAT_TEXT ? 0 : EDITOR_FORMAT_TEXT
        })
        break
      case 2:
        this.setState({
          type: EDITOR_UPLOAD_PLAYER
        })
        break
      case 5:
        this.setState({
          type: 0
        })
        break
      default:
        break
    }
  }

  // 操作undo 和 redo
  public changeHistroy(type: string) {
    this.setState({
      type: 0
    })
    this.props.changeStep(type)
  }

  // 显示录音
  // public showRecord(show: boolean) {
  //   this.setState({
  //     record: show,
  //     type: show ? 0 : 2
  //   })
  //   if (!show) {
  //     console.log(`this.nativeFn('onCancelRecording')`)
  //   }
  // }

  // 显示操作栏
  public showToolsHeader() {
    if (this.state.mode === 1) {
      const wordImg =
        this.state.type === 1
          ? require('../../assets/icon/word2.png')
          : require('../../assets/icon/word.png')
      const addImg =
        this.state.type === 2
          ? require('../../assets/icon/add2.png')
          : require('../../assets/icon/add.png')
      return (
        <div
          className="flex items-center justify-between"
          style={Style.tools.header}
        >
          <div>
            <img
              src={wordImg}
              alt="keyboard"
              style={Style.tools.header.img({
                width: '2.4rem',
                margin: '0 2.4rem 0 0',
                opacity: 1
              })}
              onClick={() => this.onHeaderHandle(1)}
            />
            <img
              src={addImg}
              alt="add"
              style={Style.tools.header.img({
                width: '2.4rem',
                margin: '0 2.4rem 0 0',
                opacity: 1
              })}
              onClick={() => this.onHeaderHandle(2)}
            />
            <img
              src={require('../../assets/icon/undo.png')}
              alt="undo"
              style={Style.tools.header.img({
                width: '2.4rem',
                margin: '0 2.4rem 0 0',
                opacity: this.props.undo ? 1 : 0.5
              })}
              onClick={() => this.changeHistroy('undo')}
            />
            <img
              src={require('../../assets/icon/redo.png')}
              alt="redo"
              style={Style.tools.header.img({
                width: '2.4rem',
                margin: '0 2.4rem 0 0',
                opacity: this.props.redo ? 1 : 0.5
              })}
              onClick={() => this.changeHistroy('redo')}
            />
          </div>
          <div>
            <img
              src={require('../../assets/icon/arrow_down.png')}
              alt="downArrow"
              style={Style.tools.header.img({
                width: '2.4rem',
                margin: '0',
                opacity: 1
              })}
              onClick={() => this.onHeaderHandle(5)}
            />
          </div>
        </div>
      )
    }
    return (
      <div
        className="flex items-center justify-between"
        // style={Style.tools.header.box}
      >
        <div className="flex-auto text-center">
          <img
            src={require('../../assets/icon/bold.png')}
            alt="bold"
            style={Style.tools.header.img({
              width: '3.2rem',
              margin: '0 auto',
              opacity: 1
            })}
            onClick={e => this.props.mark(e, 'bold')}
          />
        </div>
        <div className="flex-auto text-center">
          <img
            src={require('../../assets/icon/italic.png')}
            alt="italic"
            style={Style.tools.header.img({
              width: '3.2rem',
              margin: '0 auto',
              opacity: 1
            })}
            onClick={e => this.props.mark(e, 'italic')}
          />
        </div>
        <div className="flex-auto text-center">
          <img
            src={require('../../assets/icon/link.png')}
            alt="link"
            style={Style.tools.header.img({
              width: '3.2rem',
              margin: '0 auto',
              opacity: 1
            })}
            onClick={e => this.props.mark(e, 'link')}
          />
        </div>
        <div className="flex-auto text-center">
          <img
            src={require('../../assets/icon/more.png')}
            alt="more"
            style={Style.tools.header.img({
              width: '3.2rem',
              margin: '0 auto',
              opacity: 1
            })}
            onClick={() => this.onHeaderHandle(1)}
          />
        </div>
      </div>
    )
  }

  // 显示操作内容
  public showToolsContent() {
    if (this.state.type === 1) {
      const { contentBox, contentItem, ...restStyle } = Style.tools.content
      return (
        <div style={restStyle as React.CSSProperties}>
          {this.state.tools.map((i, j) => {
            const isLast = j === this.state.tools.length - 1
            if (i.picture) {
              return (
                <div style={contentItem(isLast)} key={j}>
                  <div
                    style={contentBox(
                      j !== this.state.tools.length - 1 &&
                        this.props.format === i.type
                    )}
                    className="flex items-center justify-center"
                    onClick={e => {
                      this.props.mark(e, i.type)
                    }}
                  >
                    <img
                      src={
                        j !== this.state.tools.length - 1 &&
                        this.props.format === i.type
                          ? i.active_picture
                          : i.picture
                      }
                      alt=""
                      style={Style.tools.content.contentImg}
                    />
                  </div>
                </div>
              )
            }
            return (
              <div
                style={Style.tools.content.contentItem(isLast)}
                key={j}
                onClick={e => {
                  this.props.mark(e, i.type)
                }}
              >
                <div
                  style={Style.tools.content.contentBox(
                    this.props.format === i.type
                  )}
                  className="flex items-center justify-center"
                >
                  <span>{i.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else if (this.state.type === 2) {
      return (
        <div
          className="flex items-center justify-between"
          style={Style.tools.contentModel}
        >
          <div
            className="text-center"
            onClick={() => console.log(`this.nativeFn('onTakingPictures')`)}
          >
            <div
              className="flex flex-col justify-center items-center"
              style={Style.tools.contentModel.imgBox}
            >
              <img
                src={require('../../assets/icon/camera.png')}
                style={Style.tools.contentModel.imgBox.img}
                alt="camera"
              />
            </div>
            <div>拍照或錄像</div>
          </div>
          <div
            className="text-center"
            onClick={() => console.log(`this.nativeFn('onSelectPhotosView')`)}
          >
            <div
              className="flex flex-col justify-center items-center"
              style={Style.tools.contentModel.imgBox}
            >
              <img
                src={require('../../assets/icon/image.png')}
                style={Style.tools.contentModel.imgBox.img}
                alt="imgBox"
              />
            </div>
            <div>照片圖庫</div>
          </div>
          {/* <div
                        className="text-center"
                        onClick={() => this.showRecord(true)}
                    >
                        <div
                            className="flex flex-col justify-center items-center"
                            style={Style.tools.contentModel.imgBox}
                        >
                            <img
                                src={require('../../assets/icon/audio.png')}
                                style={Style.tools.contentModel.imgBox.img}
                                alt="audio"
                            />
                        </div>
                        <div>錄音</div>
                    </div> */}
        </div>
      )
    }
  }

  public render() {
    return (
      <div style={Style.tools.base(document.body.clientHeight > 800)}>
        {// 操作栏顶部
        this.showToolsHeader()}
        {// 操作栏内容区
        this.showToolsContent()}
        {/* {this.state.record && (
          <RecordBox
            setRecord={(data: any) => {
              this.setRecordData(data)
            }}
            cancel={() => {
              console.log(`this.showRecord(false)`)
            }}
          />
        )} */}
      </div>
    )
  }
}

export default EditorTools
