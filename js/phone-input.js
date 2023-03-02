import{html as i,render as u}from"./lit-html.js";import{unsafeHTML as n}from"./unsafe-html.js";import r from"./env.js";import{noop as l}from"./general.js";import{InputBase as d}from"./input-base.js";class a extends d{constructor(e){super(e);this.handleBlur=e=>{const t=e.currentTarget,s=this.formatPhoneNumber(t.value);this.set({value:s}),this.validate(),this.model.callbacks.onBlur(s)};this.handleFocus=()=>{const e=this.model.value.toString().replace(/[\-\+\s\(\)]/g,"");this.set({value:e}),this.model.callbacks.onFocus(e)};this.handleInput=e=>{const t=e.currentTarget;this.set({value:t.value},!0),this.clearError(),this.model.callbacks.onInput(t.value)};this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",icon:null,placeholder:"",value:"",disabled:!1,css:"",class:"",callbacks:{onInput:l,onFocus:l,onBlur:l},attributes:{},datalist:[],autofocus:!1},r.css("input").then(()=>{this.set(e,!0),this.render()})}validate(){let e=!0;const t=new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim);return this.model.required&&!this.model.value.length&&(e=!1,this.setError("This field is required.")),(!this.model.required&&this.model.value.length||this.model.required)&&(t.test(`${this.model.value}`)||(e=!1,this.setError("Invalid phone number."))),e&&this.clearError(),e}formatPhoneNumber(e){var t=(""+e).replace(/\D/g,""),s=t.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);if(s){var o=s[1]?"+1 ":"";return[o,"(",s[2],") ",s[3],"-",s[4]].join("")}return e}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=i`<p>${n(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=i`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return typeof this.model.icon=="string"?e=i`<i>${n(this.model.icon)}</i>`:this.model.icon instanceof HTMLElement&&(e=i`<i>${this.model.icon}</i>`),e}renderLabel(e){let t="";return this.model.label?.length&&(t=i`<label for="${e}">${n(this.model.label)}</label>`),t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.className=`input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const t=i`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @focus=${this.handleFocus}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="tel"
                    type="tel"
                    id="${e}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;u(t,this)}}r.bind("phone-input-component",a);export{a as default};
