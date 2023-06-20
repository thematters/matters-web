"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[6087],{"./src/common/utils/connections.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>mergeConnections});var _home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/toConsumableArray.js"),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__),lodash_get__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lodash/get.js"),lodash_get__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__),lodash_set__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/lodash/set.js"),lodash_set__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_4__),lodash_uniqBy__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/lodash/uniqBy.js"),lodash_uniqBy__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(lodash_uniqBy__WEBPACK_IMPORTED_MODULE_5__),console=__webpack_require__("./node_modules/console-browserify/index.js"),_excluded=["edges","pageInfo"];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var mergeConnections=function mergeConnections(_ref){var oldData=_ref.oldData,newData=_ref.newData,path=_ref.path,_ref$dedupe=_ref.dedupe,dedupe=void 0!==_ref$dedupe&&_ref$dedupe;try{var _get2=lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(oldData,path),oldEdges=_get2.edges,oldPageInfo=_get2.pageInfo,rest=_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2___default()(_get2,_excluded),_get3=lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(newData,path),newEdges=_get3.edges,newPageInfo=_get3.pageInfo,result=oldData;if(newPageInfo.endCursor!==oldPageInfo.endCursor){var copy=JSON.parse(JSON.stringify(result)),edges=dedupe?lodash_uniqBy__WEBPACK_IMPORTED_MODULE_5___default()([].concat(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1___default()(oldEdges),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1___default()(newEdges)),(function(edge){return edge.node.id})):[].concat(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1___default()(oldEdges),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1___default()(newEdges));return lodash_set__WEBPACK_IMPORTED_MODULE_4___default()(copy,path,_objectSpread(_objectSpread({},rest),{},{pageInfo:newPageInfo,edges}))}return result}catch(err){return console.error("Cannot get edges from path, skipping",err),oldData}}},"./src/components/Dialogs/SupportersDialog/Content.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>SupportersDialog_Content});var _templateObject,react=__webpack_require__("./node_modules/react/index.js"),react_hooks_esm=__webpack_require__("./node_modules/@apollo/react-hooks/lib/react-hooks.esm.js"),analytics=__webpack_require__("./src/common/utils/analytics.ts"),connections=__webpack_require__("./src/common/utils/connections.ts"),Spinner=__webpack_require__("./src/components/Spinner/index.tsx"),GQL_error=__webpack_require__("./src/components/GQL/error.tsx"),Dialog=__webpack_require__("./src/components/Dialog/index.tsx"),Translate=__webpack_require__("./src/components/Context/Language/Translate.tsx"),InfiniteScroll=__webpack_require__("./src/components/Interaction/InfiniteScroll.tsx"),UserDigest=__webpack_require__("./src/components/UserDigest/index.tsx"),taggedTemplateLiteral=__webpack_require__("./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),ARTICLE_DONATORS=(0,__webpack_require__("./node_modules/graphql-tag/lib/index.js").ZP)(_templateObject||(_templateObject=taggedTemplateLiteral_default()(["\n  query ArticleDonators($id: ID!, $after: String) {\n    article: node(input: { id: $id }) {\n      ... on Article {\n        id\n        donations: transactionsReceivedBy(\n          input: { first: 10, purpose: donation, after: $after }\n        ) {\n          totalCount\n          pageInfo {\n            startCursor\n            endCursor\n            hasNextPage\n          }\n          edges {\n            cursor\n            node {\n              ... on User {\n                id\n                ...UserDigestRichUserPublic\n                ...UserDigestRichUserPrivate\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  ","\n  ","\n"])),UserDigest.R.Rich.fragments.user.public,UserDigest.R.Rich.fragments.user.private),__jsx=react.createElement,SupportersDialogContent=function SupportersDialogContent(_ref){var _data$article,_data$article2,_data$article3,_data$article4,article=_ref.article,closeDialog=_ref.closeDialog,_useQuery=(0,react_hooks_esm.aM)(ARTICLE_DONATORS,{variables:{id:article.id}}),data=_useQuery.data,loading=_useQuery.loading,error=_useQuery.error,fetchMore=_useQuery.fetchMore,_ref2="Article"===(null==data||null===(_data$article=data.article)||void 0===_data$article?void 0:_data$article.__typename)&&(null==data||null===(_data$article2=data.article)||void 0===_data$article2?void 0:_data$article2.donations)||{},edges=_ref2.edges,pageInfo=_ref2.pageInfo,totalCount="Article"===(null==data||null===(_data$article3=data.article)||void 0===_data$article3?void 0:_data$article3.__typename)&&(null==data||null===(_data$article4=data.article)||void 0===_data$article4?void 0:_data$article4.donations.totalCount)||0;if(loading)return __jsx(Spinner.$,null);if(error)return __jsx(GQL_error.o,{error});if(!edges||edges.length<=0||!pageInfo)return null;return __jsx(react.Fragment,null,__jsx(Dialog.V.Header,{title:__jsx(react.Fragment,null,totalCount," ",__jsx(Translate.v,{id:"hasSupportedArticle"})),closeDialog,closeTextId:"close"}),__jsx(Dialog.V.Content,null,__jsx(InfiniteScroll.v,{loader:__jsx(Spinner.$,null),loadMore:function loadMore(){return analytics.c.trackEvent("load_more",{type:"donators",location:edges.length}),fetchMore({variables:{after:pageInfo.endCursor},updateQuery:function updateQuery(previousResult,_ref3){var fetchMoreResult=_ref3.fetchMoreResult;return(0,connections.k)({oldData:previousResult,newData:fetchMoreResult,path:"article.donations"})}})},hasNextPage:pageInfo.hasNextPage},edges.map((function(_ref4,i){var node=_ref4.node,cursor=_ref4.cursor;return __jsx(UserDigest.R.Rich,{user:node,key:cursor,onClick:function onClick(){analytics.c.trackEvent("click_feed",{type:"donators",contentType:"user",location:i,id:node.id})}})})))))};SupportersDialogContent.__docgenInfo={description:"",methods:[],displayName:"SupportersDialogContent",props:{article:{required:!0,tsType:{name:"SupportsDialogArticleFragment"},description:""},closeDialog:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const SupportersDialog_Content=SupportersDialogContent;try{Content.displayName="Content",Content.__docgenInfo={description:"",displayName:"Content",props:{article:{defaultValue:null,description:"",name:"article",required:!0,type:{name:"SupportsDialogArticleFragment"}},closeDialog:{defaultValue:null,description:"",name:"closeDialog",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Dialogs/SupportersDialog/Content.tsx#Content"]={docgenInfo:Content.__docgenInfo,name:"Content",path:"src/components/Dialogs/SupportersDialog/Content.tsx#Content"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Interaction/InfiniteScroll.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>InfiniteScroll});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_waypoint__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-waypoint/es/index.js"),_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Spinner/index.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,InfiniteScroll=function InfiniteScroll(_ref){var hasNextPage=_ref.hasNextPage,_ref$loader=_ref.loader,loader=void 0===_ref$loader?__jsx(_components__WEBPACK_IMPORTED_MODULE_2__.$,null):_ref$loader,loadMore=_ref.loadMore,children=_ref.children;return __jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children,hasNextPage&&__jsx(react_waypoint__WEBPACK_IMPORTED_MODULE_1__.h,{onEnter:loadMore}),hasNextPage&&loader)};InfiniteScroll.__docgenInfo={description:"",methods:[],displayName:"InfiniteScroll",props:{loader:{defaultValue:{value:"<Spinner />",computed:!1},required:!1}}};try{InfiniteScroll.displayName="InfiniteScroll",InfiniteScroll.__docgenInfo={description:"",displayName:"InfiniteScroll",props:{hasNextPage:{defaultValue:null,description:"Does the resource have more entities",name:"hasNextPage",required:!0,type:{name:"boolean"}},loadMore:{defaultValue:null,description:"Callback to load more entities",name:"loadMore",required:!0,type:{name:"() => Promise<any>"}},loader:{defaultValue:{value:"<Spinner />"},description:"A React component to act as loader",name:"loader",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Interaction/InfiniteScroll.tsx#InfiniteScroll"]={docgenInfo:InfiniteScroll.__docgenInfo,name:"InfiniteScroll",path:"src/components/Interaction/InfiniteScroll.tsx#InfiniteScroll"})}catch(__react_docgen_typescript_loader_error){}}}]);