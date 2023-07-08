import{html as i,render as u}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import n from"./env.js";import m from"./flatpickr.js";import{noop as s}from"./general.js";import{InputBase as d}from"./input-base.js";class o extends d{constructor(e){super(e);this.handleInput=e=>{const t=e.currentTarget;this.set({prevValue:this.model.value?.toString(),value:t.value},!0),this.validate(),this.model.callbacks?.onInput&&typeof this.model.callbacks.onInput=="function"&&(this.model.mode==="range"?(this.model.value.toString().search(/\bto\b/i)!==-1||this.model.prevValue===this.model.value)&&this.model.callbacks?.onInput(t.value):this.model.mode==="single"&&this.model.callbacks?.onInput(t.value))};this.handleBlur=()=>{this.validate(),this.model.callbacks?.onBlur&&typeof this.model.callbacks.onBlur=="function"&&this.model.callbacks?.onBlur(this.model.value)};this.handleFocus=()=>{this.model.callbacks?.onFocus&&typeof this.model.callbacks.onFocus=="function"&&this.model.callbacks?.onFocus(this.model.value)};this.firstRender=!0,this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={readOnly:!1,label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,disabled:!1,dateFormat:"Z",displayFormat:"F j, Y",enableTime:!1,minDate:null,maxDate:null,mode:"single",disableCalendar:!1,timeFormat:"12",css:"",class:"",callbacks:{onInput:s,onFocus:s,onBlur:s},attributes:{},prevValue:null,datalist:[],autofocus:!1},n.css(["input","flatpickr"]).then(()=>{this.set(e,!0),this.render()})}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=i`<p>${l(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=i`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return typeof this.model.icon=="string"?e=i`<i>${l(this.model.icon)}</i>`:this.model.icon instanceof HTMLElement&&(e=i`<i>${this.model.icon}</i>`),e}renderLabel(e){let t="";return this.model.label?.length&&(t=i`<label for="${e}">${l(this.model.label)}</label>`),t}render(){if(this.model.mode==="range"&&!this.firstRender)return;const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.className=`input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(a=>{this.setAttribute(a,`${this.model.attributes[a]}`)});const t=i`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="email"
                    type="email"
                    id="${e}"
                    .value=${this.model.value??""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;u(t,this);const r=this.querySelector("input");m(r,{dateFormat:this.model.dateFormat,enableTime:this.model.enableTime,altFormat:this.model.displayFormat,altInput:!0,minDate:this.model.minDate,maxDate:this.model.maxDate,mode:this.model.mode,noCalendar:this.model.disableCalendar,time_24hr:this.model.timeFormat==="24"}),this.firstRender=!1}}n.bind("date-input-component",o);export{o as default};
