import{UUID as d}from"./uuid.js";import{html as o,render as h}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import c from"./component.js";import n from"./env.js";import s from"./soundscape.js";import{parseDataset as m}from"./general.js";n.css("lightswitch");class r extends c{constructor(){super();this.handleChange=e=>{e.stopImmediatePropagation();const t=e.currentTarget;this.set({enabled:t.checked}),t.checked?s.play("activate"):s.play("deactivate"),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:this.model.value,enabled:this.model.enabled}}))};this.handleKeyup=e=>{if(e.key===" "){const t=this.querySelector("input");t.checked=!t.checked,this.classList.remove("is-active"),this.set({enabled:t.checked}),t.checked?s.play("activate"):s.play("deactivate"),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:this.model.value,enabled:this.model.enabled}}))}};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.inputId=d(),this.model={name:"",label:"",instructions:"",enabledLabel:null,disabledLabel:null,enabled:!1,disabled:!1,color:"success",value:null,required:!1}}static get observedAttributes(){return["data-label","data-instructions","data-enabled-label","data-disabled-label","data-enabled","data-disabled","data-color","data-value","data-required","data-name"]}async connected(){const e=m(this.dataset,this.model);this.set(e)}getName(){return this.model.name}getValue(){return this.model.enabled?this.model.value:null}reset(){this.set({enabled:!1})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),s.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.enabled&&(e=!1,this.setError("This field is required")),e}resize(){const e=this.querySelector("light-switch"),t=e.querySelector("span:first-of-type"),i=e.querySelector("span:last-of-type"),a=this.querySelector("i");this.model.enabled?(e.style.width=`${t.scrollWidth+32}px`,t.style.transform="translateX(6px)",i.style.transform="translateX(6px)",a.style.transform="translate(6px, 2px)"):(e.style.width=`${i.scrollWidth+32}px`,t.style.transform=`translateX(-${t.scrollWidth}px)`,i.style.transform=`translateX(-${t.scrollWidth}px)`,a.style.transform=`translate(-${t.scrollWidth}px, 2px)`)}render(){this.setAttribute("color",this.model.color),this.setAttribute("form-input","");const e=o`
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
                <light-switch tabindex="0" @keyup=${this.handleKeyup} @keydown=${this.handleKeydown} aria-label="${this.model.enabled?"enabled":"disabled"}">
                    <span>${l(this.model.enabledLabel)}</span>
                    <i></i>
                    <span>${l(this.model.disabledLabel)}</span>
                </light-switch>
                <div class="ml-0.75" flex="column wrap">
                    <span class="block line-snug font-sm font-medium font-grey-700">${this.model.label}</span>
                    <span class="block line-snug font-xs font-grey-500">${this.model.instructions}</span>
                </div>
            </label>
        `;h(e,this),this.resize()}}n.bind("lightswitch-component",r);export{r as default};
