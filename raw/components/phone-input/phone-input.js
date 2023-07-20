import{UUID as o}from"./uuid.js";import{html as i,render as u}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import s from"./env.js";import{InputBase as d}from"./input-base.js";s.css("input");class r extends d{constructor(){super();this.handleBlur=e=>{e.stopImmediatePropagation();const t=e.currentTarget,a=this.formatPhoneNumber(t.value);this.set({value:a}),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:a,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation();const t=this.model.value?.toString()?.replace(/[\-\+\s\(\)]/g,"")??null;this.set({value:t}),this.dispatchEvent(new CustomEvent("focus",{detail:{value:t,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleInput=e=>{e.stopImmediatePropagation();const t=e.currentTarget;this.set({value:t.value},!0),this.clearError(),this.dispatchEvent(new CustomEvent("input",{detail:{value:t.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.inputId=o(),this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",icon:null,placeholder:"",value:null,disabled:!1,datalist:[],autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-name","data-required","data-icon","data-placeholder","data-value","data-disabled","data-datalist","data-autofocus","data-read-only"]}validate(){let e=!0;const t=new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim);return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(!this.model.required&&this.model.value?.length||this.model.required)&&(t.test(`${this.model.value}`)||(e=!1,this.setError("Invalid phone number."))),e&&this.clearError(),e}formatPhoneNumber(e){var t=(""+e).replace(/\D/g,""),a=t.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);if(a){var n=a[1]?"+1 ":"";return[n,"(",a[2],") ",a[3],"-",a[4]].join("")}return e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=i`<p>${l(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=i`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=i`<i>${l(this.model.icon)}</i>`),e}renderLabel(){let e="";return this.model.label?.length&&(e=i`<label for="${this.inputId}">${l(this.model.label)}</label>`),e}render(){this.setAttribute("state",this.state),this.classList.add("input");const e=i`
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
        `;u(e,this)}}s.bind("phone-input-component",r);export{r as default};
