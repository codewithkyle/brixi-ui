import{html as l,render as n}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import a from"./env.js";import{noop as s}from"./general.js";import{InputBase as u}from"./input-base.js";class o extends u{constructor(e){super(e);this.handleInput=e=>{const t=e.currentTarget;this.set({value:t.value},!0),this.clearError(),this.model.callbacks.onInput(t.value)};this.handleBlur=()=>{this.validate(),this.model.callbacks.onBlur(this.model.value)};this.handleFocus=()=>{this.model.callbacks.onFocus(this.model.value)};this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,disabled:!1,maxlength:9999,minlength:0,css:"",class:"",callbacks:{onInput:s,onFocus:s,onBlur:s},attributes:{},datalist:[],autofocus:!1},a.css("input").then(()=>{this.set(e,!0),this.render()})}validate(){let e=!0;const t=new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm);return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.value.length&&!t.test(this.model.value)?(e=!1,this.setError("Invalid email format.")):this.model.minlength>this.model.value.length?(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),e&&this.clearError(),e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=l`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=l`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return typeof this.model.icon=="string"?e=l`<i>${i(this.model.icon)}</i>`:this.model.icon instanceof HTMLElement&&(e=l`<i>${this.model.icon}</i>`),e}renderLabel(e){let t="";return this.model.label?.length&&(t=l`<label for="${e}">${i(this.model.label)}</label>`),t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.className=`input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(r=>{this.setAttribute(r,`${this.model.attributes[r]}`)});const t=l`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="email"
                    type="email"
                    id="${e}"
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
        `;n(t,this)}}a.bind("email-input-component",o);export{o as default};
