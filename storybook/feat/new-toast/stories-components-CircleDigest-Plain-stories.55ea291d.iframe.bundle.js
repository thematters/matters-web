(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[1386],{"./src/stories/components/CircleDigest/Plain.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Plain:()=>Plain,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Plain$parameters,_Plain$parameters2,_Plain$parameters2$do,_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/defineProperty.js"),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__),_apollo_react_testing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@apollo/react-testing/lib/react-testing.esm.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/CircleDigest/index.tsx"),_mocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/stories/mocks/index.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_1__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_defineProperty_js__WEBPACK_IMPORTED_MODULE_0___default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const __WEBPACK_DEFAULT_EXPORT__={title:"Components/CircleDigest",component:_components__WEBPACK_IMPORTED_MODULE_2__.a.Plain};var Template=function Template(args){return __jsx(_apollo_react_testing__WEBPACK_IMPORTED_MODULE_3__.ge,null,__jsx(_components__WEBPACK_IMPORTED_MODULE_2__.a.Plain,args))};Template.displayName="Template";var Plain=Template.bind({});Plain.args={circle:_mocks__WEBPACK_IMPORTED_MODULE_4__.xe},Plain.parameters=_objectSpread(_objectSpread({},Plain.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Plain$parameters=Plain.parameters)||void 0===_Plain$parameters?void 0:_Plain$parameters.docs),{},{source:_objectSpread({originalSource:"args => <MockedProvider>\n    <CircleDigest.Plain {...args} />\n  </MockedProvider>"},null===(_Plain$parameters2=Plain.parameters)||void 0===_Plain$parameters2||null===(_Plain$parameters2$do=_Plain$parameters2.docs)||void 0===_Plain$parameters2$do?void 0:_Plain$parameters2$do.source)})})},"./src/common/utils/number/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Fu:()=>numAbbr,ZX:()=>numRound});var index_es=__webpack_require__("./node_modules/number-precision/build/index.es.js"),UNITS=["k","m","b","t"],abbr=function abbr(num,decPlaces){var isNegative=num<0,abbreviatedNumber=function abbreviate(num,decPlaces){decPlaces=Math.pow(10,decPlaces);for(var i=UNITS.length-1;i>=0;i--){var size=Math.pow(10,3*(i+1));if(size<=num){1e3==(num=Math.round(num*decPlaces/size)/decPlaces)&&i<UNITS.length-1&&(num=1,i++),num+=UNITS[i];break}}return num+""}(Math.abs(num),decPlaces||0);return isNegative?"-"+abbreviatedNumber:abbreviatedNumber};index_es.ZP.enableBoundaryChecking(!1);var numAbbr=function numAbbr(num){return abbr(num,arguments.length>1&&void 0!==arguments[1]?arguments[1]:1)},numRound=function numRound(num){var decPlaces=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return index_es.ZP.round(num,decPlaces)}},"./src/components/Icon/IconArticle16.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{IconArticle16:()=>IconArticle16});var _path,_path2,_path3,_path4,react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var IconArticle16=(0,__webpack_require__("./src/components/Icon/withIcon.tsx").H)((function SvgArticle(props){return react.createElement("svg",_extends({fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},props),_path||(_path=react.createElement("path",{d:"M2.1001 1.5H13.8779V11.2935C13.8779 13.1946 12.0073 14.75 9.72101 14.75H2.1001V1.5Z",stroke:"currentColor",strokeWidth:1.2,strokeMiterlimit:10,strokeLinecap:"round",strokeLinejoin:"round"})),_path2||(_path2=react.createElement("path",{d:"M5.04443 11.0695L7.98888 11.0695",stroke:"currentColor",strokeWidth:1.2,strokeMiterlimit:10,strokeLinecap:"round",strokeLinejoin:"round"})),_path3||(_path3=react.createElement("path",{d:"M5.04443 8.125H10.1972",stroke:"currentColor",strokeWidth:1.2,strokeMiterlimit:10,strokeLinecap:"round",strokeLinejoin:"round"})),_path4||(_path4=react.createElement("path",{d:"M5.04443 5.18054H10.1972",stroke:"currentColor",strokeWidth:1.2,strokeMiterlimit:10,strokeLinecap:"round",strokeLinejoin:"round"})))}));try{IconArticle16.displayName="IconArticle16",IconArticle16.__docgenInfo={description:"",displayName:"IconArticle16",props:{size:{defaultValue:null,description:"Working Icon description",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'},{value:'"smS"'},{value:'"mdS"'},{value:'"xxs"'},{value:'"mdXS"'},{value:'"mdM"'},{value:'"xlM"'}]}},color:{defaultValue:null,description:"Working Icon description",name:"color",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"white"'},{value:'"greyDarker"'},{value:'"green"'},{value:'"greyLighter"'},{value:'"red"'},{value:'"gold"'},{value:'"grey"'},{value:'"greyLight"'},{value:'"greyDark"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Icon/IconArticle16.tsx#IconArticle16"]={docgenInfo:IconArticle16.__docgenInfo,name:"IconArticle16",path:"src/components/Icon/IconArticle16.tsx#IconArticle16"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Icon/IconUser16.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{IconUser16:()=>IconUser16});var _path,_circle,react=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var IconUser16=(0,__webpack_require__("./src/components/Icon/withIcon.tsx").H)((function SvgUser(props){return react.createElement("svg",_extends({fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},props),_path||(_path=react.createElement("path",{d:"M3.07187 11.5612C3.1903 10.3769 4.18686 9.475 5.37707 9.475H11.1228C12.313 9.475 13.3096 10.3769 13.428 11.5612L13.7119 14.3999H2.78799L3.07187 11.5612Z",stroke:"currentColor",strokeWidth:1.2,strokeMiterlimit:10})),_circle||(_circle=react.createElement("circle",{cx:8.24997,cy:4.49997,r:2.89997,stroke:"currentColor",strokeWidth:1.2,strokeMiterlimit:10})))}));try{IconUser16.displayName="IconUser16",IconUser16.__docgenInfo={description:"",displayName:"IconUser16",props:{size:{defaultValue:null,description:"Working Icon description",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'},{value:'"smS"'},{value:'"mdS"'},{value:'"xxs"'},{value:'"mdXS"'},{value:'"mdM"'},{value:'"xlM"'}]}},color:{defaultValue:null,description:"Working Icon description",name:"color",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"white"'},{value:'"greyDarker"'},{value:'"green"'},{value:'"greyLighter"'},{value:'"red"'},{value:'"gold"'},{value:'"grey"'},{value:'"greyLight"'},{value:'"greyDark"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Icon/IconUser16.tsx#IconUser16"]={docgenInfo:IconUser16.__docgenInfo,name:"IconUser16",path:"src/components/Icon/IconUser16.tsx#IconUser16"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/lodash/isNil.js":module=>{module.exports=function isNil(value){return null==value}},"./node_modules/number-precision/build/index.es.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var console=__webpack_require__("./node_modules/console-browserify/index.js");function strip(num,precision){return void 0===precision&&(precision=15),+parseFloat(Number(num).toPrecision(precision))}function digitLength(num){var eSplit=num.toString().split(/[eE]/),len=(eSplit[0].split(".")[1]||"").length-+(eSplit[1]||0);return len>0?len:0}function float2Fixed(num){if(-1===num.toString().indexOf("e"))return Number(num.toString().replace(".",""));var dLen=digitLength(num);return dLen>0?strip(Number(num)*Math.pow(10,dLen)):Number(num)}function checkBoundary(num){_boundaryCheckingState&&(num>Number.MAX_SAFE_INTEGER||num<Number.MIN_SAFE_INTEGER)&&console.warn(num+" is beyond boundary when transfer to integer, the results may not be accurate")}function createOperation(operation){return function(){for(var nums=[],_i=0;_i<arguments.length;_i++)nums[_i]=arguments[_i];var first=nums[0];return nums.slice(1).reduce((function(prev,next){return operation(prev,next)}),first)}}var times=createOperation((function(num1,num2){var num1Changed=float2Fixed(num1),num2Changed=float2Fixed(num2),baseNum=digitLength(num1)+digitLength(num2),leftValue=num1Changed*num2Changed;return checkBoundary(leftValue),leftValue/Math.pow(10,baseNum)})),plus=createOperation((function(num1,num2){var baseNum=Math.pow(10,Math.max(digitLength(num1),digitLength(num2)));return(times(num1,baseNum)+times(num2,baseNum))/baseNum})),minus=createOperation((function(num1,num2){var baseNum=Math.pow(10,Math.max(digitLength(num1),digitLength(num2)));return(times(num1,baseNum)-times(num2,baseNum))/baseNum})),divide=createOperation((function(num1,num2){var num1Changed=float2Fixed(num1),num2Changed=float2Fixed(num2);return checkBoundary(num1Changed),checkBoundary(num2Changed),times(num1Changed/num2Changed,strip(Math.pow(10,digitLength(num2)-digitLength(num1))))}));var _boundaryCheckingState=!0;const __WEBPACK_DEFAULT_EXPORT__={strip,plus,minus,times,divide,round:function round(num,decimal){var base=Math.pow(10,decimal),result=divide(Math.round(Math.abs(times(num,base))),base);return num<0&&0!==result&&(result=times(result,-1)),result},digitLength,float2Fixed,enableBoundaryChecking:function enableBoundaryChecking(flag){void 0===flag&&(flag=!0),_boundaryCheckingState=flag}}}}]);