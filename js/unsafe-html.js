import{directive as r,NodePart as c,isPrimitive as m}from"./lit-html.js";/**
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
 */const s=new WeakMap,u=r(t=>e=>{if(!(e instanceof c))throw new Error("unsafeHTML can only be used in text bindings");const n=s.get(e);if(n!==void 0&&m(t)&&t===n.value&&e.value===n.fragment)return;const o=document.createElement("template");o.innerHTML=t;const i=document.importNode(o.content,!0);e.setValue(i),s.set(e,{value:t,fragment:i})});export{u as unsafeHTML};
