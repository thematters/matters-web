"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[5736],{"./src/stories/components/Uploader/Cover.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Cover:()=>Cover_stories_Cover,default:()=>Cover_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js");const circle_cover="/_next/static/79cb304861af9d5b71d0eebd0f33f9a8.svg",profile_cover_src="static/media/profile-cover.679cef8c.png";var enums_file=__webpack_require__("./src/common/enums/file.ts"),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js"),asyncToGenerator_default=__webpack_require__.n(asyncToGenerator),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js"),slicedToArray_default=__webpack_require__.n(slicedToArray),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),reach_visually_hidden=__webpack_require__("./node_modules/@reach/visually-hidden/dist/reach-visually-hidden.mjs"),events=__webpack_require__("./src/common/enums/events.ts"),translate=__webpack_require__("./src/common/utils/translate.ts"),LanguageContext=__webpack_require__("./src/components/Context/Language/LanguageContext.tsx"),hooks=__webpack_require__("./src/components/GQL/hooks.ts"),Translate=__webpack_require__("./src/components/Context/Language/Translate.tsx"),Spinner=__webpack_require__("./src/components/Spinner/index.tsx"),IconCamera24=__webpack_require__("./src/components/Icon/IconCamera24.tsx"),Button=__webpack_require__("./src/components/Button/index.tsx"),TextIcon=__webpack_require__("./src/components/TextIcon/index.tsx"),ResponsiveImage=__webpack_require__("./src/components/ResponsiveImage/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Cover/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Cover_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,Cover=function Cover(_ref){var cover=_ref.cover,fallbackCover=_ref.fallbackCover,inEditor=_ref.inEditor,children=_ref.children,url=cover||fallbackCover,isFallback=!cover;return __jsx("div",{className:Cover_styles_module.cover},__jsx(ResponsiveImage.t,{url,size:"1280w",disabled:isFallback||inEditor}),children)};Cover.displayName="Cover",Cover.__docgenInfo={description:"",methods:[],displayName:"Cover"};try{Cover.displayName="Cover",Cover.__docgenInfo={description:"",displayName:"Cover",props:{cover:{defaultValue:null,description:"",name:"cover",required:!1,type:{name:"string | null"}},fallbackCover:{defaultValue:null,description:"",name:"fallbackCover",required:!0,type:{name:"string"}},inEditor:{defaultValue:null,description:"",name:"inEditor",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Cover/index.tsx#Cover"]={docgenInfo:Cover.__docgenInfo,name:"Cover",path:"src/components/Cover/index.tsx#Cover"})}catch(__react_docgen_typescript_loader_error){}var uploadFile=__webpack_require__("./src/components/GQL/mutations/uploadFile.ts"),CoverUploader_styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/FileUploader/CoverUploader/styles.module.css"),styles_module_options={};styles_module_options.styleTagTransform=styleTagTransform_default(),styles_module_options.setAttributes=setAttributesWithoutAttributes_default(),styles_module_options.insert=insertBySelector_default().bind(null,"head"),styles_module_options.domAPI=styleDomAPI_default(),styles_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(CoverUploader_styles_module.Z,styles_module_options);const FileUploader_CoverUploader_styles_module=CoverUploader_styles_module.Z&&CoverUploader_styles_module.Z.locals?CoverUploader_styles_module.Z.locals:void 0;var CoverUploader_jsx=react.createElement,CoverUploader=function CoverUploader(_ref){var assetType=_ref.assetType,initCover=_ref.cover,fallbackCover=_ref.fallbackCover,entityId=_ref.entityId,entityType=_ref.entityType,inEditor=_ref.inEditor,onUpload=_ref.onUpload,type=_ref.type,lang=(0,react.useContext)(LanguageContext.AZ).lang,_useState=(0,react.useState)(initCover),cover=_useState[0],setCover=_useState[1],_useMutation=(0,hooks.Db)(uploadFile.Z,void 0,{showToast:!1}),_useMutation2=slicedToArray_default()(_useMutation,2),upload=_useMutation2[0],loading=_useMutation2[1].loading,acceptTypes=enums_file.oo.join(","),handleChange=function(){var _ref2=asyncToGenerator_default()(regenerator_default().mark((function _callee(event){var file,_yield$upload,data,id,path;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(event.stopPropagation(),upload&&event.target&&event.target.files){_context.next=3;break}return _context.abrupt("return");case 3:if(file=event.target.files[0],event.target.value="",!((null==file?void 0:file.size)>enums_file.Rv)){_context.next=8;break}return window.dispatchEvent(new CustomEvent(events.h,{detail:{color:"red",content:CoverUploader_jsx(Translate.v,{zh_hant:"上傳檔案超過 5 MB",zh_hans:"上传文件超过 5 MB",en:"upload file exceed 5 MB"})}})),_context.abrupt("return");case 8:return _context.prev=8,_context.next=11,upload({variables:{input:{file,type:assetType,entityId,entityType}}});case 11:if(_yield$upload=_context.sent,data=_yield$upload.data,id=null==data?void 0:data.singleFileUpload.id,path=null==data?void 0:data.singleFileUpload.path,!id||!path){_context.next=20;break}setCover(path),onUpload(id),_context.next=21;break;case 20:throw new Error;case 21:_context.next=26;break;case 23:_context.prev=23,_context.t0=_context.catch(8),window.dispatchEvent(new CustomEvent(events.h,{detail:{color:"red",content:CoverUploader_jsx(Translate.v,{id:"failureUploadImage"})}}));case 26:case"end":return _context.stop()}}),_callee,null,[[8,23]])})));return function handleChange(_x){return _ref2.apply(this,arguments)}}(),removeCover=function removeCover(){setCover(void 0),onUpload(null)},Mask=function Mask(){return CoverUploader_jsx("div",{className:FileUploader_CoverUploader_styles_module.mask},loading?CoverUploader_jsx(Spinner.$,null):CoverUploader_jsx(IconCamera24.IconCamera24,{color:"white",size:"xl"}),initCover&&CoverUploader_jsx("section",{className:FileUploader_CoverUploader_styles_module.delete},CoverUploader_jsx(Button.z,{size:[null,"1.25rem"],spacing:[0,"xtight"],borderColor:"white",borderWidth:"sm",onClick:removeCover},CoverUploader_jsx(TextIcon.V,{color:"white",size:"xs"},CoverUploader_jsx(Translate.v,{id:"delete"})))))},isCircle="circle"===type;return CoverUploader_jsx("label",{className:FileUploader_CoverUploader_styles_module.label,htmlFor:"cover-upload-form"},!isCircle&&CoverUploader_jsx(Cover,{cover,fallbackCover,inEditor},CoverUploader_jsx(Mask,null)),isCircle&&CoverUploader_jsx(Cover,{cover,fallbackCover,inEditor},CoverUploader_jsx(Mask,null)),CoverUploader_jsx(reach_visually_hidden.T,null,CoverUploader_jsx("input",{id:"cover-upload-form",type:"file",name:"file","aria-label":(0,translate.I)({id:"uploadCover",lang}),accept:acceptTypes,multiple:!1,onChange:handleChange})))};CoverUploader.displayName="CoverUploader",CoverUploader.__docgenInfo={description:"",methods:[],displayName:"CoverUploader",props:{assetType:{required:!0,tsType:{name:"union",raw:"| ASSET_TYPE.profileCover\n| ASSET_TYPE.tagCover\n| ASSET_TYPE.circleCover",elements:[{name:"ASSET_TYPE.profileCover"},{name:"ASSET_TYPE.tagCover"},{name:"ASSET_TYPE.circleCover"}]},description:""},entityId:{required:!1,tsType:{name:"string"},description:""},entityType:{required:!0,tsType:{name:"union",raw:"ENTITY_TYPE.user | ENTITY_TYPE.tag | ENTITY_TYPE.circle",elements:[{name:"ENTITY_TYPE.user"},{name:"ENTITY_TYPE.tag"},{name:"ENTITY_TYPE.circle"}]},description:""},onUpload:{required:!0,tsType:{name:"signature",type:"function",raw:"(assetId: string | null) => void",signature:{arguments:[{name:"assetId",type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]}}],return:{name:"void"}}},description:""},type:{required:!1,tsType:{name:"literal",value:"'circle'"},description:""}}};try{CoverUploader.displayName="CoverUploader",CoverUploader.__docgenInfo={description:"",displayName:"CoverUploader",props:{assetType:{defaultValue:null,description:"",name:"assetType",required:!0,type:{name:"enum",value:[{value:'"profileCover"'},{value:'"tagCover"'},{value:'"circleCover"'}]}},entityId:{defaultValue:null,description:"",name:"entityId",required:!1,type:{name:"string"}},entityType:{defaultValue:null,description:"",name:"entityType",required:!0,type:{name:"enum",value:[{value:'"tag"'},{value:'"user"'},{value:'"circle"'}]}},onUpload:{defaultValue:null,description:"",name:"onUpload",required:!0,type:{name:"(assetId: string | null) => void"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"circle"'}]}},cover:{defaultValue:null,description:"",name:"cover",required:!1,type:{name:"string | null"}},fallbackCover:{defaultValue:null,description:"",name:"fallbackCover",required:!0,type:{name:"string"}},inEditor:{defaultValue:null,description:"",name:"inEditor",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/FileUploader/CoverUploader/index.tsx#CoverUploader"]={docgenInfo:CoverUploader.__docgenInfo,name:"CoverUploader",path:"src/components/FileUploader/CoverUploader/index.tsx#CoverUploader"})}catch(__react_docgen_typescript_loader_error){}var _Cover$parameters,_Cover$parameters2,_Cover$parameters2$do,Uploader_styles_module=__webpack_require__("./src/stories/components/Uploader/styles.module.css"),Cover_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Cover_stories={title:"Components/Uploader",component:CoverUploader};var Template=function Template(){return Cover_stories_jsx(react_testing_esm.ge,null,Cover_stories_jsx("ul",{className:Uploader_styles_module.Z.coverContainer},Cover_stories_jsx("li",null,Cover_stories_jsx(CoverUploader,{assetType:enums_file.tP.profileCover,entityType:enums_file.lU.user,onUpload:function onUpload(assetId){return alert({assetId})},fallbackCover:profile_cover_src})),Cover_stories_jsx("li",null,Cover_stories_jsx(CoverUploader,{assetType:enums_file.tP.profileCover,entityType:enums_file.lU.user,onUpload:function onUpload(assetId){return alert({assetId})},fallbackCover:profile_cover_src,cover:"https://source.unsplash.com/512x512?cover"})),Cover_stories_jsx("li",null,Cover_stories_jsx(CoverUploader,{type:"circle",assetType:enums_file.tP.circleCover,entityType:enums_file.lU.circle,onUpload:function onUpload(assetId){return alert({assetId})},fallbackCover:circle_cover})),Cover_stories_jsx("li",null,Cover_stories_jsx(CoverUploader,{type:"circle",assetType:enums_file.tP.circleCover,entityType:enums_file.lU.circle,onUpload:function onUpload(assetId){return alert({assetId})},fallbackCover:circle_cover,cover:"https://source.unsplash.com/512x512?circle-cover"}))))};Template.displayName="Template";var Cover_stories_Cover=Template.bind({});Cover_stories_Cover.parameters=_objectSpread(_objectSpread({},Cover_stories_Cover.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Cover$parameters=Cover_stories_Cover.parameters)||void 0===_Cover$parameters?void 0:_Cover$parameters.docs),{},{source:_objectSpread({originalSource:'() => <MockedProvider>\n    <ul className={styles.coverContainer}>\n      {/* User & Tag */}\n      <li>\n        <CoverUploader assetType={ASSET_TYPE.profileCover} entityType={ENTITY_TYPE.user} onUpload={assetId => alert({\n        assetId\n      })} fallbackCover={IMAGE_COVER.src} />\n      </li>\n      <li>\n        <CoverUploader assetType={ASSET_TYPE.profileCover} entityType={ENTITY_TYPE.user} onUpload={assetId => alert({\n        assetId\n      })} fallbackCover={IMAGE_COVER.src} cover="https://source.unsplash.com/512x512?cover" />\n      </li>\n\n      {/* Circle */}\n      <li>\n        <CoverUploader type="circle" assetType={ASSET_TYPE.circleCover} entityType={ENTITY_TYPE.circle} onUpload={assetId => alert({\n        assetId\n      })} fallbackCover={CIRCLE_COVER} />\n      </li>\n      <li>\n        <CoverUploader type="circle" assetType={ASSET_TYPE.circleCover} entityType={ENTITY_TYPE.circle} onUpload={assetId => alert({\n        assetId\n      })} fallbackCover={CIRCLE_COVER} cover="https://source.unsplash.com/512x512?circle-cover" />\n      </li>\n    </ul>\n  </MockedProvider>'},null===(_Cover$parameters2=Cover_stories_Cover.parameters)||void 0===_Cover$parameters2||null===(_Cover$parameters2$do=_Cover$parameters2.docs)||void 0===_Cover$parameters2$do?void 0:_Cover$parameters2$do.source)})})},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Cover/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".uvU4x3DuViKvRnzPIvRw {\n  position: relative;\n  overflow: hidden;\n  border-radius: 0 0 1.25rem 1.25rem;\n}\n.uvU4x3DuViKvRnzPIvRw img {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n\n    background-color: var(--color-grey-lighter);\n  }\n.uvU4x3DuViKvRnzPIvRw::after {\n    display: block;\n    padding-bottom: 46.93%;\n    content: '';\n  }\n@media (min-width: 475px) {\n  .uvU4x3DuViKvRnzPIvRw::after {\n      padding-bottom: 30.14%;\n  }\n    }\n","",{version:3,sources:["webpack://./src/components/Cover/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kCAAkC;AAiBpC;AAfE;IC2QA,kBAAkB;IAClB,MAAQ;IAAR,QAAQ;IAAR,SAAQ;IAAR,OAAQ;IACR,WAAW;IACX,YAAY;IACZ,oBAAiB;OAAjB,iBAAiB;;ID5Qf,2CAA2C;EAC7C;AAEA;IACE,cAAc;IACd,sBAAsB;IACtB,WAAW;EAKb;AAHE;EALF;MAMI,sBAAsB;EAE1B;IADE",sourcesContent:[".cover {\n  position: relative;\n  overflow: hidden;\n  border-radius: 0 0 1.25rem 1.25rem;\n\n  & img {\n    @mixin object-fit-cover;\n\n    background-color: var(--color-grey-lighter);\n  }\n\n  &::after {\n    display: block;\n    padding-bottom: 46.93%;\n    content: '';\n\n    @media (--sm-up) {\n      padding-bottom: 30.14%;\n    }\n  }\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  padding: var(--spacing-base);\n  font-size: var(--font-size-md);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-round {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-base);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n  caret-color: var(--color-matters-green);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n@define-mixin form-container {\n  margin-right: var(--spacing-base);\n  margin-left: var(--spacing-base);\n\n  @media (--sm-up) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.field) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.inputContainer) {\n    margin: 0;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey-dark);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={cover:"uvU4x3DuViKvRnzPIvRw"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/FileUploader/CoverUploader/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".f1j_R6bl8HH2_ENYonKR {\n  position: relative;\n  display: block;\n  font-size: 0;\n}\n\n.F4h2MeiVi0QbNvcWLTcQ {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  background: rgba(0, 0, 0, 0.5);\n}\n\n.tsYH6xnaXgjdtq4F9r1B {\n  position: absolute;\n  right: var(--spacing-base);\n  bottom: var(--spacing-base);\n}\n","",{version:3,sources:["webpack://./src/components/FileUploader/CoverUploader/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,cAAc;EACd,YAAY;AACd;;AAEA;EC6PE,kBAAkB;EAClB,MAAQ;EAAR,QAAQ;EAAR,SAAQ;EAAR,OAAQ;EAjQR,aAAa;EACb,mBAAmB;EACnB,uBAAuB;;EDKvB,8BAA4B;AAC9B;;AAEA;EACE,kBAAkB;EAClB,0BAA0B;EAC1B,2BAA2B;AAC7B",sourcesContent:[".label {\n  position: relative;\n  display: block;\n  font-size: 0;\n}\n\n.mask {\n  @mixin expand-to-container;\n  @mixin flex-center-all;\n\n  background: rgb(0 0 0 / 50%);\n}\n\n.delete {\n  position: absolute;\n  right: var(--spacing-base);\n  bottom: var(--spacing-base);\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  padding: var(--spacing-base);\n  font-size: var(--font-size-md);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-round {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-base);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n  caret-color: var(--color-matters-green);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n@define-mixin form-container {\n  margin-right: var(--spacing-base);\n  margin-left: var(--spacing-base);\n\n  @media (--sm-up) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.field) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.inputContainer) {\n    margin: 0;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey-dark);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={label:"f1j_R6bl8HH2_ENYonKR",mask:"F4h2MeiVi0QbNvcWLTcQ",delete:"tsYH6xnaXgjdtq4F9r1B"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);