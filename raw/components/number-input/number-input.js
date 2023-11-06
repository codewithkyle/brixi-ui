import{UUID as n}from"./uuid.js";import{html as t,render as r}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import l from"./env.js";import{InputBase as u}from"./input-base.js";l.css("input");class a extends u{constructor(){super();this.handleInput=e=>{e.stopImmediatePropagation();const s=e.currentTarget.value.replace(/[^\d\.\-]/g,"").trim();this.set({value:s?.length?parseFloat(s):null}),this.clearError(),this.dispatchEvent(new CustomEvent("input",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleBlur=e=>{e.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name}}))};this.handleFocus=e=>{e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name}}))};this.inputId=n(),this.model={label:"",instructions:null,error:null,name:"",required:!1,icon:null,placeholder:"",value:null,min:0,max:9999,step:1,disabled:!1,autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-icon","data-placeholder","data-value","data-min","data-max","data-step","data-disabled","data-autofocus","data-name","data-required"]}validate(){let e=!0;return this.model.required&&this.model.value==null&&(e=!1,this.setError("This field is required.")),this.model.value!==null&&(this.model.value<this.model.min?(e=!1,this.setError(`Minimum allowed number is ${this.model.min}.`)):this.model.value>this.model.max&&(e=!1,this.setError(`Maximum allowed number is ${this.model.max}.`))),e&&this.clearError(),e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=t`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=t`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=t`<i>${i(this.model.icon)}</i>`),e}renderLabel(){let e="";return this.model.label?.length&&(e=t`<label for="${this.inputId}">${i(this.model.label)}</label>`),e}render(){this.setAttribute("state",this.state),this.classList.add("input");const e=t`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="numeric"
                    type="number"
                    id="${this.inputId}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;r(e,this)}}l.bind("number-input-component",a);export{a as default};
