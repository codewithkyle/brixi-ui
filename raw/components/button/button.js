import n from"./supercomponent.js";import{html as i,render as r}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import s from"./env.js";import{noop as a,parseDataset as d}from"./general.js";class o extends n{constructor(t){super();this.handleClick=t=>{t.stopImmediatePropagation(),!this.model.disabled&&this.model.callback()};this.handleKeydown=t=>{if(t instanceof KeyboardEvent&&t.key.toLowerCase()===" "){if(t.stopImmediatePropagation(),this.model.disabled)return;this.classList.add("is-active")}};this.handleKeyup=t=>{if(t instanceof KeyboardEvent&&t.key.toLowerCase()===" "){if(t.stopImmediatePropagation(),this.model.disabled)return;this.classList.remove("is-active"),this.model.callback()}};this.model={label:"",kind:"solid",color:"primary",shape:"default",size:"default",icon:"",iconPosition:"left",callback:a,tooltip:null,css:"",class:"",attributes:{},disabled:!1,type:"button"},this.model=d(this.dataset,this.model);const e=["button"];(t?.tooltip?.length||this.dataset?.tooltip?.length)&&e.push("tooltip"),s.css(e).then(()=>{this.set(t,!0),this.render()})}renderIcon(){let t;return this.model.icon.length?t=i`${l(this.model.icon)}`:t="",t}renderLabel(){let t;return this.model.label.length?t=i`<span>${this.model.label}</span>`:t="",t}connected(){this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keyup",this.handleKeyup)}render(){this.style.cssText=this.model.css,this.className=`${this.model.class} bttn`,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});const t=i` ${this.renderIcon()} ${this.renderLabel()} `;this.setAttribute("role","button"),this.tabIndex=0,this.setAttribute("color",this.model.color),this.setAttribute("size",this.model.size),this.setAttribute("kind",this.model.kind),this.setAttribute("shape",this.model.shape),this.setAttribute("type",this.model.type),this.model.icon.length&&this.setAttribute("icon",this.model.iconPosition),this.model.tooltip&&this.setAttribute("tooltip",this.model.tooltip),this.setAttribute("sfx","button"),this.model.disabled?this.setAttribute("disabled","true"):this.removeAttribute("disabled"),r(t,this)}}s.mount("button-component",o);export{o as default};
