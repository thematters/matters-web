"use strict";(self.webpackChunkmatters_web=self.webpackChunkmatters_web||[]).push([[7019],{"./node_modules/viem/_esm/utils/ccip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{offchainLookup:()=>offchainLookup,offchainLookupSignature:()=>offchainLookupSignature});var call=__webpack_require__("./node_modules/viem/_esm/actions/public/call.js"),stringify=__webpack_require__("./node_modules/viem/_esm/utils/stringify.js"),base=__webpack_require__("./node_modules/viem/_esm/errors/base.js"),utils=__webpack_require__("./node_modules/viem/_esm/errors/utils.js");class OffchainLookupError extends base.G{constructor({callbackSelector,cause,data,extraData,sender,urls}){super(cause.shortMessage||"An error occurred while fetching for an offchain result.",{cause,metaMessages:[...cause.metaMessages||[],cause.metaMessages?.length?"":[],"Offchain Gateway Call:",urls&&["  Gateway URL(s):",...urls.map((url=>`    ${(0,utils.Gr)(url)}`))],`  Sender: ${sender}`,`  Data: ${data}`,`  Callback selector: ${callbackSelector}`,`  Extra data: ${extraData}`].flat()}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupError"})}}class OffchainLookupResponseMalformedError extends base.G{constructor({result,url}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${(0,utils.Gr)(url)}`,`Response: ${(0,stringify.P)(result)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupResponseMalformedError"})}}class OffchainLookupSenderMismatchError extends base.G{constructor({sender,to}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${to}`,`OffchainLookup sender address: ${sender}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupSenderMismatchError"})}}var request=__webpack_require__("./node_modules/viem/_esm/errors/request.js"),decodeErrorResult=__webpack_require__("./node_modules/viem/_esm/utils/abi/decodeErrorResult.js"),encodeAbiParameters=__webpack_require__("./node_modules/viem/_esm/utils/abi/encodeAbiParameters.js"),address=__webpack_require__("./node_modules/viem/_esm/errors/address.js"),isAddress=__webpack_require__("./node_modules/viem/_esm/utils/address/isAddress.js");var concat=__webpack_require__("./node_modules/viem/_esm/utils/data/concat.js"),isHex=__webpack_require__("./node_modules/viem/_esm/utils/data/isHex.js");const offchainLookupSignature="0x556f1830",offchainLookupAbiItem={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function offchainLookup(client,{blockNumber,blockTag,data,to}){const{args}=(0,decodeErrorResult.p)({data,abi:[offchainLookupAbiItem]}),[sender,urls,callData,callbackSelector,extraData]=args;try{if(!function isAddressEqual(a,b){if(!(0,isAddress.U)(a))throw new address.b({address:a});if(!(0,isAddress.U)(b))throw new address.b({address:b});return a.toLowerCase()===b.toLowerCase()}(to,sender))throw new OffchainLookupSenderMismatchError({sender,to});const result=await async function ccipFetch({data,sender,urls}){let error=new Error("An unknown error occurred.");for(let i=0;i<urls.length;i++){const url=urls[i],method=url.includes("{data}")?"GET":"POST",body="POST"===method?{data,sender}:void 0;try{const response=await fetch(url.replace("{sender}",sender).replace("{data}",data),{body:JSON.stringify(body),method});let result;if(result=response.headers.get("Content-Type")?.startsWith("application/json")?(await response.json()).data:await response.text(),!response.ok){error=new request.Gg({body,details:result?.error?(0,stringify.P)(result.error):response.statusText,headers:response.headers,status:response.status,url});continue}if(!(0,isHex.v)(result)){error=new OffchainLookupResponseMalformedError({result,url});continue}return result}catch(err){error=new request.Gg({body,details:err.message,url})}}throw error}({data:callData,sender,urls}),{data:data_}=await(0,call.R)(client,{blockNumber,blockTag,data:(0,concat.zo)([callbackSelector,(0,encodeAbiParameters.E)([{type:"bytes"},{type:"bytes"}],[result,extraData])]),to});return data_}catch(err){throw new OffchainLookupError({callbackSelector,cause:err,data,extraData,sender,urls})}}}}]);