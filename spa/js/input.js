import{UUID as n}from"./uuid.js";import{html as e,render as r}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import l from"./env.js";import{InputBase as o}from"./input-base.js";import d from"./alerts.js";l.css(["input","button","toast"]);class s extends o{constructor(){super();this.handleInput=t=>{t.stopImmediatePropagation();const a=t.currentTarget;this.set({value:a.value},!0),this.clearError(),this.dispatchEvent(new CustomEvent("input",{detail:{value:a.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleBlur=t=>{t.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=t=>{t.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleCopyClick=t=>{t.stopImmediatePropagation(),window.navigator.clipboard.writeText(this.model.value).then(()=>{d.toast("Copied to clipboard")})};this.inputId=n(),this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,maxlength:9999,minlength:0,disabled:!1,readOnly:!1,datalist:[],autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-name","data-required","data-autocomplete","data-autocapitalize","data-icon","data-placeholder","data-value","data-maxlength","data-minlength","data-disabled","data-read-only","data-datalist","data-autofocus"]}validate(){let t=!0;return this.model.required&&!this.model.value?.length?(t=!1,this.setError("This field is required.")):(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value?.length?(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value?.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),t&&this.clearError(),t}renderCopy(){let t="";return this.state==="IDLING"&&this.model.instructions?t=e`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(t=e`<p class="font-danger-700">${this.model.error}</p>`),t}renderIcon(){let t="";return this.model.icon?.length&&(t=e`<i>${i(this.model.icon)}</i>`),t}renderReadOnlyIcon(){let t="";return this.model.readOnly&&(t=e`
                <button class="bttn absolute r-0 b-0" kind="text" color="primary" size="slim" icon="center" dull @click=${this.handleCopyClick} type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
            `),t}renderLabel(){let t="";return this.model.label?.length&&(t=e`<label for="${this.inputId}"
                >${i(this.model.label)} ${this.model.required?"":e`<span class="font-grey-400 dark:font-grey-500 font-xs">(optional)</span>`}</label
            >`),t}renderDatalist(){let t="";return this.model.datalist.length&&(t=e`
                <datalist id="${this.inputId}-datalist">
                    ${this.model.datalist.map(a=>e` <option value="${a}"></option> `)}
                </datalist>
            `),t}render(){this.setAttribute("state",this.state),this.classList.add("input"),this.model.readOnly&&this.setAttribute("readonly",`${this.model.readOnly}`);const t=e`
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
                    ?readonly=${this.model.readOnly}
                />
                ${this.renderReadOnlyIcon()}
            </input-container>
            ${this.renderDatalist()}
        `;r(t,this)}}l.bind("brixi-input",s);export{s as default};
