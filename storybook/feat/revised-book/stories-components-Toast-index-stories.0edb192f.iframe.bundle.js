/*! For license information please see stories-components-Toast-index-stories.0edb192f.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[2536],{"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}__webpack_require__.d(__webpack_exports__,{Z:()=>_asyncToGenerator})},"./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":(module,__unused_webpack_exports,__webpack_require__)=>{var _typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/typeof.js").default;function _regeneratorRuntime(){"use strict";module.exports=_regeneratorRuntime=function _regeneratorRuntime(){return e},module.exports.__esModule=!0,module.exports.default=module.exports;var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function define(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{define({},"")}catch(t){define=function define(t,e,r){return t[e]=r}}function wrap(t,e,r,n){var i=e&&e.prototype instanceof Generator?e:Generator,a=Object.create(i.prototype),c=new Context(n||[]);return o(a,"_invoke",{value:makeInvokeMethod(t,r,c)}),a}function tryCatch(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=wrap;var h="suspendedStart",l="suspendedYield",f="executing",s="completed",y={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var p={};define(p,a,(function(){return this}));var d=Object.getPrototypeOf,v=d&&d(d(values([])));v&&v!==r&&n.call(v,a)&&(p=v);var g=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(p);function defineIteratorMethods(t){["next","throw","return"].forEach((function(e){define(t,e,(function(t){return this._invoke(e,t)}))}))}function AsyncIterator(t,e){function invoke(r,o,i,a){var c=tryCatch(t[r],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==_typeof(h)&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){invoke("next",t,i,a)}),(function(t){invoke("throw",t,i,a)})):e.resolve(h).then((function(t){u.value=t,i(u)}),(function(t){return invoke("throw",t,i,a)}))}a(c.arg)}var r;o(this,"_invoke",{value:function value(t,n){function callInvokeWithMethodAndArg(){return new e((function(e,r){invoke(t,n,e,r)}))}return r=r?r.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(e,r,n){var o=h;return function(i,a){if(o===f)throw new Error("Generator is already running");if(o===s){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=maybeInvokeDelegate(c,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=s,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=f;var p=tryCatch(e,r,n);if("normal"===p.type){if(o=n.done?s:l,p.arg===y)continue;return{value:p.arg,done:n.done}}"throw"===p.type&&(o=s,n.method="throw",n.arg=p.arg)}}}function maybeInvokeDelegate(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,maybeInvokeDelegate(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var i=tryCatch(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,y;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function pushTryEntry(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function resetTryEntry(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function Context(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(pushTryEntry,this),this.reset(!0)}function values(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function next(){for(;++o<e.length;)if(n.call(e,o))return next.value=e[o],next.done=!1,next;return next.value=t,next.done=!0,next};return i.next=i}}throw new TypeError(_typeof(e)+" is not iterable")}return GeneratorFunction.prototype=GeneratorFunctionPrototype,o(g,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),o(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===GeneratorFunction||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,GeneratorFunctionPrototype):(t.__proto__=GeneratorFunctionPrototype,define(t,u,"GeneratorFunction")),t.prototype=Object.create(g),t},e.awrap=function(t){return{__await:t}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,c,(function(){return this})),e.AsyncIterator=AsyncIterator,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new AsyncIterator(wrap(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},defineIteratorMethods(g),define(g,u,"Generator"),define(g,a,(function(){return this})),define(g,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function next(){for(;r.length;){var t=r.pop();if(t in e)return next.value=t,next.done=!1,next}return next.done=!0,next}},e.values=values,Context.prototype={constructor:Context,reset:function reset(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(resetTryEntry),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function stop(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function dispatchException(e){if(this.done)throw e;var r=this;function handle(n,o){return a.type="throw",a.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return handle("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0);if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}}}},abrupt:function abrupt(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function complete(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function finish(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),y}},catch:function _catch(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;resetTryEntry(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(e,r,n){return this.delegate={iterator:values(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),y}},e}module.exports=_regeneratorRuntime,module.exports.__esModule=!0,module.exports.default=module.exports},"./node_modules/@babel/runtime/helpers/typeof.js":module=>{function _typeof(o){return module.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},module.exports.__esModule=!0,module.exports.default=module.exports,_typeof(o)}module.exports=_typeof,module.exports.__esModule=!0,module.exports.default=module.exports},"./node_modules/@babel/runtime/regenerator/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var runtime=__webpack_require__("./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();module.exports=runtime;try{regeneratorRuntime=runtime}catch(accidentalStrictMode){"object"==typeof globalThis?globalThis.regeneratorRuntime=runtime:Function("r","regeneratorRuntime = r")(runtime)}},"./src/stories/components/Toast/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{All:()=>All,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),Toast=__webpack_require__("./src/components/Toast/index.tsx"),externalLinks=__webpack_require__("./src/common/enums/externalLinks.ts"),Button=__webpack_require__("./src/components/Button/index.tsx"),Translate=__webpack_require__("./src/components/Context/Language/Translate.tsx"),TextIcon=__webpack_require__("./src/components/TextIcon/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[16].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./src/stories/components/Toast/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Toast_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,Toasts=function Toasts(){return __jsx("section",null,__jsx("div",{className:Toast_styles_module.area},__jsx("p",null,"triggered toast will be showing here")),__jsx("section",{className:Toast_styles_module.buttons},__jsx(Button.z,{spacing:["xtight","xtight"],bgColor:"red",onClick:function onClick(){Toast.A.error({message:__jsx(Translate.v,{zh_hant:"開啓失敗，請檢查網路連線",zh_hans:"开启失败，请检查网路连线"})})}},__jsx(TextIcon.V,{color:"white"},"Error")),__jsx(Button.z,{spacing:["xtight","xtight"],bgColor:"greenLighter",onClick:function onClick(){Toast.A.success({message:__jsx(Translate.v,{id:"successUploadImage"})})}},__jsx(TextIcon.V,{color:"green"},"Success")),__jsx(Button.z,{spacing:["xtight","xtight"],bgColor:"greenLighter",onClick:function onClick(){Toast.A.success({message:__jsx(Translate.v,{zh_hant:"你對作品送出了一個 Super Like！",zh_hans:"你对作品送出了一个 Super Like！",en:"You sent a Super Like to this article!"}),actions:[{content:__jsx(Translate.v,{zh_hant:"詳情",zh_hans:"详情",en:"More info"}),htmlHref:externalLinks.L.SUPER_LIKE,htmlTarget:"_blank"}]})}},__jsx(TextIcon.V,{color:"green"},"Custom Button"))))};Toasts.displayName="Toasts";const Toast_Toasts=Toasts;var _All$parameters,_All$parameters2,index_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const index_stories={title:"Components/Toast",component:Toast.x};var Template=function Template(){return index_stories_jsx(react_testing_esm.ge,null,index_stories_jsx(react.Fragment,null,index_stories_jsx(Toast_Toasts,null),index_stories_jsx(Toast.x,null)))};Template.displayName="Template";var All=Template.bind({});All.parameters=_objectSpread(_objectSpread({},All.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_All$parameters=All.parameters)||void 0===_All$parameters?void 0:_All$parameters.docs),{},{source:_objectSpread({originalSource:"() => <MockedProvider>\n    <>\n      <Toasts />\n      <Toaster />\n    </>\n  </MockedProvider>"},null===(_All$parameters2=All.parameters)||void 0===_All$parameters2||null===(_All$parameters2=_All$parameters2.docs)||void 0===_All$parameters2?void 0:_All$parameters2.source)})});const __namedExportsOrder=["All"]},"./src/common/enums/externalLinks.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{L:()=>EXTERNAL_LINKS});var isProd="production"===__webpack_require__("./node_modules/process/browser.js").env.NEXT_PUBLIC_RUNTIME_ENV,EXTERNAL_LINKS={FACEBOOK:"https://www.facebook.com/MattersLab2018",WEIBO:"https://weibo.com/6695370718/profile?topnav=1&wvr=6",TELEGRAM:"https://t.me/joinchat/BXzlWUhXaWNZ-TXJZJCzDQ",LIKECOIN_LEGACY:"https://like.co/in?legacy=1",CIVIC_LIKER_SUPPORT:"https://docs.like.co/v/zh/user-guide/civic-liker?utm_source=Matters&utm_medium=website",CIVIC_LIKER_JOIN:isProd?"https://liker.land/civic?is_popup=1&utm_source=Matters&utm_medium=website&utm_campaign=regular_funnel":"https://rinkeby.liker.land/civic?is_popup=1&utm_source=Matters&utm_medium=website&utm_campaign=regular_funnel",CIVIC_LIKER:function CIVIC_LIKER(likerId){return isProd?"https://liker.land/".concat(likerId,"/civic?utm_source=Matters"):"https://rinkeby.liker.land/".concat(likerId,"/civic?utm_source=Matters")},SUPER_LIKE:"https://docs.like.co/v/zh/user-guide/likecoin-button/superlike?utm_source=Matters&utm_medium=website&utm_campaign=superlike_funnel",PLANET:"https://www.planetable.xyz/",ENS_DOCS:"https://docs.ens.domains/",METAMASK:"https://metamask.io/download/",MATTERS_LAB:"https://matters-lab.io/",DEVELOPER_RESOURCE:"https://thematters.github.io/developer-resource/",SECURITY_LINK:"https://thematters.github.io/developer-resource/SECURITY.html",BUG_REPORT:"https://feedback.matters.town/bug-reports"}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[16].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./src/stories/components/Toast/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".Wqj0MTbbALlQxKBeuIF2 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  width: 100%;\n  height: 12rem;\n  color: var(--color-grey);\n  text-align: center;\n  background: var(--color-grey-lighter);\n  border: 2px dashed var(--color-grey-light);\n  border-radius: var(--spacing-base);\n}\n\n.DLkQSVxyRwwMX1ws35ef {\n  margin-top: var(--spacing-x-tight);\n}\n\n.DLkQSVxyRwwMX1ws35ef > * {\n  margin-bottom: var(--spacing-base);\n}\n\n.DLkQSVxyRwwMX1ws35ef > * + * {\n  margin-left: var(--spacing-x-tight);\n}\n\n.czzVGlSgQn0P1CZViEsK {\n  margin-bottom: var(--spacing-x-tight);\n}\n","",{version:3,sources:["webpack://./src/stories/components/Toast/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;ECGE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;;EDFvB,WAAW;EACX,aAAa;EACb,wBAAwB;EACxB,kBAAkB;EAClB,qCAAqC;EACrC,0CAA0C;EAC1C,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,qCAAqC;AACvC",sourcesContent:[".area {\n  @mixin flex-center-all;\n\n  width: 100%;\n  height: 12rem;\n  color: var(--color-grey);\n  text-align: center;\n  background: var(--color-grey-lighter);\n  border: 2px dashed var(--color-grey-light);\n  border-radius: var(--spacing-base);\n}\n\n.buttons {\n  margin-top: var(--spacing-x-tight);\n}\n\n.buttons :global(> *) {\n  margin-bottom: var(--spacing-base);\n}\n\n.buttons :global(> * + *) {\n  margin-left: var(--spacing-x-tight);\n}\n\n.h3 {\n  margin-bottom: var(--spacing-x-tight);\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin inline-flex-start-center {\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-grey-light {\n  border: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-bottom-grey-light {\n  border-bottom: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-top-grey-light {\n  border-top: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-left-grey-light {\n  border-left: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-right-grey-light {\n  border-right: 1px solid var(--color-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-tight);\n  font-size: var(--font-size-sm);\n  line-height: 1.375rem;\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-number {\n  caret-color: var(--color-matters-green);\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Scrollbar\n   ========================================================================== */\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    display: none;\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n\n@define-mixin scrollbar-thin {\n  /* Width */\n  &::-webkit-scrollbar {\n    width: 15px;\n  }\n\n  /* Track */\n  &::-webkit-scrollbar-track {\n    border: solid 6px transparent;\n    box-shadow: inset 0 0 15px 15px transparent;\n  }\n\n  /* Handle */\n  &::-webkit-scrollbar-thumb {\n    min-height: 68px;\n    border: solid 6px transparent;\n    border-radius: 8px;\n    box-shadow: inset 0 0 15px 15px var(--color-grey-light);\n  }\n\n  /* Handle on hover */\n  &::-webkit-scrollbar-thumb:hover {\n    box-shadow: inset 0 0 15px 15px var(--color-grey);\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n/* FIXME: fix cropped descenders of letters  */\n@define-mixin fix-cropped-letters {\n  padding-bottom: 0.12em;\n  margin-bottom: -0.12rem;\n}\n\n@define-mixin polka-dot-background {\n  background:\n    linear-gradient(90deg, var(--color-white) 2px, transparent 1%) center,\n    linear-gradient(var(--color-white) 2px, transparent 1%) center,\n    var(--color-grey-light);\n  background-repeat: repeat;\n  background-position: -2px -1px;\n  background-size: 3px 3px;\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={area:"Wqj0MTbbALlQxKBeuIF2",buttons:"DLkQSVxyRwwMX1ws35ef",h3:"czzVGlSgQn0P1CZViEsK"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/js-cookie/dist/js.cookie.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function assign(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)target[key]=source[key]}return target}__webpack_require__.d(__webpack_exports__,{Z:()=>api});var api=function init(converter,defaultAttributes){function set(name,value,attributes){if("undefined"!=typeof document){"number"==typeof(attributes=assign({},defaultAttributes,attributes)).expires&&(attributes.expires=new Date(Date.now()+864e5*attributes.expires)),attributes.expires&&(attributes.expires=attributes.expires.toUTCString()),name=encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var stringifiedAttributes="";for(var attributeName in attributes)attributes[attributeName]&&(stringifiedAttributes+="; "+attributeName,!0!==attributes[attributeName]&&(stringifiedAttributes+="="+attributes[attributeName].split(";")[0]));return document.cookie=name+"="+converter.write(value,name)+stringifiedAttributes}}return Object.create({set,get:function get(name){if("undefined"!=typeof document&&(!arguments.length||name)){for(var cookies=document.cookie?document.cookie.split("; "):[],jar={},i=0;i<cookies.length;i++){var parts=cookies[i].split("="),value=parts.slice(1).join("=");try{var found=decodeURIComponent(parts[0]);if(jar[found]=converter.read(value,found),name===found)break}catch(e){}}return name?jar[name]:jar}},remove:function(name,attributes){set(name,"",assign({},attributes,{expires:-1}))},withAttributes:function(attributes){return init(this.converter,assign({},this.attributes,attributes))},withConverter:function(converter){return init(assign({},this.converter,converter),this.attributes)}},{attributes:{value:Object.freeze(defaultAttributes)},converter:{value:Object.freeze(converter)}})}({read:function(value){return'"'===value[0]&&(value=value.slice(1,-1)),value.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(value){return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}}]);