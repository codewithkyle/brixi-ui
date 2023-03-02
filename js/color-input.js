import{html as a,render as n}from"./lit-html.js";import r from"./env.js";import{noop as i}from"./general.js";import{InputBase as o}from"./input-base.js";class l extends o{constructor(e){super(e);this.handleInput=e=>{const s=e.currentTarget,t=s.value;this.set({value:t.substring(1)}),this.model.callback(s.name,t.substring(1))};this.model={css:"",class:"",attributes:{},value:"000000",name:"",label:"",callback:i,disabled:!1,readOnly:!1,error:"",required:!1},r.css(["color-input"]).then(()=>{this.set(e,!0),this.render()})}validate(){return!0}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const s=a`
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
        `;n(s,this)}}r.bind("color-input",l);export{l as default};
