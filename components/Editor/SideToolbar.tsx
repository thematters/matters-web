// import React from 'react'

// import VideoUrl from './utils/videoUrl'

// class SideToolbar extends React.Component {
//   public getPosition = () => {
//     if (!this.quill) {
//       return
//     }

//     const range = this.quill.getSelection()
//     const len = this.quill.getLength()
//     const position = range ? range.index : len || 0

//     return position
//   }

//   public insertImage(position: any, imgUrl: string) {
//     if (!imgUrl) {
//       return
//     }

//     if (this.quill) {
//       this.quill.insertEmbed(position, 'image', imgUrl)
//     }

//     this.setState({
//       showEditor: false,
//       editorChoose: -1
//     })
//   }

//   public videoUpload(url: string) {
//     if (this.quill) {
//       const range = this.quill.getSelection(true)
//       this.quill.insertEmbed(range.index, 'video', url)

//       this.setState({
//         showEditor: false,
//         editorChoose: -1
//       })
//     }
//   }

//   public codeUpload(url: string, isIframe = false) {
//     // const range = this.quill.getSelection(true)
//     // this.quill.insertEmbed(range.index, isIframe ? 'pastebin' : 'gist', url)
//     // this.setState({
//     //   showEditor: false,
//     //   editorChoose: -1
//     // })
//   }

//   // 视频url - keyup.enter event
//   public onVideoUrl(e: any) {
//     if (e.keyCode === 13) {
//       const url = VideoUrl(e.target.value)
//       if (url) {
//         this.videoUpload(url)
//       }
//       e.target.value = ''
//     }
//   }

//   public onCodeUrl(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.keyCode == 13) {
//       const codeObj = {
//         url: 'https://pastebin.com/embed_iframe/FfvyTrmN',
//         type: 'pastebin'
//       }
//       // TODO: 正则匹配url
//       // const codeObj = codeUrl(e.target.value)
//       // 'https://pastebin.com/embed_iframe/FfvyTrmN'
//       // 'https://gist.github.com/sammieho1995/fac3bbb632d07551a9a51f1afc35b76e'
//       if (codeObj) {
//         this.codeUpload(codeObj.url, codeObj.type !== 'gist')
//       }
//       // e.target.value = ''
//     }
//   }

//   // 分割线
//   public insertDivider() {
//     if (this.quill) {
//       this.onSetStyle(4)

//       const pos = this.getPosition() || 0
//       this.quill.insertEmbed(pos, 'divider', 'user')

//       this.setState({
//         showEditor: false,
//         editorChoose: -1
//       })
//     }
//   }

//   public render() {
//     return (
//       <div style={Style.tools.box} ref="mediaBtn">
//         <img
//           src={require('./assets/icons-editor-add.svg')}
//           style={Style.tools.add}
//           onClick={this.onToggleEditorTools.bind(this)}
//         />
//         {showEditor && (
//           <div
//             className="flex items-center relative"
//             style={Style.tools.children}
//           >
//             {/* close button */}
//             <img
//               src={require('./assets/icons-editor-close.svg')}
//               style={Style.tools.img(1)}
//               onClick={this.onToggleEditorTools.bind(this)}
//             />

//             {/* image */}
//             <label
//               style={Style.tools.img(
//                 editorChoose < 0 || editorChoose === 1 ? 1 : 0.5
//               )}
//             >
//               <input
//                 type="file"
//                 name="file"
//                 onChange={e => this.uploadAvatar(e)}
//                 accept=".jpg,.png,.jpeg"
//                 disabled={false}
//                 multiple={false}
//                 className="hidden"
//               />
//               <img
//                 src={require('./assets/icons-editor-image.svg')}
//                 onClick={() => this.onSetStyle(1)}
//               />
//             </label>

//             {/* video */}
//             <img
//               src={require('./assets/icons-editor-video.svg')}
//               onClick={() => this.onSetStyle(2)}
//               style={Style.tools.img(
//                 editorChoose < 0 || editorChoose === 2 ? 1 : 0.5
//               )}
//             />

//             {/* audio */}
//             {/* <img
//                               src={require('~/src/assets/svg/icons-editor-audio.svg')}
//                               style={Style.tools.img(
//                                   editorChoose < 0 ||
//                                   editorChoose === 3
//                                       ? 1
//                                       : '0.5'
//                               )}
//                               onClick={() => this.onSetStyle(3)}
//                           /> */}

//             {/* hr */}
//             <img
//               src={require('./assets/icons-editor-linebreak.svg')}
//               style={Style.tools.img(
//                 editorChoose < 0 || editorChoose === 4 ? 1 : 0.5
//               )}
//               onClick={() => this.insertDivider()}
//             />

//             {/* code */}
//             <img
//               src={require('./assets/icons-editor-code.svg')}
//               style={Style.tools.img(
//                 editorChoose < 0 || editorChoose === 5 ? 1 : 0.5
//               )}
//               onClick={() => this.onSetStyle(5)}
//             />

//             {/* input video url */}
//             {editorChoose === 2 && (
//               <input
//                 ref="videoInput"
//                 placeholder="請粘貼視頻網站的連結（支持 Youtube，Vimeo 和 Youku），然後按回車確認"
//                 style={Style.tools.imgBox.input}
//                 onKeyUp={e => this.onVideoUrl(e)}
//               />
//             )}

//             {/* input code */}
//             {editorChoose === 5 && (
//               <input
//                 ref="codeLinkInput"
//                 placeholder="請粘貼代碼網站的連結（支持 Github Gist 和 Pastebin），然後按回車確認"
//                 style={Style.tools.imgBox.input}
//                 onKeyUp={e => this.onCodeUrl(e)}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     )
//   }
// }
