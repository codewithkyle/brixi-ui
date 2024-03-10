import{i as r,A as i,t as n,w as o,e as c}from"./directive-d1e4c9ba.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends r{constructor(t){if(super(t),this.et=i,t.type!==n.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===i||t==null)return this.ft=void 0,this.et=t;if(t===o)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const s=[t];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const u=c(e);export{e as UnsafeHTMLDirective,u as unsafeHTML};
