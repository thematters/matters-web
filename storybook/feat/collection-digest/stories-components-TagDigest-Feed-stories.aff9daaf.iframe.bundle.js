(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[8279],{"./src/stories/components/TagDigest/Feed.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Default$parameters,_Default$parameters2,_Default$parameters2$,_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__),_apollo_react_testing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/TagDigest/index.tsx"),_mocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/stories/mocks/index.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_1__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const __WEBPACK_DEFAULT_EXPORT__={title:"Components/TagDigest/Feed",component:_components__WEBPACK_IMPORTED_MODULE_2__.S.Feed};var Template=function Template(args){return __jsx(_apollo_react_testing__WEBPACK_IMPORTED_MODULE_3__.ge,null,__jsx(_components__WEBPACK_IMPORTED_MODULE_2__.S.Feed,args))};Template.displayName="Template";var Default=Template.bind({});Default.args={tag:_mocks__WEBPACK_IMPORTED_MODULE_4__.qP},Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"args => <MockedProvider>\n    <TagDigest.Feed {...args} />\n  </MockedProvider>"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})})},"./src/components/Interaction/LinkWrapper/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{g:()=>LinkWrapper});var helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),utils_text=__webpack_require__("./src/common/utils/text/index.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Interaction/LinkWrapper/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const LinkWrapper_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,LinkWrapper=function LinkWrapper(_ref){var _classNames,href=_ref.href,textActiveColor=_ref.textActiveColor,disabled=_ref.disabled,_onClick=_ref.onClick,testId=_ref.testId,children=_ref.children;if(disabled)return __jsx(react.Fragment,null,children);var linkClasses=classnames_default()((_classNames={},defineProperty_default()(_classNames,LinkWrapper_styles_module.link,!0),defineProperty_default()(_classNames,textActiveColor?LinkWrapper_styles_module["textActive".concat((0,utils_text.fm)(textActiveColor))]:"",!!textActiveColor),_classNames));return __jsx(link_default(),{href,legacyBehavior:!0},__jsx("a",extends_default()({className:linkClasses,onClick:function onClick(e){_onClick&&(_onClick(),e.stopPropagation())}},testId?defineProperty_default()({},"data-test-id",testId):{}),children))};LinkWrapper.displayName="LinkWrapper",LinkWrapper.__docgenInfo={description:"",methods:[],displayName:"LinkWrapper"};try{LinkWrapper.displayName="LinkWrapper",LinkWrapper.__docgenInfo={description:"",displayName:"LinkWrapper",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"string"}},textActiveColor:{defaultValue:null,description:"",name:"textActiveColor",required:!1,type:{name:"enum",value:[{value:'"green"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},testId:{defaultValue:null,description:"",name:"testId",required:!1,type:{name:"enum",value:[{value:'"layout/header"'},{value:'"digest/article/card"'},{value:'"digest/article/feed"'},{value:'"digest/article/feed/footer/pin"'},{value:'"digest/article/notice"'},{value:'"digest/article/sidebar"'},{value:'"digest/article/title"'},{value:'"digest/user/mini"'},{value:'"digest/user/mini/display-name"'},{value:'"digest/user/mini/user-name"'},{value:'"digest/user/plain"'},{value:'"digest/user/rich"'},{value:'"digest/user/rich/display-name"'},{value:'"digest/user/verbose"'},{value:'"digest/tag/feed"'},{value:'"digest/tag/rich"'},{value:'"digest/tag/sidebar"'},{value:'"digest/collection/feed"'},{value:'"dialog/auth"'},{value:'"search/results/item"'},{value:'"drafts/response/allow"'},{value:'"drafts/response/disallow"'},{value:'"article/summary"'},{value:'"article/content"'},{value:'"article/collection"'},{value:'"article/tags"'},{value:'"article/license"'},{value:'"article/support/support-button"'},{value:'"article/support/request"'},{value:'"article/support/reply"'},{value:'"article/appreciation/total"'},{value:'"article/toolbar"'},{value:'"article/bookmark"'},{value:'"article/comment/feed"'},{value:'"payto/currency-choice"'},{value:'"comment/content"'},{value:'"notice/user/display-name"'},{value:'"notice/article/title"'},{value:'"notice/comment/content"'},{value:'"notice/payment-receive-donation/amount"'},{value:'"notice/user-new-follower"'},{value:'"notice/article-new-collected"'},{value:'"notice/article-published"'},{value:'"notice/article-mentioned-you"'},{value:'"notice/article-new-subscriber"'},{value:'"notice/article-new-appreciation"'},{value:'"notice/revised-article-published"'},{value:'"notice/revised-article-not-published"'},{value:'"notice/circle-new-article"'},{value:'"notice/article-tag-added"'},{value:'"notice/article-tag-removed"'},{value:'"notice/article-tag-unselected"'},{value:'"notice/comment-new-reply"'},{value:'"notice/comment-mentioned-you"'},{value:'"notice/comment-pinned"'},{value:'"notice/article-new-comment"'},{value:'"notice/subscribed-article-new-comment"'},{value:'"notice/circle-new-broadcast"'},{value:'"notice/tag-adoption"'},{value:'"notice/tag-leave"'},{value:'"notice/tag-add-editor"'},{value:'"notice/tag-leave-editor"'},{value:'"notice/payment-payout"'},{value:'"notice/payment-receive-donation"'},{value:'"notice/cirlce-new-follower"'},{value:'"notice/cirlce-new-subscriber"'},{value:'"notice/cirlce-new-unsubscriber"'},{value:'"notice/circle-invitation"'},{value:'"notice/circle-new-broadcast-comments"'},{value:'"notice/circle-new-discussion-comments"'},{value:'"notice/crypto-wallet-airdrop"'},{value:'"notice/crypto-wallet-connected"'},{value:'"notice/official-announcement"'},{value:'"me/wallet/transactions/item"'},{value:'"me/wallet/transactions/item/amount"'},{value:'"user-profile"'},{value:'"user-profile/display-name"'},{value:'"user-profile/user-name"'},{value:'"user-profile/followers/count"'},{value:'"user-profile/bio"'},{value:'"editor/search-select-form/dialog/add-button"'},{value:'"spinner"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Interaction/LinkWrapper/index.tsx#LinkWrapper"]={docgenInfo:LinkWrapper.__docgenInfo,name:"LinkWrapper",path:"src/components/Interaction/LinkWrapper/index.tsx#LinkWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/ResponsiveImage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{t:()=>ResponsiveImage});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_common_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/common/utils/url.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,BaseResponsiveImage=function BaseResponsiveImage(_ref){var url=_ref.url,size=_ref.size,smUpSize=_ref.smUpSize,disabled=_ref.disabled,loading=_ref.loading,anonymous=_ref.anonymous,_useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),error=_useState[0],setError=_useState[1];return disabled||error?__jsx("img",{src:url,loading,alt:""}):__jsx("picture",{onError:function onError(){return setError(!0)}},smUpSize&&__jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,__jsx("source",{media:"(min-width: 768px)",srcSet:(0,_common_utils__WEBPACK_IMPORTED_MODULE_1__._W)({url,size:smUpSize})})),__jsx("source",{srcSet:(0,_common_utils__WEBPACK_IMPORTED_MODULE_1__._W)({url,size})}),__jsx("img",{src:url,srcSet:(0,_common_utils__WEBPACK_IMPORTED_MODULE_1__._W)({url,size}),loading,alt:"",crossOrigin:anonymous?"anonymous":void 0}))};BaseResponsiveImage.displayName="BaseResponsiveImage";var ResponsiveImage=react__WEBPACK_IMPORTED_MODULE_0__.memo(BaseResponsiveImage,(function(prevProps,props){return prevProps.url===props.url&&prevProps.size===props.size&&prevProps.smUpSize===props.smUpSize&&prevProps.disabled===props.disabled}));BaseResponsiveImage.__docgenInfo={description:"",methods:[],displayName:"BaseResponsiveImage",props:{url:{required:!0,tsType:{name:"string"},description:""},size:{required:!0,tsType:{name:"ToSizedImageURLSize"},description:""},smUpSize:{required:!1,tsType:{name:"ToSizedImageURLSize"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},loading:{required:!1,tsType:{name:"union",raw:"'eager' | 'lazy'",elements:[{name:"literal",value:"'eager'"},{name:"literal",value:"'lazy'"}]},description:""},anonymous:{required:!1,tsType:{name:"boolean"},description:""}}};try{ResponsiveImage.displayName="ResponsiveImage",ResponsiveImage.__docgenInfo={description:"",displayName:"ResponsiveImage",props:{url:{defaultValue:null,description:"",name:"url",required:!0,type:{name:"string"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"144w"'},{value:'"360w"'},{value:'"540w"'},{value:'"1080w"'},{value:'"1280w"'}]}},smUpSize:{defaultValue:null,description:"",name:"smUpSize",required:!1,type:{name:"enum",value:[{value:'"144w"'},{value:'"360w"'},{value:'"540w"'},{value:'"1080w"'},{value:'"1280w"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},loading:{defaultValue:null,description:"",name:"loading",required:!1,type:{name:"enum",value:[{value:'"eager"'},{value:'"lazy"'}]}},anonymous:{defaultValue:null,description:"",name:"anonymous",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ResponsiveImage/index.tsx#ResponsiveImage"]={docgenInfo:ResponsiveImage.__docgenInfo,name:"ResponsiveImage",path:"src/components/ResponsiveImage/index.tsx#ResponsiveImage"})}catch(__react_docgen_typescript_loader_error){}},"./src/stories/mocks/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Ay:()=>MOCK_TRANSACTION,G7:()=>MOCK_PARENT_COMMENT,Y4:()=>MOCK_CIRCLE_COMMENT,ZV:()=>MOCK_ARTILCE,bm:()=>MOCK_COMMENT,hU:()=>MOCK_COLLECTION,nI:()=>MOCK_USER,qP:()=>MOCK_TAG,rw:()=>MOCK_CIRCLE_ARTICLE,xe:()=>MOCK_CIRCLE});var _home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var MOCK_USER={__typename:"User",id:"user-0000",userName:"matty",displayName:"Matty",status:{__typename:"UserStatus",state:"active"},avatar:"https://source.unsplash.com/256x256?user",info:{__typename:"UserInfo",badges:null,description:"Matters 唯一官方帳號",cryptoWallet:{__typename:"CryptoWallet",id:"crypto-wallet-0000",address:"0x0x0x0x0x0x0x0x0x0x0x",hasNFTs:!0,nfts:[{__typename:"NFTAsset",id:"1"}]}},liker:{__typename:"Liker",civicLiker:!1},ownCircles:null,isFollower:!1,isFollowee:!1},MOCK_CIRCLE={__typename:"Circle",id:"circle-0000",state:"active",name:"matters_class",displayName:"Matters 自由課（第一季第二期）",avatar:"https://source.unsplash.com/256x256?circle",cover:"https://source.unsplash.com/512x512?circle",createdAt:"2020-12-24T07:29:17.682Z",description:"《我們這個時代的自由課》是 Matters 自 2020 年起策劃的主題線上講座。從 8 月 9 日「自由課」第一場開始，至今已經完成 9 場。分別從最實用的角度，以「自由工具包」為題談自由的條件；從思想與歷史切入，以「自由讀書會」為題思考關於自由的經典。",owner:MOCK_USER,prices:[{__typename:"Price",id:"price-0000",state:"active",amount:5,currency:"HKD"}],members:{__typename:"MemberConnection",totalCount:48},followers:{__typename:"UserConnection",totalCount:36},works:{__typename:"ArticleConnection",totalCount:8},isMember:!0,invitedBy:{__typename:"Invitation",id:"circle-invitation-000",state:"pending",freePeriod:30}},MOCK_ARTILCE={__typename:"Article",id:"article-0000",title:"中國四川：挑戰世界最危險的公路之一 川藏公路絕美風光",slug:"slug",mediaHash:"Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a",dataHash:"Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a",articleState:"active",state:"active",cover:"https://source.unsplash.com/256x256?article",summary:"其實已經開始兩週了\bXD,不過最近才想說應該來記錄一下我在火箭隊的日常,順便練一下文筆,也可以讓大家了解一下火箭隊軟體培訓營裡面大概是在做些什麼事情,上課的模式及氣氛是怎樣等等...畢竟我當時得知有這個免費培訓營時,也是網路上各種爬文類似這種免費培訓工程師半年的心得及成",author:MOCK_USER,createdAt:"2020-12-24T07:29:17.682Z",revisedAt:null,likesReceived:{__typename:"AppreciationConnection",totalCount:0},iscnId:"",pinned:!1,readTime:1234.5,tags:[],likesReceivedTotal:1,responseCount:10,transactionsReceivedBy:{__typename:"AppreciationConnection",totalCount:190},donationsDialog:{__typename:"AppreciationConnection",totalCount:190},subscribed:!1,access:{__typename:"ArticleAccess",type:"paywall",circle:MOCK_CIRCLE},drafts:[{__typename:"Draft",iscnPublish:!1}]},MOCK_CIRCLE_ARTICLE=_objectSpread(_objectSpread({},MOCK_ARTILCE),{},{circle:MOCK_CIRCLE}),MOCK_PARENT_COMMENT={__typename:"Comment",id:"comment-0000",state:"active",node:MOCK_ARTILCE,parentComment:null,content:"中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些",author:MOCK_USER},MOCK_COMMENT={__typename:"Comment",id:"comment-0000",state:"active",node:MOCK_ARTILCE,parentComment:MOCK_PARENT_COMMENT,createdAt:"2020-12-24T07:29:17.682Z",content:"今晚要跟大家說的是關於嘎嘎比森林的故事，故事是源自於安哲的繪本《不安分的石頭》。幾年前看過這本書，這不只是給孩童，也是給大人閱讀的一本好書。內容是提到關於一座從來都固守原貌的森林，突然闖入了一顆小石頭，大家原本井然有序的生活被打亂了。在這個大家都害怕「不安分」的世界，又中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些",author:_objectSpread(_objectSpread({},MOCK_USER),{},{isBlocked:!1})},MOCK_CIRCLE_COMMENT=_objectSpread(_objectSpread({},MOCK_COMMENT),{},{node:MOCK_CIRCLE}),MOCK_TAG={__typename:"Tag",id:"tag-0000",editors:[MOCK_USER],owner:MOCK_USER,content:"香港",description:"香港（英語：Hong Kong；縮寫：HK／HKG），全稱香港特別行政區（英語：Hong Kong Special Administrative Region；縮寫：HKSAR），簡稱「港」，雅稱「香江」",articles:{__typename:"ArticleConnection",totalCount:8,edges:[{node:MOCK_ARTILCE}]},numArticles:100,numAuthors:21},MOCK_COLLECTION={__typename:"Collection",id:"collection-0000",title:"香港",author:MOCK_USER,updatedAt:"2020-12-24T07:29:17.682Z",pinned:!1,cover:"https://source.unsplash.com/256x256?collection",description:"Nostrud eu est proident sit fugiat aliqua pariatur tempor proident sint. Lorem deserunt labore incididunt quis voluptate sint sit aute proident adipisicing. Labore nostrud cupidatat deserunt. Culpa anim laboris deserunt proident.",articles:{__typename:"ArticleConnection",totalCount:1,edges:[{node:MOCK_ARTILCE}]}},MOCK_TRANSACTION={__typename:"Transaction",id:"tx-0000",amount:100,currency:"HKD",target:MOCK_ARTILCE}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Interaction/LinkWrapper/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".yCSphVB2gewwWgMa7iEd {\n  display: inline-flex;\n  align-items: center;\n}\n\n.C_DAQj544hPOu1wlzImw:hover,\n  .C_DAQj544hPOu1wlzImw:focus {\n    color: var(--color-matters-green);\n  }\n","",{version:3,sources:["webpack://./src/components/Interaction/LinkWrapper/styles.module.css"],names:[],mappings:"AAAA;EACE,oBAAoB;EACpB,mBAAmB;AACrB;;AAGE;;IAEE,iCAAiC;EACnC",sourcesContent:[".link {\n  display: inline-flex;\n  align-items: center;\n}\n\n.textActiveGreen {\n  &:hover,\n  &:focus {\n    color: var(--color-matters-green);\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={link:"yCSphVB2gewwWgMa7iEd",textActiveGreen:"C_DAQj544hPOu1wlzImw"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/lodash/isNil.js":module=>{module.exports=function isNil(value){return null==value}},"./node_modules/number-precision/build/index.es.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var console=__webpack_require__("./node_modules/console-browserify/index.js");function strip(num,precision){return void 0===precision&&(precision=15),+parseFloat(Number(num).toPrecision(precision))}function digitLength(num){var eSplit=num.toString().split(/[eE]/),len=(eSplit[0].split(".")[1]||"").length-+(eSplit[1]||0);return len>0?len:0}function float2Fixed(num){if(-1===num.toString().indexOf("e"))return Number(num.toString().replace(".",""));var dLen=digitLength(num);return dLen>0?strip(Number(num)*Math.pow(10,dLen)):Number(num)}function checkBoundary(num){_boundaryCheckingState&&(num>Number.MAX_SAFE_INTEGER||num<Number.MIN_SAFE_INTEGER)&&console.warn(num+" is beyond boundary when transfer to integer, the results may not be accurate")}function createOperation(operation){return function(){for(var nums=[],_i=0;_i<arguments.length;_i++)nums[_i]=arguments[_i];var first=nums[0];return nums.slice(1).reduce((function(prev,next){return operation(prev,next)}),first)}}var times=createOperation((function(num1,num2){var num1Changed=float2Fixed(num1),num2Changed=float2Fixed(num2),baseNum=digitLength(num1)+digitLength(num2),leftValue=num1Changed*num2Changed;return checkBoundary(leftValue),leftValue/Math.pow(10,baseNum)})),plus=createOperation((function(num1,num2){var baseNum=Math.pow(10,Math.max(digitLength(num1),digitLength(num2)));return(times(num1,baseNum)+times(num2,baseNum))/baseNum})),minus=createOperation((function(num1,num2){var baseNum=Math.pow(10,Math.max(digitLength(num1),digitLength(num2)));return(times(num1,baseNum)-times(num2,baseNum))/baseNum})),divide=createOperation((function(num1,num2){var num1Changed=float2Fixed(num1),num2Changed=float2Fixed(num2);return checkBoundary(num1Changed),checkBoundary(num2Changed),times(num1Changed/num2Changed,strip(Math.pow(10,digitLength(num2)-digitLength(num1))))}));var _boundaryCheckingState=!0;const __WEBPACK_DEFAULT_EXPORT__={strip,plus,minus,times,divide,round:function round(num,decimal){var base=Math.pow(10,decimal),result=divide(Math.round(Math.abs(times(num,base))),base);return num<0&&0!==result&&(result=times(result,-1)),result},digitLength,float2Fixed,enableBoundaryChecking:function enableBoundaryChecking(flag){void 0===flag&&(flag=!0),_boundaryCheckingState=flag}}}}]);