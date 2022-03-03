/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),i=new Map;class s{constructor(t,i){if(this._$cssResult$=!0,i!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=i.get(this.cssText);return t&&void 0===e&&(i.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=(t,...i)=>{const o=1===t.length?t[0]:i.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new s(o,e)},n=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new s("string"==typeof t?t:t+"",e))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var r;const l=window.trustedTypes,a=l?l.emptyScript:"",c=window.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?a:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},d=(t,e)=>e!==t&&(e==e||t==t),u={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:d};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=u){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||u}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{t?e.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((t=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=t.cssText,e.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=u){var s,o;const n=this.constructor._$Eh(t,i);if(void 0!==n&&!0===i.reflect){const r=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:h.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var i,s,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:h.fromAttribute;this._$Ei=r,this[r]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||d)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:p}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.3.0");const v=globalThis.trustedTypes,_=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,y="?"+f,m=`<${y}>`,$=document,b=(t="")=>$.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E=/-->/g,S=/>/g,C=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,T=/'/g,k=/"/g,P=/^(?:script|style|textarea|title)$/i,U=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),R=new WeakMap,D=$.createTreeWalker($,129,null,!1),N=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=x;for(let e=0;e<i;e++){const i=t[e];let l,a,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,a=r.exec(i),null!==a);)h=r.lastIndex,r===x?"!--"===a[1]?r=E:void 0!==a[1]?r=S:void 0!==a[2]?(P.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=C):void 0!==a[3]&&(r=C):r===C?">"===a[0]?(r=null!=o?o:x,c=-1):void 0===a[1]?c=-2:(c=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?C:'"'===a[3]?k:T):r===k||r===T?r=C:r===E||r===S?r=x:(r=C,o=void 0);const d=r===C&&t[e+1].startsWith("/>")?" ":"";n+=r===x?i+m:c>=0?(s.push(l),i.slice(0,c)+"$lit$"+i.slice(c)+f+d):i+f+(-2===c?(s.push(void 0),e):d)}const l=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==_?_.createHTML(l):l,s]};class M{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,l=this.parts,[a,c]=N(t,e);if(this.el=M.createElement(a,i),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=D.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?B:"?"===e[1]?G:"@"===e[1]?V:I})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(P.test(s.tagName)){const t=s.textContent.split(f),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],b()),D.nextNode(),l.push({type:2,index:++o});s.append(t[e],b())}}}else if(8===s.nodeType)if(s.data===y)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(f,t+1));)l.push({type:7,index:o}),t+=f.length-1}o++}}static createElement(t,e){const i=$.createElement("template");return i.innerHTML=t,i}}function z(t,e,i=t,s){var o,n,r,l;if(e===H)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const c=A(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Cl)&&void 0!==r?r:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=z(t,a._$AS(t,e.values),a,s)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$).importNode(i,!0);D.currentNode=o;let n=D.nextNode(),r=0,l=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new j(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new W(n,this,t)),this.v.push(e),a=s[++l]}r!==(null==a?void 0:a.index)&&(n=D.nextNode(),r++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class j{constructor(t,e,i,s){var o;this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),A(t)?t===O||null==t||""===t?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==H&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return w(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==O&&A(this._$AH)?this._$AA.nextSibling.data=t:this.k($.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=M.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new L(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=R.get(t.strings);return void 0===e&&R.set(t.strings,e=new M(t)),e}S(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new j(this.A(b()),this.A(b()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class I{constructor(t,e,i,s,o){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=O}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=z(this,t,e,0),n=!A(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const s=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=z(this,s[i+r],e,r),l===H&&(l=this._$AH[r]),n||(n=!A(l)||l!==this._$AH[r]),l===O?t=O:t!==O&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!s&&this.C(t)}C(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends I{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===O?void 0:t}}const F=v?v.emptyScript:"";class G extends I{constructor(){super(...arguments),this.type=4}C(t){t&&t!==O?this.element.setAttribute(this.name,F):this.element.removeAttribute(this.name)}}class V extends I{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=z(this,t,e,0))&&void 0!==i?i:O)===H)return;const s=this._$AH,o=t===O&&s!==O||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==O&&(s===O||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class W{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const q=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J,K;null==q||q(M,j),(null!==(g=globalThis.litHtmlVersions)&&void 0!==g?g:globalThis.litHtmlVersions=[]).push("2.2.0");class Z extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new j(e.insertBefore(b(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return H}}Z.finalized=!0,Z._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Z});const X=globalThis.litElementPolyfillSupport;null==X||X({LitElement:Z}),(null!==(K=globalThis.litElementVersions)&&void 0!==K?K:globalThis.litElementVersions=[]).push("3.2.0");customElements.define("ha-spotify-sonos-card",class extends Z{static get properties(){return{hass:{},config:{},playlists:[],accounts:[],activeAccount:!1,activeTab:!1}}setConfig(t){if(!t.entity_id)throw new Error("You need to define a main entity");this.config=t,this.CheckForHass()}CheckForHass(){let t=this;this.hass&&this.hass.auth?this.HassAcquired():setTimeout((function(){t.CheckForHass()}),10)}HassAcquired(){this.FetchAccounts()}FetchAccounts(){for(var t=[],e=0;e<this.config.spotify_accounts.length;e++){let i=this.config.spotify_accounts[e].id;t[i]={id:i,playlists:[],albums:[],artists:[],recent:[],name:this.config.spotify_accounts[e].name}}this.accounts=t;for(e=0;e<this.config.spotify_accounts.length;e++)this.FetchRecords(this.config.spotify_accounts[e].id,"playlists"),this.FetchRecords(this.config.spotify_accounts[e].id,"albums"),this.FetchRecords(this.config.spotify_accounts[e].id,"recent");this.activeAccount=this.config.spotify_accounts[0].id,this.activeTab="playlists"}FetchRecords(t,e){if(!e||!t)return;let i;"playlists"==e?i="current_user_playlists":"albums"==e?i="current_user_saved_albums":"artists"==e?i="current_user_followed_artists":"recent"==e&&(i="current_user_recently_played");let s=this;this.hass.callWS({entity_id:t,media_content_id:i,media_content_type:i,type:"media_player/browse_media"}).then((function(i){let o=[],n=24;s.config.grid_limit&&(n=s.config.grid_limit);for(var r=0;r<i.children.length;r++)o.length<n&&("recent"==e?"artist"!=i.children[r].media_content_type&&o.push(i.children[r]):o.push(i.children[r]));s.accounts[t][e]=o}))}triggerGroup(t,e){let i=this,s=this.hass.states[this.config.entity_id],o=s.attributes.volume_level,n=e.volume;o!=n&&this.hass.callService("media_player","volume_set",{volume_level:n,entity_id:this.config.entity_id}).catch((function(t){console.log("failed to set volume"),console.log(t)}));let r=s.attributes.sonos_group;r.splice(r.indexOf(this.config.entity_id),1);let l=[];if(e.players&&null!==e.players&&e.players.length>0)for(var a=0;a<e.players.length;a++)l.push(e.players[a].entity_id);console.log("Join players");for(a=0;a<l.length;a++)-1==r.indexOf(l[a])&&(console.log("adding player to group"),console.log("master: "+this.config.entity_id),console.log("player: "+l[a]),this.hass.callService("sonos","join",{master:this.config.entity_id,entity_id:l[a]}).catch((function(t){console.log("failed to join"),console.log(t)})));setTimeout((function(){for(var t=0;t<r.length;t++)-1==l.indexOf(r[t])&&i.hass.callService("sonos","unjoin",{entity_id:r[t]}).catch((function(t){console.log("failed to remove player"),console.log(t)}));for(t=0;t<l.length;t++){let s=e.players[t].volume;i.hass.states[l[t]].attributes.volume_level!=s&&i.hass.callService("media_player","volume_set",{volume_level:s,entity_id:l[t]}).catch((function(t){console.log("failed to set volume"),console.log(t)}))}e.media&&i.hass.callService("media_player","play_media",{media_content_type:"music",media_content_id:e.media,entity_id:i.config.entity_id}).catch((function(t){console.log("failed to set media"),console.log(t)}))}),1500)}IsGroupActive(t){if(this.hass.states[this.config.entity_id].attributes.volume_level!=t.volume)return!1;const e=this.hass.states[this.config.entity_id].attributes.sonos_group;let i=t.players;if(i&&null!==i&&i.length>0){if(e.length-1!=i.length)return!1}else i=[];for(var s=0;s<i.length;s++){let t=i[s].entity_id;if(-1==e.indexOf(t))return!1}for(s=0;s<i.length;s++){let t=i[s].entity_id,e=i[s].volume;if(this.hass.states[t].attributes.volume_level!=e)return!1}return!0}DisplayGroups(){return this.config.groups&&null!==this.config.groups&&this.config.groups.length>0?U`
            <ul class="grid grid-3">
                ${this.config.groups.map((t=>{let e="group-trigger";return this.IsGroupActive(t)&&(e+=" active"),U`
                    <li>
                        <div class="container">
                            <div class="inner">
                                <div 
                                    class="${e}" 
                                    @click=${e=>this.triggerGroup(e,t)}
                                >
                                    ${t.name}
                                </div>
                            </div>
                        </div>
                    </li>
                    `}))}
            </ul>
            `:U``}DisplayPlayOptions(){let t=this.accounts[this.activeAccount][this.activeTab],e=this.config.grid_limit;if(t.length<e)for(var i=t.length;i<e;i++)t.push({title:!1});return U`
        <ul class="grid grid-3">
            ${t.map((t=>t.title?U`
                    <li>
                        <div class="container">
                            <div class="inner">
                                <div 
                                    class="playlist-trigger" 
                                    @click=${e=>this.triggerPlaylist(e,t)}
                                    style="background-image: url(${t.thumbnail})"
                                >
                                    <div class="playlist-name">${t.title}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    `:U`
                        <li>
                            <div class="container">
                                <div class="inner">
                                    <div 
                                        class="playlist-trigger" 
                                        style=""
                                    >
                                        <div class="playlist-name"></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `))}
        </ul>
        `}DisplayLinkedPlayers(t){if(this.config.show_linked_players&&t.attributes&&t.attributes.sonos_group&&t.attributes.sonos_group.length>1){let i=[];for(var e=0;e<t.attributes.sonos_group.length;e++){let s=this.hass.states[t.attributes.sonos_group[e]].attributes.friendly_name;i.push(s)}return U`
            <div class="grouped-players-list">${i.join(", ")}</div>
            `}return U``}DisplayHeader(t){return this.config.show_header?U`
                <div class="header">
                    <div class="header-meta">
                        <div class="player-title">${t.attributes.friendly_name}</div>
                        <div class="song-title">${t.attributes.media_title}</div>
                        <div class="album-title">${t.attributes.media_album_name}</div>
                        <div class="artist-title">${t.attributes.media_artist}</div>
                    </div>
                    <div class="header-art">
                        <div class="container">
                            <div class="inner" style="background-image: url('${t.attributes.entity_picture}')"></div>
                        </div>
                    </div>
                </div>
            `:U``}SetListType(t,e){this.activeTab=e}SetActiveAccount(t,e){this.activeAccount=e}DisplayAccounts(){let t=this;return!this.accounts||Object.keys(this.accounts).length<1?U``:U`
            <ul class="tabs block">
                ${Object.keys(this.accounts).map((e=>{let i=t.accounts[e],s="";return t.activeAccount==e&&(s="active"),U`<li class="${s}" @click=${t=>this.SetActiveAccount(t,e)}>${i.name}</li>`}))}
            </ul>
        `}DisplayTabs(){if(!this.activeAccount||!this.activeTab)return U``;let t="",e="",i="";return"playlists"==this.activeTab?t="active":"albums"==this.activeTab?e="active":"recent"==this.activeTab&&(i="active"),U`
            ${this.DisplayAccounts()}
            <ul class="tabs">
                <li class="${t}" @click=${t=>this.SetListType(t,"playlists")}>Playlists</li>
                <li class="${e}" @click=${t=>this.SetListType(t,"albums")}>Albums</li>
                <li class="${i}" @click=${t=>this.SetListType(t,"recent")}>Recent</li>
            </ul>
        `}render(){const t=this.hass.states[this.config.entity_id];return this.activeAccount&&this.activeTab?U`
            <ha-card
                header="${this.config.name}"
            >
                
                ${this.DisplayHeader(t)}
                ${this.DisplayTabs()}
                ${this.DisplayPlayOptions()}
               
                ${this.DisplayGroups()}
                ${this.DisplayLinkedPlayers(t)}
            </ha-card>
    `:U`Loading...`}triggerPlaylist(t,e){let i="music";"artist"==e.media_content_type&&(i="artist"),this.hass.callService("media_player","play_media",{media_content_type:i,media_content_id:e.media_content_id,entity_id:this.config.entity_id}).catch((function(t){console.log("failed"),console.log(t)}))}getCardSize(){return 9}static get styles(){return o`
        :host {

        }
        ul.grid{
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
        }
        ul.grid li{
            width: 25%;
            max-width: 200px;
            min-width: 100px;
            position: relative;
        }
        ul.grid.grid-3 li{
            width: 33.33%;
        }
        ul.grid li .container{
            padding-top: 100%;
            position: relative;
        }
        ul.grid li .container .inner{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .group-trigger{
            position: absolute;
            left: 2px;
            right: 2px;
            top: 2px;  
            bottom: 2px;
            border: 1px solid #353535;
            background-color: #1C1C1C;
            color: #DEDEDE;
            font-size: 1.4em;
            font-weight: bold;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .group-trigger:active{
            background-color: #373737;
        }
        .group-trigger.active:after{
            content: "";
            position: absolute;
            right: 5px;
            top: 5px;
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background-color: #DEDEDE;
        }
        .grouped-players-list{
            padding: 5px;
            font-style: italic;
        }
        .header{
            padding: 10px;
            display: flex;
            overflow: hidden;
        }
        .header .header-meta{
            flex: 3;
            max-width: 75%;
        } 
        .header .header-meta .player-title{
            text-transform: uppercase;
            fontweight: bold;
            font-size: 0.8em;
            margin-bottom: 5px;
        }
        .header .header-meta .song-title{
            font-size: 1.4em;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }
        .header .header-meta .album-title, .header .artist-title{
            font-size: 1em;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }
        .header .header-art{
            flex: 1;
        }
        .header .header-art .container{
            padding-top: 100%;
            position: relative;
            border: 1px solid #353535;
        }
        .header .header-art .container .inner{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-size: cover;
            background-repeat: no-repeat;
        }
        .playlist-trigger{
            position: absolute;
            left: 2px;
            right: 2px;
            top: 2px;
            bottom: 2px;
            border: 1px solid #353535;
            cursor: pointer;
            background-size: cover;
            background-repeat: no-repeat;
            overflow: hidden;
        }
        .playlist-name{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 5px;
            max-height: 50%;
            background: rgb(0,0,0);
            background: -moz-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
            background: -webkit-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
            background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1em;
            color: #fff;
        }
        ul.tabs{
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            padding: 10px;
        }
        ul.tabs li{
            height: 30px;
            line-height: 30px;
            margin: 5px;
            border: 1px solid #353535;
            background-color: #1C1C1C;
            border-radius: 20px;
            cursor: pointer; 
            padding: 0 10px;
        }
        ul.tabs li:active{
            background-color: #373737;
        }
        ul.tabs li.active{
            background-color: #373737;
        }
        ul.tabs.block{
            border-bottom: 1px solid #353535;
            margin: 0;
            padding: 0; 
        }
        ul.tabs.block li{
            flex: 1;
            height: 40px;
            line-height: 40px;
            margin: 0px;
            border: none;
            border-right: 1px solid #353535;
            border-radius: 0px;
            font-size: 1.1em;
            margin: 0px;
            text-align: center;
        }
        ul.tabs.block li:last-child{
            border-right: none;
        }
        .loading-list{
            list-style: none;
            padding: 0;
            margin: 20px;
        }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"ha-spotify-sonos-card",name:"Spotify Sonos Card",preview:!1,description:"List Spotify playlists, send to Sonos"});
