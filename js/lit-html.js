/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var I;const T=window,m=T.trustedTypes,L=m?m.createPolicy("lit-html",{createHTML:r=>r}):void 0,S="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,E="?"+_,Y=`<${E}>`,v=document,x=()=>v.createComment(""),N=r=>r===null||typeof r!="object"&&typeof r!="function",P=Array.isArray,U=r=>P(r)||typeof r?.[Symbol.iterator]=="function",B=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,k=/>/g,p=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,j=/"/g,D=/^(?:script|style|textarea|title)$/i,W=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),tt=W(1),et=W(2),y=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),O=new WeakMap,g=v.createTreeWalker(v,129,null,!1);function z(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return L!==void 0?L.createHTML(t):t}const Z=(r,t)=>{const e=r.length-1,i=[];let s,o=t===2?"<svg>":"",n=C;for(let $=0;$<e;$++){const l=r[$];let h,a,d=-1,A=0;for(;A<l.length&&(n.lastIndex=A,a=n.exec(l),a!==null);)A=n.lastIndex,n===C?a[1]==="!--"?n=R:a[1]!==void 0?n=k:a[2]!==void 0?(D.test(a[2])&&(s=RegExp("</"+a[2],"g")),n=p):a[3]!==void 0&&(n=p):n===p?a[0]===">"?(n=s??C,d=-1):a[1]===void 0?d=-2:(d=n.lastIndex-a[2].length,h=a[1],n=a[3]===void 0?p:a[3]==='"'?j:V):n===j||n===V?n=p:n===R||n===k?n=C:(n=p,s=void 0);const c=n===p&&r[$+1].startsWith("/>")?" ":"";o+=n===C?l+Y:d>=0?(i.push(h),l.slice(0,d)+S+l.slice(d)+_+c):l+_+(d===-2?(i.push(void 0),$):c)}return[z(r,o+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};class w{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const $=t.length-1,l=this.parts,[h,a]=Z(t,e);if(this.el=w.createElement(h,i),g.currentNode=this.el.content,e===2){const d=this.el.content,A=d.firstChild;A.remove(),d.append(...A.childNodes)}for(;(s=g.nextNode())!==null&&l.length<$;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const A of s.getAttributeNames())if(A.endsWith(S)||A.startsWith(_)){const c=a[n++];if(d.push(A),c!==void 0){const X=s.getAttribute(c.toLowerCase()+S).split(_),M=/([.?@])?(.*)/.exec(c);l.push({type:1,index:o,name:M[2],strings:X,ctor:M[1]==="."?q:M[1]==="?"?G:M[1]==="@"?J:b})}else l.push({type:6,index:o})}for(const A of d)s.removeAttribute(A)}if(D.test(s.tagName)){const d=s.textContent.split(_),A=d.length-1;if(A>0){s.textContent=m?m.emptyScript:"";for(let c=0;c<A;c++)s.append(d[c],x()),g.nextNode(),l.push({type:2,index:++o});s.append(d[A],x())}}}else if(s.nodeType===8)if(s.data===E)l.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(_,d+1))!==-1;)l.push({type:7,index:o}),d+=_.length-1}o++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function f(r,t,e=r,i){var s,o,n,$;if(t===y)return t;let l=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const h=N(t)?void 0:t._$litDirective$;return l?.constructor!==h&&((o=l?._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(r),l._$AT(r,e,i)),i!==void 0?((n=($=e)._$Co)!==null&&n!==void 0?n:$._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=f(r,l._$AS(r,t.values),l,i)),t}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t?.creationScope)!==null&&e!==void 0?e:v).importNode(i,!0);g.currentNode=o;let n=g.nextNode(),$=0,l=0,h=s[0];for(;h!==void 0;){if($===h.index){let a;h.type===2?a=new H(n,n.nextSibling,this,t):h.type===1?a=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(a=new K(n,this,t)),this._$AV.push(a),h=s[++l]}$!==h?.index&&(n=g.nextNode(),$++)}return g.currentNode=v,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class H{constructor(t,e,i,s){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s?.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=f(this,t,e),N(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==y&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):U(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&N(this._$AH)?this._$AA.nextSibling.data=t:this.$(v.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=w.createElement(z(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const n=new F(o,this),$=n.u(this.options);n.v(i),this.$($),this._$AH=n}}_$AC(t){let e=O.get(t.strings);return e===void 0&&O.set(t.strings,e=new w(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new H(this.k(x()),this.k(x()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class b{constructor(t,e,i,s,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(o===void 0)t=f(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==y,n&&(this._$AH=t);else{const $=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=f(this,$[i+l],e,l),h===y&&(h=this._$AH[l]),n||(n=!N(h)||h!==this._$AH[l]),h===u?t=u:t!==u&&(t+=(h??"")+o[l+1]),this._$AH[l]=h}n&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class q extends b{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const it=m?m.emptyScript:"";class G extends b{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,it):this.element.removeAttribute(this.name)}}class J extends b{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=f(this,t,e,0))!==null&&i!==void 0?i:u)===y)return;const s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){f(this,t)}}const st={O:S,P:_,A:E,C:1,M:Z,L:F,D:U,R:f,I:H,V:b,H:G,N:J,U:q,F:K},Q=T.litHtmlPolyfillSupport;Q?.(w,H),((I=T.litHtmlVersions)!==null&&I!==void 0?I:T.litHtmlVersions=[]).push("2.7.5");const nt=(r,t,e)=>{var i,s;const o=(i=e?.renderBefore)!==null&&i!==void 0?i:t;let n=o._$litPart$;if(n===void 0){const $=(s=e?.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=n=new H(t.insertBefore(x(),$),$,void 0,e??{})}return n._$AI(r),n};export{st as _$LH,tt as html,y as noChange,u as nothing,nt as render,et as svg};
