import{html as t,render as i}from"./lit-html.js";import{unsafeHTML as s}from"./unsafe-html.js";import a from"./component.js";import r from"./env.js";import l from"./pos.js";import{noop as d}from"./general.js";r.css("overflow-menu");class o extends a{constructor(e){super();this.handleItemClick=e=>{e.stopImmediatePropagation(),this.model.callback(e.currentTarget.dataset.id)};this.model={items:[],uid:null,offset:0,target:null,callback:d},this.set(e)}connected(){document.addEventListener("click",()=>{this.remove()},{passive:!0,capture:!0}),window.addEventListener("resize",()=>{this.remove()},{passive:!0,capture:!0}),window.addEventListener("scroll",()=>{this.remove()},{passive:!0,capture:!0}),this.addEventListener("click",e=>{e.stopImmediatePropagation()})}renderItem(e){return e===null?t`<hr />`:t`
            <button sfx="button" type="button" @click=${this.handleItemClick} data-id="${e.id}" class="${e?.danger?"danger":""}">
                ${e?.icon?t` <i> ${s(decodeURI(e.icon))} </i> `:""}
                <span>${e.label}</span>
            </button>
        `}render(){this.setAttribute("overflow-menu-container-id",this.model.uid);const e=t`
            ${this.model.items.map(n=>this.renderItem(n))}
        `;i(e,this),l.positionElementToElement(this,this.model.target,this.model.offset)}}r.bind("overflow-menu",o);export{o as default};
