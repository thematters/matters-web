"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[481],{"./src/stories/components/Uploader/Avatar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Avatar:()=>Avatar_stories_Avatar,default:()=>Avatar_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js"),asyncToGenerator_default=__webpack_require__.n(asyncToGenerator),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"),slicedToArray_default=__webpack_require__.n(slicedToArray),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),objectWithoutProperties_default=__webpack_require__.n(objectWithoutProperties),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),reach_visually_hidden=__webpack_require__("./node_modules/@reach/visually-hidden/dist/reach-visually-hidden.mjs"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),enums_file=__webpack_require__("./src/common/enums/file.ts"),events=__webpack_require__("./src/common/enums/events.ts"),translate=__webpack_require__("./src/common/utils/translate.ts"),LanguageContext=__webpack_require__("./src/components/Context/Language/LanguageContext.tsx"),hooks=__webpack_require__("./src/components/GQL/hooks.ts"),Translate=__webpack_require__("./src/components/Context/Language/Translate.tsx"),Avatar=__webpack_require__("./src/components/Avatar/index.tsx"),CircleAvatar=__webpack_require__("./src/components/CircleAvatar/index.tsx"),Spinner=__webpack_require__("./src/components/Spinner/index.tsx"),IconCamera24=__webpack_require__("./src/components/Icon/IconCamera24.tsx"),uploadFile=__webpack_require__("./src/components/GQL/mutations/uploadFile.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/FileUploader/AvatarUploader/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const AvatarUploader_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var _excluded=["onUpload","hasBorder","type","entityId"],__jsx=react.createElement,AvatarUploader=function AvatarUploader(_ref){var _classNames,onUpload=_ref.onUpload,hasBorder=_ref.hasBorder,type=_ref.type,entityId=_ref.entityId,avatarProps=objectWithoutProperties_default()(_ref,_excluded),lang=(0,react.useContext)(LanguageContext.AZ).lang,_useMutation=(0,hooks.Db)(uploadFile.Z,void 0,{showToast:!1}),_useMutation2=slicedToArray_default()(_useMutation,2),upload=_useMutation2[0],loading=_useMutation2[1].loading,_useState=(0,react.useState)(avatarProps.src),avatar=_useState[0],setAvatar=_useState[1],acceptTypes=enums_file.oo.join(","),handleChange=function(){var _ref2=asyncToGenerator_default()(regenerator_default().mark((function _callee(event){var file,_yield$upload,data,id,path;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(event.stopPropagation(),upload&&event.target&&event.target.files){_context.next=3;break}return _context.abrupt("return");case 3:if(file=event.target.files[0],event.target.value="",!((null==file?void 0:file.size)>enums_file.Rv)){_context.next=8;break}return window.dispatchEvent(new CustomEvent(events.h,{detail:{color:"red",content:__jsx(Translate.v,{zh_hant:"上傳檔案超過 5 MB",zh_hans:"上传文件超过 5 MB",en:"upload file exceed 5 MB"})}})),_context.abrupt("return");case 8:return _context.prev=8,_context.next=11,upload({variables:{input:{file,type:isCircle?enums_file.tP.circleAvatar:enums_file.tP.avatar,entityType:isCircle?enums_file.lU.circle:enums_file.lU.user,entityId}}});case 11:if(_yield$upload=_context.sent,data=_yield$upload.data,id=null==data?void 0:data.singleFileUpload.id,path=null==data?void 0:data.singleFileUpload.path,!id||!path){_context.next=20;break}setAvatar(path),onUpload(id),_context.next=21;break;case 20:throw new Error;case 21:_context.next=26;break;case 23:_context.prev=23,_context.t0=_context.catch(8),window.dispatchEvent(new CustomEvent(events.h,{detail:{color:"red",content:__jsx(Translate.v,{id:"failureUploadImage"})}}));case 26:case"end":return _context.stop()}}),_callee,null,[[8,23]])})));return function handleChange(_x){return _ref2.apply(this,arguments)}}(),isCircle="circle"===type,labelClasses=classnames_default()((_classNames={},defineProperty_default()(_classNames,AvatarUploader_styles_module.label,!0),defineProperty_default()(_classNames,AvatarUploader_styles_module.hasBorder,hasBorder),defineProperty_default()(_classNames,AvatarUploader_styles_module.circle,isCircle),_classNames));return __jsx("label",{className:labelClasses,htmlFor:"avatar-upload-form"},!isCircle&&__jsx(Avatar.q,extends_default()({size:"xxxl"},avatarProps,{src:avatar})),isCircle&&__jsx(CircleAvatar.b,extends_default()({size:"xxxl"},avatarProps,{src:avatar})),__jsx("div",{className:AvatarUploader_styles_module.mask},loading?__jsx(Spinner.$,null):__jsx(IconCamera24.IconCamera24,{color:"white",size:"lg"})),__jsx(reach_visually_hidden.T,null,__jsx("input",{id:"avatar-upload-form",type:"file",name:"file","aria-label":(0,translate.I)({zh_hant:"上傳頭像",zh_hans:"上传头像",en:"Upload avatar",lang}),accept:acceptTypes,multiple:!1,onChange:handleChange})))};AvatarUploader.displayName="AvatarUploader",AvatarUploader.__docgenInfo={description:"",methods:[],displayName:"AvatarUploader"};try{AvatarUploader.displayName="AvatarUploader",AvatarUploader.__docgenInfo={description:"",displayName:"AvatarUploader",props:{onUpload:{defaultValue:null,description:"",name:"onUpload",required:!0,type:{name:"(assetId: string) => void"}},hasBorder:{defaultValue:null,description:"",name:"hasBorder",required:!1,type:{name:"boolean"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"circle"'}]}},entityId:{defaultValue:null,description:"",name:"entityId",required:!1,type:{name:"string"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"any"}},src:{defaultValue:null,description:"",name:"src",required:!1,type:{name:"string | null"}},inEditor:{defaultValue:null,description:"",name:"inEditor",required:!1,type:{name:"boolean"}},inProfile:{defaultValue:null,description:"",name:"inProfile",required:!1,type:{name:"boolean"}},circle:{defaultValue:null,description:"",name:"circle",required:!1,type:{name:"AvatarCircleFragment"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/FileUploader/AvatarUploader/index.tsx#AvatarUploader"]={docgenInfo:AvatarUploader.__docgenInfo,name:"AvatarUploader",path:"src/components/FileUploader/AvatarUploader/index.tsx#AvatarUploader"})}catch(__react_docgen_typescript_loader_error){}var _Avatar$parameters,_Avatar$parameters2,_Avatar$parameters2$d,mocks=__webpack_require__("./src/stories/mocks/index.ts"),Uploader_styles_module=__webpack_require__("./src/stories/components/Uploader/styles.module.css"),Avatar_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Avatar_stories={title:"Components/Uploader",component:AvatarUploader};var Template=function Template(){return Avatar_stories_jsx(react_testing_esm.ge,null,Avatar_stories_jsx("ul",{className:Uploader_styles_module.Z.avatarContainer},Avatar_stories_jsx("li",null,Avatar_stories_jsx(AvatarUploader,{hasBorder:!0,onUpload:function onUpload(assetId){return alert({assetId})}})),Avatar_stories_jsx("li",null,Avatar_stories_jsx(AvatarUploader,{user:mocks.nI,hasBorder:!0,onUpload:function onUpload(assetId){return alert({assetId})}})),Avatar_stories_jsx("li",null,Avatar_stories_jsx(AvatarUploader,{type:"circle",onUpload:function onUpload(assetId){return alert({assetId})},entityId:""})),Avatar_stories_jsx("li",null,Avatar_stories_jsx(AvatarUploader,{type:"circle",circle:mocks.xe,onUpload:function onUpload(assetId){return alert({assetId})},entityId:""}))))};Template.displayName="Template";var Avatar_stories_Avatar=Template.bind({});Avatar_stories_Avatar.parameters=_objectSpread(_objectSpread({},Avatar_stories_Avatar.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Avatar$parameters=Avatar_stories_Avatar.parameters)||void 0===_Avatar$parameters?void 0:_Avatar$parameters.docs),{},{source:_objectSpread({originalSource:'() => <MockedProvider>\n    <ul className={styles.avatarContainer}>\n      {/* User */}\n      <li>\n        <AvatarUploader hasBorder onUpload={assetId => alert({\n        assetId\n      })} />\n      </li>\n      <li>\n        <AvatarUploader user={MOCK_USER} hasBorder onUpload={assetId => alert({\n        assetId\n      })} />\n      </li>\n\n      {/* Circle */}\n      <li>\n        <AvatarUploader type="circle" onUpload={assetId => alert({\n        assetId\n      })} entityId="" />\n      </li>\n      <li>\n        <AvatarUploader type="circle" circle={MOCK_CIRCLE} onUpload={assetId => alert({\n        assetId\n      })} entityId="" />\n      </li>\n    </ul>\n  </MockedProvider>'},null===(_Avatar$parameters2=Avatar_stories_Avatar.parameters)||void 0===_Avatar$parameters2||null===(_Avatar$parameters2$d=_Avatar$parameters2.docs)||void 0===_Avatar$parameters2$d?void 0:_Avatar$parameters2$d.source)})})},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/FileUploader/AvatarUploader/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".Numi6KryhUz97oNf8R_8 {\n  position: relative;\n  display: inline-block;\n  font-size: 0;\n}\n\n.Numi6KryhUz97oNf8R_8.WO8hSKCA5JT52JWpJC4Q {\n    border-radius: 50%;\n    box-shadow: 0 0 0 3px var(--color-white);\n  }\n\n.HeURZLv0mxH2HQ7a6gor {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  background: rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n}\n\n.awvFhf_onNkPcE7twNY_ .HeURZLv0mxH2HQ7a6gor {\n    border-radius: 1.5rem;\n  }\n","",{version:3,sources:["webpack://./src/components/FileUploader/AvatarUploader/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,YAAY;AAMd;;AAJE;IACE,kBAAkB;IAClB,wCAAwC;EAC1C;;AAGF;ECwPE,kBAAkB;EAClB,MAAQ;EAAR,QAAQ;EAAR,SAAQ;EAAR,OAAQ;EAjQR,aAAa;EACb,mBAAmB;EACnB,uBAAuB;;EDUvB,8BAA4B;EAC5B,kBAAkB;AACpB;;AAGE;IACE,qBAAqB;EACvB",sourcesContent:[".label {\n  position: relative;\n  display: inline-block;\n  font-size: 0;\n\n  &.hasBorder {\n    border-radius: 50%;\n    box-shadow: 0 0 0 3px var(--color-white);\n  }\n}\n\n.mask {\n  @mixin expand-to-container;\n  @mixin flex-center-all;\n\n  background: rgb(0 0 0 / 50%);\n  border-radius: 50%;\n}\n\n.circle {\n  & .mask {\n    border-radius: 1.5rem;\n  }\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  padding: var(--spacing-base);\n  font-size: var(--font-size-md);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-round {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-base);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n  caret-color: var(--color-matters-green);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n@define-mixin form-container {\n  margin-right: var(--spacing-base);\n  margin-left: var(--spacing-base);\n\n  @media (--sm-up) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.field) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.inputContainer) {\n    margin: 0;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey-dark);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={label:"Numi6KryhUz97oNf8R_8",hasBorder:"WO8hSKCA5JT52JWpJC4Q",mask:"HeURZLv0mxH2HQ7a6gor",circle:"awvFhf_onNkPcE7twNY_"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);