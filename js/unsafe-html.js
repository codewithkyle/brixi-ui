import{nothing as i,noChange as r}from"./lit-html.js";import{i as n,t as o,e as a}from"./directive-d639fc45.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends n{constructor(t){if(super(t),this.et=i,t.type!==o.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===i||t==null)return this.ft=void 0,this.et=t;if(t===r)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const s=[t];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const c=a(e);export{e as UnsafeHTMLDirective,c as unsafeHTML};
