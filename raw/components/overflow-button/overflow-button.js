import{html as r,render as d}from"./lit-html.js";import e from"./env.js";import{parseDataset as a}from"./general.js";import l from"./overflow-menu.js";import{unsafeHTML as h}from"./unsafe-html.js";import{UUID as m}from"./uuid.js";import c from"./component.js";e.css(["button"]);class i extends c{constructor(){super();this.handleClick=t=>{t.stopImmediatePropagation();const o=new l({uid:this.uid,items:this.model.items,target:this,callback:s=>{const n=new CustomEvent("action",{detail:{id:s}});this.dispatchEvent(n)}});document.body.appendChild(o)};this.uid=m(),this.model={kind:"text",color:"grey",shape:"round",size:"default",icon:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>',iconPosition:"center",disabled:!1,items:[]}}static get observedAttributes(){return["data-kind","data-color","data-shape","data-size","data-icon","data-icon-position","data-disabled","data-items"]}connected(){const t=a(this.dataset,this.model);this.set(t),this.addEventListener("click",this.handleClick)}render(){this.classList.add("bttn"),this.setAttribute("kind",this.model.kind),this.setAttribute("color",this.model.color),this.setAttribute("shape",this.model.shape),this.setAttribute("icon",this.model.iconPosition),this.setAttribute("size",this.model.size),this.model.disabled&&this.setAttribute("disabled",`${this.model.disabled}`);const t=r` ${h(this.model.icon)} `;d(t,this)}}e.bind("overflow-button",i);export{i as default};