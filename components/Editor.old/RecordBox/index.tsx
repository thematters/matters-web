// import React, { Component } from 'react'
// import Style from './style'
// // import native from '../../utils/native'

// interface Props {
//   cancel: any
//   setRecord: any
// }
// interface State {
//   hasAudio: boolean
//   play: boolean
//   stopRecord: boolean
//   title: string
//   audio: any
//   audioDom: any
//   duration: number
//   // timer: any
// }

// class RecordBox extends Component<Props, State> {
//   state = {
//     hasAudio: false,
//     play: true,
//     stopRecord: false,
//     title: '',
//     audio: '',
//     audioDom: null,
//     duration: 0
//     // timer: null
//   }
//   componentDidMount() {
//     window.webview.record = this
//     let audio = document.getElementById('audio')
//     this.setState({
//       audioDom: audio
//     })

//     audio.addEventListener(
//       'ended',
//       () => {
//         this.setState({
//           play: false,
//           stopRecord: true
//         })
//       },
//       false
//     )
//     audio.addEventListener(
//       'canplay',
//       () => {
//         this.setState({
//           duration: audio.duration
//         })
//       },
//       false
//     )
//   }

//   // native交互
//   nativeFn(fn: string, params: any) {
//     native.call(fn, params)
//   }

//   // 格式化时间
//   formatTime(second) {
//     return [
//       parseInt(second / 60 / 60),
//       parseInt((second / 60) % 60),
//       parseInt(second % 60)
//     ]
//       .join(':')
//       .replace(/\b(\d)\b/g, '0$1')
//   }

//   // 开始录音
//   startRecord() {
//     // 开始计时
//     // let timer = setInterval(() => {
//     //     this.setState({
//     //         duration: ++this.state.duration
//     //     })
//     // }, 1000)
//     this.setState({
//       hasAudio: true,
//       stopRecord: false
//       // timer: timer
//     })
//     this.nativeFn('onStartRecording')
//   }

//   // 获取app录音秒
//   setVoiceProgress(params: any) {
//     if (typeof params === 'string') {
//       params = JSON.parse(params)
//     }
//     this.setState({
//       duration: params.data
//     })
//   }

//   // 暂停或开始播放
//   onStart() {
//     // if (this.state.play) {
//     //     clearInterval(this.state.timer)
//     // }
//     this.setState({
//       play: this.state.play ? false : true
//       // timer: null
//     })
//     let audio = this.state.audioDom
//     if (this.state.hasAudio) {
//       this.setState({
//         stopRecord: true
//       })
//       this.nativeFn('onPauseRecording')
//     } else {
//       this.setState({
//         stopRecord: this.state.play ? false : true
//       })
//     }
//     if (this.state.stopRecord) {
//       if (audio.paused) {
//         audio.play()
//       } else {
//         audio.pause()
//       }
//     }
//   }

//   // 设置录音
//   setRecordingResource(params: any) {
//     if (typeof params === 'string') {
//       params = JSON.parse(params)
//     }
//     let data = params.data
//     // 设置音频
//     this.setState({
//       audio: 'data:audio/mp3;base64,' + data
//     })
//   }

//   // 使用录音
//   onUseAudio() {
//     let { title, duration, audio } = this.state
//     // 初始化数据
//     this.setState({
//       hasAudio: false,
//       play: true,
//       stopRecord: false,
//       title: '',
//       audio: '',
//       audioDom: null,
//       duration: 0
//     })
//     this.props.setRecord({
//       id: 1,
//       title: title,
//       duration: this.formatTime(duration),
//       src: 'data:audio/mp3;base64,' + audio
//     })
//   }

//   // 调用设置标题
//   editTitle() {
//     this.nativeFn('onInputRecordingTitle', this.state.title)
//   }

//   // 重录
//   backRecord() {
//     this.setState({
//       hasAudio: false,
//       play: true,
//       stopRecord: false,
//       title: '',
//       audio: ''
//     })
//   }

//   // 设置录音标题
//   setRecordingTitle(title: string) {
//     this.setState({
//       title: title
//     })
//   }

//   // 使用录音草稿
//   setRecordingUrl(params: any) {
//     console.log(params)
//   }

//   render() {
//     const style = Style.tools
//     const buttonBox = style.buttonBox
//     const { hasAudio, play, stopRecord, title, audio, duration } = this.state
//     return (
//       <div>
//         <div style={style.shadow} />
//         <div style={style.content}>
//           <h3 style={style.title}>添加錄音</h3>
//           {hasAudio ? (
//             <div style={buttonBox}>
//               <div style={buttonBox.playBox}>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     {play ? (
//                       <div style={buttonBox.playBox.title}>
//                         {this.formatTime(duration)}
//                       </div>
//                     ) : (
//                       <div>
//                         <h2 style={buttonBox.playBox.title}>
//                           {title ? title : '无标题'}
//                         </h2>
//                         <div style={buttonBox.playBox.time}>
//                           {this.formatTime(duration)}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   <div
//                     className={`iconfont ${
//                       play ? 'icon-tingzhi' : 'icon-bofang'
//                     }`}
//                     onClick={this.onStart.bind(this)}
//                     style={buttonBox.playBox.icon}
//                   />
//                 </div>
//               </div>
//               {!play && hasAudio && (
//                 <div
//                   className="flex items-center justify-between"
//                   style={buttonBox.playBox.handle}
//                 >
//                   <span onClick={this.backRecord.bind(this)}>重錄</span>
//                   <span onClick={this.editTitle.bind(this)}>编辑标题</span>
//                   <span onClick={this.onUseAudio.bind(this)}>使用</span>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div style={buttonBox}>
//               <div
//                 style={buttonBox.buttonLine}
//                 onClick={this.startRecord.bind(this)}
//               >
//                 <div style={buttonBox.button} />
//               </div>
//               <div style={buttonBox.buttonText}>開始錄音</div>
//               <div
//                 style={buttonBox.draftBox}
//                 onClick={() => {
//                   this.nativeFn('onRecordingDraft')
//                 }}
//               >
//                 草稿箱
//               </div>
//             </div>
//           )}
//           <div style={style.cancelButton(play)} onClick={this.props.cancel}>
//             取消
//           </div>
//         </div>
//         <audio src={audio} hidden id="audio" />
//       </div>
//     )
//   }
// }

// export default RecordBox
