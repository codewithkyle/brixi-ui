import{html as s,render as o}from"./lit-html.js";import c from"./supercomponent.js";import i from"./env.js";import{noop as l,parseDataset as b}from"./general.js";import{unsafeHTML as m}from"./unsafe-html.js";class r extends c{constructor(e){super();this.handleClick=e=>{const t=e.currentTarget;this.model.callback(t.dataset.value),this.update({active:parseInt(t.dataset.index)})};this.model={tabs:[],callback:l,active:0,css:"",class:"",attributes:{}},this.model=b(this.dataset,this.model),i.css(["tabs"]).then(()=>{this.set(e,!0),this.render()})}renderIcon(e){let t;return e?.icon?.length?t=s` <i> ${m(e.icon)} </i> `:t="",t}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const e=s`
            ${this.model.tabs.map((t,a)=>{const n=a===this.model.active;return s`
                    <button class="${n?"is-active":""}" data-value="${t.value}" data-index="${a}" @click=${this.handleClick} sfx="button">
                        ${this.renderIcon(t)} ${t.label}
                    </button>
                `})}
        `;o(e,this)}}i.mount("tabs-component",r);export{r as default};
