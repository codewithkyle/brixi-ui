import{html as l,render as r}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import a from"./env.js";import{noop as s}from"./general.js";import{InputBase as m}from"./input-base.js";import{calcPercent as u}from"./numpy.js";class o extends m{constructor(e){super(e);this.handleInput=e=>{const n=e.currentTarget;let t=parseInt(n.value);isNaN(t)&&(t=this.model.min),t<this.model.min?t=this.model.max:t>this.model.max&&(t=this.model.max),this.renderFill(t),this.set({value:t},!0),this.model.callbacks.onInput(t)};this.handleBlur=e=>{const n=e.currentTarget;let t=parseInt(n.value);isNaN(t)&&(t=this.model.min),t<this.model.min?t=this.model.max:t>this.model.max&&(t=this.model.max),this.renderFill(t),this.set({value:t}),this.model.callbacks.onBlur(t)};this.handleFocus=()=>{this.model.callbacks.onFocus(this.model.value)};this.handleIconClick=()=>{let e=0;this.model.value===this.model.min?e=this.model.max:e=this.model.min,this.renderFill(e),this.set({value:e}),this.model.callbacks.onInput(e)};this.model={manual:!1,label:"",name:"",instructions:"",readOnly:!1,required:!1,disabled:!1,error:"",icon:"",minValueIcon:null,maxValueIcon:null,placeholder:"",value:e?.min,min:0,max:9999,step:1,css:"",class:"",callbacks:{onInput:s,onFocus:s,onBlur:s},attributes:{},autofocus:!1},a.css(["range-slider"]).then(()=>{this.set(e,!0),this.render(),this.className=`js-input ${this.model.class}`,this.style.cssText=this.model.css,this.renderFill(this.model.value)})}reset(){this.set({value:this.model.min})}validate(){return!0}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=l`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=l`<p class="font-danger-700">${this.model.error}</p>`),e}renderLabel(e){let n="";return this.model.label?.length&&(n=l`<label for="${e}">${i(this.model.label)}</label>`),n}renderManualInput(){let e="";return this.model.manual&&(e=l`
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
                />
            `),e}renderFill(e){this.fillPercentage=u(e,this.model.max),this.style.setProperty("--track-fill",`${this.fillPercentage}%`)}renderIcon(){let e="";return this.model.minValueIcon!=null&&this.model.value===this.model.min?typeof this.model.minValueIcon=="string"?e=l`<button @click=${this.handleIconClick} type="button">${i(this.model.minValueIcon)}</button>`:this.model.minValueIcon instanceof HTMLElement&&(e=l`<button @click=${this.handleIconClick} type="button">${this.model.minValueIcon}</button>`):this.model.maxValueIcon!=null&&this.model.value===this.model.max?typeof this.model.maxValueIcon=="string"?e=l`<button @click=${this.handleIconClick} type="button">${i(this.model.maxValueIcon)}</button>`:this.model.maxValueIcon instanceof HTMLElement&&(e=l`<button @click=${this.handleIconClick} type="button">${this.model.maxValueIcon}</button>`):typeof this.model.icon=="string"?e=l`<button @click=${this.handleIconClick} type="button">${i(this.model.icon)}</button>`:this.model.icon instanceof HTMLElement&&(e=l`<button @click=${this.handleIconClick} type="button">${this.model.icon}</button>`),e}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.className=`input ${this.model.class}`,this.style.cssText=this.model.css,this.renderFill(this.model.value),Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const n=l`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    type="range"
                    id="${e}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
                ${this.renderManualInput()}
            </input-container>
        `;r(n,this)}}a.bind("range-slider",o);export{o as default};
