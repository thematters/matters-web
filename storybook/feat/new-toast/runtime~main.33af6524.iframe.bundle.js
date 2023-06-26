(()=>{"use strict";var deferred,leafPrototypes,getProto,inProgress,__webpack_modules__={},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={id:moduleId,loaded:!1,exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdO={},deferred=[],__webpack_require__.O=(result,chunkIds,fn,priority)=>{if(!chunkIds){var notFulfilled=1/0;for(i=0;i<deferred.length;i++){for(var[chunkIds,fn,priority]=deferred[i],fulfilled=!0,j=0;j<chunkIds.length;j++)(!1&priority||notFulfilled>=priority)&&Object.keys(__webpack_require__.O).every((key=>__webpack_require__.O[key](chunkIds[j])))?chunkIds.splice(j--,1):(fulfilled=!1,priority<notFulfilled&&(notFulfilled=priority));if(fulfilled){deferred.splice(i--,1);var r=fn();void 0!==r&&(result=r)}}return result}priority=priority||0;for(var i=deferred.length;i>0&&deferred[i-1][2]>priority;i--)deferred[i]=deferred[i-1];deferred[i]=[chunkIds,fn,priority]},__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},getProto=Object.getPrototypeOf?obj=>Object.getPrototypeOf(obj):obj=>obj.__proto__,__webpack_require__.t=function(value,mode){if(1&mode&&(value=this(value)),8&mode)return value;if("object"==typeof value&&value){if(4&mode&&value.__esModule)return value;if(16&mode&&"function"==typeof value.then)return value}var ns=Object.create(null);__webpack_require__.r(ns);var def={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var current=2&mode&&value;"object"==typeof current&&!~leafPrototypes.indexOf(current);current=getProto(current))Object.getOwnPropertyNames(current).forEach((key=>def[key]=()=>value[key]));return def.default=()=>value,__webpack_require__.d(ns,def),ns},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.f={},__webpack_require__.e=chunkId=>Promise.all(Object.keys(__webpack_require__.f).reduce(((promises,key)=>(__webpack_require__.f[key](chunkId,promises),promises)),[])),__webpack_require__.u=chunkId=>(({481:"stories-components-Uploader-Avatar-stories",755:"stories-components-Charts-index-stories",824:"stories-components-CircleDigest-Rich-stories",846:"stories-components-ArticleDigest-Dropdown-stories",1386:"stories-components-CircleDigest-Plain-stories",1702:"stories-components-Button-index-stories",1772:"stories-components-TagDigest-Sidebar-stories",2017:"stories-components-UserDigest-Verbose-stories",2370:"stories-components-ArticleDigest-Card-stories",2431:"stories-components-ArticleDigest-Sidebar-stories",2536:"stories-components-Toast-index-stories",2883:"stories-components-ArticleDigest-Archive-stories",2936:"stories-components-TagDigest-Rich-stories",3018:"stories-components-Notices-index-stories",3328:"stories-components-ArticleDigest-Feed-stories",4415:"stories-components-UserDigest-Mini-stories",5058:"stories-components-TagDigest-Concise-stories",5317:"stories-components-Dialogs-Fingerprint-stories",5688:"stories-components-TextIcon-index-stories",5727:"stories-components-Dialogs-Help-stories",5736:"stories-components-Uploader-Cover-stories",6232:"stories-components-UserDigest-Concise-stories",6616:"stories-components-UserDigest-Rich-stories",6792:"stories-components-Tabs-index-stories",6991:"stories-Introduction-stories-mdx",7653:"stories-components-CircleDigest-Mini-stories",8033:"stories-components-Icon-index-stories",8279:"stories-components-TagDigest-Feed-stories",8864:"stories-components-Forms-index-stories",8960:"stories-components-Wall-index-stories",9145:"stories-components-Switch-index-stories",9542:"stories-components-Dropdowns-ArticleDigestActions-stories",9831:"stories-components-Dialogs-Share-stories"}[chunkId]||chunkId)+"."+{481:"f10dc751",755:"28646b7c",824:"c54a5fc5",846:"d70aa1a5",858:"f4b376d7",1386:"37f4514e",1495:"2ffe448d",1528:"95f5e8e7",1666:"76f7aabc",1702:"17d57b41",1772:"f73b3d24",1782:"c10e64d8",2017:"0342586c",2082:"c364f33e",2107:"49d3e968",2132:"12285b74",2258:"65be369d",2333:"18b4b890",2351:"e2cbdbe3",2370:"dd47c2ce",2431:"27881712",2536:"c1565cd7",2883:"edc0a002",2936:"a1a5c323",2994:"8ffb15ff",3018:"99a2e33d",3218:"3f061853",3328:"25c05882",3732:"f48088c7",3772:"be3fb190",3818:"ae03121e",4083:"3e12b900",4225:"c19db3ab",4415:"026c7b26",4446:"bd929bd7",4463:"1e826888",4664:"648d199c",5058:"620ffd27",5143:"9e4f49cd",5255:"814b363c",5267:"53e97358",5317:"b56b1532",5546:"3b997c75",5649:"68025874",5661:"f16b7f83",5688:"4c48fb68",5695:"2a00072e",5727:"11486c12",5736:"df33657d",5990:"e9088b1c",6008:"29c14c4a",6087:"d44ef161",6094:"ac239452",6232:"2946ab2e",6456:"9577067c",6593:"f62d549d",6616:"a37f9d26",6768:"7b29b238",6792:"3375a0f8",6991:"c6848767",7058:"467e7ad7",7254:"85567f2b",7358:"72ec2849",7361:"bfbeb72a",7490:"22dd47db",7653:"c27cfa4a",8033:"a6d860bc",8088:"6466e516",8279:"bdc3880b",8322:"78f6d0d9",8633:"740af0d5",8864:"0571d5aa",8923:"72b21b40",8960:"5a656c20",9038:"212e2a4e",9097:"fef7af90",9115:"48f621d9",9139:"c2b8d0bc",9145:"ef4b8274",9433:"09d2bb19",9542:"11c8a1f0",9602:"2300b1be",9669:"d4ab9e42",9720:"24591c4e",9831:"49074708"}[chunkId]+".iframe.bundle.js"),__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.hmd=module=>((module=Object.create(module)).children||(module.children=[]),Object.defineProperty(module,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+module.id)}}),module),__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),inProgress={},__webpack_require__.l=(url,done,key,chunkId)=>{if(inProgress[url])inProgress[url].push(done);else{var script,needAttach;if(void 0!==key)for(var scripts=document.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i];if(s.getAttribute("src")==url||s.getAttribute("data-webpack")=="matters-web:"+key){script=s;break}}script||(needAttach=!0,(script=document.createElement("script")).charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.setAttribute("data-webpack","matters-web:"+key),script.src=url),inProgress[url]=[done];var onScriptComplete=(prev,event)=>{script.onerror=script.onload=null,clearTimeout(timeout);var doneFns=inProgress[url];if(delete inProgress[url],script.parentNode&&script.parentNode.removeChild(script),doneFns&&doneFns.forEach((fn=>fn(event))),prev)return prev(event)},timeout=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:script}),12e4);script.onerror=onScriptComplete.bind(null,script.onerror),script.onload=onScriptComplete.bind(null,script.onload),needAttach&&document.head.appendChild(script)}},__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.nmd=module=>(module.paths=[],module.children||(module.children=[]),module),__webpack_require__.p="",(()=>{__webpack_require__.b=document.baseURI||self.location.href;var installedChunks={1303:0};__webpack_require__.f.j=(chunkId,promises)=>{var installedChunkData=__webpack_require__.o(installedChunks,chunkId)?installedChunks[chunkId]:void 0;if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else if(1303!=chunkId){var promise=new Promise(((resolve,reject)=>installedChunkData=installedChunks[chunkId]=[resolve,reject]));promises.push(installedChunkData[2]=promise);var url=__webpack_require__.p+__webpack_require__.u(chunkId),error=new Error;__webpack_require__.l(url,(event=>{if(__webpack_require__.o(installedChunks,chunkId)&&(0!==(installedChunkData=installedChunks[chunkId])&&(installedChunks[chunkId]=void 0),installedChunkData)){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")",error.name="ChunkLoadError",error.type=errorType,error.request=realSrc,installedChunkData[1](error)}}),"chunk-"+chunkId,chunkId)}else installedChunks[chunkId]=0},__webpack_require__.O.j=chunkId=>0===installedChunks[chunkId];var webpackJsonpCallback=(parentChunkLoadingFunction,data)=>{var moduleId,chunkId,[chunkIds,moreModules,runtime]=data,i=0;if(chunkIds.some((id=>0!==installedChunks[id]))){for(moduleId in moreModules)__webpack_require__.o(moreModules,moduleId)&&(__webpack_require__.m[moduleId]=moreModules[moduleId]);if(runtime)var result=runtime(__webpack_require__)}for(parentChunkLoadingFunction&&parentChunkLoadingFunction(data);i<chunkIds.length;i++)chunkId=chunkIds[i],__webpack_require__.o(installedChunks,chunkId)&&installedChunks[chunkId]&&installedChunks[chunkId][0](),installedChunks[chunkId]=0;return __webpack_require__.O(result)},chunkLoadingGlobal=self.webpackChunkmatters_web=self.webpackChunkmatters_web||[];chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null,0)),chunkLoadingGlobal.push=webpackJsonpCallback.bind(null,chunkLoadingGlobal.push.bind(chunkLoadingGlobal))})(),__webpack_require__.nc=void 0})();