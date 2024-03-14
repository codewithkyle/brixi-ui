import{UUID as n}from"./uuid.js";import{html as i,render as o}from"./lit-html.js";import r from"./env.js";import{InputBase as s}from"./input-base.js";import"./strings.js";r.css(["color-input"]);class l extends s{constructor(){super();this.handleInput=e=>{e.stopImmediatePropagation();const t=e.currentTarget,a=t.value;this.set({value:a}),this.dispatchEvent(new CustomEvent("change",{detail:{name:t.name,value:a},bubbles:!0,cancelable:!0}))};this.inputId=n(),this.model={value:"000000",name:"",label:"",disabled:!1,readOnly:!1,error:"",required:!1}}static get observedAttributes(){return["data-value","data-name","data-label","data-disabled","data-read-only","data-required"]}validate(){return!0}render(){this.setAttribute("state",this.state);const e=i`
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
        `;o(e,this)}}r.bind("brixi-color-input",l);export{l as default};
