import{html as s,render as n}from"./lit-html.js";import l from"./env.js";import{parseDataset as o}from"./general.js";import i from"./soundscape.js";import d from"./component.js";import{UUID as c}from"./uuid.js";l.css("checkbox");class r extends d{constructor(){super();this.handleChange=e=>{if(e.stopImmediatePropagation(),this.model.disabled)return;const t=!this.model.checked;this.set({checked:t}),this.dispatchEvent(new CustomEvent("change",{detail:{checked:t,name:this.model.name,value:this.model.value},bubbles:!0,cancelable:!0})),t?i.play("click"):i.play("hover")};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{if(e.key===" "){this.classList.remove("is-active");const t=this.querySelector("input"),a=!t.checked;this.set({checked:a}),this.dispatchEvent(new CustomEvent("change",{detail:{checked:a,name:t.name},bubbles:!0,cancelable:!0})),a?i.play("click"):i.play("hover")}};this.id=c(),this.state="IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",required:!1,name:"",checked:!1,error:"",disabled:!1,type:"check",value:null}}static get observedAttributes(){return["data-label","data-required","data-name","data-checked","data-disabled","data-type","data-value"]}async connected(){const e=o(this.dataset,this.model);e?.disabled&&(this.state="DISABLED"),this.set(e),this.addEventListener("click",this.handleChange)}getName(){return this.model.name}getValue(){return this.model.checked?this.model.value:null}reset(){this.set({checked:!1})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),i.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.checked&&(e=!1,this.setError("This field is required")),e}renderIcon(){switch(this.model.type){case"line":return s`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>`;default:return s`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>`}}render(){this.setAttribute("state",this.state),this.setAttribute("form-input",""),this.classList.add("checkbox");const e=s`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="checkbox"
                    name="${this.model.name}"
                    id="${this.id}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value||""}
                />
                <label for="${this.id}">
                    <check-box
                        @keydown=${this.handleKeydown}
                        @keyup=${this.handleKeyup}
                        role="button"
                        tabindex="0"
                        aria-label=${`click to ${this.model.checked?"uncheck":"check"} the box ${this.model.label}`}
                    >
                        <i> ${this.renderIcon()} </i>
                    </check-box>
                    ${this.model.label?.length?s`<span>${this.model.label}</span>`:""}
                </label>
            </div>
        `;n(e,this)}}l.bind("checkbox-component",r);export{r as default};
