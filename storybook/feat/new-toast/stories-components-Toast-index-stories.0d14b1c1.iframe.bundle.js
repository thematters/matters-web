"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[2536],{"./src/stories/components/Toast/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{All:()=>All,default:()=>index_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),Toast=__webpack_require__("./src/components/Toast/index.tsx"),externalLinks=__webpack_require__("./src/common/enums/externalLinks.ts"),Button=__webpack_require__("./src/components/Button/index.tsx"),Translate=__webpack_require__("./src/components/Context/Language/Translate.tsx"),TextIcon=__webpack_require__("./src/components/TextIcon/index.tsx"),Layout=__webpack_require__("./src/components/Layout/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/stories/components/Toast/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Toast_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,Toasts=function Toasts(){return __jsx("section",null,__jsx("h3",{className:Toast_styles_module.h3},"Fixed Toasts"),__jsx("div",{className:Toast_styles_module.area},__jsx("p",null,"triggered toast will be showing here")),__jsx("section",{className:Toast_styles_module.buttons},__jsx(Button.z,{spacing:["xtight","xtight"],bgColor:"red",onClick:function onClick(){Toast.A.error({message:__jsx(Translate.v,{zh_hant:"開啓失敗，請檢查網路連線",zh_hans:"开启失败，请检查网路连线"})})}},__jsx(TextIcon.V,{color:"white"},"Error")),__jsx(Button.z,{spacing:["xtight","xtight"],bgColor:"greenLighter",onClick:function onClick(){Toast.A.error({message:__jsx(Translate.v,{id:"successUploadImage"})})}},__jsx(TextIcon.V,{color:"green"},"Success")),__jsx(Button.z,{spacing:["xtight","xtight"],bgColor:"greenLighter",onClick:function onClick(){Toast.A.success({message:__jsx(Translate.v,{zh_hant:"你對作品送出了一個 Super Like！",zh_hans:"你对作品送出了一个 Super Like！",en:"You sent a Super Like to this article!"}),actions:[{content:__jsx(Translate.v,{zh_hant:"詳情",zh_hans:"详情",en:"More info"}),htmlHref:externalLinks.L.SUPER_LIKE,htmlTarget:"_blank"}]})}},__jsx(TextIcon.V,{color:"green"},"Custom Button"))),__jsx("h3",{className:Toast_styles_module.h3},"Static Toasts"),__jsx(Layout.A.Notice,{color:"green",content:__jsx(Translate.v,{id:"publishing"}),subDescription:__jsx(Translate.v,{zh_hant:"上鏈後，作品不可刪除，去中心化保存",zh_hans:"上链后，作品不可删除，去中心化保存"})}),__jsx(Layout.A.Notice,{color:"red",content:__jsx(Translate.v,{id:"failurePublish"}),subDescription:__jsx(Translate.v,{zh_hant:"請檢查網絡後重試",zh_hans:"请检查网络后重试"})}),__jsx(Layout.A.Notice,{color:"grey",content:__jsx(Translate.v,{zh_hant:"此作品因違反用戶協定而被強制隱藏。",zh_hans:"此作品因违反用户协定而被强制隐藏。"})}))};Toasts.displayName="Toasts",Toasts.__docgenInfo={description:"",methods:[],displayName:"Toasts"};const Toast_Toasts=Toasts;var _All$parameters,_All$parameters2,_All$parameters2$docs,index_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const index_stories={title:"Components/Toast",component:Toast.x};var Template=function Template(){return index_stories_jsx(react_testing_esm.ge,null,index_stories_jsx(react.Fragment,null,index_stories_jsx(Toast_Toasts,null),index_stories_jsx(Toast.x,null)))};Template.displayName="Template";var All=Template.bind({});All.parameters=_objectSpread(_objectSpread({},All.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_All$parameters=All.parameters)||void 0===_All$parameters?void 0:_All$parameters.docs),{},{source:_objectSpread({originalSource:"() => <MockedProvider>\n    <>\n      <Toasts />\n      <Toaster />\n    </>\n  </MockedProvider>"},null===(_All$parameters2=All.parameters)||void 0===_All$parameters2||null===(_All$parameters2$docs=_All$parameters2.docs)||void 0===_All$parameters2$docs?void 0:_All$parameters2$docs.source)})})},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/stories/components/Toast/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".Wqj0MTbbALlQxKBeuIF2 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  width: 100%;\n  height: 12rem;\n  color: var(--color-grey);\n  text-align: center;\n  background: var(--color-grey-lighter);\n  border: 2px dashed var(--color-grey-light);\n  border-radius: var(--spacing-base);\n}\n\n.DLkQSVxyRwwMX1ws35ef {\n  margin-top: var(--spacing-x-tight);\n}\n\n.DLkQSVxyRwwMX1ws35ef > * {\n  margin-bottom: var(--spacing-base);\n}\n\n.DLkQSVxyRwwMX1ws35ef > * + * {\n  margin-left: var(--spacing-x-tight);\n}\n\n.czzVGlSgQn0P1CZViEsK {\n  margin-bottom: var(--spacing-x-tight);\n}\n","",{version:3,sources:["webpack://./src/stories/components/Toast/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;ECGE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;;EDFvB,WAAW;EACX,aAAa;EACb,wBAAwB;EACxB,kBAAkB;EAClB,qCAAqC;EACrC,0CAA0C;EAC1C,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,qCAAqC;AACvC",sourcesContent:[".area {\n  @mixin flex-center-all;\n\n  width: 100%;\n  height: 12rem;\n  color: var(--color-grey);\n  text-align: center;\n  background: var(--color-grey-lighter);\n  border: 2px dashed var(--color-grey-light);\n  border-radius: var(--spacing-base);\n}\n\n.buttons {\n  margin-top: var(--spacing-x-tight);\n}\n\n.buttons :global(> *) {\n  margin-bottom: var(--spacing-base);\n}\n\n.buttons :global(> * + *) {\n  margin-left: var(--spacing-x-tight);\n}\n\n.h3 {\n  margin-bottom: var(--spacing-x-tight);\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  padding: var(--spacing-base);\n  font-size: var(--font-size-md);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-round {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-base);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n  caret-color: var(--color-matters-green);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n@define-mixin form-container {\n  margin-right: var(--spacing-base);\n  margin-left: var(--spacing-base);\n\n  @media (--sm-up) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.field) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.inputContainer) {\n    margin: 0;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey-dark);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={area:"Wqj0MTbbALlQxKBeuIF2",buttons:"DLkQSVxyRwwMX1ws35ef",h3:"czzVGlSgQn0P1CZViEsK"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);