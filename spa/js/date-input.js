import{html as t,render as r}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import s from"./env.js";import o from"./flatpickr.js";import{InputBase as d}from"./input-base.js";import{UUID as m}from"./uuid.js";s.css(["input","flatpickr"]);class n extends d{constructor(){super();this.handleInput=e=>{e.stopImmediatePropagation();const i=e.currentTarget;if(this.set({prevValue:this.model.value?.toString(),value:i.value},!0),this.validate(),this.model.mode==="range"){if(this.model.value.toString().search(/\bto\b/i)!==-1||this.model.prevValue===this.model.value&&this.model.value!=null){const a=this.model.value.toString().split(" to ");this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,start:a[0].trim(),end:a[1].trim()},bubbles:!0,cancelable:!0}))}}else this.model.mode==="multiple"?this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,values:this.model.value.toString().split(",").map(a=>a.trim())},bubbles:!0,cancelable:!0})):this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:this.model.value.toString()},bubbles:!0,cancelable:!0}))};this.inputId=m(),this.firstRender=!0,this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:null,disabled:!1,dateFormat:"Z",displayFormat:"F j, Y",enableTime:!1,minDate:null,maxDate:null,mode:"single",disableCalendar:!1,timeFormat:"12",prevValue:null,autofocus:!1}}static get observedAttributes(){return["data-label","data-instructions","data-name","data-required","data-autocomplete","data-autocapitalize","data-icon","data-placeholder","data-value","data-disabled","data-date-format","data-display-format","data-enable-time","data-min-date","data-max-date","data-mode","data-disable-calendar","data-time-format","data-prev-value","data-autofocus"]}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=t`<p>${l(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=t`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=t`<i>${l(this.model.icon)}</i>`),e}renderLabel(){let e="";return this.model.label?.length&&(e=t`<label for="${this.inputId}">${l(this.model.label)}</label>`),e}render(){if(this.model.mode==="range"&&!this.firstRender)return;this.classList.add("input"),this.setAttribute("state",this.state);const e=t`
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
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;if(r(e,this),this.state!=="DISABLED"){const i=this.querySelector("input");o(i,{dateFormat:this.model.dateFormat,enableTime:this.model.enableTime,altFormat:this.model.displayFormat,altInput:!0,minDate:this.model.minDate,maxDate:this.model.maxDate,mode:this.model.mode,noCalendar:this.model.disableCalendar,time_24hr:this.model.timeFormat==="24"})}this.firstRender=!1}}s.bind("brixi-date-input",n);export{n as default};
