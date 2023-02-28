import{html as s,render as o}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import u from"./supercomponent.js";import r from"./env.js";import{noop as n,parseDataset as d}from"./general.js";import h from"./soundscape.js";class a extends u{constructor(t){super();this.handleBlur=t=>{const e=t.currentTarget;this.validate(e),this.model.callbacks.onBlur(this.model.value)};this.handleInput=t=>{const e=t.currentTarget;this.set({value:e.value}),this.validate(e,!0),this.model.callbacks.onInput(e.value)};this.handleFocus=()=>{this.model.callbacks.onFocus(this.model.value)};this.state=t?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",maxlength:9999,minlength:0,disabled:!1,readOnly:!1,callbacks:{onInput:n,onFocus:n,onBlur:n},css:"",class:"",attributes:{},datalist:[],autofocus:!1},this.model=d(this.dataset,this.model),r.css("input").then(()=>{this.set(t,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(t,e){e||(this.set({error:t}),this.trigger("ERROR"),h.play("error"))}validate(t=null,e=!1){t||(t=this.querySelector("input"));let i=!0;return this.model.required&&!t.value.length&&(i=!1,this.setError("This field is required.",e)),(this.model.required||!this.model.required&&t.value.length)&&(this.model.minlength>t.value.length?(i=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,e)):this.model.maxlength<t.value.length&&(i=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,e))),i&&this.clearError(),i}getName(){return this.model.name}getValue(){return this.model.value}renderCopy(){let t="";return this.state==="IDLING"&&this.model.instructions?t=s`<p>${l(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(t=s`<p class="font-danger-700">${this.model.error}</p>`),t}renderIcon(){let t="";return typeof this.model.icon=="string"?t=s`<i>${l(this.model.icon)}</i>`:this.model.icon instanceof HTMLElement&&(t=s`<i>${this.model.icon}</i>`),t}renderLabel(t){let e="";return this.model.label?.length&&(e=s`<label for="${t}">${l(this.model.label)}</label>`),e}renderDatalist(t){let e="";return this.model.datalist.length&&(e=s`
                <datalist id="${t}-datalist">
                    ${this.model.datalist.map(i=>s` <option value="${i}"></option> `)}
                </datalist>
            `),e}render(){const t=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,e=s`
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
                    .value=${this.model.value}
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
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(i=>{this.setAttribute(i,`${this.model.attributes[i]}`)}),o(e,this)}}r.bind("input-component",a);export{a as default};