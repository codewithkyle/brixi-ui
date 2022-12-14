import{html as r,render as n}from"./lit-html.js";import i from"./supercomponent.js";import l from"./env.js";import{noop as o,parseDataset as d}from"./general.js";class a extends i{constructor(e){super();this.handleInput=e=>{const s=e.currentTarget,t=s.value;this.set({value:t.substring(1)}),this.model.callback(s.name,t.substring(1))};this.model={css:"",class:"",attributes:{},value:"000000",name:"",label:"",callback:o,disabled:!1,readOnly:!1},this.model=d(this.dataset,this.model),l.css(["color-input"]).then(()=>{this.set(e,!0),this.render()})}validate(){return!0}getName(){return this.model.name}getValue(){return this.model.value}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const s=r`
            <input
                name="${this.model.name}"
                id="${e}"
                @change=${this.handleInput}
                type="color"
                .value="${this.model.value}"
                ?disabled=${this.model.disabled}
                ?readonly=${this.model.readOnly}
            />
            <label for="${e}">
                <color-preview style="background-color:#${this.model.value};"></color-preview>
                <span>${this.model.label}</span>
            </label>
        `;n(s,this)}}l.bind("color-input",a);export{a as default};
