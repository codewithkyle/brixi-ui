import{html as n,render as o}from"./lit-html.js";import r from"./env.js";import{parseDataset as a}from"./general.js";import{unsafeHTML as u}from"./unsafe-html.js";import l from"./component.js";r.css(["group-button","button"]);class s extends l{constructor(){super();this.handleClick=e=>{const t=e.currentTarget;this.set({active:t.dataset.id});const i=new CustomEvent("change",{detail:{id:t.dataset.id},bubbles:!0,cancelable:!0});this.dispatchEvent(i)};this.model={buttons:[],active:null}}static get observedAttributes(){return["data-buttons","data-active"]}async connected(){const e=a(this.dataset,this.model);this.set(e)}renderIcon(e){let t;return e?.length?t=n` <i class="icon"> ${u(decodeURI(e))} </i> `:t="",t}renderLabel(e){let t;return e?t=n` <span>${e}</span> `:t="",t}renderButtons(){let e;return this.model.buttons.length?e=n`
                ${this.model.buttons.map(t=>n`
                        <button
                            class="bttn ${t.id===this.model.active?"is-active":""}"
                            @click=${this.handleClick}
                            data-id="${t.id}"
                            kind="outline"
                            color="grey"
                            sfx="button"
                            type="${t?.type??"button"}"
                        >
                            ${this.renderIcon(t?.icon??"")} ${this.renderLabel(t.label)}
                        </button>
                    `)}
            `:e="",e}render(){const e=n` ${this.renderButtons()} `;o(e,this)}}r.bind("group-button",s);export{s as default};
