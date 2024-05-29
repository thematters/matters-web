(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[996],{"./src/stories/components/ArticleDigest/List.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{List:()=>List,__namedExportsOrder:()=>__namedExportsOrder,default:()=>List_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),taggedTemplateLiteral=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js"),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),test=__webpack_require__("./src/common/enums/test.ts"),route=__webpack_require__("./src/common/utils/route.ts"),Card=__webpack_require__("./src/components/Interaction/Card/index.tsx"),UserDigest=__webpack_require__("./src/components/UserDigest/index.tsx"),Title=__webpack_require__("./src/components/ArticleDigest/Title/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[16].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./src/components/ArticleDigest/List/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const List_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var _templateObject,__jsx=react.createElement,fragments={article:(0,lib.ZP)(_templateObject||(_templateObject=(0,taggedTemplateLiteral.Z)(["\n    fragment ArticleDigestListArticle on Article {\n      id\n      author {\n        id\n        userName\n        ...UserDigestMiniUser\n      }\n      ...ArticleDigestTitleArticle\n    }\n    ","\n    ","\n  "])),UserDigest.R.Mini.fragments.user,Title.A.fragments.article)},ArticleDigestList=function ArticleDigestList(_ref){var article=_ref.article,user=_ref.user,onClick=_ref.onClick,onClickAuthor=_ref.onClickAuthor,_ref$userPlacement=_ref.userPlacement,userPlacement=void 0===_ref$userPlacement?"top":_ref$userPlacement,right=_ref.right,author=article.author,path=(0,route.y3)({page:"articleDetail",article}),userProps={user:user||author,avatarSize:20,textSize:12,hasAvatar:!0,hasDisplayName:!0,onClick:onClickAuthor};return __jsx(Card.Z,(0,esm_extends.Z)({},path,{spacing:[0,0],bgActiveColor:"none",onClick,testId:test.Y.DIGEST_ARTICLE_LIST}),__jsx("section",{className:List_styles_module.container},__jsx("section",{className:List_styles_module.left},"top"===userPlacement&&__jsx("header",{className:List_styles_module.user},__jsx(UserDigest.R.Mini,userProps)),__jsx("section",null,__jsx(Title.A,{article,is:"h2",textSize:14,textWeight:"normal",lineClamp:1})),"bottom"===userPlacement&&__jsx("footer",{className:List_styles_module.user},__jsx(UserDigest.R.Mini,userProps))),right&&__jsx("section",{className:List_styles_module.right},right)))};ArticleDigestList.displayName="ArticleDigestList",ArticleDigestList.fragments=fragments;try{ArticleDigestList.displayName="ArticleDigestList",ArticleDigestList.__docgenInfo={description:"",displayName:"ArticleDigestList",props:{article:{defaultValue:null,description:"",name:"article",required:!0,type:{name:"ArticleDigestListArticleFragment"}},user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"UserDigestMiniUserFragment"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => any)"}},onClickAuthor:{defaultValue:null,description:"",name:"onClickAuthor",required:!1,type:{name:"(() => void)"}},userPlacement:{defaultValue:{value:"top"},description:"",name:"userPlacement",required:!1,type:{name:"enum",value:[{value:'"bottom"'},{value:'"top"'}]}},right:{defaultValue:null,description:"",name:"right",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ArticleDigest/List/index.tsx#ArticleDigestList"]={docgenInfo:ArticleDigestList.__docgenInfo,name:"ArticleDigestList",path:"src/components/ArticleDigest/List/index.tsx#ArticleDigestList"})}catch(__react_docgen_typescript_loader_error){}var _List$parameters,_List$parameters2,mocks=__webpack_require__("./src/stories/mocks/index.ts"),List_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const List_stories={title:"Components/ArticleDigest",component:ArticleDigestList};var Template=function Template(args){return List_stories_jsx(react_testing_esm.ge,null,List_stories_jsx(ArticleDigestList,args))};Template.displayName="Template";var List=Template.bind({});List.args={article:mocks.ZV},List.parameters=_objectSpread(_objectSpread({},List.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_List$parameters=List.parameters)||void 0===_List$parameters?void 0:_List$parameters.docs),{},{source:_objectSpread({originalSource:"args => <MockedProvider>\n    <ArticleDigestList {...args} />\n  </MockedProvider>"},null===(_List$parameters2=List.parameters)||void 0===_List$parameters2||null===(_List$parameters2=_List$parameters2.docs)||void 0===_List$parameters2?void 0:_List$parameters2.source)})});const __namedExportsOrder=["List"]},"./src/components/ArticleDigest/Title/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>ArticleDigestTitle});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),taggedTemplateLiteral=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js"),react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),message=__webpack_require__("./node_modules/react-intl/lib/src/components/message.js"),test=__webpack_require__("./src/common/enums/test.ts"),route=__webpack_require__("./src/common/utils/route.ts"),utils_text=__webpack_require__("./src/common/utils/text/index.ts"),LinkWrapper=__webpack_require__("./src/components/Interaction/LinkWrapper/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[16].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./src/components/ArticleDigest/Title/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Title_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var _templateObject,_excluded=["article","collectionId","textSize","textWeight","lineClamp","is","disabled","onClick"],__jsx=react.createElement,fragments={article:(0,lib.ZP)(_templateObject||(_templateObject=(0,taggedTemplateLiteral.Z)(["\n    fragment ArticleDigestTitleArticle on Article {\n      id\n      title\n      articleState: state\n      slug\n      shortHash\n      author {\n        id\n        userName\n      }\n    }\n  "])))},ArticleDigestTitle=function ArticleDigestTitle(_ref){var article=_ref.article,collectionId=_ref.collectionId,_ref$textSize=_ref.textSize,textSize=void 0===_ref$textSize?16:_ref$textSize,_ref$textWeight=_ref.textWeight,textWeight=void 0===_ref$textWeight?"medium":_ref$textWeight,_ref$lineClamp=_ref.lineClamp,lineClamp=void 0===_ref$lineClamp||_ref$lineClamp,_ref$is=_ref.is,is=void 0===_ref$is?"h2":_ref$is,disabled=_ref.disabled,onClick=_ref.onClick,restProps=(0,objectWithoutProperties.Z)(_ref,_excluded),state=article.articleState,path=(0,route.y3)({page:"articleDetail",article,collectionId}),isBanned="banned"===state,title=isBanned?__jsx(message.Z,{defaultMessage:"The article has been archived due to violation of terms",id:"+GAaxB"}):article.title,titleClasses=classnames_default()((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)({},Title_styles_module.title,!0),Title_styles_module["text".concat(textSize)],!!textSize),Title_styles_module["font".concat((0,utils_text.fm)(textWeight))],!!textWeight),Title_styles_module.lineClamp,!!lineClamp),Title_styles_module["lineClampLine".concat(lineClamp)],1===lineClamp||3===lineClamp)),isClickable=!disabled&&!isBanned;return __jsx(LinkWrapper.g,(0,esm_extends.Z)({},path,{textActiveColor:isClickable?"green":void 0,disabled:!isClickable,onClick,testId:test.Y.DIGEST_ARTICLE_TITLE},restProps),__jsx(react.Fragment,null,__jsx("h2"===is?"h2":"h3"===is?"h3":"h4"===is?"h4":"h5",{className:titleClasses},title)))};ArticleDigestTitle.displayName="ArticleDigestTitle",ArticleDigestTitle.fragments=fragments;try{ArticleDigestTitle.displayName="ArticleDigestTitle",ArticleDigestTitle.__docgenInfo={description:"",displayName:"ArticleDigestTitle",props:{article:{defaultValue:null,description:"",name:"article",required:!0,type:{name:"ArticleDigestTitleArticleFragment"}},collectionId:{defaultValue:null,description:"",name:"collectionId",required:!1,type:{name:"string"}},textSize:{defaultValue:{value:"16"},description:"",name:"textSize",required:!1,type:{name:"enum",value:[{value:"16"},{value:"24"},{value:"12"},{value:"13"},{value:"14"},{value:"15"},{value:"18"}]}},textWeight:{defaultValue:{value:"medium"},description:"",name:"textWeight",required:!1,type:{name:"enum",value:[{value:'"medium"'},{value:'"semibold"'},{value:'"normal"'}]}},lineClamp:{defaultValue:{value:"true"},description:"",name:"lineClamp",required:!1,type:{name:"boolean | 1 | 2 | 3"}},is:{defaultValue:{value:"h2"},description:"",name:"is",required:!1,type:{name:"enum",value:[{value:'"h2"'},{value:'"h3"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((() => void) & (() => void))"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ArticleDigest/Title/index.tsx#ArticleDigestTitle"]={docgenInfo:ArticleDigestTitle.__docgenInfo,name:"ArticleDigestTitle",path:"src/components/ArticleDigest/Title/index.tsx#ArticleDigestTitle"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[16].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./src/components/ArticleDigest/List/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".SG_BIEf7LapstMczQ8ur {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  padding: var(--sp16) 0;\n}\n\n.MgEn0bjXdBrZ8tFRIwbi > * + * {\n    margin-top: var(--sp8);\n  }\n\n.nrgaEVFz5YimF0SbZYA7 {\n  flex-shrink: 0;\n  margin-left: var(--sp16);\n  text-align: right;\n}\n\n.aAeeIOvVLeyWLgaO2ciX {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n","",{version:3,sources:["webpack://./src/components/ArticleDigest/List/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;ECSE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;;EDR9B,sBAAsB;AACxB;;AAGE;IACE,sBAAsB;EACxB;;AAGF;EACE,cAAc;EACd,wBAAwB;EACxB,iBAAiB;AACnB;;AAEA;ECHE,aAAa;EACb,mBAAmB;EACnB,2BAA2B;ADG7B",sourcesContent:[".container {\n  @mixin flex-center-space-between;\n\n  padding: var(--sp16) 0;\n}\n\n.left {\n  & > * + * {\n    margin-top: var(--sp8);\n  }\n}\n\n.right {\n  flex-shrink: 0;\n  margin-left: var(--sp16);\n  text-align: right;\n}\n\n.user {\n  @mixin flex-center-start;\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin inline-flex-start-center {\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-grey-light {\n  border: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-bottom-grey-light {\n  border-bottom: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-top-grey-light {\n  border-top: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-left-grey-light {\n  border-left: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-right-grey-light {\n  border-right: 1px solid var(--color-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--sp12);\n  font-size: var(--text14);\n  line-height: 1.375rem;\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--sp8);\n  transition-property: border-color, background-color;\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-negative-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-negative-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--text16);\n  }\n}\n\n@define-mixin form-input-number {\n  caret-color: var(--color-matters-green);\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--sp16);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey);\n\n    & > * + * {\n      margin-left: var(--sp16);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--sp16);\n    }\n  }\n}\n\n/* Scrollbar\n   ========================================================================== */\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    display: none;\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n\n@define-mixin scrollbar-thin {\n  /* Width */\n  &::-webkit-scrollbar {\n    width: 15px;\n  }\n\n  /* Track */\n  &::-webkit-scrollbar-track {\n    border: solid 6px transparent;\n    box-shadow: inset 0 0 15px 15px transparent;\n  }\n\n  /* Handle */\n  &::-webkit-scrollbar-thumb {\n    min-height: 68px;\n    border: solid 6px transparent;\n    border-radius: 8px;\n    box-shadow: inset 0 0 15px 15px var(--color-grey-light);\n  }\n\n  /* Handle on hover */\n  &::-webkit-scrollbar-thumb:hover {\n    box-shadow: inset 0 0 15px 15px var(--color-grey);\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n/* FIXME: fix cropped descenders of letters  */\n@define-mixin fix-cropped-letters {\n  padding-bottom: 0.12em;\n  margin-bottom: -0.12rem;\n}\n\n@define-mixin polka-dot-background {\n  background:\n    linear-gradient(90deg, var(--color-white) 2px, transparent 1%) center,\n    linear-gradient(var(--color-white) 2px, transparent 1%) center,\n    var(--color-grey-light);\n  background-repeat: repeat;\n  background-position: -2px -1px;\n  background-size: 3px 3px;\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={container:"SG_BIEf7LapstMczQ8ur",left:"MgEn0bjXdBrZ8tFRIwbi",right:"nrgaEVFz5YimF0SbZYA7",user:"aAeeIOvVLeyWLgaO2ciX"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[16].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!./src/components/ArticleDigest/Title/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".Om1aDwGypM2LPTy_NuI0 {\n  font-size: var(--text12);\n}\n\n.UCs5UdbosoZ4LBKp0jkk {\n  font-size: var(--text13);\n}\n\n.ckstJdsnUHseC7yMCzRi {\n  font-size: var(--text14);\n}\n\n.dv8xdjTQdMY0OyeUfGQg {\n  font-size: var(--text15);\n}\n\n.FJw5dLS4Tx7ElzmpheDt {\n  font-size: var(--text16);\n}\n\n.n_yDlvsaWq6dM4eUNBBF {\n  font-size: var(--text18);\n}\n\n.wno9IW6vA7s7P23Wizrg {\n  font-size: var(--text24);\n}\n\n.y8YMaeriI2BMrbNMlHfE {\n  font-weight: var(--font-normal);\n}\n\n.EHMKsmrtNIGQjaeOx1_Q {\n  font-weight: var(--font-medium);\n}\n\n.J1HFRHDHMPa7YYlgOXZn {\n  font-weight: var(--font-semibold);\n}\n\n.YWRcpQxfohRVqbOjclUQ {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 2;\n}\n\n.EQsaxrqge0OSbSz1aa_Q {\n  -webkit-line-clamp: 1;\n}\n\n.VbaKB9e7doHZEwZDNTaT {\n  -webkit-line-clamp: 3;\n}\n","",{version:3,sources:["webpack://./src/components/ArticleDigest/Title/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;ECqRE,oBAAoB;EACpB,qBAAqB;EAErB,8BAA8B;EAC9B,4BAA4B;EAC5B,gBAAgB;;EDvRhB,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB",sourcesContent:[".text12 {\n  font-size: var(--text12);\n}\n\n.text13 {\n  font-size: var(--text13);\n}\n\n.text14 {\n  font-size: var(--text14);\n}\n\n.text15 {\n  font-size: var(--text15);\n}\n\n.text16 {\n  font-size: var(--text16);\n}\n\n.text18 {\n  font-size: var(--text18);\n}\n\n.text24 {\n  font-size: var(--text24);\n}\n\n.fontNormal {\n  font-weight: var(--font-normal);\n}\n\n.fontMedium {\n  font-weight: var(--font-medium);\n}\n\n.fontSemibold {\n  font-weight: var(--font-semibold);\n}\n\n.lineClamp {\n  @mixin line-clamp;\n\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 2;\n}\n\n.lineClampLine1 {\n  -webkit-line-clamp: 1;\n}\n\n.lineClampLine3 {\n  -webkit-line-clamp: 3;\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin inline-flex-start-center {\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-grey-light {\n  border: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-bottom-grey-light {\n  border-bottom: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-top-grey-light {\n  border-top: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-left-grey-light {\n  border-left: 1px solid var(--color-grey-light);\n}\n\n@define-mixin border-right-grey-light {\n  border-right: 1px solid var(--color-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--sp12);\n  font-size: var(--text14);\n  line-height: 1.375rem;\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--sp8);\n  transition-property: border-color, background-color;\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-negative-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-negative-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--text16);\n  }\n}\n\n@define-mixin form-input-number {\n  caret-color: var(--color-matters-green);\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--sp16);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey);\n\n    & > * + * {\n      margin-left: var(--sp16);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--sp16);\n    }\n  }\n}\n\n/* Scrollbar\n   ========================================================================== */\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    display: none;\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n\n@define-mixin scrollbar-thin {\n  /* Width */\n  &::-webkit-scrollbar {\n    width: 15px;\n  }\n\n  /* Track */\n  &::-webkit-scrollbar-track {\n    border: solid 6px transparent;\n    box-shadow: inset 0 0 15px 15px transparent;\n  }\n\n  /* Handle */\n  &::-webkit-scrollbar-thumb {\n    min-height: 68px;\n    border: solid 6px transparent;\n    border-radius: 8px;\n    box-shadow: inset 0 0 15px 15px var(--color-grey-light);\n  }\n\n  /* Handle on hover */\n  &::-webkit-scrollbar-thumb:hover {\n    box-shadow: inset 0 0 15px 15px var(--color-grey);\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n/* FIXME: fix cropped descenders of letters  */\n@define-mixin fix-cropped-letters {\n  padding-bottom: 0.12em;\n  margin-bottom: -0.12rem;\n}\n\n@define-mixin polka-dot-background {\n  background:\n    linear-gradient(90deg, var(--color-white) 2px, transparent 1%) center,\n    linear-gradient(var(--color-white) 2px, transparent 1%) center,\n    var(--color-grey-light);\n  background-repeat: repeat;\n  background-position: -2px -1px;\n  background-size: 3px 3px;\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={text12:"Om1aDwGypM2LPTy_NuI0",text13:"UCs5UdbosoZ4LBKp0jkk",text14:"ckstJdsnUHseC7yMCzRi",text15:"dv8xdjTQdMY0OyeUfGQg",text16:"FJw5dLS4Tx7ElzmpheDt",text18:"n_yDlvsaWq6dM4eUNBBF",text24:"wno9IW6vA7s7P23Wizrg",fontNormal:"y8YMaeriI2BMrbNMlHfE",fontMedium:"EHMKsmrtNIGQjaeOx1_Q",fontSemibold:"J1HFRHDHMPa7YYlgOXZn",lineClamp:"YWRcpQxfohRVqbOjclUQ",lineClampLine1:"EQsaxrqge0OSbSz1aa_Q",lineClampLine3:"VbaKB9e7doHZEwZDNTaT"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/lodash/isNil.js":module=>{module.exports=function isNil(value){return null==value}}}]);