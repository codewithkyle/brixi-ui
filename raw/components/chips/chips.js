import{html as a,render as c}from"./lit-html.js";import l from"./supercomponent.js";import r from"./env.js";import{noop as h,parseDataset as d}from"./general.js";import{unsafeHTML as p}from"./unsafe-html.js";class o extends l{constructor(e){super();this.handleClick=e=>{const t=e.currentTarget,s=t.dataset.name,n=parseInt(t.dataset.index),i={...this.model};this.model.type==="static"?(this.model.chipStates[s]?i.chipStates[s]=!1:i.chipStates[s]=!0,this.model.callback(s,i.chipStates[s])):(i.chips.splice(n,1),this.model.callback(s)),this.set(i)};this.model={type:"static",callback:h,chips:[],chipStates:{},class:"",css:"",attributes:{},kind:"outline"},this.model=d(this.dataset,this.model);for(const t of e?.chips)this.model.chipStates[t.name]=!1;r.css(["chips"]).then(()=>{this.set(e,!0),this.render()})}renderIcon(e){return a` <i> ${p(e)} </i> `}renderCloseIcon(){let e;return this.model.type==="dynamic"?e=a`
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </i>
            `:e="",e}addChip(e){const t={...this.model};t.chips.push(e),this.set(t)}removeChip(e){const t={...this.model};t.chips.splice(e,1),this.set(t)}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const e=a`
            ${this.model.chips.map((t,s)=>{let n=this.model.kind;return this.model.chipStates[t.name]&&(n="solid"),a`
                    <button
                        sfx="button"
                        kind="${n}"
                        @click=${this.handleClick}
                        data-name="${t.name}"
                        data-index="${s}"
                        class="chip"
                        kind="outline"
                        ?icon=${t?.icon}
                        ?closeable=${this.model.type==="dynamic"}
                    >
                        ${this.renderIcon(t?.icon??"")} ${t.label} ${this.renderCloseIcon()}
                    </button>
                `})}
        `;c(e,this)}}r.mount("chips-component",o);export{o as default};
