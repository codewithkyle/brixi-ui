/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var E;const M=window,g=M.trustedTypes,P=g?g.createPolicy("lit-html",{createHTML:h=>h}):void 0,I="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,B="?"+_,X=`<${B}>`,m=document,x=()=>m.createComment(""),N=h=>h===null||typeof h!="object"&&typeof h!="function",R=Array.isArray,U=h=>R(h)||typeof h?.[Symbol.iterator]=="function",L=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,k=/>/g,v=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,W=/"/g,z=/^(?:script|style|textarea|title)$/i,O=h=>(t,...e)=>({_$litType$:h,strings:t,values:e}),Y=O(1),tt=O(2),f=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),V=new WeakMap,y=m.createTreeWalker(m,129,null,!1),Z=(h,t)=>{const e=h.length-1,i=[];let s,o=t===2?"<svg>":"",n=C;for(let l=0;l<e;l++){const r=h[l];let A,a,d=-1,u=0;for(;u<r.length&&(n.lastIndex=u,a=n.exec(r),a!==null);)u=n.lastIndex,n===C?a[1]==="!--"?n=j:a[1]!==void 0?n=k:a[2]!==void 0?(z.test(a[2])&&(s=RegExp("</"+a[2],"g")),n=v):a[3]!==void 0&&(n=v):n===v?a[0]===">"?(n=s??C,d=-1):a[1]===void 0?d=-2:(d=n.lastIndex-a[2].length,A=a[1],n=a[3]===void 0?v:a[3]==='"'?W:D):n===W||n===D?n=v:n===j||n===k?n=C:(n=v,s=void 0);const S=n===v&&h[l+1].startsWith("/>")?" ":"";o+=n===C?r+X:d>=0?(i.push(A),r.slice(0,d)+I+r.slice(d)+_+S):r+_+(d===-2?(i.push(void 0),l):S)}const c=o+(h[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(h)||!h.hasOwnProperty("raw"))throw Error("invalid template strings array");return[P!==void 0?P.createHTML(c):c,i]};class b{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const c=t.length-1,l=this.parts,[r,A]=Z(t,e);if(this.el=b.createElement(r,i),y.currentNode=this.el.content,e===2){const a=this.el.content,d=a.firstChild;d.remove(),a.append(...d.childNodes)}for(;(s=y.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const a=[];for(const d of s.getAttributeNames())if(d.endsWith(I)||d.startsWith(_)){const u=A[n++];if(a.push(d),u!==void 0){const S=s.getAttribute(u.toLowerCase()+I).split(_),w=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:w[2],strings:S,ctor:w[1]==="."?q:w[1]==="?"?G:w[1]==="@"?J:T})}else l.push({type:6,index:o})}for(const d of a)s.removeAttribute(d)}if(z.test(s.tagName)){const a=s.textContent.split(_),d=a.length-1;if(d>0){s.textContent=g?g.emptyScript:"";for(let u=0;u<d;u++)s.append(a[u],x()),y.nextNode(),l.push({type:2,index:++o});s.append(a[d],x())}}}else if(s.nodeType===8)if(s.data===B)l.push({type:2,index:o});else{let a=-1;for(;(a=s.data.indexOf(_,a+1))!==-1;)l.push({type:7,index:o}),a+=_.length-1}o++}}static createElement(t,e){const i=m.createElement("template");return i.innerHTML=t,i}}function p(h,t,e=h,i){var s,o,n,c;if(t===f)return t;let l=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const r=N(t)?void 0:t._$litDirective$;return l?.constructor!==r&&((o=l?._$AO)===null||o===void 0||o.call(l,!1),r===void 0?l=void 0:(l=new r(h),l._$AT(h,e,i)),i!==void 0?((n=(c=e)._$Co)!==null&&n!==void 0?n:c._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=p(h,l._$AS(h,t.values),l,i)),t}class F{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t?.creationScope)!==null&&e!==void 0?e:m).importNode(i,!0);y.currentNode=o;let n=y.nextNode(),c=0,l=0,r=s[0];for(;r!==void 0;){if(c===r.index){let A;r.type===2?A=new H(n,n.nextSibling,this,t):r.type===1?A=new r.ctor(n,r.name,r.strings,this,t):r.type===6&&(A=new K(n,this,t)),this.u.push(A),r=s[++l]}c!==r?.index&&(n=y.nextNode(),c++)}return o}p(t){let e=0;for(const i of this.u)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class H{constructor(t,e,i,s){var o;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=(o=s?.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=p(this,t,e),N(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==f&&this.g(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):U(t)?this.k(t):this.g(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}g(t){this._$AH!==$&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(m.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=b.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.p(i);else{const n=new F(o,this),c=n.v(this.options);n.p(i),this.T(c),this._$AH=n}}_$AC(t){let e=V.get(t.strings);return e===void 0&&V.set(t.strings,e=new b(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new H(this.S(x()),this.S(x()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cm=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class T{constructor(t,e,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(o===void 0)t=p(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==f,n&&(this._$AH=t);else{const c=t;let l,r;for(t=o[0],l=0;l<o.length-1;l++)r=p(this,c[i+l],e,l),r===f&&(r=this._$AH[l]),n||(n=!N(r)||r!==this._$AH[l]),r===$?t=$:t!==$&&(t+=(r??"")+o[l+1]),this._$AH[l]=r}n&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class q extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}const et=g?g.emptyScript:"";class G extends T{constructor(){super(...arguments),this.type=4}j(t){t&&t!==$?this.element.setAttribute(this.name,et):this.element.removeAttribute(this.name)}}class J extends T{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=p(this,t,e,0))!==null&&i!==void 0?i:$)===f)return;const s=this._$AH,o=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){p(this,t)}}const it={P:I,A:_,M:B,C:1,L:Z,D:F,R:U,V:p,I:H,H:T,N:G,U:J,F:q,B:K},Q=M.litHtmlPolyfillSupport;Q?.(b,H),((E=M.litHtmlVersions)!==null&&E!==void 0?E:M.litHtmlVersions=[]).push("2.7.0");const st=(h,t,e)=>{var i,s;const o=(i=e?.renderBefore)!==null&&i!==void 0?i:t;let n=o._$litPart$;if(n===void 0){const c=(s=e?.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=n=new H(t.insertBefore(x(),c),c,void 0,e??{})}return n._$AI(h),n};export{it as _$LH,Y as html,f as noChange,$ as nothing,st as render,tt as svg};
