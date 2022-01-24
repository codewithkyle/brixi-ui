import{html as s,render as n}from"./lit-html.js";import l from"./env.js";import o from"./flatpickr.js";import{noop as m,parseDataset as d}from"./general.js";import{default as u}from"./input.js";class r extends u{constructor(e){super(e);this.handleInput=e=>{const t=e.currentTarget;this.update({prevValue:this.model.value.toString(),value:t.value}),this.validate(t,!0),this.model.mode==="range"?(this.model.value.toString().search(/\bto\b/i)!==-1||this.model.prevValue===this.model.value)&&this.model.callback(t.value):this.model.mode==="single"&&this.model.callback(t.value)};this.handleBlur=e=>{if(this.model.mode==="multiple"){const t=e.currentTarget;this.model.callback(t.value)}};this.firstRender=!0,this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={readOnly:!1,label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",disabled:!1,maxlength:9999,minlength:0,dateFormat:"Z",displayFormat:"F j, Y",enableTime:!1,minDate:null,maxDate:null,mode:"single",disableCalendar:!1,timeFormat:"12",css:"",class:"",callback:m,attributes:{},prevValue:null},this.model=d(this.dataset,this.model),l.css(["input","flatpickr"]).then(()=>{this.set(e,!0),this.render()})}validate(e=null,t=!1){e||(e=this.querySelector("input"));let i=!0;return this.model.required&&!e.value.length?(i=!1,this.setError("This field is required.",t)):this.clearError(),i}render(){if(this.model.mode==="range"&&!this.firstRender)return;const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=s`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="email"
                    type="email"
                    id="${e}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                />
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(a=>{this.setAttribute(a,`${this.model.attributes[a]}`)}),n(t,this);const i=this.querySelector("input");o(i,{dateFormat:this.model.dateFormat,enableTime:this.model.enableTime,altFormat:this.model.displayFormat,altInput:!0,minDate:this.model.minDate,maxDate:this.model.maxDate,mode:this.model.mode,noCalendar:this.model.disableCalendar,time_24hr:this.model.timeFormat==="24"}),this.firstRender=!1}}l.mount("date-input-component",r);export{r as default};
