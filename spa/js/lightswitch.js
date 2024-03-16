import{UUID as n}from"./uuid.js";import{html as s,render as r}from"./lit-html.js";import d from"./component.js";import a from"./env.js";import i from"./soundscape.js";import{parseDataset as o}from"./general.js";a.css("lightswitch");class l extends d{constructor(){super();this.handleChange=e=>{e.stopImmediatePropagation();const t=e.currentTarget;this.set({enabled:t.checked}),t.checked?i.play("activate"):i.play("deactivate"),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:this.model.value,enabled:this.model.enabled},bubbles:!0,cancelable:!0}))};this.handleKeyup=e=>{if(e.key===" "){const t=this.querySelector("input");t.checked=!t.checked,this.classList.remove("is-active"),this.set({enabled:t.checked}),t.checked?i.play("activate"):i.play("deactivate"),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:this.model.value,enabled:this.model.enabled},bubbles:!0,cancelable:!0}))}};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.inputId=n(),this.model={name:"",label:"",instructions:"",enabled:!1,disabled:!1,color:"success",value:null,required:!1}}static get observedAttributes(){return["data-label","data-instructions","data-enabled","data-disabled","data-color","data-value","data-required","data-name"]}async connected(){const e=o(this.dataset,this.model);this.state=e.disabled?"DISABLED":"IDLING",this.set(e)}getName(){return this.model.name}getValue(){return this.model.enabled?this.model.value:null}reset(){this.set({enabled:!1})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),i.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.enabled&&(e=!1,this.setError("This field is required")),e}renderLabel(){return!this.model.label?.length&&!this.model.instructions?.length?"":s`
            <div class="ml-0.75" flex="column wrap">
                <span class="block line-snug font-sm font-medium font-grey-700 dark:font-grey-300">${this.model.label}</span>
                <span class="block line-snug font-xs font-grey-500 dark:font-grey-300">${this.model.instructions}</span>
            </div>
        `}render(){this.setAttribute("state",this.state),this.setAttribute("color",this.model.color),this.setAttribute("form-input","");const e=s`
            <input
                @change=${this.handleChange}
                type="checkbox"
                name="${this.model.name}"
                id="${this.inputId}"
                ?disabled=${this.model.disabled}
                ?checked=${this.model.enabled}
                value=${this.model.value??""}
            />
            <label for="${this.inputId}">
                ${this.renderLabel()}
                <light-switch tabindex="0" @keyup=${this.handleKeyup} @keydown=${this.handleKeydown} aria-label="${this.model.enabled?"enabled":"disabled"}">
                    <i style="transform: ${this.model.enabled?"translate(26px, 3px)":"translate(6px, 3px)"}"></i>
                </light-switch>
            </label>
        `;r(e,this)}}a.bind("brixi-lightswitch",l);export{l as default};
