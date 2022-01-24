import{html as s,render as l}from"./lit-html.js";import o from"./supercomponent.js";import a from"./env.js";import{noop as c,parseDataset as m}from"./general.js";import{unsafeHTML as b}from"./unsafe-html.js";class r extends o{constructor(e){super();this.handleClick=e=>{const t=e.currentTarget;this.model.callback(t.dataset.value),this.update({active:parseInt(t.dataset.index)})};this.model={tabs:[],callback:c,active:0,css:"",class:"",attributes:{}},this.model=m(this.dataset,this.model),a.css(["tabs"]).then(()=>{this.set(e,!0),this.render()})}renderIcon(e){let t;return e?.icon?.length?t=s` <i> ${b(e.icon)} </i> `:t="",t}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const e=s`
            ${this.model.tabs.map((t,i)=>{const n=i===this.model.active;return s`
                    <button class="${n?"is-active":""}" data-value="${t.value}" data-index="${i}" @click=${this.handleClick} sfx="button">
                        ${this.renderIcon(t)} ${t.label}
                    </button>
                `})}
        `;l(e,this)}}a.mount("tabs-component",r);export{r as default};
