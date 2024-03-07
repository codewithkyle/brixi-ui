import{Z as a,e as f,i as m,B as g,A as B}from"./directive-d1e4c9ba.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:x}=a,c=(t,i)=>i===void 0?t?._$litType$!==void 0:t?._$litType$===i,y=t=>{var i;return((i=t?._$litType$)===null||i===void 0?void 0:i.h)!=null},u=()=>document.createComment(""),v=(t,i,e)=>{var n;const o=t._$AA.parentNode,l=i===void 0?t._$AB:i._$AA;if(e===void 0){const r=o.insertBefore(u(),l),d=o.insertBefore(u(),l);e=new x(r,d,t,t.options)}else{const r=e._$AB.nextSibling,d=e._$AM,$=d!==t;if($){let s;(n=e._$AQ)===null||n===void 0||n.call(e,t),e._$AM=t,e._$AP!==void 0&&(s=t._$AU)!==d._$AU&&e._$AP(s)}if(r!==l||$){let s=e._$AA;for(;s!==r;){const p=s.nextSibling;o.insertBefore(s,l),s=p}}}return e},T={},A=(t,i=T)=>t._$AH=i,_=t=>t._$AH,M=t=>{t._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const h=t=>y(t)?t._$litType$.h:t.strings,b=f(class extends m{constructor(t){super(t),this.tt=new WeakMap}render(t){return[t]}update(t,[i]){const e=c(this.et)?h(this.et):null,n=c(i)?h(i):null;if(e!==null&&(n===null||e!==n)){const o=_(t).pop();let l=this.tt.get(e);if(l===void 0){const r=document.createDocumentFragment();l=g(B,r),l.setConnected(!1),this.tt.set(e,l)}A(l,[o]),v(l,void 0,o)}if(n!==null){if(e===null||e!==n){const o=this.tt.get(n);if(o!==void 0){const l=_(o).pop();M(t),v(t,void 0,l),A(t,[l])}}this.et=i}else this.et=void 0;return this.render(i)}});export{b as cache};
