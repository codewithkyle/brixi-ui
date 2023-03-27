import s from"./supercomponent.js";import{html as r,render as a}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import o from"./env.js";import d from"./pos.js";class i extends s{constructor(e){super();this.handleItemClick=e=>{const t=e.currentTarget,n=parseInt(t.dataset.index);this.model.items?.[n]?.callback()};this.model={items:[],uid:"",offset:0,target:null},o.css("overflow-menu").then(()=>{this.set(e)})}connected(){document.addEventListener("click",()=>{this.remove()},{passive:!0,capture:!0}),window.addEventListener("resize",()=>{this.remove()},{passive:!0,capture:!0}),window.addEventListener("scroll",()=>{this.remove()},{passive:!0,capture:!0}),this.addEventListener("click",e=>{e.stopImmediatePropagation()})}renderItem(e,t){return e===null?r`<hr />`:r`
            <button sfx="button" type="button" @click=${this.handleItemClick} data-index="${t}" class="${e?.danger?"danger":""}">
                ${e?.icon?r` <i> ${l(e.icon)} </i> `:""}
                <span>${e.label}</span>
            </button>
        `}render(){this.setAttribute("overflow-menu-container-id",this.model.uid);const e=r`
            ${this.model.items.map((t,n)=>this.renderItem(t,n))}
        `;a(e,this),d.positionElementToElement(this,this.model.target,this.model.offset)}}o.bind("overflow-menu",i);export{i as default};
