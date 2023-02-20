import{html as n,render as o}from"./lit-html.js";import l from"./supercomponent.js";import s from"./env.js";import{noop as a,parseDataset as u}from"./general.js";import{unsafeHTML as c}from"./unsafe-html.js";class r extends l{constructor(e){super();this.hideMenu=e=>{const t=this.querySelector("button-menu");t&&(t.style.visibility="hidden")};this.handlePrimaryClick=e=>{this.model.callback()};this.handleSecondaryClick=e=>{const t=e.currentTarget,i=parseInt(t.dataset.index);this.model.buttons[i].callback()};this.openMenu=e=>{const t=this.querySelector("button-menu");if(t){t.style.visibility="visible";const i=t.querySelector("button-menu button");console.log(i),i&&i.focus()}};this.model={css:"",class:"",attributes:{},type:"button",label:"",buttons:[],icon:"",callback:a},this.model=u(this.dataset,this.model),s.css(["split-button","button"]).then(()=>{this.set(e,!0),this.render()})}renderIcon(e){let t;return e instanceof HTMLElement?t=n` <i class="icon">${e}</i> `:typeof e=="string"&&e.length?t=n` <i class="icon"> ${c(e)} </i> `:t="",t}renderLabel(e){let t;return e?t=n` <span>${e}</span> `:t="",t}renderPrimaryButton(){return n`
            <button class="bttn" type="${this.model.type}" @click=${this.handlePrimaryClick} kind="outline" color="grey">
                ${this.renderIcon(this.model.icon)} ${this.renderLabel(this.model.label)}
            </button>
        `}renderMenuButtons(){let e;return this.model.buttons.length?e=n`
                <button class="split bttn" aria-label="Open button menu" type="button" kind="outline" color="grey" @click=${this.openMenu} @focus=${this.hideMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <button-menu>
                    ${this.model.buttons.map((t,i)=>t===null?n`<hr />`:n`
                                <button class="${t?.danger?"danger":""}" type="${t?.type??"button"}" @click=${this.handleSecondaryClick} data-index="${i}">
                                    ${this.renderIcon(t?.icon??"")} ${this.renderLabel(t.label)}
                                </button>
                            `)}
                </button-menu>
            `:e="",e}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const e=n` ${this.renderPrimaryButton()} ${this.renderMenuButtons()} `;o(e,this)}}s.bind("split-button",r);export{r as default};
