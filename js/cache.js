import{_$LH as p,render as f,nothing as m}from"./lit-html.js";import{e as g,i as B}from"./directive-d639fc45.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:x}=p,c=(t,i)=>i===void 0?t?._$litType$!==void 0:t?._$litType$===i,y=t=>{var i;return((i=t?._$litType$)===null||i===void 0?void 0:i.h)!=null},u=()=>document.createComment(""),v=(t,i,e)=>{var l;const o=t._$AA.parentNode,n=i===void 0?t._$AB:i._$AA;if(e===void 0){const r=o.insertBefore(u(),n),d=o.insertBefore(u(),n);e=new x(r,d,t,t.options)}else{const r=e._$AB.nextSibling,d=e._$AM,$=d!==t;if($){let s;(l=e._$AQ)===null||l===void 0||l.call(e,t),e._$AM=t,e._$AP!==void 0&&(s=t._$AU)!==d._$AU&&e._$AP(s)}if(r!==n||$){let s=e._$AA;for(;s!==r;){const h=s.nextSibling;o.insertBefore(s,n),s=h}}}return e},T={},_=(t,i=T)=>t._$AH=i,A=t=>t._$AH,H=t=>{t._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const a=t=>y(t)?t._$litType$.h:t.strings,M=g(class extends B{constructor(t){super(t),this.tt=new WeakMap}render(t){return[t]}update(t,[i]){const e=c(this.et)?a(this.et):null,l=c(i)?a(i):null;if(e!==null&&(l===null||e!==l)){const o=A(t).pop();let n=this.tt.get(e);if(n===void 0){const r=document.createDocumentFragment();n=f(m,r),n.setConnected(!1),this.tt.set(e,n)}_(n,[o]),v(n,void 0,o)}if(l!==null){if(e===null||e!==l){const o=this.tt.get(l);if(o!==void 0){const n=A(o).pop();H(t),v(t,void 0,n),_(t,[n])}}this.et=i}else this.et=void 0;return this.render(i)}});export{M as cache};
