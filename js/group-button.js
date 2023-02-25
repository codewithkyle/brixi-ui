import{html as s,render as o}from"./lit-html.js";import l from"./supercomponent.js";import r from"./env.js";import{parseDataset as a}from"./general.js";import{unsafeHTML as u}from"./unsafe-html.js";class i extends l{constructor(t){super();this.handleClick=t=>{const e=t.currentTarget,n=parseInt(e.dataset.index);this.set({active:n}),this.model.buttons[n].callback()};this.model={css:"",class:"",attributes:{},buttons:[],active:null},this.model=a(this.dataset,this.model),r.css(["group-button","button"]).then(()=>{this.set(t,!0),this.render()})}renderIcon(t){let e;return t instanceof HTMLElement?e=s` <i class="icon">${t}</i> `:typeof t=="string"&&t.length?e=s` <i class="icon"> ${u(t)} </i> `:e="",e}renderLabel(t){let e;return t?e=s` <span>${t}</span> `:e="",e}renderButtons(){let t;return this.model.buttons.length?t=s`
                ${this.model.buttons.map((e,n)=>s`
                        <button
                            class="bttn ${n===this.model.active?"is-active":""}"
                            @click=${this.handleClick}
                            data-index="${n}"
                            kind="outline"
                            color="grey"
                            type="${e?.type??"button"}"
                        >
                            ${this.renderIcon(e?.icon??"")} ${this.renderLabel(e.label)}
                        </button>
                    `)}
            `:t="",t}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});const t=s` ${this.renderButtons()} `;o(t,this)}}r.bind("group-button",i);export{i as default};
