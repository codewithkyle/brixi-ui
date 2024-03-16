import{html as t,render as a}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import{cache as n}from"./cache.js";import l from"./env.js";import{parseDataset as o}from"./general.js";import u from"./soundscape.js";import d from"./component.js";import{UUID as h}from"./uuid.js";l.css("select");class r extends d{constructor(){super();this.handleChange=e=>{e.stopImmediatePropagation();const s=e.currentTarget;this.set({value:s.value}),this.validate(),this.dispatchEvent(new CustomEvent("change",{detail:{value:s.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleBlur=e=>{e.stopImmediatePropagation(),this.validate(),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.inputId=h(),this.state=this.dataset?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED",ENABLE:"IDLING"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING",DISABLE:"DISABLED"}},this.model={label:"",name:"",icon:"",instructions:"",options:[],required:!1,error:null,value:null,disabled:!1,autofocus:!1}}static get observedAttributes(){return["data-label","data-icon","data-instructions","data-options","data-required","data-name","data-value","data-disabled","data-autofocus"]}async connected(){const e=o(this.dataset,this.model);e?.error&&(this.state="ERROR"),e?.disabled&&(this.state="DISABLED"),e?.autofocus&&document?.activeElement?.blur(),this.set(e)}renderCopy(){let e;return this.state==="ERROR"&&this.model.error?.length?e=t`<p class="font-danger-700">${this.model.error}</p>`:this.model.instructions?.length?e=t`<p>${i(this.model.instructions)}</p>`:e="",e}renderIcon(){let e;return this.model.icon instanceof HTMLElement?e=t` <i class="icon"> ${this.model.icon} </i> `:typeof this.model.icon=="string"&&this.model.icon.length?e=t` <i class="icon"> ${i(this.model.icon)} </i> `:e="",e}clearError(){this.state==="ERROR"&&(this.set({error:null}),this.trigger("RESET"))}reset(){this.set({value:""})}setError(e){this.set({error:e}),this.trigger("ERROR"),u.play("error")}validate(){let e=!0;return this.model.required&&(this.model.value===""||this.model.value==null)?(e=!1,this.setError("This field is required.")):this.clearError(),e}getName(){return this.model.name}getValue(){return this.model.value}renderLabel(){return t`<label for="${this.inputId}">${i(this.model.label)}</label>`}render(){this.state!=="DISABLED"&&this.model.disabled?this.trigger("DISABLE"):this.state==="DISABLED"&&!this.model.disabled&&this.trigger("ENABLE"),this.setAttribute("state",this.state),this.setAttribute("form-input","");const e=t`
            ${n(this.model.label?.length?this.renderLabel():"")} ${this.renderCopy()}
            <select-container>
                ${this.renderIcon()}
                <select
                    @blur=${this.handleBlur}
                    @change=${this.handleChange}
                    @focus=${this.handleFocus}
                    id="${this.inputId}"
                    name="${this.model.name}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                    ?value=${this.model.value}
                >
                    ${this.model.options.map(s=>t`<option value="${s.value}" ?selected=${this.model.value===s.value}>${s.label}</option>`)}
                </select>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </select-container>
        `;a(e,this)}}l.bind("brixi-select",r);export{r as default};
