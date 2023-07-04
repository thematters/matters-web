"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[2883],{"./src/stories/components/ArticleDigest/Archive.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>Archive_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),message=__webpack_require__("./node_modules/react-intl/lib/src/components/message.js"),route=__webpack_require__("./src/common/utils/route.ts"),Card=__webpack_require__("./src/components/Interaction/Card/index.tsx"),Title=__webpack_require__("./src/components/ArticleDigest/Title/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/ArticleDigest/Archive/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Archive_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,ArticleDigestArchive=function ArticleDigestArchive(_ref){var article=_ref.article,utm_source=_ref.utm_source,utm_medium=_ref.utm_medium,path=(0,route.y3)({page:"articleDetail",article,utm_source,utm_medium});return __jsx(Card.Z,extends_default()({},path,{spacing:["base",0],bgActiveColor:"none"}),__jsx("section",{className:Archive_styles_module.container},__jsx("section",{className:Archive_styles_module.left},__jsx(Title.A,{article,textSize:"sm",textWeight:"normal",lineClamp:1})),__jsx("section",{className:Archive_styles_module.right},__jsx(message.Z,{id:"RNKSCj",defaultMessage:[{type:0,value:"Archived"}]}))))};ArticleDigestArchive.displayName="ArticleDigestArchive",ArticleDigestArchive.__docgenInfo={description:"",methods:[],displayName:"ArticleDigestArchive",props:{article:{required:!0,tsType:{name:"ArticleDigestTitleArticleFragment"},description:""}}};try{ArticleDigestArchive.displayName="ArticleDigestArchive",ArticleDigestArchive.__docgenInfo={description:"",displayName:"ArticleDigestArchive",props:{article:{defaultValue:null,description:"",name:"article",required:!0,type:{name:"ArticleDigestTitleArticleFragment"}},utm_source:{defaultValue:null,description:"",name:"utm_source",required:!1,type:{name:"string"}},utm_medium:{defaultValue:null,description:"",name:"utm_medium",required:!1,type:{name:"string"}},utm_campaign:{defaultValue:null,description:"",name:"utm_campaign",required:!1,type:{name:"string"}},utm_content:{defaultValue:null,description:"",name:"utm_content",required:!1,type:{name:"string"}},utm_term:{defaultValue:null,description:"",name:"utm_term",required:!1,type:{name:"string"}},utm_id:{defaultValue:null,description:"",name:"utm_id",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ArticleDigest/Archive/index.tsx#ArticleDigestArchive"]={docgenInfo:ArticleDigestArchive.__docgenInfo,name:"ArticleDigestArchive",path:"src/components/ArticleDigest/Archive/index.tsx#ArticleDigestArchive"})}catch(__react_docgen_typescript_loader_error){}var _Default$parameters,_Default$parameters2,_Default$parameters2$,mocks=__webpack_require__("./src/stories/mocks/index.ts"),Archive_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Archive_stories={title:"Components/ArticleDigest/Archive",component:ArticleDigestArchive};var Template=function Template(args){return Archive_stories_jsx(react_testing_esm.ge,null,Archive_stories_jsx(ArticleDigestArchive,args))};Template.displayName="Template";var Default=Template.bind({});Default.args={article:_objectSpread(_objectSpread({},mocks.ZV),{},{articleState:"archived"})},Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"args => <MockedProvider>\n    <ArticleDigestArchive {...args} />\n  </MockedProvider>"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})})},"./src/components/Interaction/LinkWrapper/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{g:()=>LinkWrapper});var helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),utils_text=__webpack_require__("./src/common/utils/text/index.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Interaction/LinkWrapper/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const LinkWrapper_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,LinkWrapper=function LinkWrapper(_ref){var _classNames,href=_ref.href,textActiveColor=_ref.textActiveColor,disabled=_ref.disabled,_onClick=_ref.onClick,testId=_ref.testId,children=_ref.children;if(disabled)return __jsx(react.Fragment,null,children);var linkClasses=classnames_default()((_classNames={},defineProperty_default()(_classNames,LinkWrapper_styles_module.link,!0),defineProperty_default()(_classNames,textActiveColor?LinkWrapper_styles_module["textActive".concat((0,utils_text.fm)(textActiveColor))]:"",!!textActiveColor),_classNames));return __jsx(link_default(),{href,legacyBehavior:!0},__jsx("a",extends_default()({className:linkClasses,onClick:function onClick(e){_onClick&&(_onClick(),e.stopPropagation())}},testId?defineProperty_default()({},"data-test-id",testId):{}),children))};LinkWrapper.displayName="LinkWrapper",LinkWrapper.__docgenInfo={description:"",methods:[],displayName:"LinkWrapper"};try{LinkWrapper.displayName="LinkWrapper",LinkWrapper.__docgenInfo={description:"",displayName:"LinkWrapper",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"string"}},textActiveColor:{defaultValue:null,description:"",name:"textActiveColor",required:!1,type:{name:"enum",value:[{value:'"green"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},testId:{defaultValue:null,description:"",name:"testId",required:!1,type:{name:"enum",value:[{value:'"layout/header"'},{value:'"digest/article/card"'},{value:'"digest/article/feed"'},{value:'"digest/article/list"'},{value:'"digest/article/feed/footer/pin"'},{value:'"digest/article/notice"'},{value:'"digest/article/sidebar"'},{value:'"digest/article/title"'},{value:'"digest/user/mini"'},{value:'"digest/user/mini/display-name"'},{value:'"digest/user/mini/user-name"'},{value:'"digest/user/plain"'},{value:'"digest/user/rich"'},{value:'"digest/user/rich/display-name"'},{value:'"digest/user/verbose"'},{value:'"digest/tag/feed"'},{value:'"digest/tag/rich"'},{value:'"digest/tag/sidebar"'},{value:'"digest/collection/feed"'},{value:'"dialog/auth"'},{value:'"search/results/item"'},{value:'"drafts/response/allow"'},{value:'"drafts/response/disallow"'},{value:'"article/summary"'},{value:'"article/content"'},{value:'"article/collection"'},{value:'"article/tags"'},{value:'"article/license"'},{value:'"article/support/support-button"'},{value:'"article/support/request"'},{value:'"article/support/reply"'},{value:'"article/appreciation/total"'},{value:'"article/toolbar"'},{value:'"article/bookmark"'},{value:'"article/comment/feed"'},{value:'"payto/currency-choice"'},{value:'"comment/content"'},{value:'"notice/user/display-name"'},{value:'"notice/article/title"'},{value:'"notice/comment/content"'},{value:'"notice/payment-receive-donation/amount"'},{value:'"notice/user-new-follower"'},{value:'"notice/article-new-collected"'},{value:'"notice/article-published"'},{value:'"notice/article-mentioned-you"'},{value:'"notice/article-new-subscriber"'},{value:'"notice/article-new-appreciation"'},{value:'"notice/revised-article-published"'},{value:'"notice/revised-article-not-published"'},{value:'"notice/circle-new-article"'},{value:'"notice/article-tag-added"'},{value:'"notice/article-tag-removed"'},{value:'"notice/article-tag-unselected"'},{value:'"notice/comment-new-reply"'},{value:'"notice/comment-mentioned-you"'},{value:'"notice/comment-pinned"'},{value:'"notice/article-new-comment"'},{value:'"notice/subscribed-article-new-comment"'},{value:'"notice/circle-new-broadcast"'},{value:'"notice/tag-adoption"'},{value:'"notice/tag-leave"'},{value:'"notice/tag-add-editor"'},{value:'"notice/tag-leave-editor"'},{value:'"notice/payment-payout"'},{value:'"notice/payment-receive-donation"'},{value:'"notice/cirlce-new-follower"'},{value:'"notice/cirlce-new-subscriber"'},{value:'"notice/cirlce-new-unsubscriber"'},{value:'"notice/circle-invitation"'},{value:'"notice/circle-new-broadcast-comments"'},{value:'"notice/circle-new-discussion-comments"'},{value:'"notice/crypto-wallet-airdrop"'},{value:'"notice/crypto-wallet-connected"'},{value:'"notice/official-announcement"'},{value:'"me/wallet/transactions/item"'},{value:'"me/wallet/transactions/item/amount"'},{value:'"user-profile"'},{value:'"user-profile/display-name"'},{value:'"user-profile/user-name"'},{value:'"user-profile/followers/count"'},{value:'"user-profile/bio"'},{value:'"editor/search-select-form/dialog/add-button"'},{value:'"spinner"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Interaction/LinkWrapper/index.tsx#LinkWrapper"]={docgenInfo:LinkWrapper.__docgenInfo,name:"LinkWrapper",path:"src/components/Interaction/LinkWrapper/index.tsx#LinkWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/ArticleDigest/Archive/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".nYp7FkcD6_CwpYEtpsQg {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  font-size: var(--font-size-sm);\n  color: var(--color-grey);\n}\n.nYp7FkcD6_CwpYEtpsQg .P_BtmRZR3RgFduXyelCH {\n    word-break: keep-all;\n  }\n","",{version:3,sources:["webpack://./src/components/ArticleDigest/Archive/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;ECSE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;;EDR9B,8BAA8B;EAC9B,wBAAwB;AAK1B;AAHE;IACE,oBAAoB;EACtB",sourcesContent:[".container {\n  @mixin flex-center-space-between;\n\n  font-size: var(--font-size-sm);\n  color: var(--color-grey);\n\n  & .right {\n    word-break: keep-all;\n  }\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  padding: var(--spacing-base);\n  font-size: var(--font-size-md);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-round {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-base);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n  caret-color: var(--color-matters-green);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n@define-mixin form-container {\n  margin-right: var(--spacing-base);\n  margin-left: var(--spacing-base);\n\n  @media (--sm-up) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.field) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.inputContainer) {\n    margin: 0;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={container:"nYp7FkcD6_CwpYEtpsQg",right:"P_BtmRZR3RgFduXyelCH"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Interaction/LinkWrapper/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".yCSphVB2gewwWgMa7iEd {\n  display: inline-flex;\n  align-items: center;\n}\n\n.C_DAQj544hPOu1wlzImw:hover,\n  .C_DAQj544hPOu1wlzImw:focus {\n    color: var(--color-matters-green);\n  }\n","",{version:3,sources:["webpack://./src/components/Interaction/LinkWrapper/styles.module.css"],names:[],mappings:"AAAA;EACE,oBAAoB;EACpB,mBAAmB;AACrB;;AAGE;;IAEE,iCAAiC;EACnC",sourcesContent:[".link {\n  display: inline-flex;\n  align-items: center;\n}\n\n.textActiveGreen {\n  &:hover,\n  &:focus {\n    color: var(--color-matters-green);\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={link:"yCSphVB2gewwWgMa7iEd",textActiveGreen:"C_DAQj544hPOu1wlzImw"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);