import{html as i,render as r}from"./lit-html.js";import{unsafeHTML as n}from"./unsafe-html.js";import a from"./env.js";import{InputBase as o}from"./input-base.js";import{calcPercent as m}from"./numpy.js";import{UUID as u}from"./uuid.js";a.css(["range-slider"]);class s extends o{constructor(){super();this.handleChange=e=>{e.stopImmediatePropagation()};this.handleInput=e=>{e.stopImmediatePropagation();const l=e.currentTarget;let t=parseInt(l.value);isNaN(t)&&(t=this.model.min),t<this.model.min?t=this.model.max:t>this.model.max&&(t=this.model.max),this.renderFill(t),this.set({value:t}),this.dispatchEvent(new CustomEvent("change",{detail:{value:t,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleBlur=e=>{e.stopImmediatePropagation();const l=e.currentTarget;let t=parseInt(l.value);isNaN(t)&&(t=this.model.min),t<this.model.min?t=this.model.max:t>this.model.max&&(t=this.model.max),this.renderFill(t),this.set({value:t}),this.dispatchEvent(new CustomEvent("blur",{detail:{value:t,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleFocus=e=>{e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.model.value,name:this.model.name},bubbles:!0,cancelable:!0}))};this.handleIconClick=()=>{let e=0;this.model.value===this.model.min?e=this.model.max:e=this.model.min,this.renderFill(e),this.set({value:e}),this.dispatchEvent(new CustomEvent("change",{detail:{value:e,name:this.model.name},bubbles:!0,cancelable:!0}))};this.inputId=u(),this.model={manual:!1,label:"",name:"",instructions:"",readOnly:!1,required:!1,disabled:!1,error:"",icon:"",minIcon:null,maxIcon:null,value:null,min:0,max:9999,step:1,autofocus:!1}}static get observedAttributes(){return["data-label","data-name","data-instructions","data-icon","data-read-only","data-required","data-manual","data-disabled","data-value","data-min","data-max","data-step","data-autofocus","data-min-icon","data-max-icon"]}reset(){this.set({value:this.model.min})}validate(){return!0}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=i`<p>${n(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=i`<p class="font-danger-700">${this.model.error}</p>`),e}renderLabel(){let e="";return this.model.label?.length&&(e=i`<label for="${this.inputId}">${n(this.model.label)}</label>`),e}renderManualInput(){let e="";return this.model.manual&&(e=i`
                <input
                    aria-label="manual range input for ${this.model.label}"
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="numeric"
                    type="number"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                    ?readonly=${this.model.readOnly}
                />
            `),e}renderFill(e){this.fillPercentage=m(e,this.model.max),this.style.setProperty("--track-fill",`${this.fillPercentage}%`)}renderIcon(){let e="";return this.model.minIcon!=null&&this.model.value===this.model.min?this.model.minIcon?.length&&(e=i`<button sfx="button" @click=${this.handleIconClick} type="button">${n(this.model.minIcon)}</button>`):this.model.maxIcon!=null&&this.model.value===this.model.max?this.model.maxIcon?.length&&(e=i`<button sfx="button" @click=${this.handleIconClick} type="button">${n(this.model.maxIcon)}</button>`):this.model.icon?.length&&(e=i`<button sfx="button" @click=${this.handleIconClick} type="button">${n(this.model.icon)}</button>`),e}render(){this.classList.add("input"),this.setAttribute("state",this.state),this.renderFill(this.model.value);const e=i`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    @change=${this.handleChange}
                    type="range"
                    id="${this.inputId}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value??this.model.min}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                    ?readonly=${this.model.readOnly}
                />
                ${this.renderManualInput()}
            </input-container>
        `;r(e,this)}}a.bind("range-slider",s);export{s as default};
