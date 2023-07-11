import{html as s,render as n}from"./lit-html.js";import t from"./env.js";import{parseDataset as a}from"./general.js";import r from"./component.js";t.css(["suggestion-chip"]);class i extends r{constructor(){super();this.handleClick=()=>{this.dispatchEvent(new CustomEvent("suggest",{detail:{value:this.model.value}}))};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{e.key===" "&&(this.classList.remove("is-active"),this.click())};this.model={label:"",value:null}}static get observedAttributes(){return["data-label","data-value"]}connected(){const e=a(this.dataset,this.model);this.set(e),this.addEventListener("click",this.handleClick),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}render(){this.tabIndex=0,this.setAttribute("role","button"),this.setAttribute("sfx","button");const e=s` <span>${this.model.label}</span> `;n(e,this)}}t.bind("suggestion-chip",i);export{i as default};
