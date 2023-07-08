import{html as s,render as o}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import r from"./env.js";import{noop as i}from"./general.js";import{InputBase as u}from"./input-base.js";class a extends u{constructor(e){super(e);this.handleInput=e=>{const t=e.currentTarget;this.set({value:parseFloat(t.value.replace(/[^\-\d]/g,""))},!0),this.clearError(),this.model.callbacks?.onInput&&typeof this.model.callbacks?.onInput=="function"&&this.model.callbacks?.onInput(t.value)};this.handleBlur=()=>{this.validate(),this.model.callbacks?.onBlur&&typeof this.model.callbacks?.onBlur=="function"&&this.model.callbacks?.onBlur(this.model.value)};this.handleFocus=()=>{this.model.callbacks?.onFocus&&typeof this.model.callbacks?.onFocus=="function"&&this.model.callbacks?.onFocus(this.model.value)};this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,icon:null,placeholder:"",value:null,min:0,max:9999,step:1,disabled:!1,css:"",class:"",callbacks:{onInput:i,onFocus:i,onBlur:i},attributes:{},autofocus:!1},r.css("input").then(()=>{this.set(e,!0),this.render()})}validate(){let e=!0;return this.model.required&&this.model.value==null&&(e=!1,this.setError("This field is required.")),this.model.value!==null&&(this.model.value<this.model.min?(e=!1,this.setError(`Minimum allowed number is ${this.model.min}.`)):this.model.value>this.model.max&&(e=!1,this.setError(`Maximum allowed number is ${this.model.max}.`))),e&&this.clearError(),e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=s`<p>${l(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=s`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return typeof this.model.icon=="string"?e=s`<i>${l(this.model.icon)}</i>`:this.model.icon instanceof HTMLElement&&(e=s`<i>${this.model.icon}</i>`),e}renderLabel(e){let t="";return this.model.label?.length&&(t=s`<label for="${e}">${l(this.model.label)}</label>`),t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.className=`input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(n=>{this.setAttribute(n,`${this.model.attributes[n]}`)});const t=s`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="numeric"
                    type="number"
                    id="${e}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;o(t,this)}}r.bind("number-input-component",a);export{a as default};
