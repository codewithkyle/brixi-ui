import { Z, e, i, B, A } from '../../common/directive-d1e4c9ba.js';

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:l}=Z,t=(o,l)=>void 0===l?void 0!==(null==o?void 0:o._$litType$):(null==o?void 0:o._$litType$)===l,v=o=>{var l;return null!=(null===(l=null==o?void 0:o._$litType$)||void 0===l?void 0:l.h)},r=()=>document.createComment(""),c=(o,i,n)=>{var t;const v=o._$AA.parentNode,d=void 0===i?o._$AB:i._$AA;if(void 0===n){const i=v.insertBefore(r(),d),t=v.insertBefore(r(),d);n=new l(i,t,o,o.options);}else {const l=n._$AB.nextSibling,i=n._$AM,u=i!==o;if(u){let l;null===(t=n._$AQ)||void 0===t||t.call(n,o),n._$AM=o,void 0!==n._$AP&&(l=o._$AU)!==i._$AU&&n._$AP(l);}if(l!==d||u){let o=n._$AA;for(;o!==l;){const l=o.nextSibling;v.insertBefore(o,d),o=l;}}}return n},s={},a=(o,l=s)=>o._$AH=l,m=o=>o._$AH,h=o=>{o._$AR();};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const d=t=>v(t)?t._$litType$.h:t.strings,h$1=e(class extends i{constructor(t){super(t),this.tt=new WeakMap;}render(t){return [t]}update(s,[e]){const u=t(this.et)?d(this.et):null,h$1=t(e)?d(e):null;if(null!==u&&(null===h$1||u!==h$1)){const e=m(s).pop();let o=this.tt.get(u);if(void 0===o){const s=document.createDocumentFragment();o=B(A,s),o.setConnected(!1),this.tt.set(u,o);}a(o,[e]),c(o,void 0,e);}if(null!==h$1){if(null===u||u!==h$1){const t=this.tt.get(h$1);if(void 0!==t){const i=m(t).pop();h(s),c(s,void 0,i),a(s,[i]);}}this.et=e;}else this.et=void 0;return this.render(e)}});

export { h$1 as cache };
