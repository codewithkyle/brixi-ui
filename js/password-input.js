import{html as i,render as o}from"./lit-html.js";import r from"./env.js";import{noop as a,parseDataset as n}from"./general.js";import{default as d}from"./input.js";class l extends d{constructor(e){super(e);this.toggleVisibility=e=>{switch(this.model.type){case"password":this.set({type:"text"});break;case"text":this.set({type:"password"});break}};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",disabled:!1,maxlength:9999,minlength:0,type:"password",css:"",class:"",callback:a,attributes:{},datalist:[],autofocus:!1},this.model=n(this.dataset,this.model),r.css("input").then(()=>{this.set(e,!0),this.render()})}validate(e=null,s=!1){e||(e=this.querySelector("input"));let t=!0;return this.model.required&&!e.value.length&&(t=!1,this.setError("This field is required.",s)),(this.model.required||!this.model.required&&e.value.length)&&(this.model.minlength>e.value.length?(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,s)):this.model.maxlength<e.value.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,s))),t&&this.clearError(),t}renderEyeIcon(){switch(this.model.type){case"password":return i`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>`;case"text":return i`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                </svg>`}}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,s=i`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    type="${this.model.type}"
                    id="${e}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
                <button type="button" @click=${this.toggleVisibility} class="eye">${this.renderEyeIcon()}</button>
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),o(s,this)}}r.bind("password-input-component",l);export{l as default};
