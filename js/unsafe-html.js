import{directive as s,NodePart as c,isPrimitive as u}from"./lit-html.js";/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const r=new WeakMap,m=s(n=>e=>{if(!(e instanceof c))throw new Error("unsafeHTML can only be used in text bindings");const t=r.get(e);if(t!==void 0&&u(n)&&n===t.value&&e.value===t.fragment)return;const o=document.createElement("template");o.innerHTML=n;const i=document.importNode(o.content,!0);e.setValue(i),r.set(e,{value:n,fragment:i})});export{m as unsafeHTML};
