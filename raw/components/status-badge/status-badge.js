import{html as r,render as o}from"./lit-html.js";import a from"./supercomponent.js";import e from"./env.js";import{parseDataset as n}from"./general.js";import{unsafeHTML as l}from"./unsafe-html.js";class i extends a{constructor(t){super(),this.model={css:"",class:"",attributes:{},color:"grey",label:"",dot:null,icon:null},this.model=n(this.dataset,this.model),e.css(["status-badge"]).then(()=>{this.set(t,!0),this.render()})}render(){this.className=this.model.class,this.style.cssText=this.model.css,this.setAttribute("color",this.model.color),this.model.dot&&!this.model.icon&&this.setAttribute("dot",this.model.dot),Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const t=r` ${this.model.icon?l(this.model.icon):""} ${this.model.label} `;o(t,this)}}e.bind("status-badge",i);export{i as default};