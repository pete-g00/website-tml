"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1258],{41258:function(e,t,r){r.r(t),r.d(t,{Adapter:function(){return C},CodeActionAdaptor:function(){return B},DefinitionAdapter:function(){return O},DiagnosticsAdapter:function(){return D},FormatAdapter:function(){return W},FormatHelper:function(){return V},FormatOnTypeAdapter:function(){return j},InlayHintsAdapter:function(){return z},Kind:function(){return M},LibFiles:function(){return A},OccurrencesAdapter:function(){return P},OutlineAdapter:function(){return K},QuickInfoAdapter:function(){return T},ReferenceAdapter:function(){return N},RenameAdapter:function(){return U},SignatureHelpAdapter:function(){return L},SuggestAdapter:function(){return F},WorkerManager:function(){return _},flattenDiagnosticMessageText:function(){return w},getJavaScriptWorker:function(){return Q},getTypeScriptWorker:function(){return q},setupJavaScript:function(){return J},setupTypeScript:function(){return G}});var n=r(1413),i=r(84506),s=r(97326),a=r(60136),o=r(27277),u=r(74165),c=r(15861),l=r(15671),f=r(43144),p=r(4942),d=r(37762),g=r(41875),b=r(64104),h=Object.defineProperty,m=Object.getOwnPropertyDescriptor,v=Object.getOwnPropertyNames,y=Object.prototype.hasOwnProperty,k=function(e,t,r){return function(e,t,r){t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r}(e,"symbol"!==typeof t?t+"":t,r),r},x={};!function(e,t,r,n){if(t&&"object"===typeof t||"function"===typeof t){var i,s=(0,d.Z)(v(t));try{var a=function(){var s=i.value;y.call(e,s)||!r&&"default"===s||h(e,s,{get:function(){return t[s]},enumerable:!(n=m(t,s))||n.enumerable})};for(s.s();!(i=s.n()).done;)a()}catch(o){s.e(o)}finally{s.f()}}}(x,g);var _=function(){function e(t,r){var n=this;(0,l.Z)(this,e),(0,p.Z)(this,"_modeId",void 0),(0,p.Z)(this,"_defaults",void 0),(0,p.Z)(this,"_configChangeListener",void 0),(0,p.Z)(this,"_updateExtraLibsToken",void 0),(0,p.Z)(this,"_extraLibsChangeListener",void 0),(0,p.Z)(this,"_worker",void 0),(0,p.Z)(this,"_client",void 0),this._modeId=t,this._defaults=r,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((function(){return n._stopWorker()})),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((function(){return n._updateExtraLibs()}))}return(0,f.Z)(e,[{key:"_stopWorker",value:function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}},{key:"dispose",value:function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}},{key:"_updateExtraLibs",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(){var t,r;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._worker){e.next=2;break}return e.abrupt("return");case 2:return t=++this._updateExtraLibsToken,e.next=5,this._worker.getProxy();case 5:if(r=e.sent,this._updateExtraLibsToken===t){e.next=8;break}return e.abrupt("return");case 8:r.updateExtraLibs(this._defaults.getExtraLibs());case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_getClient",value:function(){var e=this;if(!this._client){this._worker=x.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then((function(t){return e._worker?e._worker.withSyncedResources(x.editor.getModels().filter((function(t){return t.getLanguageId()===e._modeId})).map((function(e){return e.uri}))):t}))),this._client=t}return this._client}},{key:"getLanguageServiceWorker",value:function(){for(var e,t=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return this._getClient().then((function(t){e=t})).then((function(e){if(t._worker)return t._worker.withSyncedResources(n)})).then((function(t){return e}))}}]),e}(),Z={};function w(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if("string"===typeof e)return e;if(void 0===e)return"";var n="";if(r){n+=t;for(var i=0;i<r;i++)n+="  "}if(n+=e.messageText,r++,e.next){var s,a=(0,d.Z)(e.next);try{for(a.s();!(s=a.n()).done;){var o=s.value;n+=w(o,t,r)}}catch(u){a.e(u)}finally{a.f()}}return n}function S(e){return e?e.map((function(e){return e.text})).join(""):""}Z["lib.d.ts"]=!0,Z["lib.dom.d.ts"]=!0,Z["lib.dom.iterable.d.ts"]=!0,Z["lib.es2015.collection.d.ts"]=!0,Z["lib.es2015.core.d.ts"]=!0,Z["lib.es2015.d.ts"]=!0,Z["lib.es2015.generator.d.ts"]=!0,Z["lib.es2015.iterable.d.ts"]=!0,Z["lib.es2015.promise.d.ts"]=!0,Z["lib.es2015.proxy.d.ts"]=!0,Z["lib.es2015.reflect.d.ts"]=!0,Z["lib.es2015.symbol.d.ts"]=!0,Z["lib.es2015.symbol.wellknown.d.ts"]=!0,Z["lib.es2016.array.include.d.ts"]=!0,Z["lib.es2016.d.ts"]=!0,Z["lib.es2016.full.d.ts"]=!0,Z["lib.es2017.d.ts"]=!0,Z["lib.es2017.full.d.ts"]=!0,Z["lib.es2017.intl.d.ts"]=!0,Z["lib.es2017.object.d.ts"]=!0,Z["lib.es2017.sharedmemory.d.ts"]=!0,Z["lib.es2017.string.d.ts"]=!0,Z["lib.es2017.typedarrays.d.ts"]=!0,Z["lib.es2018.asyncgenerator.d.ts"]=!0,Z["lib.es2018.asynciterable.d.ts"]=!0,Z["lib.es2018.d.ts"]=!0,Z["lib.es2018.full.d.ts"]=!0,Z["lib.es2018.intl.d.ts"]=!0,Z["lib.es2018.promise.d.ts"]=!0,Z["lib.es2018.regexp.d.ts"]=!0,Z["lib.es2019.array.d.ts"]=!0,Z["lib.es2019.d.ts"]=!0,Z["lib.es2019.full.d.ts"]=!0,Z["lib.es2019.object.d.ts"]=!0,Z["lib.es2019.string.d.ts"]=!0,Z["lib.es2019.symbol.d.ts"]=!0,Z["lib.es2020.bigint.d.ts"]=!0,Z["lib.es2020.d.ts"]=!0,Z["lib.es2020.full.d.ts"]=!0,Z["lib.es2020.intl.d.ts"]=!0,Z["lib.es2020.promise.d.ts"]=!0,Z["lib.es2020.sharedmemory.d.ts"]=!0,Z["lib.es2020.string.d.ts"]=!0,Z["lib.es2020.symbol.wellknown.d.ts"]=!0,Z["lib.es2021.d.ts"]=!0,Z["lib.es2021.full.d.ts"]=!0,Z["lib.es2021.intl.d.ts"]=!0,Z["lib.es2021.promise.d.ts"]=!0,Z["lib.es2021.string.d.ts"]=!0,Z["lib.es2021.weakref.d.ts"]=!0,Z["lib.es5.d.ts"]=!0,Z["lib.es6.d.ts"]=!0,Z["lib.esnext.d.ts"]=!0,Z["lib.esnext.full.d.ts"]=!0,Z["lib.esnext.intl.d.ts"]=!0,Z["lib.esnext.promise.d.ts"]=!0,Z["lib.esnext.string.d.ts"]=!0,Z["lib.esnext.weakref.d.ts"]=!0,Z["lib.scripthost.d.ts"]=!0,Z["lib.webworker.d.ts"]=!0,Z["lib.webworker.importscripts.d.ts"]=!0,Z["lib.webworker.iterable.d.ts"]=!0;var C=function(){function e(t){(0,l.Z)(this,e),this._worker=t}return(0,f.Z)(e,[{key:"_textSpanToRange",value:function(e,t){var r=e.getPositionAt(t.start),n=e.getPositionAt(t.start+t.length);return{startLineNumber:r.lineNumber,startColumn:r.column,endLineNumber:n.lineNumber,endColumn:n.column}}}]),e}(),A=function(){function e(t){(0,l.Z)(this,e),(0,p.Z)(this,"_libFiles",void 0),(0,p.Z)(this,"_hasFetchedLibFiles",void 0),(0,p.Z)(this,"_fetchLibFilesPromise",void 0),this._worker=t,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}return(0,f.Z)(e,[{key:"isLibFile",value:function(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!Z[e.path.slice(1)])}},{key:"getOrCreateModel",value:function(e){var t=x.Uri.parse(e),r=x.editor.getModel(t);if(r)return r;if(this.isLibFile(t)&&this._hasFetchedLibFiles)return x.editor.createModel(this._libFiles[t.path.slice(1)],"typescript",t);var n=b.TG.getExtraLibs()[e];return n?x.editor.createModel(n.content,"typescript",t):null}},{key:"_containsLibFile",value:function(e){var t,r=(0,d.Z)(e);try{for(r.s();!(t=r.n()).done;){var n=t.value;if(this.isLibFile(n))return!0}}catch(i){r.e(i)}finally{r.f()}return!1}},{key:"fetchLibFilesIfNecessary",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t){return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._containsLibFile(t)){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this._fetchLibFiles();case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_fetchLibFiles",value:function(){var e=this;return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((function(e){return e.getLibFiles()})).then((function(t){e._hasFetchedLibFiles=!0,e._libFiles=t}))),this._fetchLibFilesPromise}}]),e}(),D=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(e,n,i,a){var o;(0,l.Z)(this,r),o=t.call(this,a),(0,p.Z)((0,s.Z)(o),"_disposables",[]),(0,p.Z)((0,s.Z)(o),"_listener",Object.create(null)),o._libFiles=e,o._defaults=n,o._selector=i;var u=function(e){if(e.getLanguageId()===i){var t,r=function(){o._defaults.getDiagnosticsOptions().onlyVisible?e.isAttachedToEditor()&&o._doValidate(e):o._doValidate(e)},n=e.onDidChangeContent((function(){clearTimeout(t),t=window.setTimeout(r,500)})),s=e.onDidChangeAttached((function(){o._defaults.getDiagnosticsOptions().onlyVisible&&(e.isAttachedToEditor()?r():x.editor.setModelMarkers(e,o._selector,[]))}));o._listener[e.uri.toString()]={dispose:function(){n.dispose(),s.dispose(),clearTimeout(t)}},r()}},c=function(e){x.editor.setModelMarkers(e,o._selector,[]);var t=e.uri.toString();o._listener[t]&&(o._listener[t].dispose(),delete o._listener[t])};o._disposables.push(x.editor.onDidCreateModel((function(e){return u(e)}))),o._disposables.push(x.editor.onWillDisposeModel(c)),o._disposables.push(x.editor.onDidChangeModelLanguage((function(e){c(e.model),u(e.model)}))),o._disposables.push({dispose:function(){var e,t=(0,d.Z)(x.editor.getModels());try{for(t.s();!(e=t.n()).done;){var r=e.value;c(r)}}catch(n){t.e(n)}finally{t.f()}}});var f=function(){var e,t=(0,d.Z)(x.editor.getModels());try{for(t.s();!(e=t.n()).done;){var r=e.value;c(r),u(r)}}catch(n){t.e(n)}finally{t.f()}};return o._disposables.push(o._defaults.onDidChange(f)),o._disposables.push(o._defaults.onDidExtraLibsChange(f)),x.editor.getModels().forEach((function(e){return u(e)})),o}return(0,f.Z)(r,[{key:"dispose",value:function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]}},{key:"_doValidate",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t){var r,n,i,s,a,o,c,l,f,p=this;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._worker(t.uri);case 2:if(r=e.sent,!t.isDisposed()){e.next=5;break}return e.abrupt("return");case 5:return n=[],i=this._defaults.getDiagnosticsOptions(),s=i.noSyntaxValidation,a=i.noSemanticValidation,o=i.noSuggestionDiagnostics,s||n.push(r.getSyntacticDiagnostics(t.uri.toString())),a||n.push(r.getSemanticDiagnostics(t.uri.toString())),o||n.push(r.getSuggestionDiagnostics(t.uri.toString())),e.next=12,Promise.all(n);case 12:if((c=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return");case 15:return l=c.reduce((function(e,t){return t.concat(e)}),[]).filter((function(e){return-1===(p._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)})),f=l.map((function(e){return e.relatedInformation||[]})).reduce((function(e,t){return t.concat(e)}),[]).map((function(e){return e.file?x.Uri.parse(e.file.fileName):null})),e.next=19,this._libFiles.fetchLibFilesIfNecessary(f);case 19:if(!t.isDisposed()){e.next=21;break}return e.abrupt("return");case 21:x.editor.setModelMarkers(t,this._selector,l.map((function(e){return p._convertDiagnostics(t,e)})));case 22:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_convertDiagnostics",value:function(e,t){var r=t.start||0,n=t.length||1,i=e.getPositionAt(r),s=i.lineNumber,a=i.column,o=e.getPositionAt(r+n),u=o.lineNumber,c=o.column,l=[];return t.reportsUnnecessary&&l.push(x.MarkerTag.Unnecessary),t.reportsDeprecated&&l.push(x.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:s,startColumn:a,endLineNumber:u,endColumn:c,message:w(t.messageText,"\n"),code:t.code.toString(),tags:l,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}}},{key:"_convertRelatedInformation",value:function(e,t){var r=this;if(!t)return[];var n=[];return t.forEach((function(t){var i=e;if(t.file&&(i=r._libFiles.getOrCreateModel(t.file.fileName)),i){var s=t.start||0,a=t.length||1,o=i.getPositionAt(s),u=o.lineNumber,c=o.column,l=i.getPositionAt(s+a),f=l.lineNumber,p=l.column;n.push({resource:i.uri,startLineNumber:u,startColumn:c,endLineNumber:f,endColumn:p,message:w(t.messageText,"\n")})}})),n}},{key:"_tsDiagnosticCategoryToMarkerSeverity",value:function(e){switch(e){case 1:return x.MarkerSeverity.Error;case 3:return x.MarkerSeverity.Info;case 0:return x.MarkerSeverity.Warning;case 2:return x.MarkerSeverity.Hint}return x.MarkerSeverity.Info}}]),r}(C),F=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"triggerCharacters",get:function(){return["."]}},{key:"provideCompletionItems",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,n,i,s){var a,o,c,l,f,p,d;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.getWordUntilPosition(n),o=new x.Range(n.lineNumber,a.startColumn,n.lineNumber,a.endColumn),c=t.uri,l=t.getOffsetAt(n),e.next=6,this._worker(c);case 6:if(f=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return");case 9:return e.next=11,f.getCompletionsAtPosition(c.toString(),l);case 11:if((p=e.sent)&&!t.isDisposed()){e.next=14;break}return e.abrupt("return");case 14:return d=p.entries.map((function(e){var i,s=o;if(e.replacementSpan){var a=t.getPositionAt(e.replacementSpan.start),u=t.getPositionAt(e.replacementSpan.start+e.replacementSpan.length);s=new x.Range(a.lineNumber,a.column,u.lineNumber,u.column)}var f=[];return-1!==(null===(i=e.kindModifiers)||void 0===i?void 0:i.indexOf("deprecated"))&&f.push(x.languages.CompletionItemTag.Deprecated),{uri:c,position:n,offset:l,range:s,label:e.name,insertText:e.name,sortText:e.sortText,kind:r.convertKind(e.kind),tags:f}})),e.abrupt("return",{suggestions:d});case 16:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()},{key:"resolveCompletionItem",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,n){var i,s,a,o,c,l;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=(i=t).uri,a=i.position,o=i.offset,e.next=6,this._worker(s);case 6:return c=e.sent,e.next=9,c.getCompletionEntryDetails(s.toString(),o,i.label);case 9:if(l=e.sent){e.next=12;break}return e.abrupt("return",i);case 12:return e.abrupt("return",{uri:s,position:a,label:l.name,kind:r.convertKind(l.kind),detail:S(l.displayParts),documentation:{value:r.createDocumentationString(l)}});case 13:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()}],[{key:"convertKind",value:function(e){switch(e){case M.primitiveType:case M.keyword:return x.languages.CompletionItemKind.Keyword;case M.variable:case M.localVariable:return x.languages.CompletionItemKind.Variable;case M.memberVariable:case M.memberGetAccessor:case M.memberSetAccessor:return x.languages.CompletionItemKind.Field;case M.function:case M.memberFunction:case M.constructSignature:case M.callSignature:case M.indexSignature:return x.languages.CompletionItemKind.Function;case M.enum:return x.languages.CompletionItemKind.Enum;case M.module:return x.languages.CompletionItemKind.Module;case M.class:return x.languages.CompletionItemKind.Class;case M.interface:return x.languages.CompletionItemKind.Interface;case M.warning:return x.languages.CompletionItemKind.File}return x.languages.CompletionItemKind.Property}},{key:"createDocumentationString",value:function(e){var t=S(e.documentation);if(e.tags){var r,n=(0,d.Z)(e.tags);try{for(n.s();!(r=n.n()).done;){var i=r.value;t+="\n\n".concat(I(i))}}catch(s){n.e(s)}finally{n.f()}}return t}}]),r}(C);function I(e){var t="*@".concat(e.name,"*");if("param"===e.name&&e.text){var r=(0,i.Z)(e.text),n=r[0],s=r.slice(1);t+="`".concat(n.text,"`"),s.length>0&&(t+=" \u2014 ".concat(s.map((function(e){return e.text})).join(" ")))}else Array.isArray(e.text)?t+=" \u2014 ".concat(e.text.map((function(e){return e.text})).join(" ")):e.text&&(t+=" \u2014 ".concat(e.text));return t}var L=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){var e;(0,l.Z)(this,r);for(var n=arguments.length,i=new Array(n),a=0;a<n;a++)i[a]=arguments[a];return e=t.call.apply(t,[this].concat(i)),(0,p.Z)((0,s.Z)(e),"signatureHelpTriggerCharacters",["(",","]),e}return(0,f.Z)(r,[{key:"provideSignatureHelp",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,n,i,s){var a,o,c,l,f;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,o=t.getOffsetAt(n),e.next=4,this._worker(a);case 4:if(c=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,c.getSignatureHelpItems(a.toString(),o,{triggerReason:r._toSignatureHelpTriggerReason(s)});case 9:if((l=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return f={activeSignature:l.selectedItemIndex,activeParameter:l.argumentIndex,signatures:[]},l.items.forEach((function(e){var t={label:"",parameters:[]};t.documentation={value:S(e.documentation)},t.label+=S(e.prefixDisplayParts),e.parameters.forEach((function(r,n,i){var s=S(r.displayParts),a={label:s,documentation:{value:S(r.documentation)}};t.label+=s,t.parameters.push(a),n<i.length-1&&(t.label+=S(e.separatorDisplayParts))})),t.label+=S(e.suffixDisplayParts),f.signatures.push(t)})),e.abrupt("return",{value:f,dispose:function(){}});case 15:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()}],[{key:"_toSignatureHelpTriggerReason",value:function(e){switch(e.triggerKind){case x.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case x.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case x.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}}]),r}(C),T=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"provideHover",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n){var i,s,a,o,c,l,f;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,s=t.getOffsetAt(r),e.next=4,this._worker(i);case 4:if(a=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,a.getQuickInfoAtPosition(i.toString(),s);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return c=S(o.documentation),l=o.tags?o.tags.map((function(e){return I(e)})).join("  \n\n"):"",f=S(o.displayParts),e.abrupt("return",{range:this._textSpanToRange(t,o.textSpan),contents:[{value:"```typescript\n"+f+"\n```\n"},{value:c+(l?"\n\n"+l:"")}]});case 16:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()}]),r}(C),P=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"provideDocumentHighlights",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n){var i,s,a,o,c=this;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,s=t.getOffsetAt(r),e.next=4,this._worker(i);case 4:if(a=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,a.getOccurrencesAtPosition(i.toString(),s);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",o.map((function(e){return{range:c._textSpanToRange(t,e.textSpan),kind:e.isWriteAccess?x.languages.DocumentHighlightKind.Write:x.languages.DocumentHighlightKind.Text}})));case 13:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()}]),r}(C),O=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(e,n){var i;return(0,l.Z)(this,r),(i=t.call(this,n))._libFiles=e,i}return(0,f.Z)(r,[{key:"provideDefinition",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n){var i,s,a,o,c,l,f,p,g;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,s=t.getOffsetAt(r),e.next=4,this._worker(i);case 4:if(a=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,a.getDefinitionAtPosition(i.toString(),s);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,this._libFiles.fetchLibFilesIfNecessary(o.map((function(e){return x.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:c=[],l=(0,d.Z)(o);try{for(l.s();!(f=l.n()).done;)p=f.value,(g=this._libFiles.getOrCreateModel(p.fileName))&&c.push({uri:g.uri,range:this._textSpanToRange(g,p.textSpan)})}catch(n){l.e(n)}finally{l.f()}return e.abrupt("return",c);case 20:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()}]),r}(C),N=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(e,n){var i;return(0,l.Z)(this,r),(i=t.call(this,n))._libFiles=e,i}return(0,f.Z)(r,[{key:"provideReferences",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n,i){var s,a,o,c,l,f,p,g,b;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=t.getOffsetAt(r),e.next=4,this._worker(s);case 4:if(o=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,o.getReferencesAtPosition(s.toString(),a);case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,this._libFiles.fetchLibFilesIfNecessary(c.map((function(e){return x.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:l=[],f=(0,d.Z)(c);try{for(f.s();!(p=f.n()).done;)g=p.value,(b=this._libFiles.getOrCreateModel(g.fileName))&&l.push({uri:b.uri,range:this._textSpanToRange(b,g.textSpan)})}catch(n){f.e(n)}finally{f.f()}return e.abrupt("return",l);case 20:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()}]),r}(C),K=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"provideDocumentSymbols",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r){var n,i,s,a,o,c=this;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.uri,e.next=3,this._worker(n);case 3:if(i=e.sent,!t.isDisposed()){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,i.getNavigationBarItems(n.toString());case 8:if((s=e.sent)&&!t.isDisposed()){e.next=11;break}return e.abrupt("return");case 11:return a=function e(r,n,i){var s={name:n.text,detail:"",kind:R[n.kind]||x.languages.SymbolKind.Variable,range:c._textSpanToRange(t,n.spans[0]),selectionRange:c._textSpanToRange(t,n.spans[0]),tags:[]};if(i&&(s.containerName=i),n.childItems&&n.childItems.length>0){var a,o=(0,d.Z)(n.childItems);try{for(o.s();!(a=o.n()).done;){e(r,a.value,s.name)}}catch(u){o.e(u)}finally{o.f()}}r.push(s)},o=[],s.forEach((function(e){return a(o,e)})),e.abrupt("return",o);case 15:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()}]),r}(C),M=(0,f.Z)((function e(){(0,l.Z)(this,e)}));k(M,"unknown",""),k(M,"keyword","keyword"),k(M,"script","script"),k(M,"module","module"),k(M,"class","class"),k(M,"interface","interface"),k(M,"type","type"),k(M,"enum","enum"),k(M,"variable","var"),k(M,"localVariable","local var"),k(M,"function","function"),k(M,"localFunction","local function"),k(M,"memberFunction","method"),k(M,"memberGetAccessor","getter"),k(M,"memberSetAccessor","setter"),k(M,"memberVariable","property"),k(M,"constructorImplementation","constructor"),k(M,"callSignature","call"),k(M,"indexSignature","index"),k(M,"constructSignature","construct"),k(M,"parameter","parameter"),k(M,"typeParameter","type parameter"),k(M,"primitiveType","primitive type"),k(M,"label","label"),k(M,"alias","alias"),k(M,"const","const"),k(M,"let","let"),k(M,"warning","warning");var R=Object.create(null);R[M.module]=x.languages.SymbolKind.Module,R[M.class]=x.languages.SymbolKind.Class,R[M.enum]=x.languages.SymbolKind.Enum,R[M.interface]=x.languages.SymbolKind.Interface,R[M.memberFunction]=x.languages.SymbolKind.Method,R[M.memberVariable]=x.languages.SymbolKind.Property,R[M.memberGetAccessor]=x.languages.SymbolKind.Property,R[M.memberSetAccessor]=x.languages.SymbolKind.Property,R[M.variable]=x.languages.SymbolKind.Variable,R[M.const]=x.languages.SymbolKind.Variable,R[M.localVariable]=x.languages.SymbolKind.Variable,R[M.variable]=x.languages.SymbolKind.Variable,R[M.function]=x.languages.SymbolKind.Function,R[M.localFunction]=x.languages.SymbolKind.Function;var E,H,V=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"_convertTextChanges",value:function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}}}],[{key:"_convertOptions",value:function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}}]),r}(C),W=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"provideDocumentRangeFormattingEdits",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n,i){var s,a,o,c,l,f=this;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),o=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),e.next=5,this._worker(s);case 5:if(c=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,c.getFormattingEditsForRange(s.toString(),a,o,V._convertOptions(n));case 10:if((l=e.sent)&&!t.isDisposed()){e.next=13;break}return e.abrupt("return");case 13:return e.abrupt("return",l.map((function(e){return f._convertTextChanges(t,e)})));case 14:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()}]),r}(V),j=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"autoFormatTriggerCharacters",get:function(){return[";","}","\n"]}},{key:"provideOnTypeFormattingEdits",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n,i,s){var a,o,c,l,f=this;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,o=t.getOffsetAt(r),e.next=4,this._worker(a);case 4:if(c=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,c.getFormattingEditsAfterKeystroke(a.toString(),o,n,V._convertOptions(i));case 9:if((l=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",l.map((function(e){return f._convertTextChanges(t,e)})));case 13:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i,s){return e.apply(this,arguments)}}()}]),r}(V),B=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"provideCodeActions",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n,i){var s,a,o,c,l,f,p,d,g=this;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),o=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),c=V._convertOptions(t.getOptions()),l=n.markers.filter((function(e){return e.code})).map((function(e){return e.code})).map(Number),e.next=7,this._worker(s);case 7:if(f=e.sent,!t.isDisposed()){e.next=10;break}return e.abrupt("return");case 10:return e.next=12,f.getCodeFixesAtPosition(s.toString(),a,o,l,c);case 12:if((p=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return",{actions:[],dispose:function(){}});case 15:return d=p.filter((function(e){return 0===e.changes.filter((function(e){return e.isNewFile})).length})).map((function(e){return g._tsCodeFixActionToMonacoCodeAction(t,n,e)})),e.abrupt("return",{actions:d,dispose:function(){}});case 17:case"end":return e.stop()}}),e,this)})));return function(t,r,n,i){return e.apply(this,arguments)}}()},{key:"_tsCodeFixActionToMonacoCodeAction",value:function(e,t,r){var n,i=[],s=(0,d.Z)(r.changes);try{for(s.s();!(n=s.n()).done;){var a,o=n.value,u=(0,d.Z)(o.textChanges);try{for(u.s();!(a=u.n()).done;){var c=a.value;i.push({resource:e.uri,edit:{range:this._textSpanToRange(e,c.span),text:c.newText}})}}catch(l){u.e(l)}finally{u.f()}}}catch(l){s.e(l)}finally{s.f()}return{title:r.description,edit:{edits:i},diagnostics:t.markers,kind:"quickfix"}}}]),r}(V),U=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(e,n){var i;return(0,l.Z)(this,r),(i=t.call(this,n))._libFiles=e,i}return(0,f.Z)(r,[{key:"provideRenameEdits",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,n,i){var s,a,o,c,l,f,p,g,b,h,m;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=s.toString(),o=t.getOffsetAt(r),e.next=5,this._worker(s);case 5:if(c=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,c.getRenameInfo(a,o,{allowRenameOfImportPath:!1});case 10:if(!1!==(l=e.sent).canRename){e.next=13;break}return e.abrupt("return",{edits:[],rejectReason:l.localizedErrorMessage});case 13:if(void 0===l.fileToRename){e.next=15;break}throw new Error("Renaming files is not supported.");case 15:return e.next=17,c.findRenameLocations(a,o,!1,!1,!1);case 17:if((f=e.sent)&&!t.isDisposed()){e.next=20;break}return e.abrupt("return");case 20:p=[],g=(0,d.Z)(f),e.prev=22,g.s();case 24:if((b=g.n()).done){e.next=34;break}if(h=b.value,!(m=this._libFiles.getOrCreateModel(h.fileName))){e.next=31;break}p.push({resource:m.uri,edit:{range:this._textSpanToRange(m,h.textSpan),text:n}}),e.next=32;break;case 31:throw new Error("Unknown file ".concat(h.fileName,"."));case 32:e.next=24;break;case 34:e.next=39;break;case 36:e.prev=36,e.t0=e.catch(22),g.e(e.t0);case 39:return e.prev=39,g.f(),e.finish(39);case 42:return e.abrupt("return",{edits:p});case 43:case"end":return e.stop()}}),e,this,[[22,36,39,42]])})));return function(t,r,n,i){return e.apply(this,arguments)}}()}]),r}(C),z=function(e){(0,a.Z)(r,e);var t=(0,o.Z)(r);function r(){return(0,l.Z)(this,r),t.apply(this,arguments)}return(0,f.Z)(r,[{key:"provideInlayHints",value:function(){var e=(0,c.Z)((0,u.Z)().mark((function e(t,r,i){var s,a,o,c,l,f,p,d=this;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,a=s.toString(),o=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),c=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),e.next=6,this._worker(s);case 6:if(l=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return",null);case 9:return e.next=11,l.provideInlayHints(a,o,c);case 11:return f=e.sent,p=f.map((function(e){return(0,n.Z)((0,n.Z)({},e),{},{label:e.text,position:t.getPositionAt(e.position),kind:d._convertHintKind(e.kind)})})),e.abrupt("return",{hints:p,dispose:function(){}});case 14:case"end":return e.stop()}}),e,this)})));return function(t,r,n){return e.apply(this,arguments)}}()},{key:"_convertHintKind",value:function(e){return"Parameter"===e?x.languages.InlayHintKind.Parameter:x.languages.InlayHintKind.Type}}]),r}(C);function G(e){H=X(e,"typescript")}function J(e){E=X(e,"javascript")}function Q(){return new Promise((function(e,t){if(!E)return t("JavaScript not registered!");e(E)}))}function q(){return new Promise((function(e,t){if(!H)return t("TypeScript not registered!");e(H)}))}function X(e,t){var r=new _(t,e),n=function(){return r.getLanguageServiceWorker.apply(r,arguments)},i=new A(n);return x.languages.registerCompletionItemProvider(t,new F(n)),x.languages.registerSignatureHelpProvider(t,new L(n)),x.languages.registerHoverProvider(t,new T(n)),x.languages.registerDocumentHighlightProvider(t,new P(n)),x.languages.registerDefinitionProvider(t,new O(i,n)),x.languages.registerReferenceProvider(t,new N(i,n)),x.languages.registerDocumentSymbolProvider(t,new K(n)),x.languages.registerDocumentRangeFormattingEditProvider(t,new W(n)),x.languages.registerOnTypeFormattingEditProvider(t,new j(n)),x.languages.registerCodeActionProvider(t,new B(n)),x.languages.registerRenameProvider(t,new U(i,n)),x.languages.registerInlayHintsProvider(t,new z(n)),new D(i,e,t,n),n}}}]);
//# sourceMappingURL=1258.5edc7372.chunk.js.map