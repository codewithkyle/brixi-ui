import{html as n,render as i}from"./lit-html.js";import a from"./supercomponent.js";import s from"./env.js";import m from"./pos.js";class o extends a{constructor(e){super();this.handleItemClick=e=>{const t=e.currentTarget,r=parseInt(t.dataset.index);this.model.items?.[r]?.callback()};this.model={items:[],x:0,y:0},s.css(["context-menu"]).then(()=>{this.set(e)})}connected(){document.addEventListener("click",()=>{this.remove()},{passive:!0,capture:!0}),window.addEventListener("resize",()=>{this.remove()},{passive:!0,capture:!0}),window.addEventListener("scroll",()=>{this.remove()},{passive:!0,capture:!0}),this.addEventListener("click",e=>{e.stopImmediatePropagation()})}renderItem(e,t){return e===null?n`<hr />`:n`
            <button sfx="button" type="button" @click=${this.handleItemClick} data-index="${t}">
                <span>${e.label}</span>
                ${e.hotkey?n`<span class="font-grey-400">${e.hotkey}</span>`:""}
            </button>
        `}render(){m.positionElement(this,this.model.x,this.model.y);const e=n` ${this.model.items?.map((t,r)=>this.renderItem(t,r))} `;i(e,this)}}s.bind("context-menu",o);export{o as default};
