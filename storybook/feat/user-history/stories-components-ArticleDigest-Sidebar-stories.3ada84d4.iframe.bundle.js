(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[2431],{"./src/stories/components/ArticleDigest/Sidebar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Sidebar:()=>Sidebar,default:()=>Sidebar_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),objectWithoutProperties_default=__webpack_require__.n(objectWithoutProperties),taggedTemplateLiteral=__webpack_require__("./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),test=__webpack_require__("./src/common/enums/test.ts"),route=__webpack_require__("./src/common/utils/route.ts"),Card=__webpack_require__("./src/components/Interaction/Card/index.tsx"),ResponsiveImage=__webpack_require__("./src/components/ResponsiveImage/index.tsx"),UserDigest=__webpack_require__("./src/components/UserDigest/index.tsx"),Title=__webpack_require__("./src/components/ArticleDigest/Title/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/ArticleDigest/Sidebar/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Sidebar_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var _templateObject,_excluded=["article","titleTextSize","hasBackground","hasCover","onClick","onClickAuthor"],__jsx=react.createElement,fragments={article:(0,lib.ZP)(_templateObject||(_templateObject=taggedTemplateLiteral_default()(["\n    fragment ArticleDigestSidebarArticle on Article {\n      id\n      articleState: state\n      title\n      slug\n      mediaHash\n      cover\n      author {\n        id\n        userName\n        ...UserDigestMiniUser\n      }\n      ...ArticleDigestTitleArticle\n    }\n    ","\n    ","\n  "])),UserDigest.R.Mini.fragments.user,Title.A.fragments.article)},ArticleDigestSidebar=function ArticleDigestSidebar(_ref){var _classNames,article=_ref.article,_ref$titleTextSize=_ref.titleTextSize,titleTextSize=void 0===_ref$titleTextSize?"mdS":_ref$titleTextSize,hasBackground=_ref.hasBackground,_ref$hasCover=_ref.hasCover,hasCover=void 0===_ref$hasCover||_ref$hasCover,onClick=_ref.onClick,onClickAuthor=_ref.onClickAuthor,cardProps=objectWithoutProperties_default()(_ref,_excluded),cover=!("banned"===article.articleState)&&hasCover?article.cover:null,containerClasses=classnames_default()((_classNames={},defineProperty_default()(_classNames,Sidebar_styles_module.container,!0),defineProperty_default()(_classNames,Sidebar_styles_module.hasCover,!!cover),defineProperty_default()(_classNames,Sidebar_styles_module.hasBackground,!!hasBackground),_classNames)),path=(0,route.y3)({page:"articleDetail",article});return __jsx(Card.Z,extends_default()({},path,{spacing:["tight","tight"],borderRadius:"xtight",bgColor:hasBackground?"greyLighter":"none",onClick,testId:test.Y.DIGEST_ARTICLE_SIDEBAR},cardProps),__jsx("section",{className:containerClasses},__jsx("header",null,__jsx(Title.A,{article,textSize:titleTextSize,is:"h3"})),cover&&__jsx("aside",{className:Sidebar_styles_module.cover},__jsx(ResponsiveImage.t,{url:cover,size:"144w"})),__jsx("footer",{className:Sidebar_styles_module.footer},__jsx(UserDigest.R.Mini,{user:article.author,avatarSize:"xs",textSize:"smS",nameColor:"greyDarker",hasAvatar:!0,hasDisplayName:!0,onClick:onClickAuthor}))))};ArticleDigestSidebar.displayName="ArticleDigestSidebar",ArticleDigestSidebar.fragments=fragments,ArticleDigestSidebar.__docgenInfo={description:"",methods:[],displayName:"ArticleDigestSidebar",props:{titleTextSize:{defaultValue:{value:"'mdS'",computed:!1},required:!1,tsType:{name:"ArticleDigestTitleTextSize"},description:""},hasCover:{defaultValue:{value:"true",computed:!1},required:!1,tsType:{name:"boolean"},description:""},article:{required:!0,tsType:{name:"ArticleDigestSidebarArticleFragment"},description:""},hasBackground:{required:!1,tsType:{name:"boolean"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => any",signature:{arguments:[],return:{name:"any"}}},description:""},onClickAuthor:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};try{ArticleDigestSidebar.displayName="ArticleDigestSidebar",ArticleDigestSidebar.__docgenInfo={description:"",displayName:"ArticleDigestSidebar",props:{article:{defaultValue:null,description:"",name:"article",required:!0,type:{name:"ArticleDigestSidebarArticleFragment"}},titleTextSize:{defaultValue:{value:"mdS"},description:"",name:"titleTextSize",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"xl"'},{value:'"smS"'},{value:'"mdS"'},{value:'"xm"'}]}},hasBackground:{defaultValue:null,description:"",name:"hasBackground",required:!1,type:{name:"boolean"}},hasCover:{defaultValue:{value:"true"},description:"",name:"hasCover",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((() => any) & (() => any))"}},onClickAuthor:{defaultValue:null,description:"",name:"onClickAuthor",required:!1,type:{name:"(() => void)"}},spacing:{defaultValue:null,description:"",name:"spacing",required:!1,type:{name:"[CardSpacing, CardSpacing]"}},bgColor:{defaultValue:null,description:"",name:"bgColor",required:!1,type:{name:"enum",value:[{value:'"white"'},{value:'"greyLighter"'},{value:'"transparent"'},{value:'"none"'}]}},bgActiveColor:{defaultValue:null,description:"",name:"bgActiveColor",required:!1,type:{name:"enum",value:[{value:'"greyLighter"'},{value:'"transparent"'},{value:'"none"'}]}},borderColor:{defaultValue:null,description:"",name:"borderColor",required:!1,type:{name:"enum",value:[{value:'"green"'},{value:'"greyLighter"'},{value:'"lineGreyLight"'}]}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!1,type:{name:"enum",value:[{value:'"loose"'},{value:'"xxtight"'},{value:'"xtight"'},{value:'"base"'}]}},textColor:{defaultValue:null,description:"",name:"textColor",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"greyDarker"'},{value:'"red"'}]}},textActiveColor:{defaultValue:null,description:"",name:"textActiveColor",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"redDark"'}]}},isActive:{defaultValue:null,description:"",name:"isActive",required:!1,type:{name:"boolean"}},activeOutline:{defaultValue:null,description:"",name:"activeOutline",required:!1,type:{name:"enum",value:[{value:'"auto"'}]}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},htmlHref:{defaultValue:null,description:"",name:"htmlHref",required:!1,type:{name:"string"}},htmlTarget:{defaultValue:null,description:"",name:"htmlTarget",required:!1,type:{name:"enum",value:[{value:'"_blank"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"any"}},is:{defaultValue:null,description:"",name:"is",required:!1,type:{name:"enum",value:[{value:'"link"'},{value:'"anchor"'},{value:'"section"'}]}},role:{defaultValue:null,description:"",name:"role",required:!1,type:{name:"AriaRole"}},ariaHasPopup:{defaultValue:null,description:"",name:"ariaHasPopup",required:!1,type:{name:'boolean | "dialog" | "grid" | "listbox" | "menu" | "tree" | "false" | "true"'}},testId:{defaultValue:null,description:"",name:"testId",required:!1,type:{name:"enum",value:[{value:'"layout/header"'},{value:'"digest/article/card"'},{value:'"digest/article/feed"'},{value:'"digest/article/list"'},{value:'"digest/article/feed/footer/pin"'},{value:'"digest/article/notice"'},{value:'"digest/article/sidebar"'},{value:'"digest/article/title"'},{value:'"digest/user/mini"'},{value:'"digest/user/mini/display-name"'},{value:'"digest/user/mini/user-name"'},{value:'"digest/user/plain"'},{value:'"digest/user/rich"'},{value:'"digest/user/rich/display-name"'},{value:'"digest/user/verbose"'},{value:'"digest/tag/feed"'},{value:'"digest/tag/rich"'},{value:'"digest/tag/sidebar"'},{value:'"digest/collection/feed"'},{value:'"dialog/auth"'},{value:'"search/results/item"'},{value:'"drafts/response/allow"'},{value:'"drafts/response/disallow"'},{value:'"article/summary"'},{value:'"article/content"'},{value:'"article/collection"'},{value:'"article/tags"'},{value:'"article/license"'},{value:'"article/support/support-button"'},{value:'"article/support/request"'},{value:'"article/support/reply"'},{value:'"article/appreciation/total"'},{value:'"article/toolbar"'},{value:'"article/bookmark"'},{value:'"article/comment/feed"'},{value:'"payto/currency-choice"'},{value:'"comment/content"'},{value:'"notice/user/display-name"'},{value:'"notice/article/title"'},{value:'"notice/comment/content"'},{value:'"notice/payment-receive-donation/amount"'},{value:'"notice/user-new-follower"'},{value:'"notice/article-new-collected"'},{value:'"notice/article-published"'},{value:'"notice/article-mentioned-you"'},{value:'"notice/article-new-subscriber"'},{value:'"notice/article-new-appreciation"'},{value:'"notice/revised-article-published"'},{value:'"notice/revised-article-not-published"'},{value:'"notice/circle-new-article"'},{value:'"notice/article-tag-added"'},{value:'"notice/article-tag-removed"'},{value:'"notice/article-tag-unselected"'},{value:'"notice/comment-new-reply"'},{value:'"notice/comment-mentioned-you"'},{value:'"notice/comment-pinned"'},{value:'"notice/article-new-comment"'},{value:'"notice/subscribed-article-new-comment"'},{value:'"notice/circle-new-broadcast"'},{value:'"notice/tag-adoption"'},{value:'"notice/tag-leave"'},{value:'"notice/tag-add-editor"'},{value:'"notice/tag-leave-editor"'},{value:'"notice/payment-payout"'},{value:'"notice/payment-receive-donation"'},{value:'"notice/cirlce-new-follower"'},{value:'"notice/cirlce-new-subscriber"'},{value:'"notice/cirlce-new-unsubscriber"'},{value:'"notice/circle-invitation"'},{value:'"notice/circle-new-broadcast-comments"'},{value:'"notice/circle-new-discussion-comments"'},{value:'"notice/crypto-wallet-airdrop"'},{value:'"notice/crypto-wallet-connected"'},{value:'"notice/official-announcement"'},{value:'"me/wallet/transactions/item"'},{value:'"me/wallet/transactions/item/amount"'},{value:'"user-profile"'},{value:'"user-profile/display-name"'},{value:'"user-profile/user-name"'},{value:'"user-profile/followers/count"'},{value:'"user-profile/bio"'},{value:'"editor/search-select-form/dialog/add-button"'},{value:'"spinner"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ArticleDigest/Sidebar/index.tsx#ArticleDigestSidebar"]={docgenInfo:ArticleDigestSidebar.__docgenInfo,name:"ArticleDigestSidebar",path:"src/components/ArticleDigest/Sidebar/index.tsx#ArticleDigestSidebar"})}catch(__react_docgen_typescript_loader_error){}var _Sidebar$parameters,_Sidebar$parameters2,_Sidebar$parameters2$,mocks=__webpack_require__("./src/stories/mocks/index.ts"),Sidebar_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Sidebar_stories={title:"Components/ArticleDigest",component:ArticleDigestSidebar};var Template=function Template(args){return Sidebar_stories_jsx(react_testing_esm.ge,null,Sidebar_stories_jsx(ArticleDigestSidebar,args))};Template.displayName="Template";var Sidebar=Template.bind({});Sidebar.args={article:mocks.ZV,titleTextSize:"sm",hasCover:!0,bgActiveColor:"greyLighter"},Sidebar.parameters=_objectSpread(_objectSpread({},Sidebar.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Sidebar$parameters=Sidebar.parameters)||void 0===_Sidebar$parameters?void 0:_Sidebar$parameters.docs),{},{source:_objectSpread({originalSource:"args => <MockedProvider>\n    <ArticleDigestSidebar {...args} />\n  </MockedProvider>"},null===(_Sidebar$parameters2=Sidebar.parameters)||void 0===_Sidebar$parameters2||null===(_Sidebar$parameters2$=_Sidebar$parameters2.docs)||void 0===_Sidebar$parameters2$?void 0:_Sidebar$parameters2$.source)})})},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/ArticleDigest/Sidebar/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"\n  .H28tgL7pJkQbT5EtL_77.KAkJvdW_XoXUPI4CkalT .rpOgx60H4eB2TW4l8xxL {\n    display: none;\n  }\n\n/* show cover only on md-up */\n\n@media (min-width: 930px) {\n\n.H28tgL7pJkQbT5EtL_77.KAkJvdW_XoXUPI4CkalT {\n    position: relative;\n    min-height: 4.5rem;\n    padding-right: calc(4.5rem + var(--spacing-x-tight));\n}\n\n    .H28tgL7pJkQbT5EtL_77.KAkJvdW_XoXUPI4CkalT .rpOgx60H4eB2TW4l8xxL {\n      position: absolute;\n      top: 0;\n      right: 0;\n      display: inline;\n      display: initial;\n      width: 4.5rem;\n      height: 4.5rem;\n    }\n\n      .H28tgL7pJkQbT5EtL_77.KAkJvdW_XoXUPI4CkalT .rpOgx60H4eB2TW4l8xxL img {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        -o-object-fit: cover;\n           object-fit: cover;\n\n        border-radius: var(--spacing-xx-tight);\n      }\n\n    .H28tgL7pJkQbT5EtL_77.KAkJvdW_XoXUPI4CkalT.RYThio94g8q2wwlXNx77 {\n      min-height: auto;\n      padding-right: calc(10.5rem + var(--spacing-base));\n    }\n\n      .H28tgL7pJkQbT5EtL_77.KAkJvdW_XoXUPI4CkalT.RYThio94g8q2wwlXNx77 .rpOgx60H4eB2TW4l8xxL {\n        width: 10.5rem;\n        height: calc(100% + var(--spacing-tight)*2);\n        margin: calc(var(--spacing-tight)*-1);\n        border-radius: 0;\n      }\n  }\n\n.YAZA9_TG8fQkntYqqZLg {\n  margin-top: var(--spacing-tight);\n  line-height: 1;\n\n  /* Make <UserDigest.Mini> as an inline element, otherwise users will easily touch it inadvertently */\n}\n\n.YAZA9_TG8fQkntYqqZLg > * {\n    display: inline-flex;\n  }\n","",{version:3,sources:["webpack://./src/components/ArticleDigest/Sidebar/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:";EACE;IACE,aAAa;EACf;;AAEA,6BAA6B;;AAC7B;;AANF;IAOI,kBAAkB;IAClB,kBAAkB;IAClB,oDAAoD;AA6BxD;;IA3BI;MACE,kBAAkB;MAClB,MAAM;MACN,QAAQ;MACR,eAAgB;MAAhB,gBAAgB;MAChB,aAAa;MACb,cAAc;IAOhB;;MALE;QC+PJ,kBAAkB;QAClB,MAAQ;QAAR,QAAQ;QAAR,SAAQ;QAAR,OAAQ;QACR,WAAW;QACX,YAAY;QACZ,oBAAiB;WAAjB,iBAAiB;;QDhQX,sCAAsC;MACxC;;IAGF;MACE,gBAAgB;MAChB,kDAAkD;IAQpD;;MANE;QACE,cAAc;QACd,2CAA6C;QAC7C,qCAAuC;QACvC,gBAAgB;MAClB;EAEJ;;AAGF;EACE,gCAAgC;EAChC,cAAc;;EAEd,oGAAoG;AAItG;;AAHE;IACE,oBAAoB;EACtB",sourcesContent:[".container.hasCover {\n  & .cover {\n    display: none;\n  }\n\n  /* show cover only on md-up */\n  @media (--md-up) {\n    position: relative;\n    min-height: 4.5rem;\n    padding-right: calc(4.5rem + var(--spacing-x-tight));\n\n    & .cover {\n      position: absolute;\n      top: 0;\n      right: 0;\n      display: initial;\n      width: 4.5rem;\n      height: 4.5rem;\n\n      & img {\n        @mixin object-fit-cover;\n\n        border-radius: var(--spacing-xx-tight);\n      }\n    }\n\n    &.hasBackground {\n      min-height: auto;\n      padding-right: calc(10.5rem + var(--spacing-base));\n\n      & .cover {\n        width: 10.5rem;\n        height: calc(100% + var(--spacing-tight) * 2);\n        margin: calc(var(--spacing-tight) * -1);\n        border-radius: 0;\n      }\n    }\n  }\n}\n\n.footer {\n  margin-top: var(--spacing-tight);\n  line-height: 1;\n\n  /* Make <UserDigest.Mini> as an inline element, otherwise users will easily touch it inadvertently */\n  & > * {\n    display: inline-flex;\n  }\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  padding: var(--spacing-base);\n  font-size: var(--font-size-md);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-round {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-base);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n  caret-color: var(--color-matters-green);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n@define-mixin form-container {\n  margin-right: var(--spacing-base);\n  margin-left: var(--spacing-base);\n\n  @media (--sm-up) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.field) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.inputContainer) {\n    margin: 0;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={container:"H28tgL7pJkQbT5EtL_77",hasCover:"KAkJvdW_XoXUPI4CkalT",cover:"rpOgx60H4eB2TW4l8xxL",hasBackground:"RYThio94g8q2wwlXNx77",footer:"YAZA9_TG8fQkntYqqZLg"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/lodash/isNil.js":module=>{module.exports=function isNil(value){return null==value}}}]);