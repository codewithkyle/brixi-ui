import{html as n,render as a}from"./lit-html.js";import l from"./env.js";import{noop as i}from"./general.js";import{InputBase as o}from"./input-base.js";class r extends o{constructor(e){super(e);this.handleInput=e=>{const s=e.currentTarget,t=s.value;this.set({value:t.substring(1)}),this.model.callback(s.name,t.substring(1))};this.model={css:"",class:"",attributes:{},value:null,name:"",label:"",callback:i,disabled:!1,readOnly:!1,error:"",required:!1},l.css(["color-input"]).then(()=>{this.set(e,!0),this.render()})}validate(){return!0}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const s=n`
            <input
                name="${this.model.name}"
                id="${e}"
                @change=${this.handleInput}
                type="color"
                .value="${this.model.value??"000000"}"
                ?disabled=${this.model.disabled}
                ?readonly=${this.model.readOnly}
            />
            <label for="${e}">
                <color-preview style="background-color:#${this.model.value??"000000"};"></color-preview>
                <span>${this.model.label}</span>
            </label>
        `;a(s,this)}}l.bind("color-input",r);export{r as default};
