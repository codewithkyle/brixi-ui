import{html as r,render as o}from"./lit-html.js";import m from"./supercomponent.js";import a from"./env.js";import{parseDataset as l}from"./general.js";class i extends m{constructor(t={}){super(),this.model={value:null,offsetX:0,offsetY:0,css:"",class:"",attributes:{}},this.model=l(this.dataset,this.model),a.css(["badge"]).then(()=>{this.set(t,!0),this.render()})}render(){this.style.cssText=`${this.model.css} transform: translate(${this.model.offsetX}px, ${this.model.offsetY}px);`,this.className=this.model.class,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const t=this.model.value!==null;t&&(this.className="-text");let e=this.model.value;e>9&&(e="9+");const n=r` ${t?r`<span>${e}</span>`:""} `;o(n,this)}}a.mount("badge-component",i);export{i as default};
