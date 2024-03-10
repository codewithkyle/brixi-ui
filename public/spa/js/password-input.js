import{UUID as a}from"./uuid.js";import{html as t,render as n}from"./lit-html.js";import{unsafeHTML as s}from"./unsafe-html.js";import l from"./env.js";import{InputBase as o}from"./input-base.js";l.css("input");class r extends o{constructor(){super();this.toggleVisibility=()=>{switch(this.model.type){case"password":this.set({type:"text"});break;case"text":this.set({type:"password"});break}};this.handleInput=e=>{e.stopImmediatePropagation();const i=e.currentTarget;this.set({value:i.value}),this.clearError(),this.dispatchEvent(new CustomEvent("input",{detail:{value:i.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleBlur=e=>{e.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.inputId=a(),this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",icon:null,placeholder:"",value:null,disabled:!1,maxlength:9999,minlength:0,type:"password",autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-name","data-required","data-autocomplete","data-icon","data-placeholder","data-value","data-disabled","data-maxlength","data-minlength","data-autofocus"]}validate(){let e=!0;return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value.length?(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),e&&this.clearError(),e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=t`<p>${s(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=t`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=t`<i>${s(this.model.icon)}</i>`),e}renderLabel(){let e="";return this.model.label?.length&&(e=t`<label for="${this.inputId}">${s(this.model.label)}</label>`),e}renderEyeIcon(){switch(this.model.type){case"password":return t`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>`;case"text":return t`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                </svg>`}}render(){this.setAttribute("state",this.state),this.classList.add("input");const e=t`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    type="${this.model.type}"
                    id="${this.inputId}"
                    value=${this.model.value||""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                    style="padding-right:36px;"
                />
                <button type="button" @click=${this.toggleVisibility} class="eye">${this.renderEyeIcon()}</button>
            </input-container>
        `;n(e,this)}}l.bind("password-input-component",r);export{r as default};
