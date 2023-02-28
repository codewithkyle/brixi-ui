import{html as l,render as m}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import a from"./env.js";import{default as r}from"./input.js";import{noop as s,parseDataset as u}from"./general.js";import{calcPercent as d}from"./numpy.js";class o extends r{constructor(e){super(e);this.handleInput=e=>{const n=e.currentTarget;let t=parseInt(n.value);isNaN(t)&&(t=this.model.min),t<this.model.min?t=this.model.max:t>this.model.max&&(t=this.model.max),this.renderFill(t),this.set({value:t}),this.model.callbacks.onInput(t)};this.handleBlur=e=>{const n=e.currentTarget;let t=parseInt(n.value);isNaN(t)&&(t=this.model.min),t<this.model.min?t=this.model.max:t>this.model.max&&(t=this.model.max),this.renderFill(t),this.set({value:t}),this.model.callbacks.onBlur(t)};this.handleIconClick=()=>{let e=0;this.model.value===this.model.min?e=this.model.max:e=this.model.min,this.renderFill(e),this.set({value:e}),this.model.callbacks.onInput(e)};this.model={manual:!1,label:"",name:"",instructions:"",readOnly:!1,required:!1,disabled:!1,error:"",autocapitalize:"off",autocomplete:"off",icon:"",minValueIcon:null,maxValueIcon:null,placeholder:"",value:e?.min??0,minlength:0,maxlength:9999,min:0,max:9999,step:1,css:"",class:"",callbacks:{onInput:s,onFocus:s,onBlur:s},attributes:{},datalist:[],autofocus:!1},this.model=u(this.dataset,this.model),a.css(["range-slider"]).then(()=>{this.set(e,!0),this.render(),this.className=`js-input ${this.model.class}`,this.style.cssText=this.model.css,this.renderFill(this.model.value)})}validate(e=null,n=!1){return!0}renderManualInput(){let e="";return this.model.manual&&(e=l`
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
            `),e}renderFill(e){this.fillPercentage=d(e,this.model.max),this.style.setProperty("--track-fill",`${this.fillPercentage}%`)}renderIcon(){let e="";return this.model.minValueIcon!=null&&this.model.value===this.model.min?typeof this.model.minValueIcon=="string"?e=l`<button @click=${this.handleIconClick} type="button">${i(this.model.minValueIcon)}</button>`:this.model.minValueIcon instanceof HTMLElement&&(e=l`<button @click=${this.handleIconClick} type="button">${this.model.minValueIcon}</button>`):this.model.maxValueIcon!=null&&this.model.value===this.model.max?typeof this.model.maxValueIcon=="string"?e=l`<button @click=${this.handleIconClick} type="button">${i(this.model.maxValueIcon)}</button>`:this.model.maxValueIcon instanceof HTMLElement&&(e=l`<button @click=${this.handleIconClick} type="button">${this.model.maxValueIcon}</button>`):typeof this.model.icon=="string"?e=l`<button @click=${this.handleIconClick} type="button">${i(this.model.icon)}</button>`:this.model.icon instanceof HTMLElement&&(e=l`<button @click=${this.handleIconClick} type="button">${this.model.icon}</button>`),e}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,n=l`
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
        `;this.setAttribute("state",this.state),Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),m(n,this)}}a.bind("range-slider",o);export{o as default};
