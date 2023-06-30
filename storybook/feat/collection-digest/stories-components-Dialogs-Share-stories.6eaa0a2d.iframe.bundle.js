/*! For license information please see stories-components-Dialogs-Share-stories.6eaa0a2d.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[9831],{"./src/stories/components/Dialogs/Share.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>Share_stories});var _Default$parameters,_Default$parameters2,_Default$parameters2$,defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),react_testing_esm=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),ShareDialog=__webpack_require__("./src/components/Dialogs/ShareDialog/index.tsx"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),objectWithoutProperties_default=__webpack_require__.n(objectWithoutProperties),translate=__webpack_require__("./src/common/utils/translate.ts"),LanguageContext=__webpack_require__("./src/components/Context/Language/LanguageContext.tsx"),Button=__webpack_require__("./src/components/Button/index.tsx"),IconShare16=__webpack_require__("./src/components/Icon/IconShare16.tsx"),_excluded=["children","bgColor","hasIcon","iconSize","iconColor","inCard","size","spacing"],__jsx=react.createElement,ShareButton=function ShareButton(_ref){var children=_ref.children,bgColor=_ref.bgColor,_ref$hasIcon=_ref.hasIcon,hasIcon=void 0===_ref$hasIcon||_ref$hasIcon,iconSize=_ref.iconSize,_ref$iconColor=_ref.iconColor,iconColor=void 0===_ref$iconColor?"black":_ref$iconColor,inCard=_ref.inCard,size=_ref.size,spacing=_ref.spacing,props=objectWithoutProperties_default()(_ref,_excluded),lang=(0,react.useContext)(LanguageContext.AZ).lang,buttonBgActiveColor="green"===bgColor||"halfBlack"===bgColor?void 0:inCard?"greyLighterActive":"greyLighter",buttonSpacing=spacing||["xtight","xtight"];return __jsx(ShareDialog.R,props,(function(_ref2){var openDialog=_ref2.openDialog;return __jsx(Button.z,{bgColor,size,spacing:buttonSpacing,bgActiveColor:buttonBgActiveColor,"aria-label":(0,translate.I)({id:"share",lang}),"aria-haspopup":"dialog",onClick:openDialog},hasIcon&&__jsx(IconShare16.IconShare16,{size:iconSize,color:iconColor}),children)}))};ShareButton.displayName="ShareButton",ShareButton.__docgenInfo={description:"",methods:[],displayName:"ShareButton",props:{hasIcon:{defaultValue:{value:"true",computed:!1},required:!1},iconColor:{defaultValue:{value:"'black'",computed:!1},required:!1}}};try{ShareButton.displayName="ShareButton",ShareButton.__docgenInfo={description:"",displayName:"ShareButton",props:{hasIcon:{defaultValue:{value:"true"},description:"",name:"hasIcon",required:!1,type:{name:"boolean"}},iconSize:{defaultValue:null,description:"",name:"iconSize",required:!1,type:{name:"enum",value:[{value:'"mdS"'}]}},iconColor:{defaultValue:{value:"black"},description:"",name:"iconColor",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"white"'},{value:'"green"'},{value:'"grey"'}]}},inCard:{defaultValue:null,description:"",name:"inCard",required:!0,type:{name:"boolean"}},tags:{defaultValue:null,description:"",name:"tags",required:!1,type:{name:"string[]"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},description:{defaultValue:null,description:"",name:"description",required:!1,type:{name:"ReactNode"}},btns:{defaultValue:null,description:"",name:"btns",required:!1,type:{name:"ReactNode"}},smUpBtns:{defaultValue:null,description:"",name:"smUpBtns",required:!1,type:{name:"ReactNode"}},headerTitle:{defaultValue:null,description:"",name:"headerTitle",required:!1,type:{name:"ReactNode"}},path:{defaultValue:null,description:"",name:"path",required:!1,type:{name:"string"}},disableNativeShare:{defaultValue:null,description:"",name:"disableNativeShare",required:!1,type:{name:"boolean"}},spacing:{defaultValue:null,description:"",name:"spacing",required:!1,type:{name:"[ButtonSpacingY, ButtonSpacingX]"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"[ButtonWidth, ButtonHeight]"}},bgColor:{defaultValue:null,description:"",name:"bgColor",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"white"'},{value:'"green"'},{value:'"greyLighter"'},{value:'"red"'},{value:'"gold"'},{value:'"grey"'},{value:'"yellowLighter"'},{value:'"halfBlack"'},{value:'"greyDarkest"'},{value:'"greenLighter"'},{value:'"goldLinearGradient"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Buttons/Share/index.tsx#ShareButton"]={docgenInfo:ShareButton.__docgenInfo,name:"ShareButton",path:"src/components/Buttons/Share/index.tsx#ShareButton"})}catch(__react_docgen_typescript_loader_error){}var Share_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Share_stories={title:"Components/Dialogs/Share",component:ShareDialog.R};var Template=function Template(args){return Share_stories_jsx(react_testing_esm.ge,null,Share_stories_jsx(ShareButton,extends_default()({iconSize:"md-s",inCard:!1},args)))};Template.displayName="Template";var Default=Template.bind({});Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:'args => <MockedProvider>\n    {/* @ts-ignore */}\n    <ShareButton iconSize="md-s" inCard={false} {...args} />\n  </MockedProvider>'},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})})},"./src/common/enums/keyValue.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>KEYVALUE});var KEYVALUE={enter:"enter",escape:"escape",tab:"tab",backSpace:"backspace",arrowUp:"arrowup",arrowDown:"arrowdown"}},"./src/common/enums/test.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Y:()=>TEST_ID});var TEST_ID=function(TEST_ID){return TEST_ID.LAYOUT_HEADER="layout/header",TEST_ID.DIGEST_ARTICLE_CARD="digest/article/card",TEST_ID.DIGEST_ARTICLE_FEED="digest/article/feed",TEST_ID.DIGEST_ARTICLE_FEED_FOOTER_PIN="digest/article/feed/footer/pin",TEST_ID.DIGEST_ARTICLE_NOTICE="digest/article/notice",TEST_ID.DIGEST_ARTICLE_SIDEBAR="digest/article/sidebar",TEST_ID.DIGEST_ARTICLE_TITLE="digest/article/title",TEST_ID.DIGEST_USER_MINI="digest/user/mini",TEST_ID.DIGEST_USER_MINI_DISPLAY_NAME="digest/user/mini/display-name",TEST_ID.DIGEST_USER_MINI_USER_NAME="digest/user/mini/user-name",TEST_ID.DIGEST_USER_PLAIN="digest/user/plain",TEST_ID.DIGEST_USER_RICH="digest/user/rich",TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME="digest/user/rich/display-name",TEST_ID.DIGEST_USER_VERBOSE="digest/user/verbose",TEST_ID.DIGEST_TAG_FEED="digest/tag/feed",TEST_ID.DIGEST_TAG_RICH="digest/tag/rich",TEST_ID.DIGEST_TAG_SIDEBAR="digest/tag/sidebar",TEST_ID.DIGEST_COLLECTION_FEED="digest/collection/feed",TEST_ID.DIALOG_AUTH="dialog/auth",TEST_ID.SEARCH_RESULTS_ITEM="search/results/item",TEST_ID.DRAFTS_RESPONSE_ALLOW="drafts/response/allow",TEST_ID.DRAFTS_RESPONSE_DISALLOW="drafts/response/disallow",TEST_ID.ARTICLE_SUMMARY="article/summary",TEST_ID.ARTICLE_CONTENT="article/content",TEST_ID.ARTICLE_COLLECTION="article/collection",TEST_ID.ARTICLE_TAGS="article/tags",TEST_ID.ARTICLE_LICENSE="article/license",TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON="article/support/support-button",TEST_ID.ARTICLE_SUPPORT_REQUEST="article/support/request",TEST_ID.ARTICLE_SUPPORT_REPLY="article/support/reply",TEST_ID.ARTICLE_APPRECIATION_TOTAL="article/appreciation/total",TEST_ID.ARTICLE_TOOLBAR="article/toolbar",TEST_ID.ARTICLE_BOOKMARK="article/bookmark",TEST_ID.ARTICLE_COMMENT_FEED="article/comment/feed",TEST_ID.PAY_TO_CURRENCY_CHOICE="payto/currency-choice",TEST_ID.COMMENT_CONETNT="comment/content",TEST_ID.NOTICE_USER_DISPLAY_NAME="notice/user/display-name",TEST_ID.NOTICE_ARTICLE_TITLE="notice/article/title",TEST_ID.NOTICE_COMMENT_CONTENT="notice/comment/content",TEST_ID.NOTICE_PAYMENT_RECEIVE_DONATION_AMOUNT="notice/payment-receive-donation/amount",TEST_ID.NOTICE_USER_NEW_FOLLOWER="notice/user-new-follower",TEST_ID.NOTICE_ARTICLE_NEW_COLLECTED="notice/article-new-collected",TEST_ID.NOTICE_ARTICLE_PUBLISHED="notice/article-published",TEST_ID.NOTICE_ARTICLE_MENTIONED_YOU="notice/article-mentioned-you",TEST_ID.NOTICE_ARTICLE_NEW_SUBSCRIBER="notice/article-new-subscriber",TEST_ID.NOTICE_ARTICLE_NEW_APPRECIATION="notice/article-new-appreciation",TEST_ID.NOTICE_REVISED_ARTICLE_PUBLISHED="notice/revised-article-published",TEST_ID.NOTICE_REVISED_ARTICLE_NOT_PUBLISHED="notice/revised-article-not-published",TEST_ID.NOTICE_CIRCLE_NEW_ARTICLE="notice/circle-new-article",TEST_ID.NOTICE_ARTICLE_TAG_ADDED="notice/article-tag-added",TEST_ID.NOTICE_ARTICLE_TAG_REMOVED="notice/article-tag-removed",TEST_ID.NOTICE_ARTICLE_TAG_UNSELECTED="notice/article-tag-unselected",TEST_ID.NOTICE_COMMENT_NEW_REPLY="notice/comment-new-reply",TEST_ID.NOTICE_COMMENT_MENTIONED_YOU="notice/comment-mentioned-you",TEST_ID.NOTICE_COMMENT_PINNED="notice/comment-pinned",TEST_ID.NOTICE_ARTICLE_NEW_COMMENT="notice/article-new-comment",TEST_ID.NOTICE_SUBSCRIBED_ARTICLE_NEW_COMMENT="notice/subscribed-article-new-comment",TEST_ID.NOTICE_CIRCLE_NEW_BROADCAST="notice/circle-new-broadcast",TEST_ID.NOTICE_TAG_ADOPTION="notice/tag-adoption",TEST_ID.NOTICE_TAG_LEAVE="notice/tag-leave",TEST_ID.NOTICE_TAG_ADD_EDITOR="notice/tag-add-editor",TEST_ID.NOTICE_TAG_LEAVE_EDITOR="notice/tag-leave-editor",TEST_ID.NOTICE_PAYMENT_PAYOUT="notice/payment-payout",TEST_ID.NOTICE_PAYMENT_RECEIVE_DONATION="notice/payment-receive-donation",TEST_ID.NOTICE_CIRCLE_NEW_FOLLOWER="notice/cirlce-new-follower",TEST_ID.NOTICE_CIRCLE_NEW_SUBSCRIBER="notice/cirlce-new-subscriber",TEST_ID.NOTICE_CIRCLE_NEW_UNSUBSCRIBER="notice/cirlce-new-unsubscriber",TEST_ID.NOTICE_CIRCLE_INVITATION="notice/circle-invitation",TEST_ID.NOTICE_CIRCLE_NEW_BROADCAST_COMMENTS="notice/circle-new-broadcast-comments",TEST_ID.NOTICE_CIRCLE_NEW_DISCUSSION_COMMENTS="notice/circle-new-discussion-comments",TEST_ID.NOTICE_CRYPTO_WALLET_AIRDROP="notice/crypto-wallet-airdrop",TEST_ID.NOTICE_CRYPTO_WALLET_CONNECTED="notice/crypto-wallet-connected",TEST_ID.NOTICE_OFFICIAL_ANNOUNCEMENT="notice/official-announcement",TEST_ID.ME_WALLET_TRANSACTIONS_ITEM="me/wallet/transactions/item",TEST_ID.ME_WALLET_TRANSACTIONS_ITEM_AMOUNT="me/wallet/transactions/item/amount",TEST_ID.USER_PROFILE="user-profile",TEST_ID.USER_PROFILE_DISPLAY_NAME="user-profile/display-name",TEST_ID.USER_PROFILE_USER_NAME="user-profile/user-name",TEST_ID.USER_PROFILE_FOLLOWERS_COUNT="user-profile/followers/count",TEST_ID.USER_PROFILE_BIO="user-profile/bio",TEST_ID.EDITOR_SEARCH_SELECT_FORM_DIALOG_ADD_BUTTON="editor/search-select-form/dialog/add-button",TEST_ID.SPINNER="spinner",TEST_ID}({})},"./src/common/utils/analytics.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>analytics});var events=__webpack_require__("./src/common/enums/events.ts"),ANALYTIC_TYPES_PAGE="page",ANALYTIC_TYPES_IDENTIFY="identify",trackAs=function trackAs(type){return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];var event=new CustomEvent(events.sU,{detail:{args,type}});window.dispatchEvent(event)}},analytics={trackEvent:trackAs("track"),trackPage:trackAs(ANALYTIC_TYPES_PAGE),identifyUser:trackAs(ANALYTIC_TYPES_IDENTIFY)}},"./src/components/Dialogs/ShareDialog/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>ShareDialog});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js"),asyncToGenerator_default=__webpack_require__.n(asyncToGenerator),helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),objectWithoutProperties_default=__webpack_require__.n(objectWithoutProperties),react=__webpack_require__("./node_modules/react/index.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),dynamic=__webpack_require__("./node_modules/next/dynamic.js"),dynamic_default=__webpack_require__.n(dynamic),analytics=__webpack_require__("./src/common/utils/analytics.ts"),getUserAgent=function getUserAgent(){return(navigator&&navigator.userAgent||"").toLowerCase()},isMobile=function isMobile(){var userAgent=getUserAgent();return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)},Spinner=__webpack_require__("./src/components/Spinner/index.tsx"),useDialogSwitch=__webpack_require__("./src/components/Hook/useDialogSwitch.ts"),Dialog=__webpack_require__("./src/components/Dialog/index.tsx"),console=__webpack_require__("./node_modules/console-browserify/index.js"),_excluded=["onShare","children"],__jsx=react.createElement,DynamicContent=dynamic_default()((function(){return Promise.all([__webpack_require__.e(9139),__webpack_require__.e(8633)]).then(__webpack_require__.bind(__webpack_require__,"./src/components/Dialogs/ShareDialog/Content.tsx"))}),{ssr:!1,loading:Spinner.$,loadableGenerated:{webpack:function webpack(){return["./src/components/Dialogs/ShareDialog/Content.tsx"]}}}),BaseShareDialog=function BaseShareDialog(_ref){var onShare=_ref.onShare,children=_ref.children,props=objectWithoutProperties_default()(_ref,_excluded),_useDialogSwitch=(0,useDialogSwitch.U)(!0),show=_useDialogSwitch.show,_openDialog=_useDialogSwitch.openDialog,closeDialog=_useDialogSwitch.closeDialog;return __jsx(react.Fragment,null,children({openDialog:function openDialog(){return onShare(_openDialog)}}),__jsx(Dialog.V,{isOpen:show,onDismiss:closeDialog},__jsx(DynamicContent,extends_default()({},props,{closeDialog}))))};var ShareDialog=function ShareDialog(props){var title=props.title,path=props.path,tags=props.tags,shareLink=function tryDecodeUrl(url){try{return decodeURIComponent(url)}catch(err){return url}}("undefined"!=typeof window?path?"".concat(window.location.origin).concat(path):window.location.href:""),shareTitle=title||"undefined"!=typeof window&&window.document.title||"",onShare=function(){var _ref2=asyncToGenerator_default()(regenerator_default().mark((function _callee(fallbackShare){var navigator;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(navigator=window.navigator,analytics.c.trackEvent("share_dialog",{step:"open_share"}),!navigator.share||!isMobile()||props.disableNativeShare){_context.next=13;break}return _context.prev=3,_context.next=6,navigator.share({title:shareTitle,url:shareLink});case 6:_context.next=11;break;case 8:_context.prev=8,_context.t0=_context.catch(3),console.error(_context.t0);case 11:_context.next=14;break;case 13:fallbackShare();case 14:case"end":return _context.stop()}}),_callee,null,[[3,8]])})));return function onShare(_x){return _ref2.apply(this,arguments)}}();return __jsx(Dialog.V.Lazy,{mounted:__jsx(BaseShareDialog,extends_default()({},props,{onShare,shareTitle,shareLink,shareTags:Array.from(new Set(tags)).filter(Boolean)}))},(function(_ref3){var _openDialog2=_ref3.openDialog;return __jsx(react.Fragment,null,props.children({openDialog:function openDialog(){return onShare(_openDialog2)}}))}))};ShareDialog.displayName="ShareDialog",ShareDialog.__docgenInfo={description:"",methods:[],displayName:"ShareDialog",props:{title:{required:!1,tsType:{name:"string"},description:""},path:{required:!1,tsType:{name:"string"},description:""},tags:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},disableNativeShare:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"signature",type:"function",raw:"({ openDialog }: { openDialog: () => void }) => React.ReactNode",signature:{arguments:[{name:"",type:{name:"signature",type:"object",raw:"{ openDialog: () => void }",signature:{properties:[{key:"openDialog",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}};try{ShareDialog.displayName="ShareDialog",ShareDialog.__docgenInfo={description:"",displayName:"ShareDialog",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},path:{defaultValue:null,description:"",name:"path",required:!1,type:{name:"string"}},tags:{defaultValue:null,description:"",name:"tags",required:!1,type:{name:"string[]"}},disableNativeShare:{defaultValue:null,description:"",name:"disableNativeShare",required:!1,type:{name:"boolean"}},description:{defaultValue:null,description:"",name:"description",required:!1,type:{name:"ReactNode"}},btns:{defaultValue:null,description:"",name:"btns",required:!1,type:{name:"ReactNode"}},smUpBtns:{defaultValue:null,description:"",name:"smUpBtns",required:!1,type:{name:"ReactNode"}},headerTitle:{defaultValue:null,description:"",name:"headerTitle",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Dialogs/ShareDialog/index.tsx#ShareDialog"]={docgenInfo:ShareDialog.__docgenInfo,name:"ShareDialog",path:"src/components/Dialogs/ShareDialog/index.tsx#ShareDialog"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Hook/useDialogSwitch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{U:()=>useDialogSwitch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),useDialogSwitch=function useDialogSwitch(value){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value),show=_useState[0],setShow=_useState[1];return{show,setShow,openDialog:function openDialog(){return setShow(!0)},closeDialog:function closeDialog(){return setShow(!1)}}}},"./src/components/Hook/useOutsideClick.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>useOutsideClick});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),useOutsideClick=function useOutsideClick(node,action){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(action){var listener=function listener(event){node.current&&!node.current.contains(event.target)&&action(event)};return document.addEventListener("mousedown",listener),document.addEventListener("touchstart",listener),function(){document.removeEventListener("mousedown",listener),document.removeEventListener("touchstart",listener)}}}),[node,action])}},"./src/components/Icon/IconShare16.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{IconShare16:()=>IconShare16});var _path,_path2,_path3,react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var IconShare16=(0,__webpack_require__("./src/components/Icon/withIcon.tsx").H)((function SvgShare(props){return react.createElement("svg",_extends({fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},props),_path||(_path=react.createElement("path",{d:"M10.3269 6H13V14.3333C13 14.7015 12.7015 15 12.3333 15H3.66667C3.29848 15 3 14.7015 3 14.3333V6H5.65513",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"})),_path2||(_path2=react.createElement("path",{d:"M6 3L8 1L10 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"})),_path3||(_path3=react.createElement("path",{d:"M8 1V10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"})))}));try{IconShare16.displayName="IconShare16",IconShare16.__docgenInfo={description:"",displayName:"IconShare16",props:{size:{defaultValue:null,description:"Working Icon description",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'},{value:'"xxxl"'},{value:'"smS"'},{value:'"mdS"'},{value:'"xxs"'},{value:'"mdXS"'},{value:'"mdM"'},{value:'"xlM"'},{value:'"xxxlM"'}]}},color:{defaultValue:null,description:"Working Icon description",name:"color",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"white"'},{value:'"greyDarker"'},{value:'"green"'},{value:'"greyLighter"'},{value:'"red"'},{value:'"gold"'},{value:'"grey"'},{value:'"greyLight"'},{value:'"greyDark"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Icon/IconShare16.tsx#IconShare16"]={docgenInfo:IconShare16.__docgenInfo,name:"IconShare16",path:"src/components/Icon/IconShare16.tsx#IconShare16"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Icon/IconSpinner16.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{IconSpinner16:()=>IconSpinner16});var _path,helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),objectWithoutProperties_default=__webpack_require__.n(objectWithoutProperties),react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgSpinner=function SvgSpinner(props){return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 32 32"},props),_path||(_path=react.createElement("path",{d:"M.5 16h3c0 6.904 5.596 12.5 12.5 12.5S28.5 22.904 28.5 16 22.904 3.5 16 3.5v-3C24.56.5 31.5 7.44 31.5 16c0 8.56-6.94 15.5-15.5 15.5C7.44 31.5.5 24.56.5 16z",fillRule:"nonzero",fill:"currentColor"})))};var withIcon=__webpack_require__("./src/components/Icon/withIcon.tsx"),_excluded=["className"],__jsx=react.createElement,IconSpinner16=(0,withIcon.H)((function(_ref){var className=_ref.className,restProps=objectWithoutProperties_default()(_ref,_excluded);return __jsx(SvgSpinner,extends_default()({className:"u-motion-spin ".concat(className)},restProps))}));try{IconSpinner16.displayName="IconSpinner16",IconSpinner16.__docgenInfo={description:"",displayName:"IconSpinner16",props:{size:{defaultValue:null,description:"Working Icon description",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'},{value:'"xxxl"'},{value:'"smS"'},{value:'"mdS"'},{value:'"xxs"'},{value:'"mdXS"'},{value:'"mdM"'},{value:'"xlM"'},{value:'"xxxlM"'}]}},color:{defaultValue:null,description:"Working Icon description",name:"color",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"white"'},{value:'"greyDarker"'},{value:'"green"'},{value:'"greyLighter"'},{value:'"red"'},{value:'"gold"'},{value:'"grey"'},{value:'"greyLight"'},{value:'"greyDark"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Icon/IconSpinner16.tsx#IconSpinner16"]={docgenInfo:IconSpinner16.__docgenInfo,name:"IconSpinner16",path:"src/components/Icon/IconSpinner16.tsx#IconSpinner16"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Media/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{pU:()=>Media});var BREAKPOINTS_MD=475,BREAKPOINTS_LG=930,BREAKPOINTS_XL=1184,AppMedia=(0,__webpack_require__("./node_modules/@artsy/fresnel/dist/index.js").Wm)({breakpoints:{sm:0,md:BREAKPOINTS_MD,lg:BREAKPOINTS_LG,xl:BREAKPOINTS_XL}}),Media=(AppMedia.createMediaStyle(),AppMedia.Media);AppMedia.MediaContextProvider},"./src/components/Spinner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>Spinner});var react=__webpack_require__("./node_modules/react/index.js"),reach_visually_hidden=__webpack_require__("./node_modules/@reach/visually-hidden/dist/reach-visually-hidden.mjs"),test=__webpack_require__("./src/common/enums/test.ts"),Translate=__webpack_require__("./src/components/Context/Language/Translate.tsx"),IconSpinner16=__webpack_require__("./src/components/Icon/IconSpinner16.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Spinner/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Spinner_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,Spinner=function Spinner(){return __jsx("div",{className:Spinner_styles_module.spinner,"data-test-id":test.Y.SPINNER,"aria-busy":"true","aria-live":"polite"},__jsx(reach_visually_hidden.T,null,__jsx("span",null,__jsx(Translate.v,{zh_hant:"載入中…",zh_hans:"加载中…",en:"Loading..."}))),__jsx(IconSpinner16.IconSpinner16,{color:"greyLight",size:"lg"}))};Spinner.displayName="Spinner",Spinner.__docgenInfo={description:"",methods:[],displayName:"Spinner"}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Spinner/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".fR5ifF46Sq98mykCScoB {\n  padding: var(--spacing-x-loose) 0;\n  line-height: 1;\n  text-align: center;\n}\n","",{version:3,sources:["webpack://./src/components/Spinner/styles.module.css"],names:[],mappings:"AAAA;EACE,iCAAiC;EACjC,cAAc;EACd,kBAAkB;AACpB",sourcesContent:[".spinner {\n  padding: var(--spacing-x-loose) 0;\n  line-height: 1;\n  text-align: center;\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={spinner:"fR5ifF46Sq98mykCScoB"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/next/dist/shared/lib/dynamic.js":(module,exports,__webpack_require__)=>{var process=__webpack_require__("./node_modules/process/browser.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function dynamic(dynamicOptions,options){let loadableFn=_loadable.default,loadableOptions=(null==options?void 0:options.suspense)?{}:{loading:({error,isLoading,pastDelay})=>null};dynamicOptions instanceof Promise?loadableOptions.loader=()=>dynamicOptions:"function"==typeof dynamicOptions?loadableOptions.loader=dynamicOptions:"object"==typeof dynamicOptions&&(loadableOptions=_extends({},loadableOptions,dynamicOptions));if(loadableOptions=_extends({},loadableOptions,options),!process.env.__NEXT_REACT_ROOT&&loadableOptions.suspense)throw new Error("Invalid suspense option usage in next/dynamic. Read more: https://nextjs.org/docs/messages/invalid-dynamic-suspense");loadableOptions.suspense&&(delete loadableOptions.ssr,delete loadableOptions.loading);loadableOptions.loadableGenerated&&(loadableOptions=_extends({},loadableOptions,loadableOptions.loadableGenerated),delete loadableOptions.loadableGenerated);if("boolean"==typeof loadableOptions.ssr&&!loadableOptions.suspense){if(!loadableOptions.ssr)return delete loadableOptions.ssr,noSSR(loadableFn,loadableOptions);delete loadableOptions.ssr}return loadableFn(loadableOptions)},exports.noSSR=noSSR;var _extends=__webpack_require__("./node_modules/@swc/helpers/lib/_extends.js").Z,_interop_require_default=__webpack_require__("./node_modules/@swc/helpers/lib/_interop_require_default.js").Z,_react=_interop_require_default(__webpack_require__("./node_modules/react/index.js")),_loadable=_interop_require_default(__webpack_require__("./node_modules/next/dist/shared/lib/loadable.js"));const isServerSide="undefined"==typeof window;function noSSR(LoadableInitializer,loadableOptions){if(delete loadableOptions.webpack,delete loadableOptions.modules,!isServerSide)return LoadableInitializer(loadableOptions);const Loading=loadableOptions.loading;return()=>_react.default.createElement(Loading,{error:null,isLoading:!0,pastDelay:!1,timedOut:!1})}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/shared/lib/loadable-context.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LoadableContext=void 0;const LoadableContext=(0,__webpack_require__("./node_modules/@swc/helpers/lib/_interop_require_default.js").Z)(__webpack_require__("./node_modules/react/index.js")).default.createContext(null);exports.LoadableContext=LoadableContext},"./node_modules/next/dist/shared/lib/loadable.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var process=__webpack_require__("./node_modules/process/browser.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _extends=__webpack_require__("./node_modules/@swc/helpers/lib/_extends.js").Z,_react=(0,__webpack_require__("./node_modules/@swc/helpers/lib/_interop_require_default.js").Z)(__webpack_require__("./node_modules/react/index.js")),_loadableContext=__webpack_require__("./node_modules/next/dist/shared/lib/loadable-context.js");const{useSyncExternalStore}=process.env.__NEXT_REACT_ROOT?__webpack_require__("./node_modules/react/index.js"):__webpack_require__("./node_modules/use-sync-external-store/shim/index.js"),ALL_INITIALIZERS=[],READY_INITIALIZERS=[];let initialized=!1;function load(loader){let promise=loader(),state={loading:!0,loaded:null,error:null};return state.promise=promise.then((loaded=>(state.loading=!1,state.loaded=loaded,loaded))).catch((err=>{throw state.loading=!1,state.error=err,err})),state}class LoadableSubscription{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};const{_res:res,_opts:opts}=this;res.loading&&("number"==typeof opts.delay&&(0===opts.delay?this._state.pastDelay=!0:this._delay=setTimeout((()=>{this._update({pastDelay:!0})}),opts.delay)),"number"==typeof opts.timeout&&(this._timeout=setTimeout((()=>{this._update({timedOut:!0})}),opts.timeout))),this._res.promise.then((()=>{this._update({}),this._clearTimeouts()})).catch((_err=>{this._update({}),this._clearTimeouts()})),this._update({})}_update(partial){this._state=_extends({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},partial),this._callbacks.forEach((callback=>callback()))}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(callback){return this._callbacks.add(callback),()=>{this._callbacks.delete(callback)}}constructor(loadFn,opts){this._loadFn=loadFn,this._opts=opts,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function Loadable(opts){return function createLoadableComponent(loadFn,options){let opts=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null,suspense:!1},options);opts.suspense&&(opts.lazy=_react.default.lazy(opts.loader));let subscription=null;function init(){if(!subscription){const sub=new LoadableSubscription(loadFn,opts);subscription={getCurrentValue:sub.getCurrentValue.bind(sub),subscribe:sub.subscribe.bind(sub),retry:sub.retry.bind(sub),promise:sub.promise.bind(sub)}}return subscription.promise()}if("undefined"==typeof window&&ALL_INITIALIZERS.push(init),!initialized&&"undefined"!=typeof window){const moduleIds=opts.webpack?opts.webpack():opts.modules;moduleIds&&READY_INITIALIZERS.push((ids=>{for(const moduleId of moduleIds)if(-1!==ids.indexOf(moduleId))return init()}))}function useLoadableModule(){init();const context=_react.default.useContext(_loadableContext.LoadableContext);context&&Array.isArray(opts.modules)&&opts.modules.forEach((moduleName=>{context(moduleName)}))}const LoadableComponent=opts.suspense?function LazyImpl(props,ref){return useLoadableModule(),_react.default.createElement(opts.lazy,_extends({},props,{ref}))}:function LoadableImpl(props,ref){useLoadableModule();const state=useSyncExternalStore(subscription.subscribe,subscription.getCurrentValue,subscription.getCurrentValue);return _react.default.useImperativeHandle(ref,(()=>({retry:subscription.retry})),[]),_react.default.useMemo((()=>state.loading||state.error?_react.default.createElement(opts.loading,{isLoading:state.loading,pastDelay:state.pastDelay,timedOut:state.timedOut,error:state.error,retry:subscription.retry}):state.loaded?_react.default.createElement(function resolve(obj){return obj&&obj.__esModule?obj.default:obj}(state.loaded),props):null),[props,state])};return LoadableComponent.preload=()=>init(),LoadableComponent.displayName="LoadableComponent",_react.default.forwardRef(LoadableComponent)}(load,opts)}function flushInitializers(initializers,ids){let promises=[];for(;initializers.length;){let init=initializers.pop();promises.push(init(ids))}return Promise.all(promises).then((()=>{if(initializers.length)return flushInitializers(initializers,ids)}))}Loadable.preloadAll=()=>new Promise(((resolveInitializers,reject)=>{flushInitializers(ALL_INITIALIZERS).then(resolveInitializers,reject)})),Loadable.preloadReady=(ids=[])=>new Promise((resolvePreload=>{const res=()=>(initialized=!0,resolvePreload());flushInitializers(READY_INITIALIZERS,ids).then(res,res)})),"undefined"!=typeof window&&(window.__NEXT_PRELOADREADY=Loadable.preloadReady);var _default=Loadable;exports.default=_default},"./node_modules/next/dynamic.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/shared/lib/dynamic.js")},"./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var e=__webpack_require__("./node_modules/react/index.js");var k="function"==typeof Object.is?Object.is:function h(a,b){return a===b&&(0!==a||1/a==1/b)||a!=a&&b!=b},l=e.useState,m=e.useEffect,n=e.useLayoutEffect,p=e.useDebugValue;function r(a){var b=a.getSnapshot;a=a.value;try{var d=b();return!k(a,d)}catch(f){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function t(a,b){return b()}:function q(a,b){var d=b(),f=l({inst:{value:d,getSnapshot:b}}),c=f[0].inst,g=f[1];return n((function(){c.value=d,c.getSnapshot=b,r(c)&&g({inst:c})}),[a,d,b]),m((function(){return r(c)&&g({inst:c}),a((function(){r(c)&&g({inst:c})}))}),[a]),p(d),d};exports.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:u},"./node_modules/use-sync-external-store/shim/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js")}}]);