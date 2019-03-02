// import Quill from 'quill'

// const BlockEmbed = Quill.import('blots/block/embed')

// class RecordBlot extends BlockEmbed {
//   public static create(data) {
//     const node = super.create()
//     // 添加录音控件，并修改内容
//     const parent = document.getElementById('editor')
//     let childLength = parent.querySelectorAll('.record').length
//     const iframe = document.getElementById('frame')
//     const iframeNew = iframe.cloneNode(true)
//     ++childLength
//     iframeNew.setAttribute('id', 'frame_' + childLength)
//     node.appendChild(iframeNew)
//     setTimeout(() => {
//       const iframe = document.getElementById('frame_' + childLength)
//       const dom = document.all
//         ? iframe.contentWindow.document
//         : iframe.contentDocument
//       dom.open()
//       iframe.contentWindow.document.write(`
//                     <!DOCTYPE html>
//                     <html lang="en">
//                     <head>
//                         <title></title>
//                         <meta charset="UTF-8">
//                         <meta
//                             name="viewport"
//                             content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
//                         />
//                         <link
//                             rel="stylesheet"
//                             href="//at.alicdn.com/t/font_869170_7a7u4hid2f.css"
//                         />
//                     </head>
//                     <style>
//                         *{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
//                         html {
//                             font-size: 10px;
//                         }
//                         body {
//                             font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang TC", "Microsoft YaHei", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", sans-serif;
//                         }
//                         .flex {
//                             display: flex;
//                         }
//                         .items-center {
//                             align-items: center;
//                         }
//                         .justify-between{
//                             justify-content: space-between;
//                         }
//                     </style>
//                     <body>
//                         <div style="padding: 1.6rem; background: linear-gradient(rgb(242, 250, 247), rgb(236, 250, 247), rgba(222, 243, 237, 0.6));">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <div>
//                                         <h2 style="margin: 0px 0px 0.5rem; font-size: 1.6rem; color: rgb(51, 51, 51);">${
//                                           data.title ? data.title : '无标题'
//                                         }</h2>
//                                         <div style="font-size: 1.2rem; color: rgb(179, 179, 179); text-align: left;">${
//                                           data.duration
//                                         }</div>
//                                     </div>
//                                 </div>
//                                 <div className="iconfont icon-bofang" style="font-size: 3.2rem; color: rgb(74, 124, 110);"></div>
//                             </div>
//                         </div>
//                         <audio src="${data.src}" hidden id="audio_${data.id}" />
//                     </body>
//                     </html>`)
//       dom.close()
//       dom.contentEditable = true
//       dom.designMode = 'on'
//       iframe.removeAttribute('hidden')
//     }, 0)
//     // 添加点击事件调用native标题
//     node.addEventListener('click', e => {
//       const clientWidth = document.documentElement.clientWidth
//       const scrollTop = document.body.scrollTop
//       const parentTop = document.getElementById('editor').offsetTop
//       const px = window.devicePixelRatio
//       const isAndroid =
//         navigator.userAgent.indexOf('Android') > -1 ||
//         navigator.userAgent.indexOf('Adr') > -1
//       const params = {
//         title: data.title,
//         link: data.src,
//         index: childLength,
//         x: isAndroid ? (clientWidth / 2) * px : clientWidth / 2,
//         y: isAndroid
//           ? (parentTop + node.offsetTop) * px
//           : parentTop + node.offsetTop
//       }
//       _this.jumpToLink('onVoiceMenu', JSON.stringify(params))
//       setTimeout(() => {
//         _this.state.quill.blur()
//       }, 0)
//       e.preventDefault()
//       return false
//     })

//     return node
//   }

//   public static value(domNode) {
//     return domNode
//   }
// }
// RecordBlot.blotName = 'record'
// RecordBlot.tagName = 'div'
// RecordBlot.className = 'record'

// export default RecordBlot
