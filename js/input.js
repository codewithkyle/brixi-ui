import{UUID as n}from"./uuid.js";import{html as e,render as r}from"./lit-html.js";import{unsafeHTML as a}from"./unsafe-html.js";import l from"./env.js";import{InputBase as o}from"./input-base.js";l.css("input");class s extends o{constructor(){super();this.handleInput=t=>{t.stopImmediatePropagation();const i=t.currentTarget;this.set({value:i.value},!0),this.clearError(),this.dispatchEvent(new CustomEvent("input",{detail:{value:i.value,name:this.model.name}}))};this.handleBlur=t=>{t.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name}}))};this.handleFocus=t=>{t.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name}}))};this.inputId=n(),this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,maxlength:9999,minlength:0,disabled:!1,readOnly:!1,datalist:[],autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-name","data-required","data-autocomplete","data-autocapitalize","data-icon","data-placeholder","data-value","data-maxlength","data-minlength","data-disabled","data-read-only","data-datalist","data-autofocus"]}validate(){let t=!0;return this.model.required&&!this.model.value?.length?(t=!1,this.setError("This field is required.")):(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value?.length?(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value?.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),t&&this.clearError(),t}renderCopy(){let t="";return this.state==="IDLING"&&this.model.instructions?t=e`<p>${a(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(t=e`<p class="font-danger-700">${this.model.error}</p>`),t}renderIcon(){let t="";return this.model.icon?.length&&(t=e`<i>${a(this.model.icon)}</i>`),t}renderLabel(){let t="";return this.model.label?.length&&(t=e`<label for="${this.inputId}">${a(this.model.label)}</label>`),t}renderDatalist(){let t="";return this.model.datalist.length&&(t=e`
                <datalist id="${this.inputId}-datalist">
                    ${this.model.datalist.map(i=>e` <option value="${i}"></option> `)}
                </datalist>
            `),t}render(){this.setAttribute("state",this.state),this.classList.add("input");const t=e`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    type="text"
                    id="${this.inputId}"
                    maxlength=${this.model.maxlength}
                    minlength="${this.model.minlength}"
                    .value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    list="${this.model.datalist.length?`${this.inputId}-datalist`:""}"
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
            ${this.renderDatalist()}
        `;r(t,this)}}l.bind("input-component",s);export{s as default};
