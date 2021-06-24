/*! For license information please see image-sizes-js.js.LICENSE.txt */
(()=>{var __webpack_modules__={"./node_modules/axios/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/axios/lib/axios.js")},"./node_modules/axios/lib/adapters/xhr.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js"),settle=__webpack_require__("./node_modules/axios/lib/core/settle.js"),buildURL=__webpack_require__("./node_modules/axios/lib/helpers/buildURL.js"),buildFullPath=__webpack_require__("./node_modules/axios/lib/core/buildFullPath.js"),parseHeaders=__webpack_require__("./node_modules/axios/lib/helpers/parseHeaders.js"),isURLSameOrigin=__webpack_require__("./node_modules/axios/lib/helpers/isURLSameOrigin.js"),createError=__webpack_require__("./node_modules/axios/lib/core/createError.js");module.exports=function(config){return new Promise((function(resolve,reject){var requestData=config.data,requestHeaders=config.headers;utils.isFormData(requestData)&&delete requestHeaders["Content-Type"];var request=new XMLHttpRequest;if(config.auth){var username=config.auth.username||"",password=config.auth.password||"";requestHeaders.Authorization="Basic "+btoa(username+":"+password)}var fullPath=buildFullPath(config.baseURL,config.url);if(request.open(config.method.toUpperCase(),buildURL(fullPath,config.params,config.paramsSerializer),!0),request.timeout=config.timeout,request.onreadystatechange=function(){if(request&&4===request.readyState&&(0!==request.status||request.responseURL&&0===request.responseURL.indexOf("file:"))){var responseHeaders="getAllResponseHeaders"in request?parseHeaders(request.getAllResponseHeaders()):null,response={data:config.responseType&&"text"!==config.responseType?request.response:request.responseText,status:request.status,statusText:request.statusText,headers:responseHeaders,config,request};settle(resolve,reject,response),request=null}},request.onabort=function(){request&&(reject(createError("Request aborted",config,"ECONNABORTED",request)),request=null)},request.onerror=function(){reject(createError("Network Error",config,null,request)),request=null},request.ontimeout=function(){var timeoutErrorMessage="timeout of "+config.timeout+"ms exceeded";config.timeoutErrorMessage&&(timeoutErrorMessage=config.timeoutErrorMessage),reject(createError(timeoutErrorMessage,config,"ECONNABORTED",request)),request=null},utils.isStandardBrowserEnv()){var cookies=__webpack_require__("./node_modules/axios/lib/helpers/cookies.js"),xsrfValue=(config.withCredentials||isURLSameOrigin(fullPath))&&config.xsrfCookieName?cookies.read(config.xsrfCookieName):void 0;xsrfValue&&(requestHeaders[config.xsrfHeaderName]=xsrfValue)}if("setRequestHeader"in request&&utils.forEach(requestHeaders,(function(val,key){void 0===requestData&&"content-type"===key.toLowerCase()?delete requestHeaders[key]:request.setRequestHeader(key,val)})),utils.isUndefined(config.withCredentials)||(request.withCredentials=!!config.withCredentials),config.responseType)try{request.responseType=config.responseType}catch(e){if("json"!==config.responseType)throw e}"function"==typeof config.onDownloadProgress&&request.addEventListener("progress",config.onDownloadProgress),"function"==typeof config.onUploadProgress&&request.upload&&request.upload.addEventListener("progress",config.onUploadProgress),config.cancelToken&&config.cancelToken.promise.then((function(cancel){request&&(request.abort(),reject(cancel),request=null)})),void 0===requestData&&(requestData=null),request.send(requestData)}))}},"./node_modules/axios/lib/axios.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js"),bind=__webpack_require__("./node_modules/axios/lib/helpers/bind.js"),Axios=__webpack_require__("./node_modules/axios/lib/core/Axios.js"),mergeConfig=__webpack_require__("./node_modules/axios/lib/core/mergeConfig.js");function createInstance(defaultConfig){var context=new Axios(defaultConfig),instance=bind(Axios.prototype.request,context);return utils.extend(instance,Axios.prototype,context),utils.extend(instance,context),instance}var axios=createInstance(__webpack_require__("./node_modules/axios/lib/defaults.js"));axios.Axios=Axios,axios.create=function(instanceConfig){return createInstance(mergeConfig(axios.defaults,instanceConfig))},axios.Cancel=__webpack_require__("./node_modules/axios/lib/cancel/Cancel.js"),axios.CancelToken=__webpack_require__("./node_modules/axios/lib/cancel/CancelToken.js"),axios.isCancel=__webpack_require__("./node_modules/axios/lib/cancel/isCancel.js"),axios.all=function(promises){return Promise.all(promises)},axios.spread=__webpack_require__("./node_modules/axios/lib/helpers/spread.js"),module.exports=axios,module.exports.default=axios},"./node_modules/axios/lib/cancel/Cancel.js":module=>{"use strict";function Cancel(message){this.message=message}Cancel.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},Cancel.prototype.__CANCEL__=!0,module.exports=Cancel},"./node_modules/axios/lib/cancel/CancelToken.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var Cancel=__webpack_require__("./node_modules/axios/lib/cancel/Cancel.js");function CancelToken(executor){if("function"!=typeof executor)throw new TypeError("executor must be a function.");var resolvePromise;this.promise=new Promise((function(resolve){resolvePromise=resolve}));var token=this;executor((function(message){token.reason||(token.reason=new Cancel(message),resolvePromise(token.reason))}))}CancelToken.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},CancelToken.source=function(){var cancel;return{token:new CancelToken((function(c){cancel=c})),cancel}},module.exports=CancelToken},"./node_modules/axios/lib/cancel/isCancel.js":module=>{"use strict";module.exports=function(value){return!(!value||!value.__CANCEL__)}},"./node_modules/axios/lib/core/Axios.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js"),buildURL=__webpack_require__("./node_modules/axios/lib/helpers/buildURL.js"),InterceptorManager=__webpack_require__("./node_modules/axios/lib/core/InterceptorManager.js"),dispatchRequest=__webpack_require__("./node_modules/axios/lib/core/dispatchRequest.js"),mergeConfig=__webpack_require__("./node_modules/axios/lib/core/mergeConfig.js");function Axios(instanceConfig){this.defaults=instanceConfig,this.interceptors={request:new InterceptorManager,response:new InterceptorManager}}Axios.prototype.request=function(config){"string"==typeof config?(config=arguments[1]||{}).url=arguments[0]:config=config||{},(config=mergeConfig(this.defaults,config)).method?config.method=config.method.toLowerCase():this.defaults.method?config.method=this.defaults.method.toLowerCase():config.method="get";var chain=[dispatchRequest,void 0],promise=Promise.resolve(config);for(this.interceptors.request.forEach((function(interceptor){chain.unshift(interceptor.fulfilled,interceptor.rejected)})),this.interceptors.response.forEach((function(interceptor){chain.push(interceptor.fulfilled,interceptor.rejected)}));chain.length;)promise=promise.then(chain.shift(),chain.shift());return promise},Axios.prototype.getUri=function(config){return config=mergeConfig(this.defaults,config),buildURL(config.url,config.params,config.paramsSerializer).replace(/^\?/,"")},utils.forEach(["delete","get","head","options"],(function(method){Axios.prototype[method]=function(url,config){return this.request(utils.merge(config||{},{method,url}))}})),utils.forEach(["post","put","patch"],(function(method){Axios.prototype[method]=function(url,data,config){return this.request(utils.merge(config||{},{method,url,data}))}})),module.exports=Axios},"./node_modules/axios/lib/core/InterceptorManager.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js");function InterceptorManager(){this.handlers=[]}InterceptorManager.prototype.use=function(fulfilled,rejected){return this.handlers.push({fulfilled,rejected}),this.handlers.length-1},InterceptorManager.prototype.eject=function(id){this.handlers[id]&&(this.handlers[id]=null)},InterceptorManager.prototype.forEach=function(fn){utils.forEach(this.handlers,(function(h){null!==h&&fn(h)}))},module.exports=InterceptorManager},"./node_modules/axios/lib/core/buildFullPath.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var isAbsoluteURL=__webpack_require__("./node_modules/axios/lib/helpers/isAbsoluteURL.js"),combineURLs=__webpack_require__("./node_modules/axios/lib/helpers/combineURLs.js");module.exports=function(baseURL,requestedURL){return baseURL&&!isAbsoluteURL(requestedURL)?combineURLs(baseURL,requestedURL):requestedURL}},"./node_modules/axios/lib/core/createError.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var enhanceError=__webpack_require__("./node_modules/axios/lib/core/enhanceError.js");module.exports=function(message,config,code,request,response){var error=new Error(message);return enhanceError(error,config,code,request,response)}},"./node_modules/axios/lib/core/dispatchRequest.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js"),transformData=__webpack_require__("./node_modules/axios/lib/core/transformData.js"),isCancel=__webpack_require__("./node_modules/axios/lib/cancel/isCancel.js"),defaults=__webpack_require__("./node_modules/axios/lib/defaults.js");function throwIfCancellationRequested(config){config.cancelToken&&config.cancelToken.throwIfRequested()}module.exports=function(config){return throwIfCancellationRequested(config),config.headers=config.headers||{},config.data=transformData(config.data,config.headers,config.transformRequest),config.headers=utils.merge(config.headers.common||{},config.headers[config.method]||{},config.headers),utils.forEach(["delete","get","head","post","put","patch","common"],(function(method){delete config.headers[method]})),(config.adapter||defaults.adapter)(config).then((function(response){return throwIfCancellationRequested(config),response.data=transformData(response.data,response.headers,config.transformResponse),response}),(function(reason){return isCancel(reason)||(throwIfCancellationRequested(config),reason&&reason.response&&(reason.response.data=transformData(reason.response.data,reason.response.headers,config.transformResponse))),Promise.reject(reason)}))}},"./node_modules/axios/lib/core/enhanceError.js":module=>{"use strict";module.exports=function(error,config,code,request,response){return error.config=config,code&&(error.code=code),error.request=request,error.response=response,error.isAxiosError=!0,error.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},error}},"./node_modules/axios/lib/core/mergeConfig.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js");module.exports=function(config1,config2){config2=config2||{};var config={},valueFromConfig2Keys=["url","method","params","data"],mergeDeepPropertiesKeys=["headers","auth","proxy"],defaultToConfig2Keys=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];utils.forEach(valueFromConfig2Keys,(function(prop){void 0!==config2[prop]&&(config[prop]=config2[prop])})),utils.forEach(mergeDeepPropertiesKeys,(function(prop){utils.isObject(config2[prop])?config[prop]=utils.deepMerge(config1[prop],config2[prop]):void 0!==config2[prop]?config[prop]=config2[prop]:utils.isObject(config1[prop])?config[prop]=utils.deepMerge(config1[prop]):void 0!==config1[prop]&&(config[prop]=config1[prop])})),utils.forEach(defaultToConfig2Keys,(function(prop){void 0!==config2[prop]?config[prop]=config2[prop]:void 0!==config1[prop]&&(config[prop]=config1[prop])}));var axiosKeys=valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys),otherKeys=Object.keys(config2).filter((function(key){return-1===axiosKeys.indexOf(key)}));return utils.forEach(otherKeys,(function(prop){void 0!==config2[prop]?config[prop]=config2[prop]:void 0!==config1[prop]&&(config[prop]=config1[prop])})),config}},"./node_modules/axios/lib/core/settle.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var createError=__webpack_require__("./node_modules/axios/lib/core/createError.js");module.exports=function(resolve,reject,response){var validateStatus=response.config.validateStatus;!validateStatus||validateStatus(response.status)?resolve(response):reject(createError("Request failed with status code "+response.status,response.config,null,response.request,response))}},"./node_modules/axios/lib/core/transformData.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js");module.exports=function(data,headers,fns){return utils.forEach(fns,(function(fn){data=fn(data,headers)})),data}},"./node_modules/axios/lib/defaults.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js"),normalizeHeaderName=__webpack_require__("./node_modules/axios/lib/helpers/normalizeHeaderName.js"),DEFAULT_CONTENT_TYPE={"Content-Type":"application/x-www-form-urlencoded"};function setContentTypeIfUnset(headers,value){!utils.isUndefined(headers)&&utils.isUndefined(headers["Content-Type"])&&(headers["Content-Type"]=value)}var adapter,defaults={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(adapter=__webpack_require__("./node_modules/axios/lib/adapters/xhr.js")),adapter),transformRequest:[function(data,headers){return normalizeHeaderName(headers,"Accept"),normalizeHeaderName(headers,"Content-Type"),utils.isFormData(data)||utils.isArrayBuffer(data)||utils.isBuffer(data)||utils.isStream(data)||utils.isFile(data)||utils.isBlob(data)?data:utils.isArrayBufferView(data)?data.buffer:utils.isURLSearchParams(data)?(setContentTypeIfUnset(headers,"application/x-www-form-urlencoded;charset=utf-8"),data.toString()):utils.isObject(data)?(setContentTypeIfUnset(headers,"application/json;charset=utf-8"),JSON.stringify(data)):data}],transformResponse:[function(data){if("string"==typeof data)try{data=JSON.parse(data)}catch(e){}return data}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(status){return status>=200&&status<300}};defaults.headers={common:{Accept:"application/json, text/plain, */*"}},utils.forEach(["delete","get","head"],(function(method){defaults.headers[method]={}})),utils.forEach(["post","put","patch"],(function(method){defaults.headers[method]=utils.merge(DEFAULT_CONTENT_TYPE)})),module.exports=defaults},"./node_modules/axios/lib/helpers/bind.js":module=>{"use strict";module.exports=function(fn,thisArg){return function(){for(var args=new Array(arguments.length),i=0;i<args.length;i++)args[i]=arguments[i];return fn.apply(thisArg,args)}}},"./node_modules/axios/lib/helpers/buildURL.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js");function encode(val){return encodeURIComponent(val).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}module.exports=function(url,params,paramsSerializer){if(!params)return url;var serializedParams;if(paramsSerializer)serializedParams=paramsSerializer(params);else if(utils.isURLSearchParams(params))serializedParams=params.toString();else{var parts=[];utils.forEach(params,(function(val,key){null!=val&&(utils.isArray(val)?key+="[]":val=[val],utils.forEach(val,(function(v){utils.isDate(v)?v=v.toISOString():utils.isObject(v)&&(v=JSON.stringify(v)),parts.push(encode(key)+"="+encode(v))})))})),serializedParams=parts.join("&")}if(serializedParams){var hashmarkIndex=url.indexOf("#");-1!==hashmarkIndex&&(url=url.slice(0,hashmarkIndex)),url+=(-1===url.indexOf("?")?"?":"&")+serializedParams}return url}},"./node_modules/axios/lib/helpers/combineURLs.js":module=>{"use strict";module.exports=function(baseURL,relativeURL){return relativeURL?baseURL.replace(/\/+$/,"")+"/"+relativeURL.replace(/^\/+/,""):baseURL}},"./node_modules/axios/lib/helpers/cookies.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js");module.exports=utils.isStandardBrowserEnv()?{write:function(name,value,expires,path,domain,secure){var cookie=[];cookie.push(name+"="+encodeURIComponent(value)),utils.isNumber(expires)&&cookie.push("expires="+new Date(expires).toGMTString()),utils.isString(path)&&cookie.push("path="+path),utils.isString(domain)&&cookie.push("domain="+domain),!0===secure&&cookie.push("secure"),document.cookie=cookie.join("; ")},read:function(name){var match=document.cookie.match(new RegExp("(^|;\\s*)("+name+")=([^;]*)"));return match?decodeURIComponent(match[3]):null},remove:function(name){this.write(name,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},"./node_modules/axios/lib/helpers/isAbsoluteURL.js":module=>{"use strict";module.exports=function(url){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)}},"./node_modules/axios/lib/helpers/isURLSameOrigin.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js");module.exports=utils.isStandardBrowserEnv()?function(){var originURL,msie=/(msie|trident)/i.test(navigator.userAgent),urlParsingNode=document.createElement("a");function resolveURL(url){var href=url;return msie&&(urlParsingNode.setAttribute("href",href),href=urlParsingNode.href),urlParsingNode.setAttribute("href",href),{href:urlParsingNode.href,protocol:urlParsingNode.protocol?urlParsingNode.protocol.replace(/:$/,""):"",host:urlParsingNode.host,search:urlParsingNode.search?urlParsingNode.search.replace(/^\?/,""):"",hash:urlParsingNode.hash?urlParsingNode.hash.replace(/^#/,""):"",hostname:urlParsingNode.hostname,port:urlParsingNode.port,pathname:"/"===urlParsingNode.pathname.charAt(0)?urlParsingNode.pathname:"/"+urlParsingNode.pathname}}return originURL=resolveURL(window.location.href),function(requestURL){var parsed=utils.isString(requestURL)?resolveURL(requestURL):requestURL;return parsed.protocol===originURL.protocol&&parsed.host===originURL.host}}():function(){return!0}},"./node_modules/axios/lib/helpers/normalizeHeaderName.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js");module.exports=function(headers,normalizedName){utils.forEach(headers,(function(value,name){name!==normalizedName&&name.toUpperCase()===normalizedName.toUpperCase()&&(headers[normalizedName]=value,delete headers[name])}))}},"./node_modules/axios/lib/helpers/parseHeaders.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var utils=__webpack_require__("./node_modules/axios/lib/utils.js"),ignoreDuplicateOf=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];module.exports=function(headers){var key,val,i,parsed={};return headers?(utils.forEach(headers.split("\n"),(function(line){if(i=line.indexOf(":"),key=utils.trim(line.substr(0,i)).toLowerCase(),val=utils.trim(line.substr(i+1)),key){if(parsed[key]&&ignoreDuplicateOf.indexOf(key)>=0)return;parsed[key]="set-cookie"===key?(parsed[key]?parsed[key]:[]).concat([val]):parsed[key]?parsed[key]+", "+val:val}})),parsed):parsed}},"./node_modules/axios/lib/helpers/spread.js":module=>{"use strict";module.exports=function(callback){return function(arr){return callback.apply(null,arr)}}},"./node_modules/axios/lib/utils.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var bind=__webpack_require__("./node_modules/axios/lib/helpers/bind.js"),toString=Object.prototype.toString;function isArray(val){return"[object Array]"===toString.call(val)}function isUndefined(val){return void 0===val}function isObject(val){return null!==val&&"object"==typeof val}function isFunction(val){return"[object Function]"===toString.call(val)}function forEach(obj,fn){if(null!=obj)if("object"!=typeof obj&&(obj=[obj]),isArray(obj))for(var i=0,l=obj.length;i<l;i++)fn.call(null,obj[i],i,obj);else for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&fn.call(null,obj[key],key,obj)}module.exports={isArray,isArrayBuffer:function(val){return"[object ArrayBuffer]"===toString.call(val)},isBuffer:function(val){return null!==val&&!isUndefined(val)&&null!==val.constructor&&!isUndefined(val.constructor)&&"function"==typeof val.constructor.isBuffer&&val.constructor.isBuffer(val)},isFormData:function(val){return"undefined"!=typeof FormData&&val instanceof FormData},isArrayBufferView:function(val){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(val):val&&val.buffer&&val.buffer instanceof ArrayBuffer},isString:function(val){return"string"==typeof val},isNumber:function(val){return"number"==typeof val},isObject,isUndefined,isDate:function(val){return"[object Date]"===toString.call(val)},isFile:function(val){return"[object File]"===toString.call(val)},isBlob:function(val){return"[object Blob]"===toString.call(val)},isFunction,isStream:function(val){return isObject(val)&&isFunction(val.pipe)},isURLSearchParams:function(val){return"undefined"!=typeof URLSearchParams&&val instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach,merge:function merge(){var result={};function assignValue(val,key){"object"==typeof result[key]&&"object"==typeof val?result[key]=merge(result[key],val):result[key]=val}for(var i=0,l=arguments.length;i<l;i++)forEach(arguments[i],assignValue);return result},deepMerge:function deepMerge(){var result={};function assignValue(val,key){"object"==typeof result[key]&&"object"==typeof val?result[key]=deepMerge(result[key],val):result[key]="object"==typeof val?deepMerge({},val):val}for(var i=0,l=arguments.length;i<l;i++)forEach(arguments[i],assignValue);return result},extend:function(a,b,thisArg){return forEach(b,(function(val,key){a[key]=thisArg&&"function"==typeof val?bind(val,thisArg):val})),a},trim:function(str){return str.replace(/^\s*/,"").replace(/\s*$/,"")}}},"./src/image-sizes/image-sizes.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__);var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/index.js"),axios__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__),__=wp.i18n.__;wp.i18n._n;jQuery((function($){var MPP_Image_Sizes={init:function(){this.registerAddImageSize(),this.registerEditImageSize(),this.registerCancelImageSize(),this.registerSaveImageSize(),this.registerDeleteImageSize()},sendCommand:function(action,data,callback){var options=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},default_options={json:!0,alert_on_error:!1,prefix:"mpp_",nonce:$("#_mpp").val(),timeout:null,async:!0,type:"POST"};for(var opt in default_options)options.hasOwnProperty(opt)||(options[opt]=default_options[opt]);var formData=new FormData;for(var key in data)formData.append(key,data[key]);formData.append("action",options.prefix+action),axios__WEBPACK_IMPORTED_MODULE_0___default()({method:options.type,url:ajaxurl,data:formData}).then((function(response){$.unblockUI(),response.data.success||!options.alert_on_error?"function"==typeof callback&&callback(response.data):alert(response.data.data.message)}),(function(response){$.unblockUI(),alert(__("Could not complete request","metronet-profile-picture"))}))},registerAddImageSize:function(){$("body").on("click","#mpp-image-size-save",(function(e){e.preventDefault(),MPP_Image_Sizes.sendCommand("add_image_size",{nonce:$("#_mpp").val(),width:$("#mpp-field-image-size-width-input").val(),height:$("#mpp-field-image-size-height-input").val(),name:$("#mpp-field-image-sizes-input").val()},(function(response){response.success?($(".image-size-status").removeClass("mpp-success mpp-error").addClass("mpp-success").html(response.data.message).css("display","block"),$("#mpp-image-sizes-table").html(response.data.html)):$(".image-size-status").removeClass("mpp-success mpp-error").addClass("mpp-error").html(response.data[0].message).css("display","block"),setTimeout((function(){$(".image-size-status").fadeOut()}),5e3)}))}))},registerEditImageSize:function(){$("body").on("click",".mpp-image-size-edit",(function(e){e.preventDefault();var $parent=$(e.target).parents(".mpp-image-size-row");$parent.find("span").hide(),$parent.find("input").attr("type","text"),$parent.find("input:first").trigger("focus"),$parent.find(".mpp-image-size-edit, .mpp-image-size-delete").hide(),$parent.find(".mpp-image-size-save, .mpp-image-size-cancel").show()}))},registerCancelImageSize:function(){$("body").on("click",".mpp-image-size-cancel",(function(e){e.preventDefault();var $parent=$(e.target).parents(".mpp-image-size-row");$parent.find("span").show(),$parent.find("input").attr("type","hidden"),$parent.find(".mpp-image-size-edit, .mpp-image-size-delete").show(),$parent.find(".mpp-image-size-save, .mpp-image-size-cancel").hide()}))},registerSaveImageSize:function(){$("body").on("click",".mpp-image-size-save",(function(e){e.preventDefault();var $parent=$(e.target).parents(".mpp-image-size-row");MPP_Image_Sizes.sendCommand("edit_image_size",{nonce:$("#_mpp").val(),slug:$parent.find(".mpp-image-size-table-name").data("slug"),width:$parent.find(".mpp-image-size-table-width").val(),height:$parent.find(".mpp-image-size-table-height").val(),name:$parent.find(".mpp-image-size-table-name").val()},(function(response){response.success?$("#mpp-image-sizes-table").html(response.data.html):alert(response.data[0].message)}))}))},registerDeleteImageSize:function(){$("body").on("click",".mpp-image-size-delete",(function(e){e.preventDefault();var $parent=$(e.target).parents(".mpp-image-size-row");MPP_Image_Sizes.sendCommand("delete_image_size",{nonce:$("#_mpp").val(),slug:$parent.find(".mpp-image-size-table-name").data("slug")},(function(response){response.success?$("#mpp-image-sizes-table").html(response.data.html):alert(response.data[0].message)}))}))}};MPP_Image_Sizes.init()}))}},__webpack_module_cache__={};function __webpack_require__(moduleId){if(__webpack_module_cache__[moduleId])return __webpack_module_cache__[moduleId].exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__("./src/image-sizes/image-sizes.js")})();
//# sourceMappingURL=image-sizes-js.js.map