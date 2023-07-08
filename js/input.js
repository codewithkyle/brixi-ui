import{html as s,render as o}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import a from"./env.js";import{noop as n}from"./general.js";import{InputBase as u}from"./input-base.js";class r extends u{constructor(t){super(t);this.handleInput=t=>{const e=t.currentTarget;this.set({value:e.value},!0),this.clearError(),this.model.callbacks?.onInput&&typeof this.model.callbacks?.onInput=="function"&&this.model.callbacks?.onInput(e.value)};this.handleBlur=()=>{this.validate(),this.model.callbacks?.onBlur&&typeof this.model.callbacks?.onBlur=="function"&&this.model.callbacks?.onBlur(this.model.value)};this.handleFocus=()=>{this.model.callbacks?.onFocus&&typeof this.model.callbacks?.onFocus=="function"&&this.model.callbacks?.onFocus(this.model.value)};this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,maxlength:9999,minlength:0,disabled:!1,readOnly:!1,callbacks:{onInput:n,onFocus:n,onBlur:n},css:"",class:"",attributes:{},datalist:[],autofocus:!1},a.css("input").then(()=>{this.set(t,!0),this.render()})}validate(){let t=!0;return this.model.required&&!this.model.value?.length&&(t=!1,this.setError("This field is required.")),(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value.length?(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),t&&this.clearError(),t}renderCopy(){let t="";return this.state==="IDLING"&&this.model.instructions?t=s`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(t=s`<p class="font-danger-700">${this.model.error}</p>`),t}renderIcon(){let t="";return typeof this.model.icon=="string"?t=s`<i>${i(this.model.icon)}</i>`:this.model.icon instanceof HTMLElement&&(t=s`<i>${this.model.icon}</i>`),t}renderLabel(t){let e="";return this.model.label?.length&&(e=s`<label for="${t}">${i(this.model.label)}</label>`),e}renderDatalist(t){let e="";return this.model.datalist.length&&(e=s`
                <datalist id="${t}-datalist">
                    ${this.model.datalist.map(l=>s` <option value="${l}"></option> `)}
                </datalist>
            `),e}render(){const t=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.className=`input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(l=>{this.setAttribute(l,`${this.model.attributes[l]}`)});const e=s`
            ${this.renderLabel(t)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    type="text"
                    id="${t}"
                    maxlength=${this.model.maxlength}
                    minlength="${this.model.minlength}"
                    .value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    list="${this.model.datalist.length?`${t}-datalist`:""}"
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
            ${this.renderDatalist(t)}
        `;o(e,this)}}a.bind("input-component",r);export{r as default};
