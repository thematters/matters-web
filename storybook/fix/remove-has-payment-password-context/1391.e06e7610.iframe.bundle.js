"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[1391],{"./node_modules/clipboard-polyfill/dist/es6/clipboard-polyfill.es6.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cW:()=>write,xf:()=>ClipboardItemPolyfill});var console=__webpack_require__("./node_modules/console-browserify/index.js"),TEXT_PLAIN="text/plain",TEXT_HTML="text/html",debugLogImpl=s=>{};function debugLog(s){debugLogImpl(s)}var showWarnings=!0;(function warnOrLog(){(console.warn||console.log).apply(console,arguments)}).bind("[clipboard-polyfill]");var _a,_b,_c,originalWindow="undefined"==typeof window?void 0:window,originalGlobalThis="undefined"==typeof globalThis?void 0:globalThis,promiseConstructorImpl=null!=(_c=null==(_a=originalWindow)?void 0:_a.Promise)?_c:null==(_b=originalGlobalThis)?void 0:_b.Promise;var _a2,_a3,_a4,_a5,_a6,originalNavigator="undefined"==typeof navigator?void 0:navigator,originalNavigatorClipboard=null==originalNavigator?void 0:originalNavigator.clipboard,originalNavigatorClipboardWrite=(null==(_a2=null==originalNavigatorClipboard?void 0:originalNavigatorClipboard.read)||_a2.bind(originalNavigatorClipboard),null==(_a3=null==originalNavigatorClipboard?void 0:originalNavigatorClipboard.readText)||_a3.bind(originalNavigatorClipboard),null==(_a4=null==originalNavigatorClipboard?void 0:originalNavigatorClipboard.write)?void 0:_a4.bind(originalNavigatorClipboard)),originalWindowClipboardItem=(null==(_a5=null==originalNavigatorClipboard?void 0:originalNavigatorClipboard.writeText)||_a5.bind(originalNavigatorClipboard),null==(_a6=originalWindow)?void 0:_a6.ClipboardItem),promiseConstructor=function getPromiseConstructor(){if(!promiseConstructorImpl)throw new Error("No `Promise` implementation available for `clipboard-polyfill`. Consider using: https://github.com/lgarron/clipboard-polyfill#flat-file-version-with-promise-included");return promiseConstructorImpl}(),ieWindow=originalWindow;function seemToBeInIE(){return"undefined"==typeof ClipboardEvent&&void 0!==(null==ieWindow?void 0:ieWindow.clipboardData)&&void 0!==(null==ieWindow?void 0:ieWindow.clipboardData.setData)}function copyListener(tracker,data,e){for(var type in debugLog("listener called"),tracker.success=!0,data){var value=data[type],clipboardData=e.clipboardData;clipboardData.setData(type,value),type===TEXT_PLAIN&&clipboardData.getData(type)!==value&&(debugLog("setting text/plain failed"),tracker.success=!1)}e.preventDefault()}function execCopy(data){var tracker={success:!1},listener=copyListener.bind(this,tracker,data);document.addEventListener("copy",listener);try{document.execCommand("copy")}finally{document.removeEventListener("copy",listener)}return tracker.success}function copyUsingTempSelection(e,data){selectionSet(e);var success=execCopy(data);return selectionClear(),success}function selectionSet(elem){var sel=document.getSelection();if(sel){var range=document.createRange();range.selectNodeContents(elem),sel.removeAllRanges(),sel.addRange(range)}}function selectionClear(){var sel=document.getSelection();sel&&sel.removeAllRanges()}function writeFallback(stringItem){var hasTextPlain=TEXT_PLAIN in stringItem;if(seemToBeInIE()){if(!hasTextPlain)throw new Error("No `text/plain` value was specified.");if(function writeTextIE(text){if(!ieWindow.clipboardData)return!1;var success=ieWindow.clipboardData.setData("Text",text);return success&&debugLog("writeTextIE worked"),success}(stringItem[TEXT_PLAIN]))return!0;throw new Error("Copying failed, possibly because the user rejected it.")}return execCopy(stringItem)?(debugLog("regular execCopy worked"),!0):navigator.userAgent.indexOf("Edge")>-1?(debugLog('UA "Edge" => assuming success'),!0):copyUsingTempSelection(document.body,stringItem)?(debugLog("copyUsingTempSelection worked"),!0):function copyUsingTempElem(data){var tempElem=document.createElement("div");tempElem.setAttribute("style","-webkit-user-select: text !important"),tempElem.textContent="temporary element",document.body.appendChild(tempElem);var success=copyUsingTempSelection(tempElem,data);return document.body.removeChild(tempElem),success}(stringItem)?(debugLog("copyUsingTempElem worked"),!0):!!function copyTextUsingDOM(str){debugLog("copyTextUsingDOM");var tempElem=document.createElement("div");tempElem.setAttribute("style","-webkit-user-select: text !important");var spanParent=tempElem;tempElem.attachShadow&&(debugLog("Using shadow DOM."),spanParent=tempElem.attachShadow({mode:"open"}));var span=document.createElement("span");span.innerText=str,spanParent.appendChild(span),document.body.appendChild(tempElem),selectionSet(span);var result=document.execCommand("copy");return selectionClear(),document.body.removeChild(tempElem),result}(stringItem[TEXT_PLAIN])&&(debugLog("copyTextUsingDOM worked"),!0)}function promiseRecordMap(keys,f){for(var promiseList=[],i=0;i<keys.length;i++){var key=keys[i];promiseList.push(f(key))}return promiseConstructor.all(promiseList).then((vList=>{for(var dataOut={},i2=0;i2<keys.length;i2++)dataOut[keys[i2]]=vList[i2];return dataOut}))}var voidPromise=promiseConstructor.resolve(),truePromiseFn=()=>promiseConstructor.resolve(!0),falsePromise=promiseConstructor.resolve(!1);function rejectThrownErrors(executor){return new promiseConstructor(((resolve,reject)=>{try{resolve(executor())}catch(e){reject(e)}}))}function hasItemWithType(clipboardItems,typeName){for(var i=0;i<clipboardItems.length;i++){if(-1!==clipboardItems[i].types.indexOf(typeName))return!0}return!1}var ClipboardItemPolyfill=function ClipboardItemPolyfillImpl(items,options){var _a7,types=Object.keys(items),_items={};for(var type in items){var item=items[type];_items[type]="string"==typeof item?stringToBlob(type,item):item}return{types,presentationStyle:null!=(_a7=null==options?void 0:options.presentationStyle)?_a7:"unspecified",getType:function getType(type2){return promiseConstructor.resolve(_items[type2])}}};function stringToBlob(type,str){return new Blob([str],{type})}function clipboardItemToGlobalClipboardItem(clipboardItem){return promiseRecordMap(clipboardItem.types,(function(type){return clipboardItem.getType(type)})).then((items=>new promiseConstructor(((resolve,reject)=>{var options={};clipboardItem.presentationStyle&&(options.presentationStyle=clipboardItem.presentationStyle),originalWindowClipboardItem?resolve(new originalWindowClipboardItem(items,options)):reject("window.ClipboardItem is not defined")}))))}function getTypeAsString(clipboardItem,type){return clipboardItem.getType(type).then((text=>function blobToString(blob){return new promiseConstructor(((resolve,reject)=>{var fileReader=new FileReader;fileReader.addEventListener("load",(()=>{var result=fileReader.result;"string"==typeof result?resolve(result):reject("could not convert blob to string")})),fileReader.readAsText(blob)}))}(text)))}function write(data){return rejectThrownErrors((()=>{if(originalNavigatorClipboardWrite&&originalWindowClipboardItem){var originalNavigatorClipboardWriteCached=originalNavigatorClipboardWrite;return debugLog("Using `navigator.clipboard.write()`."),promiseConstructor.all(data.map(clipboardItemToGlobalClipboardItem)).then((globalClipboardItems=>originalNavigatorClipboardWriteCached(globalClipboardItems).then(truePromiseFn).catch((e=>{if(!hasItemWithType(data,TEXT_PLAIN)&&!hasItemWithType(data,TEXT_HTML))throw e;return falsePromise}))))}return falsePromise})).then((success=>{if(success)return voidPromise;var hasTextPlain=hasItemWithType(data,TEXT_PLAIN);return function shouldShowWarnings(){return showWarnings}()&&!hasTextPlain&&debugLog("clipboard.write() was called without a `text/plain` data type. On some platforms, this may result in an empty clipboard. Call suppressWarnings() to suppress this warning."),function toStringItem(data){return promiseRecordMap(data.types,(function(type){return getTypeAsString(data,type)}))}(data[0]).then((stringItem=>{if(!writeFallback(stringItem))throw new Error("write() failed")}))}))}},"./node_modules/fastest-levenshtein/esm/mod.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{new Uint32Array(65536)},"./node_modules/goober/dist/goober.modern.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F4:()=>h,cY:()=>m,iv:()=>u,zo:()=>j});let e={data:""},t=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||e,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,a=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,o=(e,t)=>{let r="",l="",a="";for(let n in e){let c=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+c+";":l+="f"==n[1]?o(c,n):n+"{"+o(c,"k"==n[1]?"":t)+"}":"object"==typeof c?l+=o(c,t?t.replace(/([^,])+/g,(e=>n.replace(/(^:.*)|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):n):null!=c&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=o.p?o.p(n,c):n+":"+c+";")}return r+(t&&a?t+"{"+a+"}":a)+l},c={},s=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+s(e[r]);return t}return e},i=(e,t,r,i,p)=>{let u=s(e),d=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[d]){let t=u!==e?e:(e=>{let t,r,o=[{}];for(;t=l.exec(e.replace(a,""));)t[4]?o.shift():t[3]?(r=t[3].replace(n," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(n," ").trim();return o[0]})(e);c[d]=o(p?{["@keyframes "+d]:t}:t,r?"":"."+d)}let f=r&&c.g?c.g:null;return r&&(c.g=c[d]),((e,t,r,l)=>{l?t.data=t.data.replace(l,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(c[d],t,i,f),d},p=(e,t,r)=>e.reduce(((e,l,a)=>{let n=t[a];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+l+(null==n?"":n)}),"");function u(e){let r=this||{},l=e.call?e(r.p):e;return i(l.unshift?l.raw?p(l,[].slice.call(arguments,1),r.p):l.reduce(((e,t)=>Object.assign(e,t&&t.call?t(r.p):t)),{}):l,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let d,f,g,h=u.bind({k:1});function m(e,t,r,l){o.p=t,d=e,f=r,g=l}function j(e,t){let r=this||{};return function(){let l=arguments;function a(n,o){let c=Object.assign({},n),s=c.className||a.className;r.p=Object.assign({theme:f&&f()},c),r.o=/ *go\d+/.test(s),c.className=u.apply(r,l)+(s?" "+s:""),t&&(c.ref=o);let i=e;return e[0]&&(i=c.as||e,delete c.as),g&&i[0]&&g(c),d(i,c)}return t?t(a):a}}},"./node_modules/react-hot-toast/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>_t,x7:()=>Ie});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),goober__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/goober/dist/goober.modern.js"),T=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,U=(()=>{let e=0;return()=>(++e).toString()})(),b=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),S=new Map,$=e=>{if(S.has(e))return;let t=setTimeout((()=>{S.delete(e),u({type:4,toastId:e})}),1e3);S.set(e,t)},v=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&(e=>{let t=S.get(e);t&&clearTimeout(t)})(t.toast.id),{...e,toasts:e.toasts.map((r=>r.id===t.toast.id?{...r,...t.toast}:r))};case 2:let{toast:o}=t;return e.toasts.find((r=>r.id===o.id))?v(e,{type:1,toast:o}):v(e,{type:0,toast:o});case 3:let{toastId:s}=t;return s?$(s):e.toasts.forEach((r=>{$(r.id)})),{...e,toasts:e.toasts.map((r=>r.id===s||void 0===s?{...r,visible:!1}:r))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((r=>r.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((r=>({...r,pauseDuration:r.pauseDuration+a})))}}},A=[],P={toasts:[],pausedAt:void 0},u=e=>{P=v(P,e),A.forEach((t=>{t(P)}))},Y={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},h=e=>(t,o)=>{let s=((e,t="blank",o)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(null==o?void 0:o.id)||U()}))(t,e,o);return u({type:2,toast:s}),s.id},n=(e,t)=>h("blank")(e,t);n.error=h("error"),n.success=h("success"),n.loading=h("loading"),n.custom=h("custom"),n.dismiss=e=>{u({type:3,toastId:e})},n.remove=e=>u({type:4,toastId:e}),n.promise=(e,t,o)=>{let s=n.loading(t.loading,{...o,...null==o?void 0:o.loading});return e.then((a=>(n.success(T(t.success,a),{id:s,...o,...null==o?void 0:o.success}),a))).catch((a=>{n.error(T(t.error,a),{id:s,...o,...null==o?void 0:o.error})})),e};var Z=(e,t)=>{u({type:1,toast:{id:e,height:t}})},ee=()=>{u({type:5,time:Date.now()})},D=e=>{let{toasts:t,pausedAt:o}=((e={})=>{let[t,o]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(P);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>(A.push(o),()=>{let a=A.indexOf(o);a>-1&&A.splice(a,1)})),[t]);let s=t.toasts.map((a=>{var r,c;return{...e,...e[a.type],...a,duration:a.duration||(null==(r=e[a.type])?void 0:r.duration)||(null==e?void 0:e.duration)||Y[a.type],style:{...e.style,...null==(c=e[a.type])?void 0:c.style,...a.style}}}));return{...t,toasts:s}})(e);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(o)return;let r=Date.now(),c=t.map((i=>{if(i.duration===1/0)return;let d=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(!(d<0))return setTimeout((()=>n.dismiss(i.id)),d);i.visible&&n.dismiss(i.id)}));return()=>{c.forEach((i=>i&&clearTimeout(i)))}}),[t,o]);let s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{o&&u({type:6,time:Date.now()})}),[o]),a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((r,c)=>{let{reverseOrder:i=!1,gutter:d=8,defaultPosition:p}=c||{},g=t.filter((m=>(m.position||p)===(r.position||p)&&m.height)),E=g.findIndex((m=>m.id===r.id)),x=g.filter(((m,R)=>R<E&&m.visible)).length;return g.filter((m=>m.visible)).slice(...i?[x+1]:[0,x]).reduce(((m,R)=>m+(R.height||0)+d),0)}),[t]);return{toasts:t,handlers:{updateHeight:Z,startPause:ee,endPause:s,calculateOffset:a}}},oe=goober__WEBPACK_IMPORTED_MODULE_1__.F4`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,re=goober__WEBPACK_IMPORTED_MODULE_1__.F4`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,se=goober__WEBPACK_IMPORTED_MODULE_1__.F4`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,_=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${se} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ne=goober__WEBPACK_IMPORTED_MODULE_1__.F4`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ne} 1s linear infinite;
`,pe=goober__WEBPACK_IMPORTED_MODULE_1__.F4`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,de=goober__WEBPACK_IMPORTED_MODULE_1__.F4`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,w=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${de} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ue=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  position: absolute;
`,le=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Te=goober__WEBPACK_IMPORTED_MODULE_1__.F4`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,fe=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Te} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,M=({toast:e})=>{let{icon:t,type:o,iconTheme:s}=e;return void 0!==t?"string"==typeof t?react__WEBPACK_IMPORTED_MODULE_0__.createElement(fe,null,t):t:"blank"===o?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(le,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(V,{...s}),"loading"!==o&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(ue,null,"error"===o?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_,{...s}):react__WEBPACK_IMPORTED_MODULE_0__.createElement(w,{...s})))},ye=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,ge=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,be=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Se=(0,goober__WEBPACK_IMPORTED_MODULE_1__.zo)("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,F=react__WEBPACK_IMPORTED_MODULE_0__.memo((({toast:e,position:t,style:o,children:s})=>{let a=e.height?((e,t)=>{let s=e.includes("top")?1:-1,[a,r]=b()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ye(s),ge(s)];return{animation:t?`${(0,goober__WEBPACK_IMPORTED_MODULE_1__.F4)(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${(0,goober__WEBPACK_IMPORTED_MODULE_1__.F4)(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},r=react__WEBPACK_IMPORTED_MODULE_0__.createElement(M,{toast:e}),c=react__WEBPACK_IMPORTED_MODULE_0__.createElement(Se,{...e.ariaProps},T(e.message,e));return react__WEBPACK_IMPORTED_MODULE_0__.createElement(be,{className:e.className,style:{...a,...o,...e.style}},"function"==typeof s?s({icon:r,message:c}):react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,r,c))}));(0,goober__WEBPACK_IMPORTED_MODULE_1__.cY)(react__WEBPACK_IMPORTED_MODULE_0__.createElement);var Ee=({id:e,className:t,style:o,onHeightUpdate:s,children:a})=>{let r=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((c=>{if(c){let i=()=>{let d=c.getBoundingClientRect().height;s(e,d)};i(),new MutationObserver(i).observe(c,{subtree:!0,childList:!0,characterData:!0})}}),[e,s]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{ref:r,className:t,style:o},a)},ve=goober__WEBPACK_IMPORTED_MODULE_1__.iv`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Ie=({reverseOrder:e,position:t="top-center",toastOptions:o,gutter:s,children:a,containerStyle:r,containerClassName:c})=>{let{toasts:i,handlers:d}=D(o);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...r},className:c,onMouseEnter:d.startPause,onMouseLeave:d.endPause},i.map((p=>{let g=p.position||t,x=((e,t)=>{let o=e.includes("top"),s=o?{top:0}:{bottom:0},a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:b()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(o?1:-1)}px)`,...s,...a}})(g,d.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}));return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Ee,{id:p.id,key:p.id,onHeightUpdate:d.updateHeight,className:p.visible?ve:"",style:x},"custom"===p.type?T(p.message,p):a?a(p):react__WEBPACK_IMPORTED_MODULE_0__.createElement(F,{toast:p,position:g}))})))},_t=n}}]);
//# sourceMappingURL=1391.e06e7610.iframe.bundle.js.map