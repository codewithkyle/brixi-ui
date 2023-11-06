import{UUID as o}from"./uuid.js";import{html as a,render as u}from"./lit-html.js";import{unsafeHTML as s}from"./unsafe-html.js";import r from"./env.js";import{InputBase as d}from"./input-base.js";r.css("input");class l extends d{constructor(){super();this.handleBlur=e=>{e.stopImmediatePropagation();const t=e.currentTarget,i=this.formatPhoneNumber(t.value);this.set({value:i}),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:i,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation();const t=this.model.value?.toString()?.replace(/[\-\+\s\(\)]/g,"")??null;this.set({value:t}),this.dispatchEvent(new CustomEvent("focus",{detail:{value:t,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleInput=e=>{e.stopImmediatePropagation();const t=e.currentTarget;this.set({value:t.value},!0),this.clearError(),this.dispatchEvent(new CustomEvent("input",{detail:{value:t.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.inputId=o(),this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",icon:null,placeholder:"",value:null,disabled:!1,datalist:[],autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-name","data-required","data-icon","data-placeholder","data-value","data-disabled","data-datalist","data-autofocus"]}validate(){let e=!0;const t=new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim);return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(!this.model.required&&this.model.value?.length||this.model.required)&&(t.test(`${this.model.value}`)||(e=!1,this.setError("Invalid phone number."))),e&&this.clearError(),e}formatPhoneNumber(e){var t=(""+e).replace(/\D/g,""),i=t.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);if(i){var n=i[1]?"+1 ":"";return[n,"(",i[2],") ",i[3],"-",i[4]].join("")}return e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=a`<p>${s(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=a`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=a`<i>${s(this.model.icon)}</i>`),e}renderLabel(){let e="";return this.model.label?.length&&(e=a`<label for="${this.inputId}">${s(this.model.label)}</label>`),e}render(){this.setAttribute("state",this.state),this.classList.add("input");const e=a`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @focus=${this.handleFocus}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="tel"
                    type="tel"
                    id="${this.inputId}"
                    .value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;u(e,this)}}r.bind("phone-input-component",l);export{l as default};
