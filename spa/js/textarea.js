import{html as t,render as r}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import a from"./env.js";import{parseDataset as n}from"./general.js";import o from"./soundscape.js";import d from"./component.js";import{UUID as u}from"./uuid.js";import h from"./alerts.js";a.css(["textarea","button","toast"]);class s extends d{constructor(){super();this.handleBlur=e=>{e.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleInput=e=>{e.stopImmediatePropagation();const l=e.currentTarget;this.set({value:l.value}),this.validate(),this.dispatchEvent(new CustomEvent("input",{detail:{value:l.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleCopyClick=e=>{e.stopImmediatePropagation(),window.navigator.clipboard.writeText(this.model.value).then(()=>{h.toast("Copied to clipboard")})};this.inputId=u(),this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",placeholder:"",value:"",maxlength:1/0,minlength:0,disabled:!1,readOnly:!1,rows:5,autofocus:!1}}static get observedAttributes(){return["data-label","data-name","data-instructions","data-required","data-autocomplete","data-placeholder","data-value","data-maxlength","data-minlength","data-disabled","data-read-only","data-rows","data-autofocus"]}async connected(){const e=n(this.dataset,this.model);this.state=e?.disabled?"DISABLED":"IDLING",this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}reset(){this.set({value:null});const e=this.querySelector("input");e&&(e.value=null)}setError(e){this.set({error:e}),this.trigger("ERROR"),o.play("error")}validate(){let e=!0;return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value.length?(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),e&&this.clearError(),e}getName(){return this.model.name}getValue(){return this.model.value}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=t`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=t`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderLabel(){let e;return this.model.label?.length?e=t`<label for="${this.inputId}"
                >${i(this.model.label)} ${this.model.required?"":t`<span class="font-grey-400 dark:font-grey-500 font-xs">(optional)</span>`}</label
            >`:e="",e}renderReadOnlyIcon(){let e="";return this.model.readOnly&&(e=t`
                <button class="bttn absolute r-0 b-0" kind="text" color="primary" size="slim" shape="round" icon="center" dull @click=${this.handleCopyClick} type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                    </svg>
                </button>
            `),e}renderCounter(){let e;return this.model.maxlength===1/0||this.model.readOnly?e="":e=t` <span class="counter"> ${this.model.value?.length??0}/${this.model.maxlength} </span> `,e}render(){this.setAttribute("state",this.state),this.setAttribute("form-input",""),this.model.readOnly&&this.setAttribute("readonly","");const e=t`
            ${this.renderLabel()} ${this.renderCopy()}
            <textarea
                @input=${this.handleInput}
                @blur=${this.handleBlur}
                @focus=${this.handleFocus}
                placeholder="${this.model.placeholder}"
                autocomplete="${this.model.autocomplete}"
                rows="${this.model.rows}"
                maxlength="${this.model.maxlength!==1/0?this.model.maxlength:9999}"
                minlength="${this.model.minlength}"
                name="${this.model.name}"
                id="${this.inputId}"
                ?readonly=${this.model.readOnly}
                ?required=${this.model.required}
                ?disabled=${this.model.disabled}
                ?autofocus=${this.model.autofocus}
            >
${this.model.value??""}</textarea
            >
            ${this.renderCounter()} ${this.renderReadOnlyIcon()}
        `;r(e,this)}}a.bind("brixi-textarea",s);export{s as default};
