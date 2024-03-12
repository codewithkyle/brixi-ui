import{html as s,render as r}from"./lit-html.js";import e from"./env.js";import{parseDataset as i}from"./general.js";import{unsafeHTML as a}from"./unsafe-html.js";import d from"./component.js";e.css(["status-badge"]);class o extends d{constructor(){super(),this.model={color:"grey",label:"",dot:null,icon:null}}static get observedAttributes(){return["data-color","data-label","data-dot","data-icon"]}async connected(){const t=i(this.dataset,this.model);this.set(t)}render(){this.setAttribute("color",this.model.color),this.model.dot&&!this.model.icon&&this.setAttribute("dot",this.model.dot);const t=s` ${this.model.icon?a(this.model.icon):""} ${this.model.label} `;r(t,this)}}e.bind("brixi-status-badge",o);export{o as default};
