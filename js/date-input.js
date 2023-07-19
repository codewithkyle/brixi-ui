import{html as e,render as o}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import s from"./env.js";import r from"./flatpickr.js";import{InputBase as d}from"./input-base.js";import{UUID as m}from"./uuid.js";s.css(["input","flatpickr"]);class n extends d{constructor(){super();this.handleInput=t=>{t.stopImmediatePropagation();const i=t.currentTarget;if(this.set({prevValue:this.model.value?.toString(),value:i.value},!0),this.validate(),this.model.mode==="range"){if(this.model.value.toString().search(/\bto\b/i)!==-1||this.model.prevValue===this.model.value&&this.model.value!=null){const a=this.model.value.toString().split(" to ");this.dispatchEvent(new CustomEvent("change",{detail:{start:a[0].trim(),end:a[1].trim()}}))}}else this.model.mode==="multiple"?this.dispatchEvent(new CustomEvent("change",{detail:{values:this.model.value.toString().split(",").map(a=>a.trim())}})):this.dispatchEvent(new CustomEvent("change",{detail:{value:this.model.value.toString()}}))};this.inputId=m(),this.firstRender=!0,this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={readOnly:!1,label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,disabled:!1,dateFormat:"Z",displayFormat:"F j, Y",enableTime:!1,minDate:null,maxDate:null,mode:"single",disableCalendar:!1,timeFormat:"12",prevValue:null,autofocus:!1}}static get observedAttributes(){return["data-read-only","data-label","data-instructions","data-name","data-required","data-autocomplete","data-autocapitalize","data-icon","data-placeholder","data-value","data-disabled","data-date-format","data-display-format","data-enable-time","data-min-date","data-max-date","data-mode","data-disable-calendar","data-time-format","data-prev-value","data-autofocus"]}renderCopy(){let t="";return this.state==="IDLING"&&this.model.instructions?t=e`<p>${l(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(t=e`<p class="font-danger-700">${this.model.error}</p>`),t}renderIcon(){let t="";return this.model.icon?.length&&(t=e`<i>${l(this.model.icon)}</i>`),t}renderLabel(){let t="";return this.model.label?.length&&(t=e`<label for="${this.inputId}">${l(this.model.label)}</label>`),t}render(){if(this.model.mode==="range"&&!this.firstRender)return;this.classList.add("input"),this.setAttribute("state",this.state);const t=e`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @change=${this.handleInput}
                    inputmode="text"
                    type="text"
                    id="${this.inputId}"
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
        `;o(t,this);const i=this.querySelector("input");r(i,{dateFormat:this.model.dateFormat,enableTime:this.model.enableTime,altFormat:this.model.displayFormat,altInput:!0,minDate:this.model.minDate,maxDate:this.model.maxDate,mode:this.model.mode,noCalendar:this.model.disableCalendar,time_24hr:this.model.timeFormat==="24"}),this.firstRender=!1}}s.bind("date-input-component",n);export{n as default};
