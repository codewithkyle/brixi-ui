import{html as n,render as l}from"./lit-html.js";import o from"./supercomponent.js";import i from"./env.js";import{noop as a,parseDataset as u}from"./general.js";import{unsafeHTML as c}from"./unsafe-html.js";class r extends o{constructor(t){super();this.hideMenu=()=>{const t=this.querySelector("button-menu");t&&(t.style.visibility="hidden")};this.handlePrimaryClick=()=>{this.model.callback()};this.handleSecondaryClick=t=>{const e=t.currentTarget,s=parseInt(e.dataset.index);this.model.buttons[s].callback()};this.openMenu=()=>{const t=this.querySelector("button-menu");if(t){t.style.visibility="visible";const e=t.querySelector("button-menu button");console.log(e),e&&e.focus()}};this.model={css:"",class:"",attributes:{},type:"button",label:"",buttons:[],icon:"",callback:a},this.model=u(this.dataset,this.model),i.css(["split-button","button"]).then(()=>{this.set(t,!0),this.render()})}renderIcon(t){let e;return t instanceof HTMLElement?e=n` <i class="icon">${t}</i> `:typeof t=="string"&&t.length?e=n` <i class="icon"> ${c(t)} </i> `:e="",e}renderLabel(t){let e;return t?e=n` <span>${t}</span> `:e="",e}renderPrimaryButton(){return n` <button type=${this.model.type} @click=${this.handlePrimaryClick}>${this.renderIcon(this.model.icon)} ${this.renderLabel(this.model.label)}</button> `}renderMenuButtons(){let t;return this.model.buttons.length?t=n`
                <button class="split" aria-label="Open button menu" type="button" @click=${this.openMenu} @focus=${this.hideMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <button-menu>
                    ${this.model.buttons.map((e,s)=>e===null?n`<hr />`:n`
                                <button class="${e?.danger?"danger":""}" type="${e?.type??"button"}" @click=${this.handleSecondaryClick} data-index="${s}">
                                    ${this.renderIcon(e?.icon??"")} ${this.renderLabel(e.label)}
                                </button>
                            `)}
                </button-menu>
            `:t="",t}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});const t=n` ${this.renderPrimaryButton()} ${this.renderMenuButtons()} `;l(t,this)}}i.bind("split-button",r);export{r as default};
