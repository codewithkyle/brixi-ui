import{html as s,render as i}from"./lit-html.js";import n from"./component.js";import o from"./env.js";import{parseDataset as l}from"./general.js";o.css(["badge"]);class a extends n{constructor(){super(),this.model={value:null,offsetX:0,offsetY:0}}static get observedAttributes(){return["data-value","data-offset-x","data-offset-y"]}async connected(){const e=l(this.dataset,this.model);this.set(e)}render(){this.style.transform=`translate(${this.model.offsetX}px, ${this.model.offsetY}px)`;const e=this.model.value!==null&&this.model.value?.toString()!=="";e?this.classList.add("-text"):this.classList.remove("-text");let t=this.model.value;t>9&&(t="9+");const r=s` ${e?s`<span>${t}</span>`:""} `;i(r,this)}}o.bind("badge-component",a);export{a as default};
