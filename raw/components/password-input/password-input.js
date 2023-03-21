import{html as t,render as a}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import n from"./env.js";import{noop as l}from"./general.js";import{InputBase as u}from"./input-base.js";class o extends u{constructor(e){super(e);this.toggleVisibility=()=>{switch(this.model.type){case"password":this.set({type:"text"});break;case"text":this.set({type:"password"});break}};this.handleInput=e=>{const s=e.currentTarget;this.set({value:s.value},!0),this.clearError(),this.model.callbacks.onInput(s.value)};this.handleBlur=()=>{this.validate(),this.model.callbacks.onBlur(this.model.value)};this.handleFocus=()=>{this.model.callbacks.onFocus(this.model.value)};this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",icon:null,placeholder:"",value:null,disabled:!1,maxlength:9999,minlength:0,type:"password",css:"",class:"",callbacks:{onInput:l,onFocus:l,onBlur:l},attributes:{},datalist:[],autofocus:!1},n.css("input").then(()=>{this.set(e,!0),this.render()})}validate(){let e=!0;return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value.length?(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),e&&this.clearError(),e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=t`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=t`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return typeof this.model.icon=="string"?e=t`<i>${i(this.model.icon)}</i>`:this.model.icon instanceof HTMLElement&&(e=t`<i>${this.model.icon}</i>`),e}renderLabel(e){let s="";return this.model.label?.length&&(s=t`<label for="${e}">${i(this.model.label)}</label>`),s}renderEyeIcon(){switch(this.model.type){case"password":return t`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                </svg>`}}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.className=`input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(r=>{this.setAttribute(r,`${this.model.attributes[r]}`)});const s=t`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    type="${this.model.type}"
                    id="${e}"
                    .value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
                <button type="button" @click=${this.toggleVisibility} class="eye">${this.renderEyeIcon()}</button>
            </input-container>
        `;a(s,this)}}n.bind("password-input-component",o);export{o as default};
