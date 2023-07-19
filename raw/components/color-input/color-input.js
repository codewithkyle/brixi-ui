import{UUID as n}from"./uuid.js";import{html as o,render as i}from"./lit-html.js";import r from"./env.js";import{InputBase as d}from"./input-base.js";import"./strings.js";r.css(["color-input"]);class l extends d{constructor(){super();this.handleInput=e=>{e.stopImmediatePropagation();const t=e.currentTarget,a=t.value;this.set({value:a}),this.dispatchEvent(new CustomEvent("change",{detail:{name:t.name,value:a}}))};this.inputId=n(),this.model={value:"000000",name:"",label:"",disabled:!1,readOnly:!1,error:"",required:!1}}static get observedAttributes(){return["data-value","data-name","data-label","data-disabled","data-read-only","data-required"]}validate(){return!0}render(){const e=o`
            <input
                name="${this.model.name}"
                id="${this.inputId}"
                @change=${this.handleInput}
                type="color"
                value="${this.model.value}"
                ?disabled=${this.model.disabled}
                ?readonly=${this.model.readOnly}
            />
            <label for="${this.inputId}">
                <color-preview style="background-color:#${this.model.value.ltrim("#")};"></color-preview>
                <span>${this.model.label}</span>
            </label>
        `;i(e,this)}}r.bind("color-input",l);export{l as default};
