import{html as n,render as i}from"./lit-html.js";import l from"./supercomponent.js";import r from"./env.js";import{parseDataset as u}from"./general.js";import{unsafeHTML as a}from"./unsafe-html.js";class o extends l{constructor(t){super();this.handleClick=t=>{const e=t.currentTarget,s=parseInt(e.dataset.index);this.model.buttons[s].callback()};this.model={css:"",class:"",attributes:{},kind:"solid",color:"grey",buttons:[]},this.model=u(this.dataset,this.model),r.css(["group-button","button"]).then(()=>{this.set(t,!0),this.render()})}renderIcon(t){let e;return t instanceof HTMLElement?e=n` <i class="icon">${t}</i> `:typeof t=="string"&&t.length?e=n` <i class="icon"> ${a(t)} </i> `:e="",e}renderLabel(t){let e;return t?e=n` <span>${t}</span> `:e="",e}renderButtons(){let t;return this.model.buttons.length?t=n`
                ${this.model.buttons.map((e,s)=>n`
                        <button class="bttn" @click=${this.handleClick} data-index="${s}" kind="${this.model.kind}" color="${this.model.color}" type="${e?.type??"button"}">
                            ${this.renderIcon(e?.icon??"")} ${this.renderLabel(e.label)}
                        </button>
                    `)}
            `:t="",t}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});const t=n` ${this.renderButtons()} `;i(t,this)}}r.bind("group-button",o);export{o as default};
