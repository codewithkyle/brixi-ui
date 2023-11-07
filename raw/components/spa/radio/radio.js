import{html as s,render as n}from"./lit-html.js";import i from"./env.js";import{parseDataset as r}from"./general.js";import l from"./soundscape.js";import d from"./component.js";import{UUID as o}from"./uuid.js";i.css("radio");class a extends d{constructor(){super();this.handleChange=e=>{e.stopImmediatePropagation();const t=e.currentTarget;this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:t.value},bubbles:!0,cancelable:!0}))};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{if(e.key===" "){this.classList.remove("is-active");const t=this.querySelector("input");t.checked=!t.checked,this.set({checked:t.checked}),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:this.model.value},bubbles:!0,cancelable:!0}))}};this.inputId=o(),this.model={label:"",required:!1,name:"",checked:!1,disabled:!1,value:null}}static get observedAttributes(){return["data-label","data-required","data-name","data-checked","data-disabled","data-value"]}async connected(){const e=r(this.dataset,this.model);this.set(e)}getName(){return this.model.name}getValue(){return this.model.checked?this.model.value:null}reset(){this.set({checked:!1})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),l.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.checked&&(e=!1,this.setError("This field is required")),e}render(){this.setAttribute("state",this.state),this.setAttribute("form-input","");const e=s`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="radio"
                    name="${this.model.name}"
                    id="${this.inputId}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value??""}
                />
                <label sfx="button" for="${this.inputId}">
                    <i
                        @keydown=${this.handleKeydown}
                        @keyup=${this.handleKeyup}
                        tabindex="0"
                        role="button"
                        aria-label=${`click to ${this.model.checked?"uncheck":"check"} the option ${this.model.label}`}
                    ></i>
                    <span>${this.model.label}</span>
                </label>
            </div>
        `;n(e,this)}}i.bind("radio-component",a);export{a as default};
