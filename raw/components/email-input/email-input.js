import{UUID as r}from"./uuid.js";import{html as t,render as n}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import l from"./env.js";import{InputBase as o}from"./input-base.js";l.css("input");class s extends o{constructor(){super();this.handleInput=e=>{e.stopImmediatePropagation();const a=e.currentTarget;this.set({value:a.value},!0),this.clearError(),this.dispatchEvent(new CustomEvent("input",{detail:{value:a.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleBlur=e=>{e.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.inputId=r(),this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,disabled:!1,maxlength:9999,minlength:0,datalist:[],autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-name","data-required","data-autocomplete","data-autocapitalize","data-icon","data-placeholder","data-value","data-maxlength","data-minlength","data-disabled","data-read-only","data-datalist","data-autofocus"]}validate(){let e=!0;const a=new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm);return this.model.required&&!this.model.value?.length?(e=!1,this.setError("This field is required.")):(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.value.length&&!a.test(this.model.value)?(e=!1,this.setError("Invalid email format.")):this.model.minlength>this.model.value.length?(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),e&&this.clearError(),e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=t`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=t`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=t`<i>${i(this.model.icon)}</i>`),e}renderLabel(){let e="";return this.model.label?.length&&(e=t`<label for="${this.inputId}">${i(this.model.label)}</label>`),e}render(){this.setAttribute("state",this.state),this.classList.add("input");const e=t`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="email"
                    type="email"
                    id="${this.inputId}"
                    .value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;n(e,this)}}l.bind("email-input-component",s);export{s as default};
