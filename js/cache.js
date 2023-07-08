import{_$LH as v,render as p,nothing as g}from"./lit-html.js";import{e as u,i as m}from"./directive-d639fc45.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:B}=v,l=(t,s)=>s===void 0?t?._$litType$!==void 0:t?._$litType$===s,_=()=>document.createComment(""),$=(t,s,e)=>{var n;const r=t._$AA.parentNode,o=s===void 0?t._$AB:s._$AA;if(e===void 0){const d=r.insertBefore(_(),o),c=r.insertBefore(_(),o);e=new B(d,c,t,t.options)}else{const d=e._$AB.nextSibling,c=e._$AM,A=c!==t;if(A){let i;(n=e._$AQ)===null||n===void 0||n.call(e,t),e._$AM=t,e._$AP!==void 0&&(i=t._$AU)!==c._$AU&&e._$AP(i)}if(d!==o||A){let i=e._$AA;for(;i!==d;){const h=i.nextSibling;r.insertBefore(i,o),i=h}}}return e},x={},a=(t,s=x)=>t._$AH=s,f=t=>t._$AH,H=t=>{t._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=u(class extends m{constructor(t){super(t),this.tt=new WeakMap}render(t){return[t]}update(t,[s]){if(l(this.et)&&(!l(s)||this.et.strings!==s.strings)){const e=f(t).pop();let n=this.tt.get(this.et.strings);if(n===void 0){const r=document.createDocumentFragment();n=p(g,r),n.setConnected(!1),this.tt.set(this.et.strings,n)}a(n,[e]),$(n,void 0,e)}if(l(s)){if(!l(this.et)||this.et.strings!==s.strings){const e=this.tt.get(s.strings);if(e!==void 0){const n=f(e).pop();H(t),$(t,void 0,n),a(t,[n])}}this.et=s}else this.et=void 0;return this.render(s)}});export{M as cache};
