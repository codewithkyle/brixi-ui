import{html as n,render as s}from"./lit-html.js";import i from"./env.js";import{parseDataset as o}from"./general.js";import{unsafeHTML as l}from"./unsafe-html.js";import u from"./overflow-menu.js";import{UUID as a}from"./uuid.js";import p from"./component.js";i.css(["split-button","button"]);class r extends p{constructor(){super();this.hideMenu=()=>{const t=this.querySelector("button-menu");t&&(t.style.visibility="hidden")};this.handlePrimaryClick=()=>{this.dispatchEvent(new CustomEvent("action",{detail:{id:this.model.id},bubbles:!0,cancelable:!0}))};this.openMenu=()=>{new u({target:this,uid:this.uid,items:this.model.buttons,offset:4,callback:t=>{this.dispatchEvent(new CustomEvent("action",{detail:{id:t},bubbles:!0,cancelable:!0}))}})};this.uid=a(),this.model={type:"button",label:"",buttons:[],icon:"",id:""}}static get observedAttributes(){return["data-type","data-label","data-buttons","data-icon"]}async connected(){const t=o(this.dataset,this.model);this.set(t)}renderIcon(t){let e;return t?.length?e=n` <i class="icon"> ${l(t)} </i> `:e="",e}renderLabel(t){let e;return t?e=n` <span>${t}</span> `:e="",e}renderPrimaryButton(){return n`
            <button class="base" sfx="button" type=${this.model.type} @click=${this.handlePrimaryClick}>
                ${this.renderIcon(this.model.icon)} ${this.renderLabel(this.model.label)}
            </button>
        `}renderMenuButtons(){let t;return this.model.buttons.length?t=n`
                <button sfx="button" class="split" aria-label="Open button menu" type="button" @click=${this.openMenu} @focus=${this.hideMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            `:t="",t}render(){const t=n` ${this.renderPrimaryButton()} ${this.renderMenuButtons()} `;s(t,this)}}i.bind("brixi-split-button",r);export{r as default};
