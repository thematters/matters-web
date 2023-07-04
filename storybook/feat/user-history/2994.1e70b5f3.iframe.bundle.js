"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[2994],{"./src/common/enums/keyValue.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>KEYVALUE});var KEYVALUE={enter:"enter",escape:"escape",tab:"tab",backSpace:"backspace",arrowUp:"arrowup",arrowDown:"arrowdown"}},"./src/components/Interaction/Card/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Card});var helpers_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/extends.js"),extends_default=__webpack_require__.n(helpers_extends),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),defineProperty_default=__webpack_require__.n(defineProperty),react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),next_router=__webpack_require__("./node_modules/next/router.js"),keyValue=__webpack_require__("./src/common/enums/keyValue.ts"),utils_text=__webpack_require__("./src/common/utils/text/index.ts"),translate=__webpack_require__("./src/common/utils/translate.ts"),LanguageContext=__webpack_require__("./src/components/Context/Language/LanguageContext.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Interaction/Card/styles.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles_module.Z,options);const Card_styles_module=styles_module.Z&&styles_module.Z.locals?styles_module.Z.locals:void 0;var __jsx=react.createElement,Card=(0,react.forwardRef)((function(_ref,ref){var _classNames,_ref$spacing=_ref.spacing,spacing=void 0===_ref$spacing?["base",0]:_ref$spacing,_ref$bgColor=_ref.bgColor,bgColor=void 0===_ref$bgColor?"white":_ref$bgColor,bgActiveColor=_ref.bgActiveColor,borderColor=_ref.borderColor,borderRadius=_ref.borderRadius,textColor=_ref.textColor,textActiveColor=_ref.textActiveColor,isActive=_ref.isActive,activeOutline=_ref.activeOutline,href=_ref.href,htmlHref=_ref.htmlHref,htmlTarget=_ref.htmlTarget,onClick=_ref.onClick,_ref$is=_ref.is,is=void 0===_ref$is?"section":_ref$is,role=_ref.role,ariaHasPopup=_ref.ariaHasPopup,testId=_ref.testId,children=_ref.children,router=(0,next_router.useRouter)(),lang=(0,react.useContext)(LanguageContext.AZ).lang,disabled=!href&&!htmlHref&&!onClick,fallbackRef=(0,react.useRef)(null),cardRef=ref||fallbackRef,cardClasses=classnames_default()((_classNames={},defineProperty_default()(_classNames,Card_styles_module.card,!0),defineProperty_default()(_classNames,"card",!0),defineProperty_default()(_classNames,Card_styles_module["spacingY".concat((0,utils_text.fm)(spacing[0]+""))],!!spacing[0]),defineProperty_default()(_classNames,Card_styles_module["spacingX".concat((0,utils_text.fm)(spacing[1]+""))],!!spacing[1]),defineProperty_default()(_classNames,Card_styles_module["bg".concat((0,utils_text.fm)(bgColor))],!!bgColor),defineProperty_default()(_classNames,bgActiveColor?Card_styles_module["bgActive".concat((0,utils_text.fm)(bgActiveColor))]:"",!!bgActiveColor),defineProperty_default()(_classNames,borderColor?Card_styles_module["border".concat((0,utils_text.fm)(borderColor))]:"",!!borderColor),defineProperty_default()(_classNames,borderRadius?Card_styles_module["borderRadius".concat((0,utils_text.fm)(borderRadius))]:"",!!borderRadius),defineProperty_default()(_classNames,Card_styles_module.activeOutlineAuto,!!activeOutline),defineProperty_default()(_classNames,Card_styles_module.hasBorder,!!borderColor||!!borderRadius),defineProperty_default()(_classNames,Card_styles_module.disabled,disabled),defineProperty_default()(_classNames,Card_styles_module[textColor?"text".concat((0,utils_text.fm)(textColor)):""],!!textColor),defineProperty_default()(_classNames,Card_styles_module[textActiveColor?"textActive".concat((0,utils_text.fm)(textActiveColor)):""],!!textActiveColor),_classNames)),ariaLabel=htmlHref||href?(0,translate.I)({zh_hant:"跳轉至 ".concat(href||htmlHref),zh_hans:"跳转至 ".concat(href||htmlHref),en:"Go to ".concat(href||htmlHref),lang}):void 0,openLink=function openLink(_ref2){var _selection$anchorNode,_cardRef$current,_cardRef$current$pare,newTab=_ref2.newTab,event=_ref2.event,target=event.target;if(!disabled){var selection=window.getSelection(),selectedText=(null==selection?void 0:selection.toString())||"",selectedNode=null==selection||null===(_selection$anchorNode=selection.anchorNode)||void 0===_selection$anchorNode?void 0:_selection$anchorNode.parentNode;(null==selectedText?void 0:selectedText.length)>0&&selectedNode&&target.contains(selectedNode)||(!target.closest("button")&&onClick&&onClick(),target.closest("a, button")||(htmlHref&&window.open(htmlHref,htmlTarget),href&&(newTab&&href?window.open(href,"_blank"):router.push(href)),null!=cardRef&&null!==(_cardRef$current=cardRef.current)&&void 0!==_cardRef$current&&null!==(_cardRef$current$pare=_cardRef$current.parentElement)&&void 0!==_cardRef$current$pare&&_cardRef$current$pare.closest(".card")&&event.stopPropagation(),null!=cardRef&&cardRef.current&&cardRef.current.blur()))}};return(0,react.useEffect)((function(){cardRef&&isActive&&cardRef.current.focus()}),[cardRef,isActive]),"link"===is&&href?__jsx(link_default(),{href,legacyBehavior:!0},__jsx("a",extends_default()({className:cardClasses,ref:cardRef},testId?defineProperty_default()({},"data-test-id",testId):{}),children)):"anchor"===is&&htmlHref?__jsx("a",extends_default()({className:cardClasses,href:htmlHref,target:htmlTarget,ref:cardRef},testId?defineProperty_default()({},"data-test-id",testId):{}),children):__jsx("section",extends_default()({className:cardClasses,tabIndex:disabled?-1:0,ref:cardRef,"data-clickable":!0,onKeyDown:function onKeyDown(event){event.key.toLowerCase()===keyValue.T.enter&&openLink({newTab:event.metaKey,event})},onClick:function onClick(event){openLink({newTab:event.metaKey,event})}},ariaLabel?defineProperty_default()({},"aria-label",ariaLabel):{},role?defineProperty_default()({},"role",role):{},ariaHasPopup?defineProperty_default()({},"aria-haspopup",ariaHasPopup):{},disabled?defineProperty_default()({},"aria-disabled",disabled):{},testId?defineProperty_default()({},"data-test-id",testId):{}),children)}));Card.displayName="Card",Card.__docgenInfo={description:"",methods:[],displayName:"Card",props:{spacing:{defaultValue:{value:"['base', 0]",computed:!1},required:!1},bgColor:{defaultValue:{value:"'white'",computed:!1},required:!1},is:{defaultValue:{value:"'section'",computed:!1},required:!1}}};try{Card.displayName="Card",Card.__docgenInfo={description:"",displayName:"Card",props:{spacing:{defaultValue:{value:"['base', 0]"},description:"",name:"spacing",required:!1,type:{name:"[CardSpacing, CardSpacing]"}},bgColor:{defaultValue:{value:"white"},description:"",name:"bgColor",required:!1,type:{name:"enum",value:[{value:'"white"'},{value:'"greyLighter"'},{value:'"transparent"'},{value:'"none"'}]}},bgActiveColor:{defaultValue:null,description:"",name:"bgActiveColor",required:!1,type:{name:"enum",value:[{value:'"greyLighter"'},{value:'"transparent"'},{value:'"none"'}]}},borderColor:{defaultValue:null,description:"",name:"borderColor",required:!1,type:{name:"enum",value:[{value:'"green"'},{value:'"greyLighter"'},{value:'"lineGreyLight"'}]}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!1,type:{name:"enum",value:[{value:'"loose"'},{value:'"xxtight"'},{value:'"xtight"'},{value:'"base"'}]}},textColor:{defaultValue:null,description:"",name:"textColor",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"greyDarker"'},{value:'"red"'}]}},textActiveColor:{defaultValue:null,description:"",name:"textActiveColor",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"redDark"'}]}},isActive:{defaultValue:null,description:"",name:"isActive",required:!1,type:{name:"boolean"}},activeOutline:{defaultValue:null,description:"",name:"activeOutline",required:!1,type:{name:"enum",value:[{value:'"auto"'}]}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},htmlHref:{defaultValue:null,description:"",name:"htmlHref",required:!1,type:{name:"string"}},htmlTarget:{defaultValue:null,description:"",name:"htmlTarget",required:!1,type:{name:"enum",value:[{value:'"_blank"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => any)"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"any"}},is:{defaultValue:{value:"section"},description:"",name:"is",required:!1,type:{name:"enum",value:[{value:'"link"'},{value:'"anchor"'},{value:'"section"'}]}},role:{defaultValue:null,description:"",name:"role",required:!1,type:{name:"AriaRole"}},ariaHasPopup:{defaultValue:null,description:"",name:"ariaHasPopup",required:!1,type:{name:'boolean | "dialog" | "grid" | "listbox" | "menu" | "tree" | "false" | "true"'}},testId:{defaultValue:null,description:"",name:"testId",required:!1,type:{name:"enum",value:[{value:'"layout/header"'},{value:'"digest/article/card"'},{value:'"digest/article/feed"'},{value:'"digest/article/list"'},{value:'"digest/article/feed/footer/pin"'},{value:'"digest/article/notice"'},{value:'"digest/article/sidebar"'},{value:'"digest/article/title"'},{value:'"digest/user/mini"'},{value:'"digest/user/mini/display-name"'},{value:'"digest/user/mini/user-name"'},{value:'"digest/user/plain"'},{value:'"digest/user/rich"'},{value:'"digest/user/rich/display-name"'},{value:'"digest/user/verbose"'},{value:'"digest/tag/feed"'},{value:'"digest/tag/rich"'},{value:'"digest/tag/sidebar"'},{value:'"digest/collection/feed"'},{value:'"dialog/auth"'},{value:'"search/results/item"'},{value:'"drafts/response/allow"'},{value:'"drafts/response/disallow"'},{value:'"article/summary"'},{value:'"article/content"'},{value:'"article/collection"'},{value:'"article/tags"'},{value:'"article/license"'},{value:'"article/support/support-button"'},{value:'"article/support/request"'},{value:'"article/support/reply"'},{value:'"article/appreciation/total"'},{value:'"article/toolbar"'},{value:'"article/bookmark"'},{value:'"article/comment/feed"'},{value:'"payto/currency-choice"'},{value:'"comment/content"'},{value:'"notice/user/display-name"'},{value:'"notice/article/title"'},{value:'"notice/comment/content"'},{value:'"notice/payment-receive-donation/amount"'},{value:'"notice/user-new-follower"'},{value:'"notice/article-new-collected"'},{value:'"notice/article-published"'},{value:'"notice/article-mentioned-you"'},{value:'"notice/article-new-subscriber"'},{value:'"notice/article-new-appreciation"'},{value:'"notice/revised-article-published"'},{value:'"notice/revised-article-not-published"'},{value:'"notice/circle-new-article"'},{value:'"notice/article-tag-added"'},{value:'"notice/article-tag-removed"'},{value:'"notice/article-tag-unselected"'},{value:'"notice/comment-new-reply"'},{value:'"notice/comment-mentioned-you"'},{value:'"notice/comment-pinned"'},{value:'"notice/article-new-comment"'},{value:'"notice/subscribed-article-new-comment"'},{value:'"notice/circle-new-broadcast"'},{value:'"notice/tag-adoption"'},{value:'"notice/tag-leave"'},{value:'"notice/tag-add-editor"'},{value:'"notice/tag-leave-editor"'},{value:'"notice/payment-payout"'},{value:'"notice/payment-receive-donation"'},{value:'"notice/cirlce-new-follower"'},{value:'"notice/cirlce-new-subscriber"'},{value:'"notice/cirlce-new-unsubscriber"'},{value:'"notice/circle-invitation"'},{value:'"notice/circle-new-broadcast-comments"'},{value:'"notice/circle-new-discussion-comments"'},{value:'"notice/crypto-wallet-airdrop"'},{value:'"notice/crypto-wallet-connected"'},{value:'"notice/official-announcement"'},{value:'"me/wallet/transactions/item"'},{value:'"me/wallet/transactions/item/amount"'},{value:'"user-profile"'},{value:'"user-profile/display-name"'},{value:'"user-profile/user-name"'},{value:'"user-profile/followers/count"'},{value:'"user-profile/bio"'},{value:'"editor/search-select-form/dialog/add-button"'},{value:'"spinner"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Interaction/Card/index.tsx#Card"]={docgenInfo:Card.__docgenInfo,name:"Card",path:"src/components/Interaction/Card/index.tsx#Card"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/components/Interaction/Card/styles.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".K6_vhvabquvrW3byM0ki {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n\n  position: relative;\n  display: block;\n  outline: none;\n  transition-property: background-color;\n  transition-property: color;\n}\n\n.K6_vhvabquvrW3byM0ki:not(.f7B6HhfapfIW8xHzczEG) {\n    cursor: pointer;\n  }\n\n.ytALBbFzxdBJIqWg0Jr3:not(.f7B6HhfapfIW8xHzczEG):focus {\n      outline: auto;\n    }\n\n/* Background */\n.Vbko5VNxcEnPn9RDg6l0 {\n  background: transparent;\n}\n.Vbko5VNxcEnPn9RDg6l0:not(.f7B6HhfapfIW8xHzczEG):hover,\n    .Vbko5VNxcEnPn9RDg6l0:not(.f7B6HhfapfIW8xHzczEG):focus {\n      background: transparent;\n    }\n\n.IazBsltHNbzT9VcUGopQ {\n  background: var(--color-white);\n}\n\n.IazBsltHNbzT9VcUGopQ .K6_vhvabquvrW3byM0ki.OWmXfE0pndAYAV78X28w {\n    border: 1px solid var(--color-line-grey-light);\n\n    border-color: transparent;\n  }\n\n.IazBsltHNbzT9VcUGopQ:not(.f7B6HhfapfIW8xHzczEG):hover,\n    .IazBsltHNbzT9VcUGopQ:not(.f7B6HhfapfIW8xHzczEG):focus {\n      background: var(--color-grey-lighter);\n    }\n\n.IazBsltHNbzT9VcUGopQ:not(.f7B6HhfapfIW8xHzczEG):hover .K6_vhvabquvrW3byM0ki.OWmXfE0pndAYAV78X28w, .IazBsltHNbzT9VcUGopQ:not(.f7B6HhfapfIW8xHzczEG):focus .K6_vhvabquvrW3byM0ki.OWmXfE0pndAYAV78X28w {\n        border: 1px solid var(--color-line-grey-light);\n      }\n\n.OWmXfE0pndAYAV78X28w {\n  background: var(--color-grey-lighter);\n}\n\n.OWmXfE0pndAYAV78X28w:not(.f7B6HhfapfIW8xHzczEG):hover,\n    .OWmXfE0pndAYAV78X28w:not(.f7B6HhfapfIW8xHzczEG):focus {\n      background: var(--color-grey-lighter-active);\n    }\n\n.RdAK6uHRZHp2cS5GBqnK:not(.f7B6HhfapfIW8xHzczEG):hover,\n    .RdAK6uHRZHp2cS5GBqnK:not(.f7B6HhfapfIW8xHzczEG):focus {\n      background: var(--color-grey-lighter);\n    }\n\n._QrPcaS7UY8Va0vKOJvz:not(.f7B6HhfapfIW8xHzczEG):hover,\n    ._QrPcaS7UY8Va0vKOJvz:not(.f7B6HhfapfIW8xHzczEG):focus {\n      background: var(--color-white);\n    }\n\n.hD0qtn7mSCyM4fKpIXne:not(.f7B6HhfapfIW8xHzczEG):hover,\n    .hD0qtn7mSCyM4fKpIXne:not(.f7B6HhfapfIW8xHzczEG):focus {\n      background: transparent;\n    }\n\n/* Text color */\n.sgyQvShww3zKwrCJhEg4 {\n  color: var(--color-black);\n}\n\n.gN4DBzLKteQJUxsGsY4Z {\n  color: var(--color-grey-darker);\n}\n\n.qdC_PqEt0FyVLnSxerZA {\n  color: var(--color-red);\n}\n\n/* Text active color */\n\n.MGd2awNHA7snLS14rGpL:hover,\n  .MGd2awNHA7snLS14rGpL:focus {\n    color: var(--color-black);\n  }\n\n.agbpDt_ov_c8kImKV9y5:hover,\n  .agbpDt_ov_c8kImKV9y5:focus {\n    color: var(--color-red-dark);\n  }\n\n/* Spacing */\n.bw3CdrIiJQoLsNtaBNAg {\n  padding-top: var(--spacing-x-tight);\n  padding-bottom: var(--spacing-x-tight);\n}\n\n.ZKeL6NacgibIAM5hLAYN {\n  padding-top: var(--spacing-base-tight);\n  padding-bottom: var(--spacing-base-tight);\n}\n\n.ET84Q2b68Lv5uYi55WOv {\n  padding-top: var(--spacing-tight);\n  padding-bottom: var(--spacing-tight);\n}\n\n.Evy5FiQMtARSZC8nkmT3 {\n  padding-top: var(--spacing-base);\n  padding-bottom: var(--spacing-base);\n}\n\n.ZOiU_LjPR8aYYZJYgMuy {\n  padding-top: var(--spacing-base-loose);\n  padding-bottom: var(--spacing-base-loose);\n}\n\n.Nh7Fx_Zi7a6UGNbCYdxp {\n  padding-top: var(--spacing-loose);\n  padding-bottom: var(--spacing-loose);\n}\n\n.WcYQdjItFpxgdD_oIbN5 {\n  padding-right: var(--spacing-x-tight);\n  padding-left: var(--spacing-x-tight);\n}\n\n.R3eQvX5rYL6n_mDCDA_I {\n  padding-right: var(--spacing-base-tight);\n  padding-left: var(--spacing-base-tight);\n}\n\n.OnoTrY4vOF7CxdZlrZQe {\n  padding-right: var(--spacing-tight);\n  padding-left: var(--spacing-tight);\n}\n\n._6kPc3xlOl4oeTYrsB16 {\n  padding-right: var(--spacing-base);\n  padding-left: var(--spacing-base);\n}\n\n.Q_UxI0oQPjp4QZ8F0WAa {\n  padding-right: var(--spacing-base-loose);\n  padding-left: var(--spacing-base-loose);\n}\n\n.j4aVBQBv5vj1f_R7mD3A {\n  padding-right: var(--spacing-loose);\n  padding-left: var(--spacing-loose);\n}\n\n/* Border */\n.NYyfWPzffvns73Suejng {\n  overflow: hidden;\n}\n\n.LVA0jSh6WaQveFo9lnct {\n  border: 1px solid var(--color-grey-lighter);\n}\n\n.aHf_IzNSjcqgQRdrZAKP {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n.iQpVasiDZbGRkvoqz8iV {\n  border: 1px solid var(--color-matters-green);\n}\n\n.JGqBPjCQumfvL3a9pR9w {\n  border-radius: var(--spacing-loose);\n}\n\n.BMtE2rWMX3bCP3OLI0Yo {\n  border-radius: var(--spacing-base);\n}\n\n.LiuL8gNjhag9yZFJn6lr {\n  border-radius: var(--spacing-x-tight);\n}\n\n.OWGYUgamn_q0AyHaVKPw {\n  border-radius: var(--spacing-xx-tight);\n}\n","",{version:3,sources:["webpack://./src/components/Interaction/Card/styles.module.css","webpack://./src/common/styles/mixins.css"],names:[],mappings:"AAAA;EC0RE,uCAAuC;EACvC,yBAAyB;;EDxRzB,kBAAkB;EAClB,cAAc;EACd,aAAa;EACb,qCAAqC;EACrC,0BAA0B;AAK5B;;AAHE;IACE,eAAe;EACjB;;AAKE;MACE,aAAa;IACf;;AAIJ,eAAe;AACf;EACE,uBAAuB;AAQzB;AALI;;MAEE,uBAAuB;IACzB;;AAIJ;EACE,8BAA8B;AAkBhC;;AAhBE;ICsDA,8CAA8C;;IDnD5C,yBAAyB;EAC3B;;AAGE;;MAEE,qCAAqC;IAKvC;;AAHE;QC2CJ,8CAA8C;MDzC1C;;AAKN;EACE,qCAAqC;AAQvC;;AALI;;MAEE,4CAA4C;IAC9C;;AAMA;;MAEE,qCAAqC;IACvC;;AAMA;;MAEE,8BAA8B;IAChC;;AAMA;;MAEE,uBAAuB;IACzB;;AAIJ,eAAe;AACf;EACE,yBAAyB;AAC3B;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,uBAAuB;AACzB;;AAEA,sBAAsB;;AAGpB;;IAEE,yBAAyB;EAC3B;;AAIA;;IAEE,4BAA4B;EAC9B;;AAGF,YAAY;AACZ;EACE,mCAAmC;EACnC,sCAAsC;AACxC;;AAEA;EACE,sCAAsC;EACtC,yCAAyC;AAC3C;;AAEA;EACE,iCAAiC;EACjC,oCAAoC;AACtC;;AAEA;EACE,gCAAgC;EAChC,mCAAmC;AACrC;;AAEA;EACE,sCAAsC;EACtC,yCAAyC;AAC3C;;AAEA;EACE,iCAAiC;EACjC,oCAAoC;AACtC;;AAEA;EACE,qCAAqC;EACrC,oCAAoC;AACtC;;AAEA;EACE,wCAAwC;EACxC,uCAAuC;AACzC;;AAEA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,wCAAwC;EACxC,uCAAuC;AACzC;;AAEA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;;AAEA,WAAW;AACX;EACE,gBAAgB;AAClB;;AAEA;EACE,2CAA2C;AAC7C;;AAEA;EACE,8CAA8C;AAChD;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,sCAAsC;AACxC",sourcesContent:[".card {\n  @mixin transition;\n\n  position: relative;\n  display: block;\n  outline: none;\n  transition-property: background-color;\n  transition-property: color;\n\n  &:not(.disabled) {\n    cursor: pointer;\n  }\n}\n\n.activeOutlineAuto {\n  &:not(.disabled) {\n    &:focus {\n      outline: auto;\n    }\n  }\n}\n\n/* Background */\n.bgTransparent {\n  background: transparent;\n\n  &:not(.disabled) {\n    &:hover,\n    &:focus {\n      background: transparent;\n    }\n  }\n}\n\n.bgWhite {\n  background: var(--color-white);\n\n  & .card.bgGreyLighter {\n    @mixin border-grey;\n\n    border-color: transparent;\n  }\n\n  &:not(.disabled) {\n    &:hover,\n    &:focus {\n      background: var(--color-grey-lighter);\n\n      & .card.bgGreyLighter {\n        @mixin border-grey;\n      }\n    }\n  }\n}\n\n.bgGreyLighter {\n  background: var(--color-grey-lighter);\n\n  &:not(.disabled) {\n    &:hover,\n    &:focus {\n      background: var(--color-grey-lighter-active);\n    }\n  }\n}\n\n.bgActiveGreyLighter {\n  &:not(.disabled) {\n    &:hover,\n    &:focus {\n      background: var(--color-grey-lighter);\n    }\n  }\n}\n\n.bgActiveNone {\n  &:not(.disabled) {\n    &:hover,\n    &:focus {\n      background: var(--color-white);\n    }\n  }\n}\n\n.bgActiveTransparent {\n  &:not(.disabled) {\n    &:hover,\n    &:focus {\n      background: transparent;\n    }\n  }\n}\n\n/* Text color */\n.textBlack {\n  color: var(--color-black);\n}\n\n.textGreyDarker {\n  color: var(--color-grey-darker);\n}\n\n.textRed {\n  color: var(--color-red);\n}\n\n/* Text active color */\n\n.textActiveBlack {\n  &:hover,\n  &:focus {\n    color: var(--color-black);\n  }\n}\n\n.textActiveRedDark {\n  &:hover,\n  &:focus {\n    color: var(--color-red-dark);\n  }\n}\n\n/* Spacing */\n.spacingYXtight {\n  padding-top: var(--spacing-x-tight);\n  padding-bottom: var(--spacing-x-tight);\n}\n\n.spacingYBaseTight {\n  padding-top: var(--spacing-base-tight);\n  padding-bottom: var(--spacing-base-tight);\n}\n\n.spacingYTight {\n  padding-top: var(--spacing-tight);\n  padding-bottom: var(--spacing-tight);\n}\n\n.spacingYBase {\n  padding-top: var(--spacing-base);\n  padding-bottom: var(--spacing-base);\n}\n\n.spacingYBaseLoose {\n  padding-top: var(--spacing-base-loose);\n  padding-bottom: var(--spacing-base-loose);\n}\n\n.spacingYLoose {\n  padding-top: var(--spacing-loose);\n  padding-bottom: var(--spacing-loose);\n}\n\n.spacingXXtight {\n  padding-right: var(--spacing-x-tight);\n  padding-left: var(--spacing-x-tight);\n}\n\n.spacingXBaseTight {\n  padding-right: var(--spacing-base-tight);\n  padding-left: var(--spacing-base-tight);\n}\n\n.spacingXTight {\n  padding-right: var(--spacing-tight);\n  padding-left: var(--spacing-tight);\n}\n\n.spacingXBase {\n  padding-right: var(--spacing-base);\n  padding-left: var(--spacing-base);\n}\n\n.spacingXBaseLoose {\n  padding-right: var(--spacing-base-loose);\n  padding-left: var(--spacing-base-loose);\n}\n\n.spacingXLoose {\n  padding-right: var(--spacing-loose);\n  padding-left: var(--spacing-loose);\n}\n\n/* Border */\n.hasBorder {\n  overflow: hidden;\n}\n\n.borderGreyLighter {\n  border: 1px solid var(--color-grey-lighter);\n}\n\n.borderLineGreyLight {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n.borderGreen {\n  border: 1px solid var(--color-matters-green);\n}\n\n.borderRadiusLoose {\n  border-radius: var(--spacing-loose);\n}\n\n.borderRadiusBase {\n  border-radius: var(--spacing-base);\n}\n\n.borderRadiusXtight {\n  border-radius: var(--spacing-x-tight);\n}\n\n.borderRadiusXxtight {\n  border-radius: var(--spacing-xx-tight);\n}\n","/* Layouts\n   ========================================================================== */\n@define-mixin flex-center-all {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin flex-center-space-between {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n@define-mixin flex-center-start {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-center-end {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n@define-mixin flex-start-space-between {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n@define-mixin flex-start-center {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n@define-mixin flex-start-start {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n@define-mixin flex-end-space-between {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n}\n\n@define-mixin inline-flex-center-all {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@define-mixin inline-flex-center-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n@define-mixin inline-flex-center-end {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* Fonts\n   ========================================================================== */\n@define-mixin font-serif {\n  font-family: var(--font-serif-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-serif-sc);\n  }\n}\n\n@define-mixin font-sans {\n  font-family: var(--font-sans-tc);\n\n  &[lang='zh-Hans'],\n  &[data-lang='zh-Hans'] {\n    font-family: var(--font-sans-sc);\n  }\n}\n\n/* Borders\n   ========================================================================== */\n@define-mixin border-grey {\n  border: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-bottom-grey {\n  border-bottom: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-top-grey {\n  border-top: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-left-grey {\n  border-left: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin border-right-grey {\n  border-right: 1px solid var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-bottom-grey {\n  box-shadow: 0 1px 0 0 var(--color-line-grey-light);\n}\n\n@define-mixin shadow-border-top-grey {\n  box-shadow: 0 -1px 0 0 var(--color-line-grey-light);\n}\n\n/* Form\n   ========================================================================== */\n@define-mixin form-input {\n  @mixin transition;\n  @mixin border-grey;\n\n  padding: var(--spacing-base);\n  font-size: var(--font-size-md);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &::placeholder {\n    color: var(--color-grey-dark);\n    opacity: 1; /* Firefox */\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  &:-webkit-autofill::first-line {\n    font-size: var(--font-size-md);\n  }\n}\n\n@define-mixin form-input-round {\n  @mixin transition;\n  @mixin border-grey;\n\n  height: var(--input-height);\n  padding: var(--spacing-base);\n  color: var(--color-black);\n  background-color: var(--color-white);\n  border-radius: var(--spacing-x-tight);\n  transition-property: border-color, background-color;\n  caret-color: var(--color-matters-green);\n\n  &:focus,\n  &.focus {\n    border-color: var(--color-grey);\n  }\n\n  &:disabled {\n    color: var(--color-grey-dark);\n    background-color: var(--color-grey-lighter);\n    border-color: transparent;\n  }\n\n  &.error {\n    border-color: var(--color-red);\n\n    &:focus,\n    &.focus {\n      background-color: transparent;\n      border-color: var(--color-red);\n    }\n  }\n\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    margin: 0;\n    appearance: none;\n  }\n\n  /* Firefox */\n  &[type='number'] {\n    appearance: textfield;\n  }\n}\n\n@define-mixin form-container {\n  margin-right: var(--spacing-base);\n  margin-left: var(--spacing-base);\n\n  @media (--sm-up) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.field) {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  & :global(.inputContainer) {\n    margin: 0;\n  }\n}\n\n/* Components\n   ========================================================================== */\n@define-mixin feed-footer-actions {\n  @mixin flex-center-space-between;\n\n  margin-top: var(--spacing-base);\n  font-size: var(--font-size-subtext);\n  font-weight: var(--font-weight-subtext);\n  line-height: var(--line-height-subtext);\n\n  & .left,\n  & .right {\n    @mixin inline-flex-center-all;\n  }\n\n  & .left {\n    color: var(--color-grey);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n\n  & .right {\n    color: var(--color-black);\n\n    & > * + * {\n      margin-left: var(--spacing-base);\n    }\n  }\n}\n\n/* Utilities\n   ========================================================================== */\n@define-mixin expand-to-container {\n  position: absolute;\n  inset: 0;\n}\n\n@define-mixin safe-area-botttom {\n  &::after {\n    display: block;\n    padding-bottom: env(safe-area-inset-bottom);\n    content: '';\n  }\n}\n\n@define-mixin object-fit-cover {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n@define-mixin transition {\n  transition-timing-function: ease-in-out;\n  transition-duration: 0.2s;\n}\n\n@define-mixin truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: normal;\n  white-space: nowrap;\n}\n\n@define-mixin line-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n@define-mixin hide-scrollbar {\n  /* IE 10+ */\n  -ms-overflow-style: none;\n\n  /* Firefox */\n  overflow: -moz-scrollbars-none;\n\n  /* Chrome & Safari */\n  &::-webkit-scrollbar {\n    width: 0 !important;\n    height: 0 !important;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={card:"K6_vhvabquvrW3byM0ki",disabled:"f7B6HhfapfIW8xHzczEG",activeOutlineAuto:"ytALBbFzxdBJIqWg0Jr3",bgTransparent:"Vbko5VNxcEnPn9RDg6l0",bgWhite:"IazBsltHNbzT9VcUGopQ",bgGreyLighter:"OWmXfE0pndAYAV78X28w",bgActiveGreyLighter:"RdAK6uHRZHp2cS5GBqnK",bgActiveNone:"_QrPcaS7UY8Va0vKOJvz",bgActiveTransparent:"hD0qtn7mSCyM4fKpIXne",textBlack:"sgyQvShww3zKwrCJhEg4",textGreyDarker:"gN4DBzLKteQJUxsGsY4Z",textRed:"qdC_PqEt0FyVLnSxerZA",textActiveBlack:"MGd2awNHA7snLS14rGpL",textActiveRedDark:"agbpDt_ov_c8kImKV9y5",spacingYXtight:"bw3CdrIiJQoLsNtaBNAg",spacingYBaseTight:"ZKeL6NacgibIAM5hLAYN",spacingYTight:"ET84Q2b68Lv5uYi55WOv",spacingYBase:"Evy5FiQMtARSZC8nkmT3",spacingYBaseLoose:"ZOiU_LjPR8aYYZJYgMuy",spacingYLoose:"Nh7Fx_Zi7a6UGNbCYdxp",spacingXXtight:"WcYQdjItFpxgdD_oIbN5",spacingXBaseTight:"R3eQvX5rYL6n_mDCDA_I",spacingXTight:"OnoTrY4vOF7CxdZlrZQe",spacingXBase:"_6kPc3xlOl4oeTYrsB16",spacingXBaseLoose:"Q_UxI0oQPjp4QZ8F0WAa",spacingXLoose:"j4aVBQBv5vj1f_R7mD3A",hasBorder:"NYyfWPzffvns73Suejng",borderGreyLighter:"LVA0jSh6WaQveFo9lnct",borderLineGreyLight:"aHf_IzNSjcqgQRdrZAKP",borderGreen:"iQpVasiDZbGRkvoqz8iV",borderRadiusLoose:"JGqBPjCQumfvL3a9pR9w",borderRadiusBase:"BMtE2rWMX3bCP3OLI0Yo",borderRadiusXtight:"LiuL8gNjhag9yZFJn6lr",borderRadiusXxtight:"OWGYUgamn_q0AyHaVKPw"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);