import{html as t,render as r}from"./lit-html.js";import{unsafeHTML as s}from"./unsafe-html.js";import i from"./env.js";import{parseDataset as n}from"./general.js";import o from"./soundscape.js";import u from"./component.js";import{UUID as d}from"./uuid.js";i.css("textarea");class a extends u{constructor(){super();this.handleBlur=e=>{e.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleInput=e=>{e.stopImmediatePropagation();const l=e.currentTarget;this.set({value:l.value}),this.validate(),this.dispatchEvent(new CustomEvent("input",{detail:{value:l.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.inputId=d(),this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",placeholder:"",value:"",maxlength:1/0,minlength:0,disabled:!1,readOnly:!1,rows:5,autofocus:!1}}static get observedAttributes(){return["data-label","data-name","data-instructions","data-required","data-autocomplete","data-placeholder","data-value","data-maxlength","data-minlength","data-disabled","data-read-only","data-rows","data-autofocus"]}async connected(){const e=n(this.dataset,this.model);this.state=e?.disabled?"DISABLED":"IDLING",this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}reset(){this.set({value:null});const e=this.querySelector("input");e&&(e.value=null)}setError(e){this.set({error:e}),this.trigger("ERROR"),o.play("error")}validate(){let e=!0;return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value.length?(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),e&&this.clearError(),e}getName(){return this.model.name}getValue(){return this.model.value}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=t`<p>${s(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=t`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderLabel(){let e;return this.model.label?.length?e=t`<label for="${this.inputId}">${s(this.model.label)}</label>`:e="",e}renderCounter(){let e;return this.model.maxlength===1/0?e="":e=t` <span class="counter"> ${this.model.value?.length??0}/${this.model.maxlength} </span> `,e}render(){this.setAttribute("state",this.state),this.setAttribute("form-input","");const e=t`
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
            ${this.renderCounter()}
        `;r(e,this)}}i.bind("textarea-component",a);export{a as default};
